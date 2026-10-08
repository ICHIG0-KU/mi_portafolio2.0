import { useState, useEffect, useMemo, useCallback } from 'react'
import { personalData } from './data/portfolioData'
import fotoPerfil from './assets/perfil.jpg'
import './App.css'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const CATEGORIAS = ['Todos', 'React', 'Python', 'Arquitectura']

function App() {
  const [likes, setLikes] = useState(0)
  const [filtro, setFiltro] = useState('Todos')
  const [darkMode, setDarkMode] = useState(true)

  // Sincroniza el tema con el atributo data-theme en el documento HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Memoiza el filtrado para evitar recalcularlo en re-renders innecesarios
  const proyectosFiltrados = useMemo(() => {
    if (filtro === 'Todos') return personalData.proyectos
    return personalData.proyectos.filter(
      (p) => p.categoria === filtro || p.tecnologias.includes(filtro)
    )
  }, [filtro])

  // Función memoizada para alternar modo oscuro
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev)
  }, [])

  

  return (
    <div className="portfolio-container">
      {/* BARRA DE NAVEGACIÓN */}
      <header className="navbar">
        <div className="brand">
          <h1></h1>
        </div>

        <nav className="nav-links">
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#experiencia">Trayectoria</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#contacto">Contacto</a>

          {/* BOTÓN MODO CLARO / OSCURO */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleDarkMode}
            aria-label="Cambiar tema"
          >
            {darkMode ? ' Claro' : ' Oscuro'}
          </button>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section id="sobre-mi" className="hero-section">
        <div className="hero-layout">
          {/* INFORMACIÓN PRINCIPAL */}
          <div className="hero-content">
            <span className="badge-status"> Disponible para proyectos & prácticas</span>
            <h1 className="hero-title">{personalData.nombre}</h1>
            <h2 className="hero-subtitle">
              {personalData.carrera} <span>{personalData.universidad}</span>
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
              <a href="#proyectos" className="btn-primary">
                Explorar Proyectos
              </a>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setLikes((prev) => prev + 1)}
              >
                🎓 Valorar Portafolio ({likes})
              </button>
            </div>
          </div>

          {/* FOTO DE PERFIL */}
          <div className="avatar-container">
            <img src={fotoPerfil} alt={`Foto de perfil de ${personalData.nombre}`} className="avatar-img" />
          </div>
        </div>
      </section>

      {/* TRAYECTORIA / EDUCACIÓN */}
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

      {/* PROYECTOS CON FILTRO */}
      <section id="proyectos" className="section-container">
        <h2 className="section-title">Proyectos Destacados</h2>
        <p className="section-subtitle">Filtra por categoría para explorar mis trabajos</p>

        <div className="filter-container">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              type="button"
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
                  <span key={i} className="tech-badge">
                    {tech}
                  </span>
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

      {/* CONTACTO */}
<section id="contacto" className="section-container contact-section">
  <h2 className="section-title">¿Hablamos?</h2>
  <p className="section-subtitle">Puedes escribirme o contactarme por mis redes profesionales</p>

  <div className="contact-links">
    <a
      href={personalData.contacto.github}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-card"
    >
      <FaGithub className="contact-icon" />
      <div>
        <strong>GitHub</strong>
        <p>Revisa mis repositorios</p>
      </div>
    </a>

    <a
      href={personalData.contacto.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="contact-card"
    >
      <FaLinkedin className="contact-icon" />
      <div>
        <strong>LinkedIn</strong>
        <p>Conectemos en red</p>
      </div>
    </a>

    <a href={`mailto:${personalData.contacto.email}`} className="contact-card">
      <FaEnvelope className="contact-icon" />
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