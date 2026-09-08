import React, { useState, useEffect } from 'react'
import { FaUsers, FaDumbbell, FaBell, FaTrash } from 'react-icons/fa'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import './Admin.css'

function Admin() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const [exercices, setExercices] = useState([])
  const [onglet, setOnglet] = useState('utilisateurs')
  const [message, setMessage] = useState('')
  const [nomExercice, setNomExercice] = useState('')
  const [categorieExercice, setCategorieExercice] = useState('')
  const [succes, setSucces] = useState('')

  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchUtilisateurs()
    fetchExercices()
  }, [])

  const fetchUtilisateurs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/utilisateurs', {
        headers: { Authorization: token }
      })
      setUtilisateurs(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchExercices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/exercices', {
        headers: { Authorization: token }
      })
      setExercices(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const supprimerUtilisateur = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/utilisateurs/${id}`, {
        headers: { Authorization: token }
      })
      fetchUtilisateurs()
    } catch (err) {
      console.log(err)
    }
  }

  const ajouterExercice = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/admin/exercices', {
        nom: nomExercice,
        categorie: categorieExercice
      }, {
        headers: { Authorization: token }
      })
      setNomExercice('')
      setCategorieExercice('')
      setSucces('Exercice ajouté ✅')
      setTimeout(() => setSucces(''), 3000)
      fetchExercices()
    } catch (err) {
      console.log(err)
    }
  }

  const supprimerExercice = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/exercices/${id}`, {
        headers: { Authorization: token }
      })
      fetchExercices()
    } catch (err) {
      console.log(err)
    }
  }

  const envoyerNotification = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/admin/notifications', {
        message
      }, {
        headers: { Authorization: token }
      })
      setMessage('')
      setSucces('Notification envoyée à tous les utilisateurs ✅')
      setTimeout(() => setSucces(''), 3000)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='admin-wrapper'>
      <Sidebar />
      <div className='admin-main'>
        <div className='admin-topbar'>
          <div className='topbar-titre'>PANEL ADMIN</div>
        </div>

        <div className='admin-contenu'>
          <div className='admin-stats'>
            <div className='admin-stat-carte'>
              <div className='admin-stat-icone rouge'><FaUsers /></div>
              <div className='admin-stat-info'>
                <span className='admin-stat-val'>{utilisateurs.length}</span>
                <span className='admin-stat-lbl'>Utilisateurs</span>
              </div>
            </div>
            <div className='admin-stat-carte'>
              <div className='admin-stat-icone bleu'><FaDumbbell /></div>
              <div className='admin-stat-info'>
                <span className='admin-stat-val'>{exercices.length}</span>
                <span className='admin-stat-lbl'>Exercices</span>
              </div>
            </div>
          </div>

          <div className='admin-onglets'>
            <button
              className={`onglet ${onglet === 'utilisateurs' ? 'actif' : ''}`}
              onClick={() => setOnglet('utilisateurs')}
            >
              <FaUsers /> Utilisateurs
            </button>
            <button
              className={`onglet ${onglet === 'exercices' ? 'actif' : ''}`}
              onClick={() => setOnglet('exercices')}
            >
              <FaDumbbell /> Exercices
            </button>
            <button
              className={`onglet ${onglet === 'notifications' ? 'actif' : ''}`}
              onClick={() => setOnglet('notifications')}
            >
              <FaBell /> Notifications
            </button>
          </div>

          {succes && <div className='alerte-succes'>{succes}</div>}

          {onglet === 'utilisateurs' && (
            <div className='admin-section'>
              <h2>GESTION DES UTILISATEURS</h2>
              <div className='table-container'>
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Email</th>
                      <th>Sport</th>
                      <th>Objectif</th>
                      <th>Rôle</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {utilisateurs.map(u => (
                      <tr key={u._id}>
                        <td>{u.nom}</td>
                        <td>{u.email}</td>
                        <td>{u.typeSport || '—'}</td>
                        <td>{u.objectif || '—'}</td>
                        <td>
                          <span className={`role-badge ${u.role}`}>{u.role}</span>
                        </td>
                        <td>
                          <button className='btn-supprimer' onClick={() => supprimerUtilisateur(u._id)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {onglet === 'exercices' && (
            <div className='admin-section'>
              <h2>GESTION DES EXERCICES</h2>
              <form onSubmit={ajouterExercice} className='admin-form'>
                <div className='champ'>
                  <label>Nom de l'exercice</label>
                  <input
                    type='text'
                    placeholder='Ex: Développé couché'
                    value={nomExercice}
                    onChange={(e) => setNomExercice(e.target.value)}
                    required
                  />
                </div>
                <div className='champ'>
                  <label>Catégorie</label>
                  <select value={categorieExercice} onChange={(e) => setCategorieExercice(e.target.value)} required>
                    <option value=''>Choisir...</option>
                    <option value='poitrine'>Poitrine</option>
                    <option value='dos'>Dos</option>
                    <option value='jambes'>Jambes</option>
                    <option value='epaules'>Épaules</option>
                    <option value='bras'>Bras</option>
                    <option value='cardio'>Cardio</option>
                    <option value='abdominaux'>Abdominaux</option>
                  </select>
                </div>
                <button type='submit' className='btn-ajouter-admin'>+ AJOUTER</button>
              </form>

              <div className='table-container'>
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Catégorie</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercices.map(ex => (
                      <tr key={ex._id}>
                        <td>{ex.nom}</td>
                        <td><span className='categorie-badge'>{ex.categorie}</span></td>
                        <td>
                          <button className='btn-supprimer' onClick={() => supprimerExercice(ex._id)}>
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {onglet === 'notifications' && (
            <div className='admin-section'>
              <h2>ENVOYER UNE NOTIFICATION</h2>
              <form onSubmit={envoyerNotification} className='admin-form'>
                <div className='champ'>
                  <label>Message</label>
                  <textarea
                    placeholder='Ex: Nouvelle séance disponible !'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                  />
                </div>
                <button type='submit' className='btn-ajouter-admin'>
                  <FaBell /> ENVOYER À TOUS
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin