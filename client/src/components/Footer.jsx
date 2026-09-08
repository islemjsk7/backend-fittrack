import React, { useState } from 'react'
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import './Footer.css'

function Footer() {
  const [email, setEmail] = useState('')
  const [inscrit, setInscrit] = useState(false)

  const handleInscription = (e) => {
    e.preventDefault()
    if (email) {
      setInscrit(true)
      setEmail('')
    }
  }

  return (
    <footer className='footer'>
      <div className='footer-avantages'>
        <div className='avantage-item'>
          <div className='avantage-icone'>
            <FaPhone />
          </div>
          <div className='avantage-info'>
            <div className='avantage-titre'>LIVRAISON RAPIDE</div>
            <div className='avantage-desc'>Expédition sous 24h à 48h</div>
          </div>
        </div>
        <div className='avantage-item'>
          <div className='avantage-icone'>
            <FaMapMarkerAlt />
          </div>
          <div className='avantage-info'>
            <div className='avantage-titre'>PAIEMENT À LA LIVRAISON</div>
            <div className='avantage-desc'>Payez en espèces à la réception</div>
          </div>
        </div>
        <div className='avantage-item'>
          <div className='avantage-icone'>
            <FaEnvelope />
          </div>
          <div className='avantage-info'>
            <div className='avantage-titre'>SUPPORT 24/7</div>
            <div className='avantage-desc'>Notre équipe répond sous 24h</div>
          </div>
        </div>
      </div>

      <div className='footer-corps'>
        <div className='footer-colonne'>
          <div className='footer-logo'>
            <span className='logo-fit'>FIT</span>
            <span className='logo-track'>TRACK</span>
          </div>
          <p className='footer-desc'>
            La plateforme sportive algérienne pour suivre tes entraînements, progresser et atteindre tes objectifs.
          </p>
          <div className='footer-social'>
            <a href='#' className='social-btn'><FaFacebook /></a>
            <a href='#' className='social-btn'><FaInstagram /></a>
            <a href='#' className='social-btn'><FaYoutube /></a>
            <a href='#' className='social-btn'><FaTwitter /></a>
          </div>
        </div>

        <div className='footer-colonne'>
          <h4>FITTRACK</h4>
          <ul>
            <li><a href='#'>Notre histoire</a></li>
            <li><a href='#'>Nos produits</a></li>
            <li><a href='#'>Nos programmes</a></li>
            <li><a href='#'>Nos coachs</a></li>
            <li><a href='#'>Blog & Conseils</a></li>
          </ul>
        </div>

        <div className='footer-colonne'>
          <h4>AIDE & CONTACT</h4>
          <ul>
            <li><a href='#'>FAQ</a></li>
            <li><a href='#'>Nous contacter</a></li>
            <li><a href='#'>Suivi de commande</a></li>
            <li><a href='#'>Politique de retour</a></li>
            <li><a href='#'>Réclamations</a></li>
          </ul>
        </div>

        <div className='footer-colonne'>
          <h4>CONTACT DIRECT</h4>
          <div className='contact-item'>
            <FaPhone className='contact-icone' />
            <span>+213 566 66 66 66</span>
          </div>
          <div className='contact-item'>
            <FaEnvelope className='contact-icone' />
            <span>contact@fittrack.dz</span>
          </div>
          <div className='contact-item'>
            <FaMapMarkerAlt className='contact-icone' />
            <span>Alger, Algérie</span>
          </div>
        </div>

        <div className='footer-colonne'>
          <h4>REJOIGNEZ-NOUS</h4>
          <p className='newsletter-desc'>Recevez nos offres et conseils sportifs directement dans votre boite mail.</p>
          {inscrit ? (
            <div className='inscription-succes'>Merci ! Vous êtes bien inscrit.</div>
          ) : (
            <form onSubmit={handleInscription} className='newsletter-form'>
              <input
                type='email'
                placeholder='Votre e-mail'
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button type='submit'>S'INSCRIRE</button>
            </form>
          )}
        </div>
      </div>

      <div className='footer-bas'>
        <div className='footer-copy'>
          © 2026 FitTrack. Tous droits réservés.
        </div>
        <div className='footer-liens-bas'>
          <a href='#'>CGV</a>
          <a href='#'>Politique de confidentialité</a>
          <a href='#'>Mentions légales</a>
        </div>
        <div className='footer-paiement'>
          <span className='paiement-badge'>Visa</span>
          <span className='paiement-badge'>Mastercard</span>
          <span className='paiement-badge'>CIB</span>
          <span className='paiement-badge'>Cash</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer