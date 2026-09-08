import React, { useState } from 'react'
import { FaSearch, FaShoppingCart, FaTrash, FaStar, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Sidebar from '../components/Sidebar'
import './Boutique.css'
import livres from '../livres';
import Footer from '../components/Footer'

const produits = [
  {
    id: 1, nom: 'Haltères réglables 20kg la paire', prix: 12000, ancienPrix: 15000,
    categorie: 'equipement', badge: 'Bestseller', note: 4.8, avis: 1243,
    images: [
      'https://oj-fitness.com/wp-content/uploads/2021/10/81AZQEBwzkL._SL1500_.jpg',
      'https://oj-fitness.com/wp-content/uploads/2021/10/20kgs.jpg',
    ],
    stock: true
  },
  {
    id: 2, nom: 'Barre olympique 20kg + disques 100kg', prix: 28000, ancienPrix: null,
    categorie: 'equipement', badge: null, note: 4.7, avis: 876,
    images: [
      'https://cdn3.sveltus.com/10973-medium_default/pack-bumper-barre-olympique-offerte.jpg',
    ],
    stock: true
  },
  {
    id: 3, nom: 'Banc de musculation multifonction', prix: 18500, ancienPrix: 22000,
    categorie: 'equipement', badge: 'Promo', note: 4.6, avis: 654,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmZAVH0Zf1EutgVEijmfk7VWzoFzwiVzRdYWAH5iyWWhPkxmqlLVLEEnY&s=10',
      'https://i5.walmartimages.ca/asr/34fd2723-096a-4b20-add0-f64a88d9f677.0e85ec39a07cf4c2c9731b93b7ed7549.jpeg',
    ],
    stock: true
  },
  {
    id: 4, nom: 'Kettlebell fonte 4/8/12/16/20kg', prix: 4500, ancienPrix: null,
    categorie: 'equipement', badge: null, note: 4.5, avis: 432,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgteqWmpmlJadX29BfFmmQi9Uw4LQHbr0yf-EOwEPV7wKNBzsZeqbWfAgL&s=10',
    ],
    stock: true
  },
  {
    id: 5, nom: 'Corde à sauter HOXWC 0,9kg', prix: 1800, ancienPrix: null,
    categorie: 'equipement', badge: 'Nouveau', note: 4.4, avis: 287,
    images: [
      'https://m.media-amazon.com/images/I/81iPFM4U-7L._AC_UF1000,1000_QL80_.jpg',
      'https://m.media-amazon.com/images/I/81UWVzFt7ML._AC_UF350,350_QL80_.jpg'
    ],
    stock: true
  },
  {
    id: 6, nom: 'Bandes de résistance set x5', prix: 1200, ancienPrix: 1500,
    categorie: 'equipement', badge: 'Promo', note: 4.6, avis: 923,
    images: [
      'https://contents.mediadecathlon.com/p3123632/k$c968ec5a51066135865e43b207815ff7/picture.jpg',
      'https://contents.mediadecathlon.com/m14008124/k$73fb8fbca6bc8a88c0671129725b82b4/picture.jpg'
    ],
    stock: false
  },
  {
    id: 7, nom: 'Gants de musculation DECATHLON', prix: 2000, ancienPrix: 3000,
    categorie: 'accessoire', badge: 'Promo', note: 4.7, avis: 1102,
    images: [
      'https://contents.mediadecathlon.com/p2832343/k$efa3342d40b108ce1a1e898b507c5555/gants-de-musculation-support-poignets-et-adherence-noir.jpg',
      'https://contents.mediadecathlon.com/p2832419/k$e353522db25414f5b3c8d6f4644821f6/gants-de-musculation-support-poignets-et-adherence-noir.jpg',
    ],
    stock: true
  },
  {
    id: 8, nom: 'Ceinture lombaire DECATHLON', prix: 4000, ancienPrix: null,
    categorie: 'accessoire', badge: null, note: 4.8, avis: 765,
    images: [
      'https://contents.mediadecathlon.com/p2816258/k$c15212b8221c9a12ea8f22432def1247/ceinture-lombaire-de-musculation-en-cuir-resistante-noire.jpg',
      'https://contents.mediadecathlon.com/p2816259/k$d2d437b2b2a39c155505e86d8026b198/ceinture-lombaire-de-musculation-en-cuir-resistante-noire.jpg'
    ],
    stock: true
  },
  {
    id: 9, nom: 'Straps de poignets DECATHLON', prix: 2000, ancienPrix: null,
    categorie: 'accessoire', badge: 'Nouveau', note: 4.5, avis: 341,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoLljYbbsFXmuZsA3hxS3edGLl63QIs6J8IS0E2l2Cmn5TkBrHguRW0Og&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzm4z54laCGYILdPBBEDwGrZbLjWBkDsTq58fYamIBHKBSPTYqufQLPDEK&s=10'
    ],
    stock: true
  },
  {
    id: 10, nom: 'Shaker Blender Ball 700ml', prix: 750, ancienPrix: null,
    categorie: 'accessoire', badge: null, note: 4.3, avis: 512,
    images: [
      'https://cultstore.com/cdn/shop/files/4_5b6eebdf-42e5-4815-a72b-2333fabeb841.png?v=1787293975&width=4320',
    ],
    stock: true
  },
  {
    id: 11, nom: 'Genouillères de sport compression', prix: 1400, ancienPrix: 1800,
    categorie: 'accessoire', badge: 'Promo', note: 4.6, avis: 289,
    images: [
      'https://nutribeast.tn/1735-thickbox_default/genouillere-de-compression-gsn.jpg',
    ],
    stock: true
  },
  {
    id: 12, nom: 'T-shirt compression dry-fit NIKE', prix: 4500, ancienPrix: null,
    categorie: 'vetement', badge: null, note: 4.5, avis: 678,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS31X-wdbkddNOFthjJue8WTKLYNGkUM-m4Z0TGjsRz6WRy6VceDbRQ5WBd&s=10',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSusKbDLfUaQvWfkOZcJysxWQjDV3kQ1EK4SMPhl3Jzc3Hv73BoWZbxFM&s=10'
    ],
    stock: true
  },
  {
    id: 13, nom: 'Legging sport femme NIKE', prix: 3200, ancienPrix: 4000,
    categorie: 'vetement', badge: 'Promo', note: 4.7, avis: 934,
    images: [
      'https://media.intersport.fr/is/image/intersportfr/CZ8530_394_FA?$product_grey$&layer=comp&fit=constrain,0&$produit_xl$&fmt=webp',
      'https://static.nike.com/a/images/f_auto/dpr_2.6,cs_srgb/h_485,c_limit/4c47f880-94f2-4121-bcef-270969ce4ad1/notre-guide-des-meilleurs-leggings-pour-femme.png'
    ],
    stock: true
  },
  {
    id: 14, nom: 'Short musculation NIKE', prix: 2000, ancienPrix: null,
    categorie: 'vetement', badge: null, note: 4.4, avis: 423,
    images: [
      'https://thumblr.uniid.it/product/266469/7bd29c4173d7.jpg?width=3840&format=webp&q=75',
      'https://cdn.plutosport.com/a/ProductMedia/Nike/P.NIKE.SHO.2388/Nike-Court-Dri-FIT-Victory-Short-Heren_7-2405031408.jpg?profile=max_width_mobile'
    ],
    stock: true
  },
  {
    id: 15, nom: 'Chaussures cross-training HOKA', prix: 9500, ancienPrix: 12000,
    categorie: 'vetement', badge: 'Promo', note: 4.8, avis: 1567,
    images: [
      'https://dms.deckers.com/hoka/image/upload/t_product-medium-wp/v1773159855/1171894-BFS_1.png?_s=RAABAB0',
      'https://dms.deckers.com/hoka/image/upload/t_product-medium-wp/v1764698521/1171893-BBLC_1.png?_s=RAABAB0',
      'https://dms.deckers.com/hoka/image/upload/t_product-medium-wp/v1764698511/1171894-PYMD_1.png?_s=RAABAB0',
      'https://dms.deckers.com/hoka/image/upload/t_product-medium-wp/v1764698487/1171893-GFD_1.png?_s=RAABAB0'
    ],
    stock: false
  },
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

