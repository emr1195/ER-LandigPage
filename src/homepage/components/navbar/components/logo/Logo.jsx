import React, {useState} from 'react'
import {Link as RouterLink} from 'react-router-dom'

export const Logo = ({logo = '', title = '', showTitle = false}) => {
  const [failedSource, setFailedSource] = useState(null)
  return <RouterLink className="institutional-logo" to="/" aria-label="Exploradores del Rey Panamá — Inicio">
    {logo && failedSource !== logo ? <img src={logo} alt="Emblema de los Exploradores del Rey" width={72} height={72} loading="eager" decoding="async" onError={() => setFailedSource(logo)} /> : <span className="institutional-logo__missing">Logotipo no disponible</span>}
    {showTitle && <span className="institutional-logo__name">{title || 'Exploradores del Rey Panamá'}</span>}
  </RouterLink>
}
