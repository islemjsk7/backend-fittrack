import React, { useState } from 'react'
import { FaSearch, FaShoppingCart, FaTrash, FaStar, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Sidebar from '../components/Sidebar'
import './Nutrition.css'
import Footer from '../components/Footer'

const produits = [
  {
    id: 1, nom: 'Gold Standard 100% Whey, Cookies & Cream, 2.1kg', prix: 18500,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02868/y/84.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02868/y/90.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02868/y/73.jpg',
    ],
    stock: true, badge: 'Bestseller', note: 4.8, avis: 2847, ancienPrix: null
  },
  {
    id: 2, nom: 'Micronized Creatine Powder, 300g', prix: 3500,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02384/g/68.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02384/y/96.jpg',
    ],
    stock: true, badge: null, note: 4.6, avis: 1203, ancienPrix: null
  },
  {
    id: 3, nom: 'Pure Creatine Monohydrate 750mg, 240 caps', prix: 2500,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cgn/cgn02283/y/240.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cgn/cgn02283/y/245.jpg',
    ],
    stock: true, badge: 'Bestseller', note: 4.5, avis: 678, ancienPrix: null
  },
  {
    id: 4, nom: 'EAA+ Hydration, Apple Pear, 390g', prix: 4200,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrx/nrx00778/y/25.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrx/nrx00778/y/31.jpg',
    ],
    stock: true, badge: 'Nouveau', note: 4.4, avis: 312, ancienPrix: null
  },
  {
    id: 5, nom: 'BCAA 2:1:1, Unflavored, 400g', prix: 3200,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/kgd/kgd96641/y/34.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/kgd/kgd96641/y/39.jpg',
    ],
    stock: true, badge: 'Promo', note: 4.7, avis: 954, ancienPrix: 4200
  },
  {
    id: 6, nom: 'Animal Primal Preworkout, Fruit Punch, 507g', prix: 8000,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/unn/unn03324/y/58.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/unn/unn03324/y/63.jpg',
    ],
    stock: true, badge: 'Bestseller', note: 4.9, avis: 1876, ancienPrix: null
  },
  {
    id: 7, nom: 'EVLution Caffeine 200mg, 100 comprimés', prix: 1100,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/evl/evl02461/y/32.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/evl/evl02461/y/38.jpg'
    ],
    stock: false, badge: null, note: 4.3, avis: 421, ancienPrix: null
  },
  {
    id: 8, nom: 'Marine Collagen Peptides + Vit C, 206g', prix: 2200,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cgn/cgn01033/y/478.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cgn/cgn01033/y/479.jpg',
    ],
    stock: true, badge: null, note: 4.6, avis: 732, ancienPrix: null
  },
  {
    id: 9, nom: 'Serious Mass, Chocolat, 2.72kg', prix: 13500,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02299/y/55.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02299/y/61.jpg',
    ],
    stock: true, badge: 'Bestseller', note: 4.7, avis: 2134, ancienPrix: null
  },
  {
    id: 10, nom: 'Serious Mass, Banane, 2.72kg', prix: 13500,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02886/y/62.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/opn/opn02886/y/68.jpg'
    ],
    stock: true, badge: null, note: 4.5, avis: 867, ancienPrix: null
  },
  {
    id: 11, nom: 'Magnesium + Calcium Chelate, 90 comprimés', prix: 1400,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cgn/cgn01298/y/209.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/cgn/cgn01298/y/214.jpg'
    ],
    stock: true, badge: null, note: 4.4, avis: 289, ancienPrix: null
  },
  {
    id: 12, nom: 'Vitadapt Premium Multivitamine Sport, 90 caps', prix: 3300,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrx/nrx00654/y/28.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrx/nrx00654/y/31.jpg'
    ],
    stock: true, badge: null, note: 4.6, avis: 543, ancienPrix: null
  },
  {
    id: 13, nom: 'Force Factor L-Arginine, 150 capsules', prix: 2000,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/foa/foa01525/y/37.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/foa/foa01525/y/42.jpg'
    ],
    stock: true, badge: null, note: 4.3, avis: 198, ancienPrix: null
  },
  {
    id: 14, nom: 'OxyShred Thermogenic Fat Burner, Mango, 282g', prix: 7500,
    images: [
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ehl/ehl00726/y/28.jpg',
      'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ehl/ehl00726/y/33.jpg',
    ],
    stock: true, badge: 'Bestseller', note: 4.8, avis: 3201, ancienPrix: null
  },
]

