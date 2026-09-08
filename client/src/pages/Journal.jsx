import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus, FaTrash, FaSave } from 'react-icons/fa'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import './Journal.css'

function Journal() {
  const [duree, setDuree] = useState('')
  const [notes, setNotes] = useState('')
  const [exercices, setExercices] = useState([
    { nom: '', series: '', reps: '', poids: '' }
  ])
  const [succes, setSucces] = useState('')
  const [erreur, setErreur] = useState('')
  const navigate = useNavigate()

  const ajouterExercice = () => {
    setExercices([...exercices, { nom: '', series: '', reps: '', poids: '' }])
  }

  const supprimerExercice = (index) => {
    setExercices(exercices.filter((_, i) => i !== index))
  }

  const modifierExercice = (index, champ, valeur) => {
    const nouveaux = [...exercices]
    nouveaux[index][champ] = valeur
    setExercices(nouveaux)
  }

  const handleSauvegarder = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:5000/api/seances', {
        duree: parseInt(duree),
        exercices,
        notes
      }, {
        headers: { Authorization: token }
      })
      setSucces('Séance enregistrée avec succès ✅')
      setErreur('')
      setTimeout(() => navigate('/tableau-de-bord'), 1500)
    } catch (err) {
      setErreur('Erreur lors de l\'enregistrement')
      setSucces('')
    }
  }

  return (
    <div className='journal-wrapper'>
      <Sidebar />
      <div className='journal-main'>
        <div className='journal-topbar'>
          <div className='topbar-titre'>JOURNAL D'ENTRAÎNEMENT</div>
        </div>

        <div className='journal-contenu'>
          {succes && <div className='alerte-succes'>{succes}</div>}
          {erreur && <div className='alerte-erreur'>{erreur}</div>}

          <form onSubmit={handleSauvegarder}>
            <div className='journal-section'>
              <h2>Informations de la séance</h2>
              <div className='form-row'>
                <div className='champ'>
                  <label>Durée (minutes)</label>
                  <input
                    type='number'
                    placeholder='Ex: 60'
                    value={duree}
                    onChange={(e) => setDuree(e.target.value)}
                    required
                  />
                </div>
                <div className='champ'>
                  <label>Notes</label>
                  <input
                    type='text'
                    placeholder='Ex: Bonne séance, progression...'
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className='journal-section'>
              <div className='section-header'>
                <h2>Exercices</h2>
                <button type='button' className='btn-ajouter-ex' onClick={ajouterExercice}>
                  <FaPlus /> Ajouter un exercice
                </button>
              </div>

              {exercices.map((ex, index) => (
                <div key={index} className='exercice-carte'>
                  <div className='exercice-numero'>Exercice {index + 1}</div>
                  <div className='exercice-grid'>
                    <div className='champ'>
                      <label>Nom</label>
                      <input
                        type='text'
                        placeholder='Ex: Développé couché'
                        value={ex.nom}
                        onChange={(e) => modifierExercice(index, 'nom', e.target.value)}
                        required
                      />
                    </div>
                    <div className='champ'>
                      <label>Séries</label>
                      <input
                        type='number'
                        placeholder='Ex: 4'
                        value={ex.series}
                        onChange={(e) => modifierExercice(index, 'series', e.target.value)}
                      />
                    </div>
                    <div className='champ'>
                      <label>Répétitions</label>
                      <input
                        type='number'
                        placeholder='Ex: 10'
                        value={ex.reps}
                        onChange={(e) => modifierExercice(index, 'reps', e.target.value)}
                      />
                    </div>
                    <div className='champ'>
                      <label>Poids (kg)</label>
                      <input
                        type='number'
                        placeholder='Ex: 80'
                        value={ex.poids}
                        onChange={(e) => modifierExercice(index, 'poids', e.target.value)}
                      />
                    </div>
                  </div>
                  {exercices.length > 1 && (
                    <button
                      type='button'
                      className='btn-supprimer-ex'
                      onClick={() => supprimerExercice(index)}
                    >
                      <FaTrash /> Supprimer
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button type='submit' className='btn-sauvegarder'>
              <FaSave /> ENREGISTRER LA SÉANCE
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Journal