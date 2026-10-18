import React from 'react'
export const AppearanceControl = ({preferences}) => (
  <div className="admin-appearance">
    <label>
      Apariencia personal
      <select
        aria-label="Apariencia personal"
        value={preferences.appearance}
        onChange={(event) => preferences.save(event.target.value)}
        disabled={preferences.pending}
      >
        <option value="carbon-azure">Carbon & Azure</option>
        <option value="petrol-apricot">Petrol & Apricot</option>
      </select>
    </label>
    {preferences.pending && <small role="status">Guardando apariencia…</small>}
    {preferences.message && <small role="status">{preferences.message}</small>}
    {preferences.error && (
      <div role="alert">
        <small>{preferences.error}</small>
        <button className="admin-text-button" onClick={preferences.retry}>
          Reintentar
        </button>
      </div>
    )}
  </div>
)
