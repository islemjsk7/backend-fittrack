import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import gymBg from '../assets/gym.jpg'
import './Connexion.css'

function Connexion() {
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')
  const navigate = useNavigate()

  const handleConnexion = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/auth/connexion', {
        email,
        motDePasse
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('utilisateur', JSON.stringify(res.data.utilisateur))
      navigate('/tableau-de-bord')
    } catch (err) {
      setErreur('Email ou mot de passe incorrect')
    }
  }

  return (
    <div className='connexion-container'>
      <img src={gymBg} alt='background' className='connexion-bg' />
      <div className='connexion-overlay'></div>
      <div className='connexion-box'>
        <div className='connexion-logo'>
          <span className='logo-fit'>Fit</span>
          <span className='logo-track'>Track</span>
        </div>
        <h2>De retour!</h2>
        <p className='sous-titre'>Connecte-toi à ton compte</p>

        {erreur && <div className='erreur'>{erreur}</div>}

        <form onSubmit={handleConnexion}>
          <div className='champ'>
            <label>Email</label>
            <input
              type='email'
              placeholder='Adresse e-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='champ'>
            <label>Mot de passe</label>
            <input
              type='password'
              placeholder='••••••••'
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
            />
          </div>
          <button type='submit' className='btn-connexion'>Se connecter</button>
        </form>

        <p className='lien-inscription'>
          Pas encore de compte ? <Link to='/inscription'>S'inscrire</Link>
        </p>
      </div>
    </div>
  )
}

export default Connexion