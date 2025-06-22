import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const App = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Agente PRF",
      description: "Preparação completa para o concurso da Polícia Rodoviária Federal com videoaulas, simulados e material em PDF",
      price: 149.90,
      duration: "12 meses de acesso",
      features: [
        "300+ videoaulas exclusivas",
        "Simulados semanais",
        "Material PDF atualizado",
        "Suporte direto com professores",
        "Garantia de 30 dias"
      ],
      image: "https://images.pexels.com/photos/6105483/pexels-photo-6105483.jpeg"
    },
    {
      id: 2,
      title: "GCM Mairiporã",
      description: "Especialização em concurso para Guarda Civil Municipal de Mairiporã",
      price: 69.90,
      duration: "8 meses de acesso",
      features: [
        "200+ videoaulas focadas",
        "Casos práticos reais",
        "Legislação atualizada",
        "Mentoria individual",
        "Certificado de conclusão"
      ],
      image: "https://images.pexels.com/photos/32622315/pexels-photo-32622315.jpeg"
    },
    {
      id: 3,
      title: "SD-PMSP",
      description: "Curso completo para Soldado da Polícia Militar de São Paulo",
      price: 89.90,
      duration: "10 meses de acesso",
      features: [
        "250+ videoaulas especializadas",
        "Treinamento físico incluso",
        "Correção de redações",
        "Plantão de dúvidas 24h",
        "Grupos de estudo VIP"
      ],
      image: "https://images.pexels.com/photos/32622317/pexels-photo-32622317.jpeg"
    }
  ];

  const handleCheckout = async (course) => {
    setIsLoading(true);
    try {
      const originUrl = window.location.origin;
      
      const response = await axios.post(`${API}/checkout`, {
        course_id: course.id,
        origin_url: originUrl
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Erro ao processar checkout:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const testimonials = [
    {
      name: "Ana Silva",
      role: "Aprovada - PRF",
      text: "Graças ao curso consegui minha aprovação em 6 meses. O material é excelente e os professores são muito didáticos.",
      avatar: "👩‍✈️"
    },
    {
      name: "Carlos Santos",
      role: "Aprovado - PMSP",
      text: "A metodologia do curso é diferenciada. Os simulados me prepararam perfeitamente para a prova real.",
      avatar: "👨‍✈️"
    },
    {
      name: "Maria Oliveira",
      role: "Aprovada - GCM",
      text: "Recomendo para todos que querem uma preparação séria e eficiente. Valeu cada centavo investido.",
      avatar: "👩‍🚒"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">CORPUS Preparatório</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#courses" className="text-gray-300 hover:text-white">Cursos</a>
              <a href="#about" className="text-gray-300 hover:text-white">Sobre</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white">Depoimentos</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">
                Sua Aprovação no Concurso Público Começa Aqui
              </h2>
              <p className="text-xl mb-8 text-gray-300">
                Prepare-se com os melhores professores e materiais atualizados. 
                Metodologia comprovada com milhares de aprovados. Todo tipo de material, sem mensalidades!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#courses" className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center">
                  Ver Cursos
                </a>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                  Baixe AQUI o Raio X da Polícia Federal
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1639069431794-8b42626f9711?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHx0YWN0aWNhbCUyMHBvbGljZXxlbnwwfHx8fDE3NTA2Mjk5MjR8MA&ixlib=rb-4.1.0&q=85" 
                alt="Operador de Guerra"
                className="w-full rounded-lg shadow-2xl opacity-20"
              />
              
              {/* Features Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {/* Texto promocional */}
                  <div className="mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-black uppercase tracking-wide mb-2 bg-white/90 backdrop-blur-sm rounded-lg py-3 px-6 border border-white">
                      Veja nossos diferenciais: TUDO, por um preço único e acessível!
                    </h3>
                  </div>
                  
                  {/* Cards dos diferenciais */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Simulados */}
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
                      <div className="text-6xl mb-3">📔</div>
                      <p className="text-white font-semibold text-lg">Simulados baseados na Banca</p>
                    </div>
                    
                    {/* Vídeo-aulas */}
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
                      <div className="text-6xl mb-3">▶️</div>
                      <p className="text-white font-semibold text-lg">Vídeo-aulas completas</p>
                    </div>
                    
                    {/* Mapas Mentais */}
                    <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 border border-gray-600">
                      <div className="text-6xl mb-3">🧠</div>
                      <p className="text-white font-semibold text-lg">Mapas mentais</p>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">15.000+</div>
              <div className="text-gray-300">Alunos Aprovados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-gray-300">Taxa de Satisfação</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-gray-300">Horas de Conteúdo</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-gray-300">Suporte Disponível</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Nossos Cursos Preparatórios
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Escolha o curso ideal para sua carreira pública. Metodologia testada e aprovada por milhares de concurseiros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-700">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2">{course.title}</h4>
                  <p className="text-gray-300 mb-4">{course.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-white mb-1">
                      R$ {course.price.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-sm text-gray-400">{course.duration}</div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-300">
                        <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleCheckout(course)}
                    disabled={isLoading}
                    className="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processando...' : 'Comprar Agora'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              O Que Nossos Alunos Dizem
            </h3>
            <p className="text-xl text-gray-300">
              Histórias reais de aprovação e sucesso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4 text-center">{testimonial.avatar}</div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div className="text-center">
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-white">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-4">
            Pronto Para Conquistar Sua Vaga?
          </h3>
          <p className="text-xl mb-8 text-gray-300">
            Junte-se a milhares de aprovados e comece sua jornada rumo à estabilidade no serviço público.
          </p>
          <a href="#courses" className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors inline-block">
            Escolher Meu Curso
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">CORPUS Preparatório</h4>
              <p className="text-gray-400">
                Sua plataforma de preparação para concursos públicos com metodologia comprovada.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Cursos</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Agente PRF</li>
                <li>GCM Mairiporã</li>
                <li>SD-PMSP</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Suporte</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Central de Ajuda</li>
                <li>FAQ</li>
                <li>Contato</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contato</h5>
              <ul className="space-y-2 text-gray-400">
                <li>contato@corpuspreparatorio.com</li>
                <li>(11) 9999-9999</li>
                <li>WhatsApp: (11) 9999-9999</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CORPUS Preparatório. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;