import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaBook, FaChartBar, FaDumbbell, FaUser, FaCog, FaSignOutAlt, FaAppleAlt, FaShoppingBag, FaBars, FaTimes } from 'react-icons/fa'
import './Sidebar.css'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'))
  const [menuOuvert, setMenuOuvert] = useState(false)

  const handleDeconnexion = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('utilisateur')
    navigate('/')
  }

  const handleNavigation = (path) => {
    navigate(path)
    setMenuOuvert(false)
  }

  const liens = [
    { label: 'Principal', items: [
      { path: '/tableau-de-bord', icone: <FaHome />, label: 'Accueil' },
      { path: '/journal', icone: <FaBook />, label: 'Journal' },
      { path: '/statistiques', icone: <FaChartBar />, label: 'Statistiques' },
    ]},
    { label: 'Entraînement', items: [
      { path: '/programmes', icone: <FaDumbbell />, label: 'Programmes' },
      { path: '/profil', icone: <FaUser />, label: 'Profil' },
    ]},
    { label: 'Bien-être', items: [
      { path: '/nutrition', icone: <FaAppleAlt />, label: 'Nutrition' },
      { path: '/boutique', icone: <FaShoppingBag />, label: 'Boutique' },
    ]},
  ]

  return (
    <>
      <div className='mobile-topbar'>
        <div className='mobile-logo' onClick={() => navigate('/tableau-de-bord')}>
          <span className='logo-fit'>FIT</span>
          <span className='logo-track'>TRACK</span>
        </div>
        <button className='hamburger' onClick={() => setMenuOuvert(!menuOuvert)}>
          {menuOuvert ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`sidebar ${menuOuvert ? 'ouvert' : ''}`}>
        <div className='sidebar-logo' onClick={() => handleNavigation('/tableau-de-bord')}>
          <span className='logo-fit'>FIT</span>
          <span className='logo-track'>TRACK</span>
        </div>

        <div className='sidebar-menu'>
          {liens.map((section) => (
            <div key={section.label} className='sidebar-section'>
              <div className='sidebar-label'>{section.label}</div>
              {section.items.map((lien) => (
                <div
                  key={lien.path}
                  className={`sidebar-lien ${location.pathname === lien.path ? 'actif' : ''}`}
                  onClick={() => handleNavigation(lien.path)}
                >
                  <span className='sidebar-icone'>{lien.icone}</span>
                  <span>{lien.label}</span>
                </div>
              ))}
            </div>
          ))}

          {utilisateur?.role === 'admin' && (
            <div className='sidebar-section'>
              <div className='sidebar-label'>Gestion</div>
              <div
                className={`sidebar-lien admin ${location.pathname === '/admin' ? 'actif' : ''}`}
                onClick={() => handleNavigation('/admin')}
              >
                <span className='sidebar-icone'><FaCog /></span>
                <span>Admin</span>
              </div>
            </div>
          )}
        </div>

        <div className='sidebar-bas'>
          <div className='sidebar-user'>
            <div className='sidebar-avatar'>
              {utilisateur?.nom?.charAt(0).toUpperCase()}
            </div>
            <div className='sidebar-uinfo'>
              <div className='sidebar-unom'>{utilisateur?.nom}</div>
              <div className='sidebar-urole'>{utilisateur?.role}</div>
            </div>
            <FaSignOutAlt className='sidebar-logout' onClick={handleDeconnexion} />
          </div>
        </div>
      </div>

      {menuOuvert && <div className='sidebar-overlay' onClick={() => setMenuOuvert(false)}></div>}
    </>
  )
}

export default Sidebar