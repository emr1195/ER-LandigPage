import React from 'react'
import {PreviewFrame} from './PreviewFrame'
export const PublicationFeedback = ({editor, sectionKey, onDiscard}) => (
  <>
    {editor.error && editor.error.status !== 401 && (
      <p className="admin-alert" role="alert">
        {editor.error.message}
      </p>
    )}
    {editor.error?.status === 412 && (
      <button
        className="admin-button admin-button-secondary"
        type="button"
        onClick={editor.consultLatest}
      >
        Consultar versión vigente
      </button>
    )}
    {editor.latest && (
      <section className="admin-latest">
        <h2>Versión publicada actual</h2>
        <p>
          Tu edición se conserva arriba. Cargar esta versión descartará tu
          borrador.
        </p>
        <PreviewFrame sectionKey={sectionKey} data={editor.latest.data} />
        <button
          className="admin-button admin-button-secondary"
          type="button"
          onClick={() => {
            onDiscard()
            editor.adoptLatest()
          }}
        >
          Descartar y cargar versión vigente
        </button>
      </section>
    )}
    {editor.message && (
      <p className="admin-success" role="status">
        {editor.message}
      </p>
    )}
  </>
)
