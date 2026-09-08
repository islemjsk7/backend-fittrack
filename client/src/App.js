import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil.jsx'
import Connexion from './pages/Connexion'
import Inscription from './pages/Inscription'
import TableauDeBord from './pages/TableauDeBord'
import Journal from './pages/Journal'
import Statistiques from './pages/Statistiques'
import Programmes from './pages/Programmes'
import Profil from './pages/Profil'
import Admin from './pages/Admin'
import Nutrition from './pages/Nutrition'
import Boutique from './pages/Boutique'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Accueil />} />
        <Route path='/connexion' element={<Connexion />} />
        <Route path='/inscription' element={<Inscription />} />
        <Route path='/tableau-de-bord' element={<TableauDeBord />} />
        <Route path='/journal' element={<Journal />} />
        <Route path='/statistiques' element={<Statistiques />} />
        <Route path='/programmes' element={<Programmes />} />
        <Route path='/profil' element={<Profil />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/nutrition' element={<Nutrition />} />
        <Route path='/boutique' element={<Boutique />} />
      </Routes>
    </Router>
  )
}

export default App