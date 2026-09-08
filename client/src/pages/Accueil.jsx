import React from 'react'
import { useNavigate } from 'react-router-dom'
import gymBg from '../assets/gym.jpg'
import './Accueil.css'

function Accueil() {
  const navigate = useNavigate()

  return (
    // Remplacement de la div principale par <main> pour la sémantique
    <main className='accueil-container'>
      {/* Optimisation SEO : l'image de fond est en aria-hidden car elle est purement décorative */}
      <img src={gymBg} alt='' aria-hidden="true" className='accueil-bg' />
      <div className='accueil-overlay'></div>

      <div className='accueil-contenu'>
        {/* Changement en <header> pour le bloc du haut */}
        <header className='accueil-header'>
          <div className='accueil-logo'>
            <span className='logo-fit'>Fit</span>
            <span className='logo-track'>Track</span>
          </div>
        </header>

        {/* Section centrale : le cœur de la landing page */}
        <section className='accueil-hero'>
          <h1 className='accueil-titre'>
            Suis tes progrès.<br />
            <span className='titre-rouge'>Dépasse tes limites.</span>
          </h1>

          <p className='accueil-description'>
            La plateforme intelligente pour suivre tes entraînements,
            visualiser ta progression et atteindre tes objectifs sportifs.
          </p>

          <div className='accueil-btns'>
            {/* Bouton Principal (CTA) : Doit être mis en valeur dans le CSS */}
            <button className='btn-commencer' onClick={() => navigate('/inscription')}>
              Commencer gratuitement
            </button>
            {/* Bouton Secondaire : Plus discret (style outline/text-only) */}
            <button className='btn-connexion' onClick={() => navigate('/connexion')}>
              Se connecter
            </button>
          </div>
        </section>

        {/* Section Statistiques / Bénéfices */}
        <section className='accueil-stats' aria-label="Statistiques clés">
          <div className='stat'>
            <span className='stat-nombre'>500+</span>
            <span className='stat-label'>Exercices</span>
          </div>
          <div className='stat-divider' role="separator"></div>
          <div className='stat'>
            <span className='stat-nombre'>100%</span>
            <span className='stat-label'>Personnalisé</span>
          </div>
          <div className='stat-divider' role="separator"></div>
          <div className='stat'>
            <span className='stat-nombre'>24/7</span>
            <span className='stat-label'>Disponible</span>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Accueil