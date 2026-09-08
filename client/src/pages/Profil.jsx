import React, { useState, useEffect } from 'react'
import { FaSave, FaDumbbell, FaFire, FaClock } from 'react-icons/fa'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import './Profil.css'

function Profil() {
  const [utilisateur, setUtilisateur] = useState(null)
  const [nom, setNom] = useState('')
  const [typeSport, setTypeSport] = useState('')
  const [objectif, setObjectif] = useState('')
  const [age, setAge] = useState('')
  const [poids, setPoids] = useState('')
  const [taille, setTaille] = useState('')
  const [genre, setGenre] = useState('')
  const [seances, setSeances] = useState([])
  const [succes, setSucces] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('utilisateur'))
    setUtilisateur(user)
    setNom(user?.nom || '')
    setTypeSport(user?.typeSport || '')
    setObjectif(user?.objectif || '')
    setAge(user?.age || '')
    setPoids(user?.poids || '')
    setTaille(user?.taille || '')
    setGenre(user?.genre || '')

    const fetchSeances = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:5000/api/seances', {
          headers: { Authorization: token }
        })
        setSeances(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchSeances()
  }, [])

  const totalDuree = seances.reduce((acc, s) => acc + s.duree, 0)
  const totalExercices = seances.reduce((acc, s) => acc + s.exercices.length, 0)

  const handleSauvegarder = (e) => {
    e.preventDefault()
    const updatedUser = { ...utilisateur, nom, typeSport, objectif, age, poids, taille, genre }
    localStorage.setItem('utilisateur', JSON.stringify(updatedUser))
    setSucces('Profil mis à jour ✅')
    setTimeout(() => setSucces(''), 3000)
  }

  const getIMC = () => {
    if (poids && taille) {
      const imc = (poids / ((taille / 100) ** 2)).toFixed(1)
      return imc
    }
    return '—'
  }

  const getImcLabel = () => {
    const imc = parseFloat(getIMC())
    if (!imc) return ''
    if (imc < 18.5) return 'Insuffisance pondérale'
    if (imc < 25) return 'Poids normal ✅'
    if (imc < 30) return 'Surpoids'
    return 'Obésité'
  }

  return (
    <div className='profil-wrapper'>
      <Sidebar />
      <div className='profil-main'>
        <div className='profil-topbar'>
          <div className='topbar-titre'>PROFIL</div>
        </div>

        <div className='profil-contenu'>
          <div className='profil-grid'>
            <div className='profil-gauche'>
              <div className='profil-carte-avatar'>
                <div className='profil-avatar'>
                  {utilisateur?.nom?.charAt(0).toUpperCase()}
                </div>
                <h2>{utilisateur?.nom}</h2>
                <p>{utilisateur?.email}</p>
                <div className='profil-role'>{utilisateur?.role}</div>
              </div>

              <div className='profil-corps-carte'>
                <h3>DONNÉES CORPORELLES</h3>
                <div className='corps-grid'>
                  <div className='corps-item'>
                    <span className='corps-val'>{age || '—'}</span>
                    <span className='corps-lbl'>Âge</span>
                  </div>
                  <div className='corps-item'>
                    <span className='corps-val'>{poids ? `${poids} kg` : '—'}</span>
                    <span className='corps-lbl'>Poids</span>
                  </div>
                  <div className='corps-item'>
                    <span className='corps-val'>{taille ? `${taille} cm` : '—'}</span>
                    <span className='corps-lbl'>Taille</span>
                  </div>
                  <div className='corps-item'>
                    <span className='corps-val imc'>{getIMC()}</span>
                    <span className='corps-lbl'>IMC</span>
                  </div>
                </div>
                {getIMC() !== '—' && (
                  <div className='imc-label'>{getImcLabel()}</div>
                )}
              </div>

              <div className='profil-stats-carte'>
                <h3>MES STATISTIQUES</h3>
                <div className='profil-stat'>
                  <div className='profil-stat-icone rouge'><FaDumbbell /></div>
                  <div className='profil-stat-info'>
                    <span className='profil-stat-val'>{seances.length}</span>
                    <span className='profil-stat-lbl'>Séances totales</span>
                  </div>
                </div>
                <div className='profil-stat'>
                  <div className='profil-stat-icone orange'><FaFire /></div>
                  <div className='profil-stat-info'>
                    <span className='profil-stat-val'>{totalExercices}</span>
                    <span className='profil-stat-lbl'>Exercices effectués</span>
                  </div>
                </div>
                <div className='profil-stat'>
                  <div className='profil-stat-icone bleu'><FaClock /></div>
                  <div className='profil-stat-info'>
                    <span className='profil-stat-val'>{totalDuree} min</span>
                    <span className='profil-stat-lbl'>Temps total</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='profil-droite'>
              <div className='profil-form-carte'>
                <h3>MODIFIER MON PROFIL</h3>

                {succes && <div className='alerte-succes'>{succes}</div>}

                <form onSubmit={handleSauvegarder}>
                  <div className='form-row'>
                    <div className='champ'>
                      <label>Nom complet</label>
                      <input type='text' value={nom} onChange={(e) => setNom(e.target.value)} />
                    </div>
                    <div className='champ'>
                      <label>Genre</label>
                      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value=''>Choisir...</option>
                        <option value='homme'>Homme</option>
                        <option value='femme'>Femme</option>
                        <option value='autre'>Autre</option>
                      </select>
                    </div>
                  </div>

                  <div className='form-row'>
                    <div className='champ'>
                      <label>Âge</label>
                      <input type='number' placeholder='Ex: 22' value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className='champ'>
                      <label>Poids (kg)</label>
                      <input type='number' placeholder='Ex: 75' value={poids} onChange={(e) => setPoids(e.target.value)} />
                    </div>
                    <div className='champ'>
                      <label>Taille (cm)</label>
                      <input type='number' placeholder='Ex: 175' value={taille} onChange={(e) => setTaille(e.target.value)} />
                    </div>
                  </div>

                  <div className='form-row'>
                    <div className='champ'>
                      <label>Type de sport</label>
                      <select value={typeSport} onChange={(e) => setTypeSport(e.target.value)}>
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
                      <select value={objectif} onChange={(e) => setObjectif(e.target.value)}>
                        <option value=''>Choisir...</option>
                        <option value='prise-de-masse'>Prise de masse</option>
                        <option value='perte-de-poids'>Perte de poids</option>
                        <option value='endurance'>Endurance</option>
                        <option value='force'>Force</option>
                        <option value='sante'>Santé générale</option>
                      </select>
                    </div>
                  </div>

                  <button type='submit' className='btn-sauvegarder'>
                    <FaSave /> SAUVEGARDER
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profil