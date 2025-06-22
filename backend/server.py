from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict
import os
from emergentintegrations.payments.stripe.checkout import StripeCheckout, CheckoutSessionResponse, CheckoutStatusResponse, CheckoutSessionRequest

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Stripe configuration
STRIPE_API_KEY = os.getenv("STRIPE_API_KEY")

# Course packages with fixed prices
COURSE_PACKAGES = {
    1: {"name": "Agente PRF", "price": 149.90, "currency": "brl"},
    2: {"name": "GCM Mairiporã", "price": 69.90, "currency": "brl"},
    3: {"name": "SD-PMSP", "price": 89.90, "currency": "brl"}
}

# Request models
class CheckoutRequest(BaseModel):
    course_id: int
    origin_url: str

class PaymentTransaction(BaseModel):
    session_id: str
    course_id: int
    amount: float
    currency: str
    payment_status: str
    metadata: Dict[str, str]

# In-memory storage for demo (in production, use a real database)
payment_transactions = {}

@app.get("/api/")
async def hello():
    return {"message": "ConcursoPrep API - Preparatórios para Concursos de Segurança Pública"}

@app.post("/api/checkout")
async def create_checkout_session(request: CheckoutRequest):
    try:
        # Validate course exists
        if request.course_id not in COURSE_PACKAGES:
            raise HTTPException(status_code=400, detail="Curso inválido")
        
        # Get course details
        course = COURSE_PACKAGES[request.course_id]
        
        # Validate Stripe API key
        if not STRIPE_API_KEY:
            raise HTTPException(status_code=500, detail="Stripe API key não configurada")
        
        # Initialize Stripe checkout
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY)
        
        # Build success and cancel URLs
        success_url = f"{request.origin_url}/success?session_id={{CHECKOUT_SESSION_ID}}"
        cancel_url = f"{request.origin_url}/cancel"
        
        # Create checkout session request
        checkout_request = CheckoutSessionRequest(
            amount=course["price"],
            currency=course["currency"],
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                "course_id": str(request.course_id),
                "course_name": course["name"],
                "source": "concurso_prep_website"
            }
        )
        
        # Create checkout session
        session: CheckoutSessionResponse = await stripe_checkout.create_checkout_session(checkout_request)
        
        # Store transaction record
        payment_transactions[session.session_id] = {
            "session_id": session.session_id,
            "course_id": request.course_id,
            "amount": course["price"],
            "currency": course["currency"],
            "payment_status": "pending",
            "course_name": course["name"],
            "metadata": checkout_request.metadata
        }
        
        return {"url": session.url, "session_id": session.session_id}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar sessão de checkout: {str(e)}")

@app.get("/api/checkout/status/{session_id}")
async def get_checkout_status(session_id: str):
    try:
        # Check if we have this transaction
        if session_id not in payment_transactions:
            raise HTTPException(status_code=404, detail="Transação não encontrada")
        
        # Validate Stripe API key
        if not STRIPE_API_KEY:
            raise HTTPException(status_code=500, detail="Stripe API key não configurada")
        
        # Initialize Stripe checkout
        stripe_checkout = StripeCheckout(api_key=STRIPE_API_KEY)
        
        # Get status from Stripe
        status_response: CheckoutStatusResponse = await stripe_checkout.get_checkout_status(session_id)
        
        # Update our transaction record
        transaction = payment_transactions[session_id]
        transaction["payment_status"] = status_response.payment_status
        transaction["status"] = status_response.status
        
        # Return status information
        return {
            "session_id": session_id,
            "status": status_response.status,
            "payment_status": status_response.payment_status,
            "amount_total": status_response.amount_total,
            "currency": status_response.currency,
            "course_name": transaction.get("course_name"),
            "metadata": status_response.metadata
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao verificar status do pagamento: {str(e)}")

@app.get("/api/courses")
async def get_courses():
    """Get available courses"""
    courses = []
    for course_id, course_info in COURSE_PACKAGES.items():
        courses.append({
            "id": course_id,
            "name": course_info["name"],
            "price": course_info["price"],
            "currency": course_info["currency"]
        })
    return {"courses": courses}

@app.get("/api/transactions")
async def get_transactions():
    """Get all payment transactions (for admin purposes)"""
    return {"transactions": list(payment_transactions.values())}