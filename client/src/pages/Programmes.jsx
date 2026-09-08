import React, { useState } from 'react'
import { FaClock, FaFire, FaDumbbell, FaHeart, FaBolt, FaLeaf, FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './Programmes.css'

const programmes = [
  {
    id: 1,
    nom: 'Powerlifting 12 semaines',
    objectif: 'Force & Puissance',
    niveau: 'Avancé',
    duree: '12 sem',
    frequence: '5x/sem',
    seance: '90 min',
    badge: 'Populaire',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop&q=80',
    description: 'Développe ta force maximale sur squat, développé couché et soulevé de terre. Programme basé sur la progression linéaire et les cycles de périodisation.',
    exercices: ['Squat barre', 'Développé couché', 'Soulevé de terre', 'Développé militaire'],
    slug: 'force',
    faq: [
      { q: 'Ce programme est-il adapté aux débutants ?', r: 'Non, ce programme nécessite au moins 2 ans de pratique. Il faut maîtriser les mouvements de base avant de commencer.' },
      { q: 'De quel matériel ai-je besoin ?', r: 'Une barre olympique, des disques, un rack à squat et un banc de musculation sont nécessaires.' },
      { q: 'Combien de temps de repos entre les séries ?', r: 'Entre 3 et 5 minutes pour les exercices lourds, 2 minutes pour les exercices accessoires.' },
    ],
    planning: ['Lundi : Squat lourd + accessoires jambes', 'Mardi : Développé couché lourd + accessoires poitrine', 'Mercredi : Repos actif', 'Jeudi : Soulevé de terre + dos', 'Vendredi : Développé militaire + épaules', 'Samedi : Repos', 'Dimanche : Repos']
  },
  {
    id: 2,
    nom: 'Full Body Débutant',
    objectif: 'Prise de masse',
    niveau: 'Débutant',
    duree: '8 sem',
    frequence: '3x/sem',
    seance: '60 min',
    badge: 'Nouveau',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=400&fit=crop&q=80',
    description: 'Programme idéal pour commencer la musculation. Basé sur les exercices de base qui font travailler les grands groupes musculaires.',
    exercices: ['Squat', 'Pompes', 'Tractions', 'Rowing haltère'],
    slug: 'masse',
    faq: [
      { q: 'Je n\'ai jamais fait de musculation, puis-je commencer ?', r: 'Oui, ce programme est spécialement conçu pour les débutants avec des charges légères et une progression douce.' },
      { q: 'Puis-je faire ce programme à la maison ?', r: 'Oui avec des haltères et une barre de traction. Certains exercices peuvent être adaptés au poids du corps.' },
      { q: 'Quand vais-je voir des résultats ?', r: 'Les premières améliorations de force se font sentir dès la 2ème semaine. Les changements physiques sont visibles à partir de la 4ème semaine.' },
    ],
    planning: ['Lundi : Full body A (squat, pompes, rowing)', 'Mercredi : Full body B (fentes, tractions, développé)', 'Vendredi : Full body A ou B en alternance']
  },
  {
    id: 3,
    nom: 'Cardio & Musculation Sèche',
    objectif: 'Perte de poids',
    niveau: 'Intermédiaire',
    duree: '6 sem',
    frequence: '4x/sem',
    seance: '45 min',
    badge: null,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop&q=80',
    description: 'Association de cardio HIIT et musculation pour brûler un maximum de graisses tout en préservant la masse musculaire.',
    exercices: ['Burpees', 'Sprint', 'Circuit training', 'Gainage'],
    slug: 'seche',
    faq: [
      { q: 'Dois-je suivre un régime alimentaire en parallèle ?', r: 'Un déficit calorique modéré de 300 à 500 kcal est recommandé pour optimiser la perte de graisse sans perte de muscle.' },
      { q: 'Le HIIT est-il adapté aux personnes avec des problèmes articulaires ?', r: 'Non, en cas de problèmes articulaires il vaut mieux opter pour du cardio basse intensité comme la marche rapide ou le vélo.' },
      { q: 'Combien de kilos puis-je perdre ?', r: 'En moyenne 0.5 à 1 kg par semaine avec une alimentation adaptée. La régularité est la clé.' },
    ],
    planning: ['Lundi : HIIT 20 min + abdos', 'Mardi : Musculation haut du corps', 'Jeudi : HIIT 20 min + gainage', 'Vendredi : Musculation bas du corps']
  },
  {
    id: 4,
    nom: 'Prise de Masse PPL',
    objectif: 'Prise de masse',
    niveau: 'Intermédiaire',
    duree: '10 sem',
    frequence: '4x/sem',
    seance: '75 min',
    badge: 'Populaire',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&h=400&fit=crop&q=80',
    description: 'Programme Push Pull Legs conçu pour maximiser la prise de masse musculaire avec des volumes optimisés.',
    exercices: ['Développé couché', 'Tractions lestées', 'Squat', 'Curl barre'],
    slug: 'masse',
    faq: [
      { q: 'Qu\'est ce que le Push Pull Legs ?', r: 'C\'est une organisation des séances par mouvement : les exercices de poussée (poitrine, épaules, triceps), de tirage (dos, biceps) et les jambes.' },
      { q: 'Combien de calories dois-je manger ?', r: 'Un surplus calorique de 200 à 300 kcal avec 1.8g de protéines par kg de poids de corps est recommandé.' },
      { q: 'Puis-je ajouter des séances cardio ?', r: 'Oui, 2 séances légères de 20 à 30 min par semaine sont acceptables sans impacter la récupération.' },
    ],
    planning: ['Lundi : Push (poitrine, épaules, triceps)', 'Mardi : Pull (dos, biceps)', 'Jeudi : Jambes + abdos', 'Vendredi : Push ou Pull selon progression']
  },
  {
    id: 5,
    nom: 'HIIT Brûleur de Graisses',
    objectif: 'Perte de poids',
    niveau: 'Tous niveaux',
    duree: '4 sem',
    frequence: '5x/sem',
    seance: '30 min',
    badge: null,
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&h=400&fit=crop&q=80',
    description: 'Séances courtes et intenses en interval training pour un maximum de calories brûlées en minimum de temps.',
    exercices: ['Mountain climbers', 'Jump squats', 'Jumping jacks', 'Planche'],
    slug: 'seche',
    faq: [
      { q: 'Les séances sont-elles vraiment efficaces en 30 min ?', r: 'Oui, le HIIT brûle autant de calories qu\'une heure de cardio classique grâce à l\'effet afterburn qui dure plusieurs heures après la séance.' },
      { q: 'Puis-je faire ce programme sans matériel ?', r: 'Oui, toutes les séances sont en poids du corps. Aucun équipement n\'est nécessaire.' },
      { q: 'Quand faire les séances ?', r: 'Le matin à jeun est idéal pour la perte de graisse, mais n\'importe quel moment de la journée est efficace.' },
    ],
    planning: ['Lundi au Vendredi : 30 min de HIIT avec 20 sec effort / 10 sec repos', 'Week-end : Repos complet ou marche']
  },
  {
    id: 6,
    nom: 'Force Athlétique Avancée',
    objectif: 'Force & Puissance',
    niveau: 'Avancé',
    duree: '16 sem',
    frequence: '5x/sem',
    seance: '100 min',
    badge: null,
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=400&fit=crop&q=80',
    description: 'Programme de force avancé avec cycles de périodisation ondulante pour les athlètes cherchant à repousser leurs limites.',
    exercices: ['Squat lourd', 'Soulevé de terre', 'Développé militaire', 'Tractions lestées'],
    slug: 'force',
    faq: [
      { q: 'Qu\'est ce que la périodisation ondulante ?', r: 'C\'est une méthode qui varie l\'intensité et le volume d\'une séance à l\'autre pour éviter les plateaux et maximiser les gains de force.' },
      { q: 'Ai-je besoin d\'un partenaire d\'entraînement ?', r: 'Fortement recommandé pour les charges maximales. Un spotter est essentiel pour la sécurité sur les exercices lourds.' },
      { q: 'Comment gérer la récupération ?', r: 'Le sommeil de 8 à 9 heures est crucial. La nutrition doit être irréprochable avec un surplus calorique modéré.' },
    ],
    planning: ['Lundi : Force maximale membres inférieurs', 'Mardi : Force maximale membres supérieurs', 'Mercredi : Récupération active', 'Jeudi : Puissance et explosivité', 'Vendredi : Volume hypertrophie', 'Week-end : Repos']
  },
  {
    id: 7,
    nom: 'Endurance & Cardio',
    objectif: 'Cardio',
    niveau: 'Débutant',
    duree: '8 sem',
    frequence: '4x/sem',
    seance: '50 min',
    badge: null,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop&q=80',
    description: 'Améliore ton endurance cardiovasculaire progressivement avec des séances adaptées à ton niveau.',
    exercices: ['Course à pied', 'Vélo', 'Natation', 'Corde à sauter'],
    slug: 'cardio',
    faq: [
      { q: 'Je n\'arrive pas à courir plus de 5 min, puis-je commencer ?', r: 'Oui, le programme débute avec des séances marche/course alternées. La progression est très douce sur les 2 premières semaines.' },
      { q: 'Dois-je faire toutes les activités proposées ?', r: 'Non, choisis l\'activité que tu préfères. La régularité est plus importante que le choix de l\'activité.' },
      { q: 'Comment savoir si j\'avance à la bonne intensité ?', r: 'Tu dois pouvoir parler sans être essoufflé. Si tu ne peux plus parler, ralentis.' },
    ],
    planning: ['Lundi : Course ou marche rapide 30 min', 'Mercredi : Vélo ou natation 40 min', 'Vendredi : Course 35 min', 'Dimanche : Activité libre 30 min']
  },
  {
    id: 8,
    nom: 'Tonification Femme',
    objectif: 'Tonification',
    niveau: 'Débutant',
    duree: '8 sem',
    frequence: '3x/sem',
    seance: '55 min',
    badge: 'Nouveau',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop&q=80',
    description: 'Programme spécialement conçu pour tonifier le corps féminin, renforcer les muscles sans prise de masse excessive.',
    exercices: ['Squats sumo', 'Fentes', 'Hip thrust', 'Gainage latéral'],
    slug: 'masse',
    faq: [
      { q: 'La musculation va-t-elle me faire prendre de la masse ?', r: 'Non, sans surplus calorique important et sans testostérone élevée, les femmes ne prennent pas de masse. Ce programme va tonifier et dessiner.' },
      { q: 'Dois-je faire du cardio en plus ?', r: '2 séances de cardio léger de 20 à 30 min par semaine peuvent accélérer les résultats mais ne sont pas obligatoires.' },
      { q: 'Puis-je faire ce programme pendant mes règles ?', r: 'Oui, adapter l\'intensité selon ton ressenti. Certaines femmes préfèrent se reposer les 2 premiers jours.' },
    ],
    planning: ['Lundi : Bas du corps (squats, fentes, hip thrust)', 'Mercredi : Haut du corps (poitrine, dos, épaules)', 'Vendredi : Full body + gainage']
  },
  {
    id: 9,
    nom: 'Abdos Sculptés',
    objectif: 'Tonification',
    niveau: 'Tous niveaux',
    duree: '6 sem',
    frequence: '5x/sem',
    seance: '20 min',
    badge: null,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop&q=80',
    description: 'Sculpte ta sangle abdominale avec des exercices progressifs ciblés pour développer des abdos visibles.',
    exercices: ['Crunchs', 'Planche', 'Relevés de jambes', 'Russian twist'],
    slug: 'seche',
    faq: [
      { q: 'Les abdos se font-ils uniquement avec des crunchs ?', r: 'Non, les exercices de gainage comme la planche sont bien plus efficaces. Ce programme combine les deux approches.' },
      { q: 'Mes abdos sont-ils visibles uniquement avec ce programme ?', r: 'La visibilité des abdos dépend principalement du taux de graisse corporel. Ce programme doit être associé à une alimentation adaptée.' },
      { q: 'Puis-je faire ce programme tous les jours ?', r: 'Oui, les abdos récupèrent rapidement. Ce programme prévoit 5 séances par semaine avec 2 jours de repos.' },
    ],
    planning: ['Du lundi au vendredi : 20 min de travail abdominal ciblé', 'Week-end : Repos ou cardio léger']
  },
  {
    id: 10,
    nom: 'Mobilité & Récupération',
    objectif: 'Bien-être',
    niveau: 'Tous niveaux',
    duree: '4 sem',
    frequence: '3x/sem',
    seance: '40 min',
    badge: null,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop&q=80',
    description: 'Programme axé sur la flexibilité, la mobilité articulaire et la récupération active. Idéal en complément d\'un programme intense.',
    exercices: ['Yoga', 'Stretching dynamique', 'Foam rolling', 'Respiration'],
    slug: 'bienetre',
    faq: [
      { q: 'Puis-je faire ce programme en parallèle d\'un programme de musculation ?', r: 'Oui, c\'est même recommandé. Ce programme améliore la récupération et réduit les risques de blessures.' },
      { q: 'Ai-je besoin d\'un tapis de yoga ?', r: 'Un tapis est recommandé pour le confort, mais non indispensable. Une surface propre et non glissante suffit.' },
      { q: 'Quand faire les séances ?', r: 'Le soir avant de dormir est idéal car cela favorise la récupération et améliore la qualité du sommeil.' },
    ],
    planning: ['Lundi : Mobilité articulaire complète', 'Mercredi : Yoga et stretching profond', 'Vendredi : Foam rolling et récupération active']
  },
  {
    id: 11,
    nom: 'Masse Musculaire PPL Avancé',
    objectif: 'Prise de masse',
    niveau: 'Avancé',
    duree: '12 sem',
    frequence: '6x/sem',
    seance: '80 min',
    badge: 'Populaire',
    image: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?w=800&h=400&fit=crop&q=80',
    description: 'Push Pull Legs en double split pour les pratiquants avancés. Volume élevé et intensité maximale pour des gains optimaux.',
    exercices: ['Développé incliné', 'Rowing câble', 'Leg press', 'Curl marteau'],
    slug: 'masse',
    faq: [
      { q: 'Qu\'est ce que le double split ?', r: 'Le double split consiste à faire chaque groupe musculaire 2 fois par semaine en alternant les angles et les exercices pour maximiser le volume.' },
      { q: 'Comment éviter le surentraînement ?', r: 'La nutrition et le sommeil sont essentiels. Dès que tu ressens une fatigue persistante, prends un jour de repos supplémentaire.' },
      { q: 'Combien de temps pour voir les résultats ?', r: 'Avec ce volume d\'entraînement et une nutrition adaptée, des gains significatifs sont visibles dès la 6ème semaine.' },
    ],
    planning: ['Lundi : Push A (poitrine volumétrie)', 'Mardi : Pull A (dos volumétrie)', 'Mercredi : Jambes A', 'Jeudi : Push B (épaules volumétrie)', 'Vendredi : Pull B (dos/biceps)', 'Samedi : Jambes B', 'Dimanche : Repos']
  },
  {
    id: 12,
    nom: 'Sport Santé Senior',
    objectif: 'Bien-être',
    niveau: 'Débutant',
    duree: '12 sem',
    frequence: '3x/sem',
    seance: '45 min',
    badge: null,
    image: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?w=800&h=400&fit=crop&q=80',
    description: 'Programme doux et progressif adapté aux seniors ou aux personnes en reprise d\'activité. Renforcement et équilibre.',
    exercices: ['Marche rapide', 'Squats assistés', 'Bandes élastiques', 'Equilibre'],
    slug: 'bienetre',
    faq: [
      { q: 'Dois-je consulter un médecin avant de commencer ?', r: 'Oui, une visite médicale est recommandée, surtout si vous n\'avez pas pratiqué d\'activité physique depuis longtemps.' },
      { q: 'Les exercices sont-ils adaptés aux personnes avec des douleurs articulaires ?', r: 'Oui, tous les exercices sont à faible impact. En cas de douleur intense, arrêtez et consultez votre médecin.' },
      { q: 'Puis-je progresser vers un programme plus intense ensuite ?', r: 'Oui, après 12 semaines vous aurez une base solide pour passer à un programme intermédiaire.' },
    ],
    planning: ['Lundi : Renforcement musculaire doux', 'Mercredi : Marche + équilibre', 'Vendredi : Bandes élastiques + stretching']
  },
]

const objectifs = [
  { label: 'Tous', slug: 'tous', icone: <FaDumbbell /> },
  { label: 'Prise de masse', slug: 'masse', icone: <FaDumbbell /> },
  { label: 'Sèche', slug: 'seche', icone: <FaFire /> },
  { label: 'Force', slug: 'force', icone: <FaBolt /> },
  { label: 'Cardio', slug: 'cardio', icone: <FaHeart /> },
  { label: 'Bien-être', slug: 'bienetre', icone: <FaLeaf /> },
]

function Modal({ programme, onClose, onCommencer }) {
  const [faqOuverte, setFaqOuverte] = useState(null)

  const toggleFaq = (i) => {
    setFaqOuverte(faqOuverte === i ? null : i)
  }

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-box' onClick={e => e.stopPropagation()}>
        
        <button className='modal-close' onClick={onClose}><FaTimes /></button>

        <div className='modal-img'>
          <img src={programme.image} alt={programme.nom} />
          <div className='modal-img-grad'></div>
          <div className='modal-img-info'>
            <div className='modal-niveau'>{programme.niveau}</div>
            {programme.badge && (
              <div className={`modal-badge ${programme.badge === 'Populaire' ? 'pop' : 'new'}`}>
                {programme.badge}
              </div>
            )}
          </div>
        </div>

        <div className='modal-contenu'>
          <div className='modal-objectif'>{programme.objectif}</div>
          <h2>{programme.nom}</h2>
          <p className='modal-desc'>{programme.description}</p>

          <div className='modal-meta'>
            <div className='modal-pm'>
              <FaClock className='pm-icon' />
              <div>
                <span className='pm-val'>{programme.duree}</span>
                <span className='pm-lbl'>Durée</span>
              </div>
            </div>
            <div className='modal-pm'>
              <FaDumbbell className='pm-icon' />
              <div>
                <span className='pm-val'>{programme.frequence}</span>
                <span className='pm-lbl'>Fréquence</span>
              </div>
            </div>
            <div className='modal-pm'>
              <FaClock className='pm-icon' />
              <div>
                <span className='pm-val'>{programme.seance}</span>
                <span className='pm-lbl'>Durée séance</span>
              </div>
            </div>
          </div>

          <div className='modal-section'>
            <h3>Planning type</h3>
            {programme.planning.map((jour, i) => (
              <div key={i} className='planning-item'>
                <div className='planning-dot'></div>
                <span>{jour}</span>
              </div>
            ))}
          </div>

          <div className='modal-section'>
            <h3>Questions fréquentes</h3>
            {programme.faq.map((item, i) => (
              <div key={i} className='faq-item'>
                <div
                  className='faq-question'
                  onClick={(e) => { e.stopPropagation(); toggleFaq(i) }}
                >
                  <span>{item.q}</span>
                  {faqOuverte === i ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {faqOuverte === i && (
                  <div className='faq-reponse'>{item.r}</div>
                )}
              </div>
            ))}
          </div>

          <button className='modal-btn-commencer' onClick={onCommencer}>
            COMMENCER CE PROGRAMME
          </button>
        </div>
      </div>
    </div>
  )
}

function Programmes() {
  const [filtre, setFiltre] = useState('tous')
  const [modal, setModal] = useState(null)
  const navigate = useNavigate()

  const programmesFiltres = programmes.filter(p =>
    filtre === 'tous' || p.slug === filtre
  )

  const getNiveauClass = (niveau) => {
    if (niveau === 'Débutant') return 'deb'
    if (niveau === 'Intermédiaire') return 'int'
    if (niveau === 'Avancé') return 'avd'
    return 'tous'
  }

  return (
    <div className='programmes-wrapper'>
      <Sidebar />
      <div className='programmes-main'>
        <div className='programmes-hero'>
          <img src='https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=300&fit=crop&q=80' alt='gym' className='hero-img' />
          <div className='hero-overlay'>
            <div className='hero-tag'>FITTRACK PROGRAMMES</div>
            <h1>Entraîne-toi smart.<br /><span>Progresse vite.</span></h1>
            <p>Des programmes conçus par nos coachs pour tous les niveaux</p>
          </div>
        </div>

        <div className='objectifs-bandeau'>
          {objectifs.map(obj => (
            <div
              key={obj.slug}
              className={`objectif-item ${filtre === obj.slug ? 'actif' : ''}`}
              onClick={() => setFiltre(obj.slug)}
            >
              <span className='obj-icone'>{obj.icone}</span>
              <span className='obj-label'>{obj.label}</span>
            </div>
          ))}
        </div>

        <div className='programmes-contenu'>
          <div className='section-titre'>
            {filtre === 'tous' ? 'TOUS LES PROGRAMMES' : objectifs.find(o => o.slug === filtre)?.label.toUpperCase()}
            <span className='count'>{programmesFiltres.length} programmes</span>
          </div>

          <div className='programmes-grid'>
            {programmesFiltres.map(p => (
              <div key={p.id} className='prog-carte' onClick={() => setModal(p)}>
                <div className='prog-img'>
                  <img src={p.image} alt={p.nom} />
                  <div className='prog-img-grad'></div>
                  {p.badge && (
                    <div className={`prog-badge ${p.badge === 'Populaire' ? 'pop' : 'new'}`}>
                      {p.badge}
                    </div>
                  )}
                  <div className={`prog-niveau ${getNiveauClass(p.niveau)}`}>
                    {p.niveau}
                  </div>
                </div>
                <div className='prog-body'>
                  <div className='prog-objectif'>{p.objectif}</div>
                  <h3>{p.nom}</h3>
                  <p className='prog-desc'>{p.description}</p>
                  <div className='prog-meta'>
                    <div className='pm'><FaClock className='pm-icon' />{p.duree}</div>
                    <div className='pm-sep'></div>
                    <div className='pm'><FaDumbbell className='pm-icon' />{p.frequence}</div>
                    <div className='pm-sep'></div>
                    <div className='pm'><FaClock className='pm-icon' />{p.seance}</div>
                  </div>
                  <button className='btn-voir' onClick={(e) => { e.stopPropagation(); setModal(p) }}>
                    VOIR LE PROGRAMME
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {modal && (
          <Modal
            programme={modal}
            onClose={() => setModal(null)}
            onCommencer={() => { setModal(null); navigate('/journal') }}
          />
        )}
      </div>
    </div>
  )
}

export default Programmes