function Boutique() {
  const [recherche, setRecherche] = useState('')
  const [filtre, setFiltre] = useState('tous')
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

  const tousLesProduits = [...produits, ...livres]

  const produitsFiltres = tousLesProduits.filter(p => {
    const matchCat = filtre === 'tous' ||
      (filtre === 'equipement' && p.categorie === 'equipement') ||
      (filtre === 'accessoire' && p.categorie === 'accessoire') ||
      (filtre === 'vetement' && p.categorie === 'vetement') ||
      (filtre === 'livre' && p.id >= 101)
    const matchRecherche = p.nom.toLowerCase().includes(recherche.toLowerCase())
    return matchCat && matchRecherche
  })

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

  const getCatLabel = (cat) => {
    if (cat === 'equipement') return 'ÉQUIPEMENT'
    if (cat === 'accessoire') return 'ACCESSOIRE'
    if (cat === 'vetement') return 'VÊTEMENT'
    return 'LIVRE'
  }

  return (
    <>
    <div className='boutique-wrapper'>
      <Sidebar />
      <div className='boutique-main'>

        <div className='boutique-hero'>
          <img src='https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=300&fit=crop' alt='gym' className='hero-img' />
          <div className='hero-overlay'>
            <div className='hero-tag'>FITTRACK SHOP</div>
            <h1>Équipe-toi. Performe.<br /><span>Dépasse tes limites.</span></h1>
          </div>
          <div className='panier-flottant' onClick={() => setShowPanier(!showPanier)}>
            <FaShoppingCart />
            {nbPanier > 0 && <span className='panier-badge'>{nbPanier}</span>}
          </div>
        </div>

        <div className='categories-bandeau'>
          {['tous', 'equipement', 'accessoire', 'vetement', 'livre'].map(f => (
            <div
              key={f}
              className={`cat-item ${filtre === f ? 'actif' : ''}`}
              onClick={() => setFiltre(f)}
            >
              {f === 'tous' ? 'TOUS' :
               f === 'equipement' ? 'ÉQUIPEMENT' :
               f === 'accessoire' ? 'ACCESSOIRES' :
               f === 'vetement' ? 'VÊTEMENTS' : 'LIVRES'}
            </div>
          ))}
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
                        <input type='email' placeholder='ton@email.com' value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                      </div>
                      <div className='form-section-titre'>LIVRAISON</div>
                      <div className='champ'>
                        <label>Nom complet</label>
                        <input type='text' placeholder='Nom et prénom' value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} required />
                      </div>
                      <div className='champ'>
                        <label>Adresse</label>
                        <input type='text' placeholder='Rue, numéro, quartier...' value={form.adresse} onChange={e => setForm({...form, adresse: e.target.value})} required />
                      </div>
                      <div className='form-row-2'>
                        <div className='champ'>
                          <label>Ville</label>
                          <input type='text' placeholder='Ex: Batna' value={form.ville} onChange={e => setForm({...form, ville: e.target.value})} required />
                        </div>
                        <div className='champ'>
                          <label>Code postal</label>
                          <input type='text' placeholder='Ex: 05000' value={form.codePostal} onChange={e => setForm({...form, codePostal: e.target.value})} required />
                        </div>
                      </div>
                      <div className='champ'>
                        <label>Numéro de téléphone</label>
                        <div className='input-prefix'>
                          <span className='prefix'>+213</span>
                          <input type='tel' placeholder='XXXXXXXXX' value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} required />
                        </div>
                      </div>
                      <div className='form-section-titre'>MÉTHODE D'EXPÉDITION</div>
                      <div className='expedition-options'>
                        <div className={`expedition-option ${form.expedition === 'bureau' ? 'actif' : ''}`} onClick={() => setForm({...form, expedition: 'bureau'})}>
                          <div className='exp-radio'>{form.expedition === 'bureau' && <div className='exp-radio-inner'></div>}</div>
                          <div className='exp-info'>
                            <div className='exp-nom'>Bureau — World Express</div>
                            <div className='exp-desc'>Retrait au bureau de livraison le plus proche</div>
                          </div>
                          <div className='exp-prix'>450 DA</div>
                        </div>
                        <div className={`expedition-option ${form.expedition === 'domicile' ? 'actif' : ''}`} onClick={() => setForm({...form, expedition: 'domicile'})}>
                          <div className='exp-radio'>{form.expedition === 'domicile' && <div className='exp-radio-inner'></div>}</div>
                          <div className='exp-info'>
                            <div className='exp-nom'>Livraison à domicile</div>
                            <div className='exp-desc'>Livré directement chez vous sous 2 à 5 jours</div>
                          </div>
                          <div className='exp-prix'>600 DA</div>
                        </div>
                      </div>
                      <div className='form-section-titre'>PAIEMENT</div>
                      <div className='paiement-option'>
                        <div className='exp-radio actif-radio'><div className='exp-radio-inner'></div></div>
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
                          <span>{form.expedition === 'bureau' ? '450 DA' : form.expedition === 'domicile' ? '600 DA' : '—'}</span>
                        </div>
                        <div className='recap-total'>
                          <span>Total de la commande</span>
                          <span className='recap-total-prix'>{form.expedition ? totalCommande.toLocaleString() + ' DA' : '—'}</span>
                        </div>
                      </div>
                      <button type='submit' className='btn-confirmer' disabled={!form.expedition}>CONFIRMER LA COMMANDE</button>
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
                    <div className='detail-item'><span className='detail-label'>Email</span><span className='detail-val'>{form.email}</span></div>
                    <div className='detail-item'><span className='detail-label'>Nom complet</span><span className='detail-val'>{form.nom}</span></div>
                    <div className='detail-item'><span className='detail-label'>Adresse</span><span className='detail-val'>{form.adresse}, {form.ville} {form.codePostal}</span></div>
                    <div className='detail-item'><span className='detail-label'>Téléphone</span><span className='detail-val'>+213 {form.telephone}</span></div>
                    <div className='detail-item'><span className='detail-label'>Expédition</span><span className='detail-val'>{form.expedition === 'bureau' ? 'Bureau — World Express' : 'Livraison à domicile'}</span></div>
                    <div className='detail-item'><span className='detail-label'>Paiement</span><span className='detail-val'>À la livraison</span></div>
                    <div className='detail-item'><span className='detail-label'>Sous-total</span><span className='detail-val'>{totalPanier.toLocaleString()} DA</span></div>
                    <div className='detail-item'><span className='detail-label'>Livraison</span><span className='detail-val'>{fraisLivraison} DA</span></div>
                    <div className='detail-item total-final'><span className='detail-label'>Total de la commande</span><span className='detail-val rouge'>{totalCommande.toLocaleString()} DA</span></div>
                  </div>
                  <p className='confirmation-msg'>Notre équipe te contactera sous 24h pour confirmer la livraison.</p>
                  <button className='btn-retour' onClick={handleFermerCommande}>RETOUR À LA BOUTIQUE</button>
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
                {produitModal.images && produitModal.images.length > 0 ? (
                  <>
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
                  </>
                ) : produitModal.couleur ? (
                  <div className='modal-livre-cover' style={{ background: produitModal.couleur }}>
                    <div className='modal-livre-titre'>{produitModal.nom}</div>
                    <div className='modal-livre-auteur'>{produitModal.auteur}</div>
                  </div>
                ) : null}
              </div>
              <div className='modal-info'>
                {produitModal.badge && (
                  <div className={`produit-badge ${produitModal.badge === 'Bestseller' || produitModal.badge === 'Populaire' ? 'best' : produitModal.badge === 'Promo' ? 'promo' : 'nouveau'}`}>
                    {produitModal.badge}
                  </div>
                )}
                <h3>{produitModal.nom}</h3>
                {produitModal.auteur && <div className='modal-auteur'>{produitModal.auteur}</div>}
                {produitModal.description && <p className='modal-desc-livre'>{produitModal.description}</p>}
                <div className='modal-avis'>
                  <Etoiles note={produitModal.note} />
                  <span className='avis-note'>{produitModal.note}</span>
                  <span className='avis-count'>({produitModal.avis.toLocaleString()} avis)</span>
                </div>
                <div className='modal-prix-row'>
                  <span className='modal-prix'>{produitModal.prix.toLocaleString()},00 DA</span>
                  {produitModal.ancienPrix && <span className='modal-prix-old'>{produitModal.ancienPrix.toLocaleString()} DA</span>}
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

        <div className='boutique-contenu'>
          <div className='produits-section'>
            <div className='produits-header'>
              <h2>
                {filtre === 'tous' ? 'TOUS LES PRODUITS' :
                 filtre === 'equipement' ? 'ÉQUIPEMENT' :
                 filtre === 'accessoire' ? 'ACCESSOIRES' :
                 filtre === 'vetement' ? 'VÊTEMENTS' : 'LIVRES'}
              </h2>
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
                    {p.images && p.images.length > 0 ? (
                      <img src={p.images[0]} alt={p.nom} />
                    ) : p.couleur ? (
                      <div className='livre-cover-mini' style={{ background: p.couleur }}>
                        <div className='livre-mini-titre'>{p.nom}</div>
                        <div className='livre-mini-auteur'>{p.auteur}</div>
                      </div>
                    ) : null}
                    {p.badge && (
                      <div className={`produit-badge ${p.badge === 'Bestseller' || p.badge === 'Populaire' ? 'best' : p.badge === 'Promo' ? 'promo' : 'nouveau'}`}>
                        {p.badge}
                      </div>
                    )}
                    {!p.stock && <div className='indisponible-tag'>Actuellement indisponible</div>}
                    {p.images && p.images.length > 1 && <div className='voir-plus'>Voir les photos</div>}
                  </div>
                  <div className='produit-body'>
                    {p.auteur && <div className='produit-auteur'>{p.auteur}</div>}
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
        </div>
      </div>
    </div>
    <Footer />
     </>
  )
}

export default Boutique