const tableauDosage = [
  { objectif: 'Entretien', apport: '1,2 – 1,6 g/kg', timing: '3–4 prises réparties dans la journée' },
  { objectif: 'Prise de masse', apport: '1,6 – 2,2 g/kg', timing: 'Portion post-entraînement obligatoire' },
  { objectif: 'Sèche', apport: '2,0 – 2,4 g/kg', timing: 'Petit-déj protéiné + post-workout' },
]

function Etoiles({ note }) {
  return (
    <div className='etoiles'>
      {[1, 2, 3, 4, 5].map(i => (
        <FaStar key={i} className={i <= Math.round(note) ? 'etoile-pleine' : 'etoile-vide'} />
      ))}
    </div>
  )
}

function Nutrition() {
  const [recherche, setRecherche] = useState('')
  const [panier, setPanier] = useState([])
  const [showPanier, setShowPanier] = useState(false)
  const [produitModal, setProduitModal] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [showCommande, setShowCommande] = useState(false)
  const [etape, setEtape] = useState(1)
  const [form, setForm] = useState({
    email: '', nom: '', adresse: '', ville: '',
    codePostal: '', telephone: '', expedition: ''
  })
  const [numeroCommande] = useState('FT-' + Math.floor(100000 + Math.random() * 900000))

  const produitsFiltres = produits.filter(p =>
    p.nom.toLowerCase().includes(recherche.toLowerCase())
  )

  const ajouterAuPanier = (produit) => {
    const existant = panier.find(p => p.id === produit.id)
    if (existant) {
      setPanier(panier.map(p => p.id === produit.id ? { ...p, quantite: p.quantite + 1 } : p))
    } else {
      setPanier([...panier, { ...produit, quantite: 1 }])
    }
  }

  const supprimerDuPanier = (id) => setPanier(panier.filter(p => p.id !== id))
  const totalPanier = panier.reduce((acc, p) => acc + p.prix * p.quantite, 0)
  const fraisLivraison = form.expedition === 'bureau' ? 450 : form.expedition === 'domicile' ? 600 : 0
  const totalCommande = totalPanier + fraisLivraison
  const nbPanier = panier.reduce((acc, p) => acc + p.quantite, 0)

  const ouvrirModal = (produit) => { setProduitModal(produit); setImageIndex(0) }
  const fermerModal = () => setProduitModal(null)
  const imgSuivante = () => setImageIndex((imageIndex + 1) % produitModal.images.length)
  const imgPrecedente = () => setImageIndex((imageIndex - 1 + produitModal.images.length) % produitModal.images.length)

  const handleCommander = () => { setShowCommande(true); setShowPanier(false); setEtape(1) }
  const handleConfirmer = (e) => { e.preventDefault(); setEtape(2) }
  const handleFermerCommande = () => {
    setShowCommande(false)
    setEtape(1)
    setForm({ email: '', nom: '', adresse: '', ville: '', codePostal: '', telephone: '', expedition: '' })
    setPanier([])
  }

  return (
    <>
    <div className='nutrition-wrapper'>
      <Sidebar />
      <div className='nutrition-main'>

        <div className='nutrition-hero'>
          <img src='https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=300&fit=crop' alt='nutrition' className='nutrition-hero-img' />
          <div className='nutrition-hero-overlay'>
            <div className='nutrition-hero-tag'>FITTRACK NUTRITION</div>
            <h1>Optimise ta nutrition.<br /><span>Maximise tes résultats.</span></h1>
          </div>
          <div className='panier-flottant' onClick={() => setShowPanier(!showPanier)}>
            <FaShoppingCart />
            {nbPanier > 0 && <span className='panier-badge'>{nbPanier}</span>}
          </div>
        </div>

        {showPanier && (
          <div className='panier-panel'>
            <h3>MON PANIER</h3>
            {panier.length === 0 ? (
              <p className='panier-vide'>Ton panier est vide</p>
            ) : (
              <>
                {panier.map(p => (
                  <div key={p.id} className='panier-item'>
                    <div className='panier-info'>
                      <span className='panier-nom'>{p.nom}</span>
                      <span className='panier-qte'>Quantité : {p.quantite}</span>
                    </div>
                    <span className='panier-prix'>{(p.prix * p.quantite).toLocaleString()} DA</span>
                    <button className='btn-supprimer-panier' onClick={() => supprimerDuPanier(p.id)}>
                      <FaTrash />
                    </button>
                  </div>
                ))}
                <div className='panier-total'>
                  <span>Total</span>
                  <span className='total-prix'>{totalPanier.toLocaleString()} DA</span>
                </div>
                <button className='btn-commander' onClick={handleCommander}>PASSER LA COMMANDE</button>
              </>
            )}
          </div>
        )}

        {showCommande && (
          <div className='modal-overlay' onClick={handleFermerCommande}>
            <div className='commande-modal' onClick={e => e.stopPropagation()}>
              <button className='modal-close' onClick={handleFermerCommande}><FaTimes /></button>

              {etape === 1 && (
                <>
                  <div className='commande-header'>
                    <div className='commande-logo'>
                      <span className='logo-fit'>FIT</span><span className='logo-track'>TRACK</span>
                    </div>
                    <div className='commande-steps'>
                      <div className='step actif'><span>1</span>Livraison</div>
                      <div className='step-line'></div>
                      <div className='step'><span>2</span>Confirmation</div>
                    </div>
                  </div>

                  <div className='commande-body'>
                    <form onSubmit={handleConfirmer} className='commande-form'>

                      <div className='form-section-titre'>CONTACT</div>
                      <div className='champ'>
                        <label>Email</label>
                        <input
                          type='email'
                          placeholder='ton@email.com'
                          value={form.email}
                          onChange={e => setForm({...form, email: e.target.value})}
                          required
                        />
                      </div>

                      <div className='form-section-titre'>LIVRAISON</div>
                      <div className='champ'>
                        <label>Nom complet</label>
                        <input
                          type='text'
                          placeholder='Nom et prénom'
                          value={form.nom}
                          onChange={e => setForm({...form, nom: e.target.value})}
                          required
                        />
                      </div>
                      <div className='champ'>
                        <label>Adresse</label>
                        <input
                          type='text'
                          placeholder='Rue, numéro, quartier...'
                          value={form.adresse}
                          onChange={e => setForm({...form, adresse: e.target.value})}
                          required
                        />
                      </div>
                      <div className='form-row-2'>
                        <div className='champ'>
                          <label>Ville</label>
                          <input
                            type='text'
                            placeholder='Ex: Batna'
                            value={form.ville}
                            onChange={e => setForm({...form, ville: e.target.value})}
                            required
                          />
                        </div>
                        <div className='champ'>
                          <label>Code postal</label>
                          <input
                            type='text'
                            placeholder='Ex: 05000'
                            value={form.codePostal}
                            onChange={e => setForm({...form, codePostal: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div className='champ'>
                        <label>Numéro de téléphone</label>
                        <div className='input-prefix'>
                          <span className='prefix'>+213</span>
                          <input
                            type='tel'
                            placeholder='XXXXXXXXX'
                            value={form.telephone}
                            onChange={e => setForm({...form, telephone: e.target.value})}
                            required
                          />
                        </div>
                      </div>

                      <div className='form-section-titre'>MÉTHODE D'EXPÉDITION</div>
                      <div className='expedition-options'>
                        <div
                          className={`expedition-option ${form.expedition === 'bureau' ? 'actif' : ''}`}
                          onClick={() => setForm({...form, expedition: 'bureau'})}
                        >
                          <div className='exp-radio'>
                            {form.expedition === 'bureau' && <div className='exp-radio-inner'></div>}
                          </div>
                          <div className='exp-info'>
                            <div className='exp-nom'>Bureau — World Express</div>
                            <div className='exp-desc'>Retrait au bureau de livraison le plus proche</div>
                          </div>
                          <div className='exp-prix'>450 DA</div>
                        </div>
                        <div
                          className={`expedition-option ${form.expedition === 'domicile' ? 'actif' : ''}`}
                          onClick={() => setForm({...form, expedition: 'domicile'})}
                        >
                          <div className='exp-radio'>
                            {form.expedition === 'domicile' && <div className='exp-radio-inner'></div>}
                          </div>
                          <div className='exp-info'>
                            <div className='exp-nom'>Livraison à domicile</div>
                            <div className='exp-desc'>Livré directement chez vous sous 2 à 5 jours</div>
                          </div>
                          <div className='exp-prix'>600 DA</div>
                        </div>
                      </div>

                      <div className='form-section-titre'>PAIEMENT</div>
                      <div className='paiement-option'>
                        <div className='exp-radio actif-radio'>
                          <div className='exp-radio-inner'></div>
                        </div>
                        <div className='exp-info'>
                          <div className='exp-nom'>Paiement à la livraison</div>
                          <div className='exp-desc'>Vous payez en espèces à la réception de votre commande</div>
                        </div>
                      </div>

                      <div className='form-section-titre'>RÉSUMÉ DE LA COMMANDE</div>
                      <div className='commande-recap'>
                        {panier.map(p => (
                          <div key={p.id} className='recap-item'>
                            <span className='recap-nom'>{p.nom}</span>
                            <span className='recap-qte'>x{p.quantite}</span>
                            <span className='recap-prix'>{(p.prix * p.quantite).toLocaleString()} DA</span>
                          </div>
                        ))}
                        <div className='recap-ligne'>
                          <span>Sous-total</span>
                          <span>{totalPanier.toLocaleString()} DA</span>
                        </div>
                        <div className='recap-ligne'>
                          <span>Livraison</span>
                          <span>
                            {form.expedition === 'bureau' ? '450 DA' : form.expedition === 'domicile' ? '600 DA' : '—'}
                          </span>
                        </div>
                        <div className='recap-total'>
                          <span>Total de la commande</span>
                          <span className='recap-total-prix'>
                            {form.expedition ? totalCommande.toLocaleString() + ' DA' : '—'}
                          </span>
                        </div>
                      </div>

                      <button type='submit' className='btn-confirmer' disabled={!form.expedition}>
                        CONFIRMER LA COMMANDE
                      </button>
                    </form>
                  </div>
                </>
              )}

              {etape === 2 && (
                <div className='confirmation-body'>
                  <div className='confirmation-icone'>✓</div>
                  <h2>Commande confirmée !</h2>
                  <p className='confirmation-sub'>Merci {form.nom} ! Ta commande a bien été enregistrée.</p>
                  <div className='confirmation-numero'>
                    <span className='numero-label'>Numéro de commande</span>
                    <span className='numero-val'>{numeroCommande}</span>
                  </div>
                  <div className='confirmation-details'>
                    <div className='detail-item'>
                      <span className='detail-label'>Email</span>
                      <span className='detail-val'>{form.email}</span>
                    </div>
                    <div className='detail-item'>
                      <span className='detail-label'>Nom complet</span>
                      <span className='detail-val'>{form.nom}</span>
                    </div>
                    <div className='detail-item'>
                      <span className='detail-label'>Adresse</span>
                      <span className='detail-val'>{form.adresse}, {form.ville} {form.codePostal}</span>
                    </div>
                    <div className='detail-item'>
                      <span className='detail-label'>Téléphone</span>
                      <span className='detail-val'>+213 {form.telephone}</span>
                    </div>
                    <div className='detail-item'>
                      <span className='detail-label'>Expédition</span>
                      <span className='detail-val'>
                        {form.expedition === 'bureau' ? 'Bureau — World Express' : 'Livraison à domicile'}
                      </span>
                    </div>
                    <div className='detail-item'>
                      <span className='detail-label'>Paiement</span>
                      <span className='detail-val'>À la livraison</span>
                    </div>
                    <div className='detail-item'>
                      <span className='detail-label'>Sous-total</span>
                      <span className='detail-val'>{totalPanier.toLocaleString()} DA</span>
                    </div>
                    <div className='detail-item'>
                      <span className='detail-label'>Livraison</span>
                      <span className='detail-val'>{fraisLivraison} DA</span>
                    </div>
                    <div className='detail-item total-final'>
                      <span className='detail-label'>Total de la commande</span>
                      <span className='detail-val rouge'>{totalCommande.toLocaleString()} DA</span>
                    </div>
                  </div>
                  <p className='confirmation-msg'>
                    Notre équipe te contactera sous 24h pour confirmer la livraison.
                  </p>
                  <button className='btn-retour' onClick={handleFermerCommande}>
                    RETOUR À LA BOUTIQUE
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {produitModal && (
          <div className='modal-overlay' onClick={fermerModal}>
            <div className='modal-box' onClick={e => e.stopPropagation()}>
              <button className='modal-close' onClick={fermerModal}><FaTimes /></button>
              <div className='modal-img-container'>
                <img src={produitModal.images[imageIndex]} alt={produitModal.nom} className='modal-img' />
                {produitModal.images.length > 1 && (
                  <>
                    <button className='modal-nav prev' onClick={imgPrecedente}><FaChevronLeft /></button>
                    <button className='modal-nav next' onClick={imgSuivante}><FaChevronRight /></button>
                    <div className='modal-dots'>
                      {produitModal.images.map((_, i) => (
                        <div key={i} className={`modal-dot ${i === imageIndex ? 'actif' : ''}`} onClick={() => setImageIndex(i)} />
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className='modal-info'>
                {produitModal.badge && (
                  <div className={`produit-badge ${produitModal.badge === 'Bestseller' ? 'best' : produitModal.badge === 'Promo' ? 'promo' : 'nouveau'}`}>
                    {produitModal.badge}
                  </div>
                )}
                <h3>{produitModal.nom}</h3>
                <div className='modal-avis'>
                  <Etoiles note={produitModal.note} />
                  <span className='avis-note'>{produitModal.note}</span>
                  <span className='avis-count'>({produitModal.avis.toLocaleString()} avis)</span>
                </div>
                <div className='modal-prix-row'>
                  <span className='modal-prix'>{produitModal.prix.toLocaleString()},00 DA</span>
                  {produitModal.ancienPrix && (
                    <span className='modal-prix-old'>{produitModal.ancienPrix.toLocaleString()} DA</span>
                  )}
                </div>
                <div className='modal-stock'>
                  {produitModal.stock ? <span className='en-stock'>En stock</span> : <span className='hors-stock'>Indisponible</span>}
                </div>
                <button
                  className={`btn-ajouter ${!produitModal.stock ? 'disabled' : ''}`}
                  onClick={() => { produitModal.stock && ajouterAuPanier(produitModal); fermerModal() }}
                  disabled={!produitModal.stock}
                >
                  {produitModal.stock ? 'AJOUTER AU PANIER' : 'INDISPONIBLE'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className='nutrition-contenu'>
          <div className='produits-section'>
            <div className='produits-header'>
              <h2>NOS PRODUITS</h2>
              <div className='recherche-box'>
                <FaSearch className='recherche-icone' />
                <input
                  type='text'
                  placeholder='Rechercher un produit...'
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                />
              </div>
            </div>

            <div className='produits-grid'>
              {produitsFiltres.map(p => (
                <div key={p.id} className='produit-carte'>
                  <div className='produit-img-box' onClick={() => ouvrirModal(p)}>
                    <img src={p.images[0]} alt={p.nom} />
                    {p.badge && (
                      <div className={`produit-badge ${p.badge === 'Bestseller' ? 'best' : p.badge === 'Promo' ? 'promo' : 'nouveau'}`}>
                        {p.badge}
                      </div>
                    )}
                    {!p.stock && <div className='indisponible-tag'>Actuellement indisponible</div>}
                    {p.images.length > 1 && <div className='voir-plus'>Voir les photos</div>}
                  </div>
                  <div className='produit-body'>
                    <h3>{p.nom}</h3>
                    <div className='produit-avis'>
                      <Etoiles note={p.note} />
                      <span className='avis-note'>{p.note}</span>
                      <span className='avis-count'>({p.avis.toLocaleString()})</span>
                    </div>
                    <div className='produit-prix-row'>
                      <span className='produit-prix'>{p.prix.toLocaleString()},00 DA</span>
                      {p.ancienPrix && <span className='produit-prix-old'>{p.ancienPrix.toLocaleString()} DA</span>}
                    </div>
                    <div className='produit-stock'>
                      {p.stock ? <span className='en-stock'>En stock</span> : <span className='hors-stock'>Indisponible</span>}
                    </div>
                    <button
                      className={`btn-ajouter ${!p.stock ? 'disabled' : ''}`}
                      onClick={() => p.stock && ajouterAuPanier(p)}
                      disabled={!p.stock}
                    >
                      {p.stock ? 'AJOUTER AU PANIER' : 'INDISPONIBLE'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='conseils-section'>
            <h2>CONSEILS DE DOSAGE & TIMING</h2>
            <div className='conseils-grid'>
              <div className='conseil-block'>
                <h3>Comment bien choisir ?</h3>
                <ol>
                  <li>Définir l'objectif : prise de masse, sèche, énergie, récupération</li>
                  <li>Lire l'étiquette : ingrédients identifiables, sucres ajoutés limités</li>
                  <li>Calibrer le dosage selon le poids et l'entraînement</li>
                  <li>Tester la tolérance : commencer petit, observer digestion</li>
                  <li>Suivre les marqueurs : énergie, performances, poids hebdo</li>
                </ol>
              </div>
              <div className='tableau-block'>
                <h3>Repères protéines & timing</h3>
                <table className='dosage-table'>
                  <thead>
                    <tr>
                      <th>Objectif</th>
                      <th>Apport total</th>
                      <th>Timing utile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableauDosage.map((row, i) => (
                      <tr key={i}>
                        <td>{row.objectif}</td>
                        <td className='val-rouge'>{row.apport}</td>
                        <td>{row.timing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='faq-section'>
            <h2>FAQ — NUTRITION SPORTIVE</h2>
            <div className='faq-grid'>
              <div className='faq-item'>
                <h4>Quelle protéine choisir pour débuter ?</h4>
                <p>La whey concentrée est polyvalente et économique. L'isolate est plus pure et mieux tolérée. Place une portion post-séance si ton alimentation ne couvre pas l'objectif quotidien.</p>
              </div>
              <div className='faq-item'>
                <h4>La créatine est-elle efficace ?</h4>
                <p>Oui, c'est le complément le plus documenté. Elle augmente la force et les performances lors des efforts intenses. Une dose de 3 à 5g par jour suffit.</p>
              </div>
              <div className='faq-item'>
                <h4>Un brûleur suffit-il pour maigrir ?</h4>
                <p>Non. Il n'a d'intérêt que si la base est déjà en place : déficit modéré, entraînement de force, sommeil suffisant.</p>
              </div>
              <div className='faq-item'>
                <h4>Quand prendre les BCAA ?</h4>
                <p>Avant ou pendant l'entraînement pour limiter le catabolisme musculaire. Utile surtout en période de sèche ou si l'apport protéique total est insuffisant.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <Footer />
        </>
  )
}

export default Nutrition