import React from 'react'
import {Icon} from './Icon'

export const PublishBar = ({editor, uploads, dirty}) => (
  <footer className="admin-publish-bar">
    <div className="admin-publish-message">
      <p>Los cambios se publicarán en tu sitio.</p>
      <small>
        <Icon name="shield" /> La publicación quedará registrada.
      </small>
    </div>
    <div className="admin-publish-actions">
      <button
        type="button"
        className="admin-button admin-button-secondary"
        disabled={!dirty || editor.saving || editor.discarding}
        onClick={() => editor.discard(uploads.cancelAll)}
      >
        {editor.discarding ? 'Cargando…' : 'Descartar'}
      </button>
      <button
        className="admin-button"
        type="submit"
        disabled={
          !editor.dirty ||
          editor.saving ||
          editor.discarding ||
          uploads.pending ||
          uploads.failed
        }
      >
        {editor.saving ? 'Publicando…' : 'Guardar y publicar'}
      </button>
    </div>
  </footer>
)
