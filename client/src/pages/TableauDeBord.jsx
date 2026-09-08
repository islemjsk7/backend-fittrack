import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FaDumbbell, FaFire, FaClock, FaTrophy, FaPlus, FaBell, FaTimes } from 'react-icons/fa'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import './TableauDeBord.css'

function TableauDeBord() {
  const [seances, setSeances] = useState([])
  const [notifications, setNotifications] = useState([])
  const [showNotifs, setShowNotifs] = useState(false)
  const navigate = useNavigate()
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'))

  const getBonjour = () => {
    const heure = new Date().getHours()
    if (heure < 12) return 'Bonjour'
    if (heure < 18) return 'Bon après-midi'
    return 'Bonsoir'
  }

  const getDate = () => {
    return new Date().toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/')

    const fetchSeances = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/seances', {
          headers: { Authorization: token }
        })
        setSeances(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    const fetchNotifs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notifications', {
          headers: { Authorization: token }
        })
        setNotifications(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchSeances()
    fetchNotifs()
  }, [])

  const totalSeances = seances.length
  const totalDuree = seances.reduce((acc, s) => acc + s.duree, 0)
  const totalExercices = seances.reduce((acc, s) => acc + s.exercices.length, 0)

  const dataGraphique = seances.slice(0, 7).reverse().map((s, i) => ({
    jour: ['L', 'M', 'M', 'J', 'V', 'S', 'D'][i] || `J${i + 1}`,
    duree: s.duree
  }))

  const seancesRecentes = seances.slice(0, 3)

  const getDateRelative = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24))
    if (diff === 0) return "Aujourd'hui"
    if (diff === 1) return 'Hier'
    return `Il y a ${diff} jours`
  }

  const nonLues = notifications.filter(n => !n.lu).length

  const objectifs = [
  { label: 'Séances', pct: Math.min(Math.round((totalSeances / 5) * 100), 100) || 10 },
  { label: 'Durée', pct: Math.min(Math.round((totalDuree / 300) * 100), 100) || 10 },
  { label: 'Exercices', pct: Math.min(Math.round((totalExercices / 20) * 100), 100) || 10 },
]
  return (
    <div className='dashboard-wrapper'>
      <Sidebar />
      <div className='dashboard-main'>

        <div className='dashboard-hero'>
          <img src='https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=300&fit=crop' alt='gym' className='hero-img' />
          <div className='hero-overlay'>
            <div className='hero-tag'>FITTRACK</div>
            <h1>{getBonjour()}, <span>{utilisateur?.nom}</span></h1>
            <p>{getDate()} — Continue sur ta lancée !</p>
          </div>
          <div className='hero-actions'>
            <div className='cloche-container' onClick={() => {
  setShowNotifs(!showNotifs)
  if (!showNotifs) {
    setNotifications(notifications.map(n => ({ ...n, lu: true })))
  }
}}>
  <FaBell className='cloche-icone' />
  {notifications.filter(n => !n.lu).length > 0 && (
    <span className='cloche-badge'>
      {notifications.filter(n => !n.lu).length}
    </span>
  )}
</div>
            <button className='btn-nouvelle-seance' onClick={() => navigate('/journal')}>
              <FaPlus /> NOUVELLE SÉANCE
            </button>
          </div>
        </div>

        {showNotifs && (
          <div className='notifs-dropdown'>
            <div className='notifs-header'>
              <h4>NOTIFICATIONS</h4>
              <FaTimes className='notifs-close' onClick={() => setShowNotifs(false)} />
            </div>
            {notifications.length === 0 ? (
              <p className='notif-vide'>Aucune notification</p>
            ) : (
              notifications.map(n => (
                <div key={n._id} className={`notif-item ${!n.lu ? 'non-lue' : ''}`}>
                  <div className='notif-dot'></div>
                  <span>{n.message}</span>
                </div>
              ))
            )}
          </div>
        )}

        <div className='dashboard-contenu'>
          <div className='stats-grid'>
            <div className='stat-carte rouge'>
              <div className='stat-top'>
                <div className='stat-icone rouge'><FaDumbbell /></div>
                <span className='stat-badge'>+3 ce mois</span>
              </div>
              <span className='stat-nombre'>{totalSeances}</span>
              <span className='stat-label'>Séances totales</span>
            </div>
            <div className='stat-carte orange'>
              <div className='stat-top'>
                <div className='stat-icone orange'><FaFire /></div>
                <span className='stat-badge'>+8 ce mois</span>
              </div>
              <span className='stat-nombre'>{totalExercices}</span>
              <span className='stat-label'>Exercices effectués</span>
            </div>
            <div className='stat-carte bleu'>
              <div className='stat-top'>
                <div className='stat-icone bleu'><FaClock /></div>
                <span className='stat-badge'>+2h ce mois</span>
              </div>
              <span className='stat-nombre'>{totalDuree} min</span>
              <span className='stat-label'>Temps d'entraînement</span>
            </div>
            <div className='stat-carte vert'>
              <div className='stat-top'>
                <div className='stat-icone vert'><FaTrophy /></div>
                <span className='stat-badge'>Record !</span>
              </div>
              <span className='stat-nombre'>{totalSeances > 0 ? `🔥 ${totalSeances}` : '—'}</span>
              <span className='stat-label'>Jours consécutifs</span>
            </div>
          </div>

          <div className='bas-grid'>
            <div className='graphique-carte'>
              <div className='carte-titre'>DURÉE DES SÉANCES <span>7 derniers jours</span></div>
              {seances.length === 0 ? (
                <div className='graphique-vide'>
                  <p>Aucune séance enregistrée</p>
                  <button className='btn-ajouter' onClick={() => navigate('/journal')}>
                    + AJOUTER UNE SÉANCE
                  </button>
                </div>
              ) : (
                <ResponsiveContainer width='100%' height={160}>
                  <BarChart data={dataGraphique} barSize={20}>
                    <CartesianGrid strokeDasharray='3 3' stroke='#222' vertical={false} />
                    <XAxis dataKey='jour' stroke='#444' tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis stroke='#444' tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: '#1A1A1A', border: '1px solid #C1121F', borderRadius: '8px', fontSize: '11px' }}
                      labelStyle={{ color: '#fff' }}
                      cursor={{ fill: 'rgba(193,18,31,0.08)' }}
                    />
                    <Bar dataKey='duree' fill='#C1121F' radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className='recentes-carte'>
              <div className='carte-titre'>SÉANCES RÉCENTES</div>
              {seancesRecentes.length === 0 ? (
                <p className='vide-txt'>Aucune séance</p>
              ) : (
                seancesRecentes.map(s => (
                  <div key={s._id} className='seance-item'>
                    <div className='seance-dot'></div>
                    <div className='seance-info'>
                      <div className='seance-nom'>{s.exercices[0]?.nom || 'Séance'}</div>
                      <div className='seance-date'>{getDateRelative(s.date)}</div>
                    </div>
                    <div className='seance-duree'>{s.duree} min</div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className='bas-grid'>
            <div className='objectifs-carte'>
  <div className='carte-titre'>OBJECTIFS DE LA SEMAINE</div>
  {objectifs.map((obj, i) => (
    <div key={i} className='obj-item'>
      <span className='obj-label'>{obj.label}</span>
      <div className='obj-bar-bg'>
        <div className='obj-bar' style={{ width: `${obj.pct}%` }}></div>
      </div>
      <span className='obj-pct'>{obj.pct}%</span>
    </div>
  ))}
</div>

            <div className='programme-carte'>
              <div className='carte-titre'>MON PROGRAMME</div>
              <div className='seance-item'>
                <div className='seance-dot'></div>
                <div className='seance-info'>
                  <div className='seance-nom'>Powerlifting 12 semaines</div>
                  <div className='seance-date'>Semaine 3 / 12</div>
                </div>
              </div>
              <div className='seance-item'>
                <div className='seance-dot' style={{ background: '#FF6B00' }}></div>
                <div className='seance-info'>
                  <div className='seance-nom'>Prochaine séance</div>
                  <div className='seance-date'>Demain — Squat lourd</div>
                </div>
              </div>
              <div className='seance-item'>
                <div className='seance-dot' style={{ background: '#2DC653' }}></div>
                <div className='seance-info'>
                  <div className='seance-nom'>Progression</div>
                  <div className='seance-date'>+12% ce mois</div>
                </div>
              </div>
              <button className='btn-programme' onClick={() => navigate('/programmes')}>
                VOIR MES PROGRAMMES
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TableauDeBord