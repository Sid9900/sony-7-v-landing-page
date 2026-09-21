'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, Menu, Pause, Play, ShoppingBag, Sparkles, X } from 'lucide-react'

const sony = (id: string) => `https://www.sony.co.jp/en/Products/di_photo-gallery/images/extralarge/${id}.JPG`

const highlights = [
  { name: 'Sensor', title: '33 megapixels. 16 stops.', copy: 'A new partially stacked sensor built to hold the whole scene.', image: '2664' },
  { name: 'Speed', title: '30 fps. Zero blackout.', copy: 'Every frame tracked, every expression preserved.', image: '2663' },
  { name: 'Autofocus', title: 'AI that sees the subject.', copy: 'People, animals, birds, insects, cars, trains and aircraft.', image: '2660' },
  { name: 'Stabilisation', title: 'Steady hands, optional.', copy: 'Up to 7.5 stops of five-axis image stabilisation.', image: '2659' },
  { name: 'Video', title: '7K in. 4K out.', copy: 'Full pixel readout for beautifully clean motion.', image: '2676' },
  { name: 'Monitor', title: 'Every angle covered.', copy: 'Tilts, flips, swings and rotates with precision.', image: '2667' },
]

const gallery = [
  ['2667', 'FE 50mm F1.2 GM', '1/800s · f/4 · ISO 100'],
  ['2663', 'FE 70-200mm F2.8 GM OSS II', '1/4000s · f/2.8 · ISO 200'],
  ['2658', 'FE 35mm F1.4 GM', '1/250s · f/1.4 · ISO 3200'],
  ['2665', 'FE 24-70mm F2.8 GM II', '1/320s · f/8 · ISO 100'],
  ['2660', 'FE 70-300mm F4.5-5.6 G OSS', '1/2500s · f/5.6 · ISO 800'],
]

const accessories = [
  ['FE 28-70mm F3.5-5.6 OSS II', 'The everyday kit lens', '£—', '2667'],
  ['FE 24-70mm F2.8 GM II', 'One lens for almost everything', '£—', '2665'],
  ['FE 50mm F1.2 GM', 'Uncompromising portrait depth', '£—', '2658'],
  ['FE 35mm F1.4 GM', 'The natural perspective', '£—', '2666'],
  ['FE 70-200mm F2.8 GM OSS II', 'Reach without compromise', '£—', '2657'],
  ['FE 100-400mm F5.6-8 OSS', 'Bring distant stories closer', '£—', '2766'],
]

function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow">{children}</p> }
function Caption({ children }: { children: React.ReactNode }) { return <p className="caption">Shot on α7 V <span>·</span> {children}</p> }
function CameraArt({ large = false }: { large?: boolean }) { return <div className={`camera-art ${large ? 'camera-art-large' : ''}`} aria-label="Sony alpha 7 V camera illustration"><div className="camera-top" /><div className="camera-body"><div className="camera-grip" /><div className="camera-lens"><i /><i /><i /></div><div className="camera-screen" /></div><span className="camera-mark">α7 V</span></div> }

function Nav({ bag }: { bag: number }) {
  return <>
    <header className="global-nav"><a href="#top" className="wordmark">Cotswold Camera</a><button className="bag" aria-label={`${bag} items in bag`}><ShoppingBag size={18} /><b>{bag}</b></button></header>
    <nav className="local-nav"><a href="#top" className="local-brand">α7 V</a><div className="local-links">{['Overview','Sensor','Speed','Autofocus','Video','Design','Specs'].map((item) => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}</div><a href="#kit" className="buy-pill">Buy</a><button className="menu-button" aria-label="Open menu"><Menu size={19} /></button></nav>
  </>
}

function Highlights() {
  const [active, setActive] = useState(0); const [playing, setPlaying] = useState(true)
  return <section className="dark section-pad" id="highlights"><div className="container"><div className="section-head"><div><Eyebrow>Explore α7 V</Eyebrow><h2>Small camera.<br /><em>Huge ambition.</em></h2></div><button className="icon-button" onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause carousel' : 'Play carousel'}>{playing ? <Pause size={16} /> : <Play size={16} />}</button></div><div className="highlight-card"><AnimatePresence mode="wait"><motion.img key={active} src={sony(highlights[active].image)} alt={highlights[active].name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .4 }} /></AnimatePresence><div className="card-overlay"><Eyebrow>{highlights[active].name}</Eyebrow><h3>{highlights[active].title}</h3><p>{highlights[active].copy}</p></div></div><div className="highlight-tabs">{highlights.map((item, index) => <button key={item.name} className={active === index ? 'active' : ''} onClick={() => setActive(index)}><span>{item.name}</span><i /></button>)}</div></div></section>
}

function LightSection({ id, eyebrow, title, copy, image, children }: { id: string; eyebrow: string; title: string; copy: string; image?: string; children?: React.ReactNode }) { return <section className="light section-pad" id={id}><div className="container two-col"><div className="sticky-copy"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><p className="lead">{copy}</p>{children}</div>{image && <figure className="feature-figure"><img src={sony(image)} alt={title} /><Caption>FE 24-70mm F2.8 GM II · 1/500s · f/5.6 · ISO 100</Caption></figure>}</div></section> }

function App() {
  const [bag, setBag] = useState(0); const [category, setCategory] = useState('Lenses'); const [lightbox, setLightbox] = useState<string | null>(null); const [faq, setFaq] = useState<number | null>(null); const reduce = useReducedMotion()
  const add = () => setBag((n) => n + 1)
  const specs = useMemo(() => [['Sensor','33MP partially stacked Exmor RS'],['Processor','BIONZ XR2 + AI processing unit'],['AF','759 phase-detection points'],['Burst','Up to 30 fps blackout-free'],['Stabilisation','Up to 7.5 stops'],['Video','4K 120p · 10-bit 4:2:2'],['Monitor','3.2-inch, 2.1M-dot vari-angle'],['Viewfinder','3.68M-dot OLED · 120 fps'],['Battery','NP-FZ100 · up to 750 shots'],['Storage','CFexpress Type A + SD'],['Connectivity','Wi-Fi 6 · USB 10Gbps'],['Build','Magnesium alloy chassis']], [])
  return <main id="top"><Nav bag={bag} /><section className="hero dark"><div className="hero-glow" /><img className="hero-image" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image1.png-ERcyGjqbPxdWlELbrwzDv1r8Zn07bz.avif" alt="Sony alpha camera in a dramatic studio setting" /><div className="hero-copy"><Eyebrow>New</Eyebrow><motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: .8 }}>α7 V</motion.h1><p className="hero-sub">Sees more. Misses nothing.</p><p className="hero-price">Body only <strong>£1,729.</strong></p><div className="cta-row"><a className="button accent" href="#kit">Buy <ArrowRight size={16} /></a><a className="text-link" href="#film"><Play size={14} fill="currentColor" /> Watch the film</a></div></div><div className="scroll-note">Scroll to explore <span>↓</span></div></section><Highlights />
    <LightSection id="sensor" eyebrow="Image quality" title="The whole scene. Shadow to sky." copy="An enhanced 33MP partially stacked Exmor RS sensor reads out roughly 4.5x faster, paired with BIONZ XR2 and its built-in AI processing unit. Up to 16 stops of dynamic range hold smooth gradations from the deepest shadow to the brightest highlight." image="2666"><div className="stat-row"><strong>33.0MP</strong><strong>16 <small>stops</small></strong><strong>1/16000s</strong><strong>ISO 100–51200</strong></div></LightSection>
    <section className="dark speed-band" id="speed"><div className="container speed-layout"><div><Eyebrow>Speed</Eyebrow><h2>30 frames a second.<br /><em>Zero blackout.</em></h2><p className="lead">Blackout-free bursts at up to 30 fps with full AF/AE tracking and up to 60 calculations per second. Expressions, splashes, sprint finishes: all of it.</p><div className="fps"><strong>30</strong><span>fps</span></div></div><figure><img src={sony('2663')} alt="Action captured on Sony alpha 7 V" /><Caption>FE 70-200mm F2.8 GM OSS II · 1/6400s · f/2.8 · ISO 400</Caption></figure></div></section>
    <LightSection id="autofocus" eyebrow="AI autofocus" title="It knows what you’re looking at." copy="Real-time Recognition AF with human pose estimation recognises about 30% better than α7 IV, with about 50% better bird recognition. 759 phase-detection points cover roughly 94% of the frame and focus down to EV-4.0." image="2765"><div className="stat-row"><strong>759 <small>AF points</small></strong><strong>~94% <small>coverage</small></strong><strong>EV-4.0</strong></div><div className="chips">{['Human','Animal','Bird','Car / Train','Auto'].map((x) => <button key={x}>{x}</button>)}</div></LightSection>
    <section className="dark section-pad video-section" id="video"><div className="container"><Eyebrow>Video</Eyebrow><h2>7K in. <em>4K out.</em></h2><p className="lead narrow">Full pixel readout with no binning, oversampled into 4K 60p with minimal moiré. Shoot 4K up to 120p for 5x slow motion.</p><div className="pixel-grid"><span>7K readout</span><div className="pixels" /><span>4K output</span></div><div className="stat-row"><strong>4K 120p</strong><strong>FHD 240p</strong><strong>10-bit 4:2:2</strong><strong>~90 min</strong></div></div></section>
    <section className="light section-pad viewer" id="design"><div className="container viewer-grid"><div><Eyebrow>Take a closer look</Eyebrow><h2>Every angle<br />covered.</h2><p className="lead">A monitor that moves with the moment. Drag the dial or choose a pose.</p><div className="pose-tabs">{['Closed','Tilt up 98°','Tilt down 40°','Flip out 180°','Vlog'].map((x, i) => <button key={x} onClick={() => document.documentElement.style.setProperty('--pose', `${i * 18}deg`)}>{x}</button>)}</div></div><div className="viewer-stage"><CameraArt /><div className="viewer-screen"><img src={sony('2667')} alt="Screen preview" /></div><input aria-label="Drag to open monitor" type="range" min="0" max="100" defaultValue="18" /><p className="drag-label">Drag to open <span>↔</span></p></div></div><p className="center-note">3.2-inch 2.1-million-dot touchscreen · wide colour gamut · clear in bright light.</p></section>
    <section className="dark section-pad design" id="design-build"><div className="container"><Eyebrow>Design & build</Eyebrow><h2>Built for the long lens<br /><em>and the long day.</em></h2><div className="bento-grid">{[['Magnesium alloy chassis','Top, front, rear and internal frame.'],['Dust and moisture resistant','Sealed seams for rough weather.'],['Σ heat dissipation','A graphite path pulls heat off the sensor.'],['3.68M-dot OLED viewfinder','Up to 120 fps finder refresh.'],['Battery','Up to 750 shots on the monitor.'],['Grip','Reshaped for long days behind long lenses.']].map(([a,b], i) => <article key={a} className={`bento bento-${i}`}><Sparkles size={18} /><h3>{a}</h3><p>{b}</p></article>)}</div></div></section>
    <section className="light section-pad workflow"><div className="container"><Eyebrow>Workflow</Eyebrow><h2>From card to client, faster.</h2><div className="workflow-row">{['Two USB-C ports','CFexpress Type A + SD','Wi-Fi 6 · 2x2 MIMO','4K live streaming','Compressed RAW','C2PA authenticity'].map((x) => <div key={x}><span>＋</span><p>{x}</p></div>)}</div></div></section>
    <section className="dark section-pad gallery-section"><div className="container"><Eyebrow>Shot on α7 V</Eyebrow><h2>Make room for<br /><em>the unexpected.</em></h2><div className="gallery-row">{gallery.map(([id,lens,settings]) => <button key={id} onClick={() => setLightbox(id)}><img src={sony(id)} alt={`Shot on alpha 7 V with ${lens}`} /><span><b>{lens}</b><small>{settings}</small></span></button>)}</div></div></section>
    <section className="light section-pad kit" id="kit"><div className="container"><Eyebrow>Accessories</Eyebrow><h2>Complete the kit.</h2><div className="bundle"><div><span>Bundle builder</span><strong>α7 V body + {category === 'Lenses' ? 'FE 28-70mm' : category}</strong></div><b>£1,729</b><button className="button accent" onClick={add}>Add body <ArrowRight size={16} /></button></div><div className="category-tabs">{['Lenses','Memory','Power','Support','Bags'].map((x) => <button className={category === x ? 'active' : ''} onClick={() => setCategory(x)} key={x}>{x}</button>)}</div><div className="product-grid">{accessories.map(([name,benefit,price,id]) => <article key={name}><img src={sony(id)} alt={name} /><div><h3>{category === 'Lenses' ? name : `[${category.toUpperCase()}] ${name.split(' ').slice(0,2).join(' ')}`}</h3><p>{benefit}</p><div className="product-bottom"><strong>{price}</strong><button onClick={add}>Add to bag</button></div></div></article>)}</div></div></section>
    <section className="dark section-pad specs" id="specs"><div className="container spec-columns"><div><Eyebrow>Specs at a glance</Eyebrow><h2>Everything<br /><em>you need to know.</em></h2><div className="spec-list">{specs.map(([a,b]) => <div key={a}><span>{a}</span><b>{b}</b></div>)}</div></div><div className="faq"><Eyebrow>FAQ</Eyebrow>{['When will my camera arrive?','Can I trade in my old camera?','Do you offer finance?','What is the warranty?','α7 IV or α7 V?'].map((q,i) => <div className="faq-item" key={q}><button onClick={() => setFaq(faq === i ? null : i)}><span>{q}</span>{faq === i ? <X size={17} /> : <ChevronDown size={17} />}</button><AnimatePresence>{faq === i && <motion.p initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}>Our camera specialists are here to help. Contact Cotswold Camera for a clear answer tailored to your kit.</motion.p>}</AnimatePresence></div>)}</div></div></section>
    <footer className="footer dark"><div className="container footer-cta"><img className="footer-cta-image" src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image2.png-YPz5VFDxLPg53ZeI6llukjKVVqbaO0.avif" alt="Sony alpha camera ready for a new shoot" /><Eyebrow>Ready when you are</Eyebrow><h2>α7 V.</h2><p>Body only £1,729. Kits and bundles available.</p><div className="cta-row"><a className="button accent" href="#kit">Buy <ArrowRight size={16} /></a><a className="text-link" href="#specs">Compare cameras</a></div></div><div className="container footer-bottom"><b>Cotswold Camera</b><div>{['Shop','Lenses','Accessories','Trade-in','Finance','Delivery','Contact'].map((x) => <a href="#kit" key={x}>{x}</a>)}</div><small>Sony, α and related marks are trademarks of Sony Group Corporation.</small></div></footer>
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true"><button onClick={() => setLightbox(null)} aria-label="Close image"><X /></button><img src={sony(lightbox)} alt="Expanded gallery image" /></div>}
  </main>
}

export default function Page() { return <App /> }
