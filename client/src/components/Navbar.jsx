import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { FaBell, FaHome, FaBook, FaChartBar, FaDumbbell, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'
import axios from 'axios'
import './Navbar.css'

function Navbar() {
  const [notifications, setNotifications] = useState([])
  const [showNotifs, setShowNotifs] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'))

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:5000/api/notifications', {
          headers: { Authorization: token }
        })
        setNotifications(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchNotifs()
  }, [])

  const nonLues = notifications.filter(n => !n.lu).length

  const handleDeconnexion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('utilisateur')
    navigate('/')
  }

  const liens = [
    { path: '/tableau-de-bord', icone: <FaHome />, label: 'Accueil' },
    { path: '/journal', icone: <FaBook />, label: 'Journal' },
    { path: '/statistiques', icone: <FaChartBar />, label: 'Statistiques' },
    { path: '/programmes', icone: <FaDumbbell />, label: 'Programmes' },
    { path: '/profil', icone: <FaUser />, label: 'Profil' },
  ]

  return (
    <nav className='navbar'>
      <div className='navbar-logo' onClick={() => navigate('/tableau-de-bord')}>
        <span className='logo-fit'>FIT</span>
        <span className='logo-track'>TRACK</span>
      </div>

      <div className='navbar-liens'>
        {liens.map((lien) => (
          <Link
            key={lien.path}
            to={lien.path}
            className={`nav-lien ${location.pathname === lien.path ? 'actif' : ''}`}
          >
            <span className='nav-icone'>{lien.icone}</span>
            <span className='nav-label'>{lien.label}</span>
          </Link>
        ))}
        {utilisateur?.role === 'admin' && (
          <Link
            to='/admin'
            className={`nav-lien admin-lien ${location.pathname === '/admin' ? 'actif' : ''}`}
          >
            <span className='nav-icone'><FaCog /></span>
            <span className='nav-label'>Admin</span>
          </Link>
        )}
      </div>

      <div className='navbar-droite'>
        <div className='cloche-container' onClick={() => setShowNotifs(!showNotifs)}>
          <FaBell className='cloche-icone' />
          {nonLues > 0 && <span className='badge-notif'>{nonLues}</span>}
          {showNotifs && (
            <div className='notifs-dropdown'>
              <h4>Notifications</h4>
              {notifications.length === 0 ? (
                <p className='notif-vide'>Aucune notification</p>
              ) : (
                notifications.map(n => (
                  <div key={n._id} className={`notif-item ${!n.lu ? 'non-lue' : ''}`}>
                    {n.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className='navbar-avatar' onClick={() => navigate('/profil')}>
          {utilisateur?.nom?.charAt(0).toUpperCase()}
        </div>

        <button className='btn-deconnexion' onClick={handleDeconnexion}>
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  )
}

export default Navbar