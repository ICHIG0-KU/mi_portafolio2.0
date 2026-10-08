import { useState, useEffect } from 'react'
import { personalData } from './data/portfolioData'
import './App.css'

function App() {
  const [likes, setLikes] = useState(0)
  const [filtro, setFiltro] = useState('Todos')
  
  // ESTADO PARA EL TEMA (Oscuro por defecto)
  const [darkMode, setDarkMode] = useState(true)

  // Sincroniza el atributo data-theme en el HTML cada vez que cambia el estado
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const proyectosFiltrados = filtro === 'Todos'
    ? personalData.proyectos
    : personalData.proyectos.filter(p => p.categoria === filtro || p.tecnologias.includes(filtro))

  const categorias = ['Todos', 'React', 'Python', 'Arquitectura']

  return (
    <div className="portfolio-container">
      {/* NAVBAR CON BOTÓN DE TEMA */}
      <header className="navbar">
        <div className="nav-brand">&lt;{personalData.nombre.split(' ')[0]} /&gt;</div>
        
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#experiencia">Trayectoria</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#contacto">Contacto</a>

          {/* BOTÓN MODO CLARO / OSCURO */}
          <button 
            type="button" 
            className="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? ' Claro' : ' Oscuro'}
          </button>
        </nav>
      </header>

      {/* HERO SECTION / PRESENTACIÓN */}
      <section id="sobre-mi" className="hero-section">
        <div className="hero-content">
          <span className="badge-status">🟢 Disponible para proyectos & prácticas</span>
          <h1 className="hero-title">{personalData.nombre}</h1>
          <h2 className="hero-subtitle">
            {personalData.carrera} <span>• {personalData.universidad}</span>
          </h2>
          <p className="hero-description">{personalData.presentacion}</p>

          {/* MÉTRICAS DESTACADAS */}
          <div className="stats-container">
            {personalData.stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <h4>{stat.value}</h4>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* HABILIDADES */}
          <div className="skills-container">
            <h3>Habilidades Técnicas</h3>
            <div className="skills-grid">
              {personalData.habilidades.map((skill, index) => (
                <span key={index} className="skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-actions">
            <a href="#proyectos" className="btn-primary">Explorar Proyectos</a>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => setLikes((prev) => prev + 1)}
            >
              🎓 Valorar Portafolio ({likes})
            </button>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE EDUCACIÓN / TIMELINE */}
      <section id="experiencia" className="section-container">
        <h2 className="section-title">Educación & Trayectoria</h2>
        <p className="section-subtitle">Mi camino académico y aprendizaje continuo</p>

        <div className="timeline">
          {personalData.educacion.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">{item.periodo}</span>
                <h3>{item.titulo}</h3>
                <h4>{item.institucion}</h4>
                <p>{item.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE PROYECTOS CON FILTROS */}
      <section id="proyectos" className="section-container">
        <h2 className="section-title">Proyectos Destacados</h2>
        <p className="section-subtitle">Filtra por categoría para explorar mis trabajos</p>

        {/* BOTONES DE FILTRO */}
        <div className="filter-container">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filtro === cat ? 'active' : ''}`}
              onClick={() => setFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {proyectosFiltrados.map((proyecto) => (
            <article key={proyecto.id} className="project-card">
              <div className="card-header">
                <span className="card-tag">{proyecto.materia}</span>
              </div>
              <h3 className="card-title">{proyecto.titulo}</h3>
              <p className="card-description">{proyecto.descripcion}</p>
              
              <div className="card-techs">
                {proyecto.tecnologias.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>

              <a 
                href={proyecto.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="card-link"
              >
                Ver Repositorio &rarr;
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* SECCIÓN DE CONTACTO */}
      <section id="contacto" className="section-container contact-section">
        <h2 className="section-title">¿Hablamos?</h2>
        <p className="section-subtitle">Puedes escribirme o contactarme por mis redes profesionales</p>

        <div className="contact-links">
          <a href={personalData.contacto.github} target="_blank" rel="noopener noreferrer" className="contact-card">
            <span className="contact-icon">💻</span>
            <div>
              <strong>GitHub</strong>
              <p>Revisa mis repositorios</p>
            </div>
          </a>

          <a href={personalData.contacto.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card">
            <span className="contact-icon">💼</span>
            <div>
              <strong>LinkedIn</strong>
              <p>Conectemos en red</p>
            </div>
          </a>

          <a href={`mailto:${personalData.contacto.email}`} className="contact-card">
            <span className="contact-icon">✉️</span>
            <div>
              <strong>Correo Institucional</strong>
              <p>{personalData.contacto.email}</p>
            </div>
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} {personalData.nombre} — Desarrollado con React & Vite</p>
      </footer>
    </div>
  )
}

export default App