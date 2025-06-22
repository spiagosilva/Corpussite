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
      title: "Concursos Federais Premium",
      description: "Preparação completa para concursos federais com videoaulas, simulados e material em PDF",
      price: 299.99,
      duration: "12 meses de acesso",
      features: [
        "500+ videoaulas exclusivas",
        "Simulados semanais",
        "Material PDF atualizado",
        "Suporte direto com professores",
        "Garantia de 30 dias"
      ],
      image: "https://images.pexels.com/photos/32668039/pexels-photo-32668039.jpeg"
    },
    {
      id: 2,
      title: "Tribunais e Judiciário",
      description: "Especialização em concursos para tribunais e área judiciária",
      price: 249.99,
      duration: "10 meses de acesso",
      features: [
        "300+ videoaulas focadas",
        "Casos práticos reais",
        "Jurisprudência atualizada",
        "Mentoria individual",
        "Certificado de conclusão"
      ],
      image: "https://images.pexels.com/photos/10638082/pexels-photo-10638082.jpeg"
    },
    {
      id: 3,
      title: "Preparação Intensiva",
      description: "Curso intensivo para quem tem pressa de passar no concurso dos sonhos",
      price: 399.99,
      duration: "6 meses de acesso",
      features: [
        "Cronograma acelerado",
        "Aulas ao vivo diárias",
        "Correção de redações",
        "Plantão de dúvidas 24h",
        "Grupos de estudo VIP"
      ],
      image: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg"
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
      role: "Aprovada - TRT 15ª Região",
      text: "Graças ao curso consegui minha aprovação em 6 meses. O material é excelente e os professores são muito didáticos.",
      avatar: "👩‍💼"
    },
    {
      name: "Carlos Santos",
      role: "Aprovado - Receita Federal",
      text: "A metodologia do curso é diferenciada. Os simulados me prepararam perfeitamente para a prova real.",
      avatar: "👨‍💼"
    },
    {
      name: "Maria Oliveira",
      role: "Aprovada - TJ-SP",
      text: "Recomendo para todos que querem uma preparação séria e eficiente. Valeu cada centavo investido.",
      avatar: "👩‍⚖️"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-900">ConcursoPrep</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#courses" className="text-gray-600 hover:text-blue-600">Cursos</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600">Sobre</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Depoimentos</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">
                Sua Aprovação no Concurso Público Começa Aqui
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Prepare-se com os melhores professores e materiais atualizados. 
                Metodologia comprovada com milhares de aprovados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#courses" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
                  Ver Cursos
                </a>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
                  Teste Gratuito
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/32668039/pexels-photo-32668039.jpeg" 
                alt="Estudante preparando-se para concursos"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">15.000+</div>
              <div className="text-gray-600">Alunos Aprovados</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Taxa de Satisfação</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Horas de Conteúdo</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Suporte Disponível</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              Nossos Cursos Preparatórios
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Escolha o curso ideal para sua carreira pública. Metodologia testada e aprovada por milhares de concurseiros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h4>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      R$ {course.price.toFixed(2).replace('.', ',')}
                    </div>
                    <div className="text-sm text-gray-500">{course.duration}</div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handleCheckout(course)}
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">
              O Que Nossos Alunos Dizem
            </h3>
            <p className="text-xl text-gray-600">
              Histórias reais de aprovação e sucesso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="text-4xl mb-4 text-center">{testimonial.avatar}</div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="text-center">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-blue-600">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold mb-4">
            Pronto Para Conquistar Sua Vaga?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Junte-se a milhares de aprovados e comece sua jornada rumo à estabilidade no serviço público.
          </p>
          <a href="#courses" className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
            Escolher Meu Curso
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">ConcursoPrep</h4>
              <p className="text-gray-400">
                Sua plataforma de preparação para concursos públicos com metodologia comprovada.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Cursos</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Concursos Federais</li>
                <li>Tribunais</li>
                <li>Preparação Intensiva</li>
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
                <li>contato@concursoprep.com</li>
                <li>(11) 9999-9999</li>
                <li>WhatsApp: (11) 9999-9999</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ConcursoPrep. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;