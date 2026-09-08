import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import gymBg from '../assets/gym.jpg'
import './Inscription.css'

function Inscription() {
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [typeSport, setTypeSport] = useState('')
  const [objectif, setObjectif] = useState('')
  const [erreur, setErreur] = useState('')
  const navigate = useNavigate()

  const handleInscription = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/auth/inscription', {
        nom,
        email,
        motDePasse,
        typeSport,
        objectif
      })
      navigate('/connexion')
    } catch (err) {
      setErreur('Email déjà utilisé ou erreur serveur')
    }
  }

  return (
    <div className='inscription-container'>
      <img src={gymBg} alt='background' className='inscription-bg' />
      <div className='inscription-overlay'></div>
      <div className='inscription-box'>
        <div className='inscription-logo'>
          <span className='logo-fit'>Fit</span>
          <span className='logo-track'>Track</span>
        </div>
        <h2>Créer un compte </h2>
        <p className='sous-titre'>Commence ton parcours sportif</p>

        {erreur && <div className='erreur'>{erreur}</div>}

        <form onSubmit={handleInscription}>
          <div className='champ'>
            <label>Nom complet</label>
            <input
              type='text'
              placeholder='Ton nom'
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
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
          <div className='champ'>
            <label>Type de sport</label>
            <select value={typeSport} onChange={(e) => setTypeSport(e.target.value)} required>
              <option value=''>Choisir...</option>
              <option value='musculation'>Musculation</option>
              <option value='course'>Course à pied</option>
              <option value='natation'>Natation</option>
              <option value='cyclisme'>Cyclisme</option>
              <option value='arts-martiaux'>Arts martiaux</option>
              <option value='autre'>Autre</option>
            </select>
          </div>
          <div className='champ'>
            <label>Objectif</label>
            <select value={objectif} onChange={(e) => setObjectif(e.target.value)} required>
              <option value=''>Choisir...</option>
              <option value='prise-de-masse'>Prise de masse</option>
              <option value='perte-de-poids'>Perte de poids</option>
              <option value='endurance'>Endurance</option>
              <option value='force'>Force</option>
              <option value='sante'>Santé générale</option>
            </select>
          </div>
          <button type='submit' className='btn-inscription'>Créer mon compte</button>
        </form>

        <p className='lien-connexion'>
          Déjà un compte ? <Link to='/connexion'>Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

export default Inscription