import React, { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { FaDumbbell, FaFire, FaClock, FaTrophy } from 'react-icons/fa'
import axios from 'axios'
import Sidebar from '../components/Sidebar'
import './Statistiques.css'

function Statistiques() {
  const [seances, setSeances] = useState([])

  useEffect(() => {
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

  const totalSeances = seances.length
  const totalDuree = seances.reduce((acc, s) => acc + s.duree, 0)
  const totalExercices = seances.reduce((acc, s) => acc + s.exercices.length, 0)
  const moyenneDuree = totalSeances > 0 ? Math.round(totalDuree / totalSeances) : 0

  const dataBarres = seances.slice(0, 7).reverse().map((s, i) => ({
    jour: `J${i + 1}`,
    duree: s.duree,
    exercices: s.exercices.length
  }))

  const dataLigne = seances.slice(0, 10).reverse().map((s, i) => ({
    semaine: `S${i + 1}`,
    duree: s.duree
  }))

  const categoriesCount = {}
  seances.forEach(s => {
    s.exercices.forEach(ex => {
      const cat = ex.nom || 'Autre'
      categoriesCount[cat] = (categoriesCount[cat] || 0) + 1
    })
  })

  const dataPie = Object.entries(categoriesCount).slice(0, 5).map(([name, value]) => ({ name, value }))
  const COULEURS = ['#C1121F', '#FF6B00', '#3A86FF', '#2DC653', '#FFB703']

  return (
    <div className='stats-wrapper'>
      <Sidebar />
      <div className='stats-main'>
        <div className='stats-topbar'>
          <div className='topbar-titre'>STATISTIQUES</div>
        </div>

        <div className='stats-contenu'>
          <div className='stats-cards'>
            <div className='stat-carte rouge'>
              <div className='stat-icone rouge'><FaDumbbell /></div>
              <div className='stat-info'>
                <span className='stat-nombre'>{totalSeances}</span>
                <span className='stat-label'>Séances totales</span>
              </div>
            </div>
            <div className='stat-carte orange'>
              <div className='stat-icone orange'><FaFire /></div>
              <div className='stat-info'>
                <span className='stat-nombre'>{totalExercices}</span>
                <span className='stat-label'>Exercices effectués</span>
              </div>
            </div>
            <div className='stat-carte bleu'>
              <div className='stat-icone bleu'><FaClock /></div>
              <div className='stat-info'>
                <span className='stat-nombre'>{totalDuree} min</span>
                <span className='stat-label'>Temps total</span>
              </div>
            </div>
            <div className='stat-carte vert'>
              <div className='stat-icone vert'><FaTrophy /></div>
              <div className='stat-info'>
                <span className='stat-nombre'>{moyenneDuree} min</span>
                <span className='stat-label'>Durée moyenne</span>
              </div>
            </div>
          </div>

          <div className='graphiques-grid'>
            <div className='graphique-carte'>
              <h2>DURÉE DES SÉANCES</h2>
              {seances.length === 0 ? (
                <div className='vide'>Aucune donnée disponible</div>
              ) : (
                <ResponsiveContainer width='100%' height={200}>
                  <BarChart data={dataBarres}>
                    <CartesianGrid strokeDasharray='3 3' stroke='#222' />
                    <XAxis dataKey='jour' stroke='#555' tick={{ fontSize: 11 }} />
                    <YAxis stroke='#555' tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#1A1A1A', border: '1px solid #C1121F', borderRadius: '8px', fontSize: '11px' }} labelStyle={{ color: '#fff' }} />
                    <Bar dataKey='duree' fill='#C1121F' radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className='graphique-carte'>
              <h2>PROGRESSION</h2>
              {seances.length === 0 ? (
                <div className='vide'>Aucune donnée disponible</div>
              ) : (
                <ResponsiveContainer width='100%' height={200}>
                  <LineChart data={dataLigne}>
                    <CartesianGrid strokeDasharray='3 3' stroke='#222' />
                    <XAxis dataKey='semaine' stroke='#555' tick={{ fontSize: 11 }} />
                    <YAxis stroke='#555' tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: '#1A1A1A', border: '1px solid #C1121F', borderRadius: '8px', fontSize: '11px' }} labelStyle={{ color: '#fff' }} />
                    <Line type='monotone' dataKey='duree' stroke='#C1121F' strokeWidth={2} dot={{ fill: '#C1121F', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className='graphique-carte'>
              <h2>EXERCICES PAR TYPE</h2>
              {dataPie.length === 0 ? (
                <div className='vide'>Aucune donnée disponible</div>
              ) : (
                <div className='pie-container'>
                  <ResponsiveContainer width='50%' height={200}>
                    <PieChart>
                      <Pie data={dataPie} cx='50%' cy='50%' innerRadius={50} outerRadius={80} dataKey='value'>
                        {dataPie.map((entry, index) => (
                          <Cell key={index} fill={COULEURS[index % COULEURS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#1A1A1A', border: '1px solid #C1121F', borderRadius: '8px', fontSize: '11px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className='pie-legende'>
                    {dataPie.map((entry, index) => (
                      <div key={index} className='legende-item'>
                        <div className='legende-dot' style={{ background: COULEURS[index % COULEURS.length] }}></div>
                        <span>{entry.name}</span>
                        <span className='legende-val'>{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistiques