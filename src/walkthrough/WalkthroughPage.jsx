import React, {useEffect, useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import content from './content.json'
import './walkthrough.css'

const asset = (name) => `${import.meta.env.BASE_URL}walkthrough/${name}`
const time = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`

export default function WalkthroughPage() {
  const video = useRef(null)
  const pendingSeek = useRef(null)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    const previous = document.title
    document.title = 'Recorrido del dashboard · Exploradores del Rey'
    return () => { document.title = previous }
  }, [])
  const seek = (seconds) => {
    if (video.current.readyState > 0) video.current.currentTime = seconds
    else pendingSeek.current = seconds
    video.current.focus()
  }
  return (
    <div className="walkthrough-page">
      <a className="walkthrough-skip" href="#recorrido">Ir al video</a>
      <header className="walkthrough-header">
        <Link to="/" className="walkthrough-brand"><span aria-hidden="true">ER</span> Exploradores del Rey</Link>
        <Link to="/auth/login">Entrar al dashboard <span aria-hidden="true">↗</span></Link>
      </header>
      <main>
        <div className="walkthrough-intro">
          <div>
            <p className="walkthrough-eyebrow">Una guía para administrar tu sitio</p>
            <h1>Tu sitio, paso a paso.</h1>
            <p>Edita el contenido, revisa el resultado y compártelo con tu comunidad.</p>
          </div>
          <p className="walkthrough-meta">{content.durationLabel} min · Español<br />Sin audio · Datos de demostración</p>
        </div>
        {content.provisional && <p role="status">Clip provisional. El recorrido completo se incorporará en esta misma página.</p>}
        <section id="recorrido" aria-label="Video de demostración">
          <video ref={video} aria-label="Recorrido del dashboard" controls playsInline preload="metadata"
            poster={asset('poster.jpg')} onError={() => setFailed(true)}
            onLoadedMetadata={() => {
              if (pendingSeek.current !== null) {
                video.current.currentTime = pendingSeek.current
                pendingSeek.current = null
              }
            }}>
            <source src={asset('exploradores-walkthrough.mp4')} type="video/mp4" />
            <track kind="captions" src={asset('exploradores-walkthrough.vtt')} srcLang="es" label="Español" />
            Tu navegador no puede reproducir este video. Usa el enlace de descarga.
          </video>
          {failed && <p role="alert">No se pudo cargar el video. Intenta recargar la página o descarga el archivo para verlo en tu equipo.</p>}
          <div className="walkthrough-actions">
            <p>Los textos están integrados en el video. Puedes pausarlo, avanzar o abrirlo en pantalla completa.</p>
            <a download href={asset('exploradores-walkthrough.mp4')}>Descargar el video <span aria-hidden="true">↓</span></a>
          </div>
        </section>
        <section className="walkthrough-transcript" aria-labelledby="transcripcion">
          <div className="walkthrough-transcript-heading">
            <h2 id="transcripcion">Transcripción en español</h2>
            <a download href={asset('exploradores-walkthrough.vtt')}>Descargar textos (VTT)</a>
          </div>
          <p>Elige un capítulo para situarte en ese punto del video.</p>
          <ol>
            {content.chapters.map((chapter) => (
              <li key={chapter.id}>
                <button type="button" onClick={() => seek(chapter.start)} aria-label={`Ir a ${chapter.title}`}>
                  <span>{time(chapter.start)}</span> {chapter.title.replace(/^\d+ \/ /, '')}
                </button>
                <div>{chapter.captions.map((caption) => <p key={caption}>{caption}</p>)}</div>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <footer><span>Exploradores del Rey · Administración del sitio</span><Link to="/">Volver al sitio</Link></footer>
    </div>
  )
}
