import React, {useEffect, useState} from 'react'
import {Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import {ImageUploadField} from '../../ImageUploadField'
import {Detachment} from '../../../../homepage/components/detachment/Detachment'
import {saveDetachment} from '../../../../store/landingPage/detachment/detachmentSlice'
import {emptyDetachment, getDetachments, sortDetachments} from '../../../../../shared/detachments'
import {googleMapsEmbedUrl, parseGoogleMapsUrl} from '../../../../../shared/googleMaps'
import {apiRequest} from '../../../../api/client'

const newRecord = () => ({...emptyDetachment, id: crypto.randomUUID()})
const editorRecords = (info) => {
  const records = getDetachments(info)
  return records.length || Array.isArray(info?.detachments) ? records : [newRecord()]
}

export const DetachmentEditor = ({info}) => {
  const dispatch = useDispatch()
  const isSaving = useSelector((state) => state.dashboard.isSaving)
  const [records, setRecords] = useState(() => editorRecords(info))
  const [selectedId, setSelectedId] = useState('')
  const [pendingDelete, setPendingDelete] = useState(null)
  const draft = records.find((record) => record.id === selectedId) || records[0]
  const [map, setMap] = useState({embedUrl: '', error: '', loading: false})

  useEffect(() => {
    const next = editorRecords(info)
    setRecords(next)
    setSelectedId((current) => next.some((record) => record.id === current) ? current : next[0]?.id || '')
  }, [info])
  useEffect(() => {
    let active = true
    let timeout
    if (!draft?.mapsUrl.trim()) {
      setMap({embedUrl: '', error: '', loading: false})
      return undefined
    }
    try {
      const {short} = parseGoogleMapsUrl(draft.mapsUrl)
      if (!short) {
        setMap({embedUrl: googleMapsEmbedUrl(draft.mapsUrl), error: '', loading: false})
      } else if (draft.embedUrl) {
        setMap({embedUrl: googleMapsEmbedUrl(draft.embedUrl), error: '', loading: false})
      } else {
        setMap({embedUrl: '', error: '', loading: true})
        timeout = setTimeout(async () => {
          try {
            const result = await apiRequest('/api/maps/preview', {method: 'POST', body: JSON.stringify({url: draft.mapsUrl})})
            if (active) setMap({embedUrl: result.embedUrl, error: '', loading: false})
          } catch (error) {
            if (active) setMap({embedUrl: '', error: error.message, loading: false})
          }
        }, 500)
      }
    } catch (error) { setMap({embedUrl: '', error: error.message, loading: false}) }
    return () => { active = false; clearTimeout(timeout) }
  }, [draft?.mapsUrl, draft?.embedUrl])

  const change = ({target: {name, value}}) => setRecords((current) => current.map((record) =>
    record.id === draft.id ? {...record, [name]: value, ...(name === 'mapsUrl' ? {embedUrl: ''} : {})} : record,
  ))
  const submit = (event) => {
    event.preventDefault()
    if (!map.error && !map.loading) {
      const next = records.map((record) => record.id === draft.id ? {...record, embedUrl: map.embedUrl} : record)
      dispatch(saveDetachment({sectionTitle: 'Destacamento', detachments: sortDetachments(next)}))
    }
  }
  const add = () => {
    const record = newRecord()
    setRecords((current) => [...current, record])
    setSelectedId(record.id)
  }
  const cancel = () => {
    const next = editorRecords(info)
    setRecords(next)
    setSelectedId(next[0]?.id || '')
  }
  const remove = async () => {
    const saved = getDetachments(info)
    const persisted = saved.some((record) => record.id === pendingDelete.id)
    const next = (persisted ? saved : records).filter((record) => record.id !== pendingDelete.id)
    if (persisted && !await dispatch(saveDetachment({sectionTitle: 'Destacamento', detachments: next}, 'Destacamento eliminado correctamente.'))) return
    setRecords(next)
    setSelectedId((current) => next.some((record) => record.id === current) ? current : next[0]?.id || '')
    setPendingDelete(null)
  }
  const incomplete = records.some((record) => !record.name.trim() || !/^[A-Za-z0-9][A-Za-z0-9-]{0,9}$/.test(record.number.trim()))

  return (
    <Box sx={{width: '100%', minWidth: 0, p: {xs: 2, md: 4}}}>
      <Typography variant="h4" component="h1" mb={1}>Destacamentos</Typography>
      <Typography color="text.secondary" mb={4}>Administra los destacamentos registrados. Se muestran ordenados por número.</Typography>
      <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} mb={3} justifyContent="space-between" alignItems={{sm: 'center'}}>
        <Typography component="h2" variant="h6">Registros disponibles ({records.length})</Typography>
        <Button type="button" variant="outlined" disabled={isSaving} onClick={add} sx={{minWidth: 180}}>Agregar destacamento</Button>
      </Stack>
      <Box sx={{display: 'grid', gridTemplateColumns: {xs: '1fr', lg: 'minmax(280px, 1fr) minmax(0, 1.5fr)'}, gap: 3, alignItems: 'start'}}>
        <Box component="ul" aria-label="Destacamentos disponibles para editar" sx={{m: 0, p: 0, listStyle: 'none', maxHeight: {xs: 300, lg: 650}, overflowY: 'auto', border: 1, borderColor: 'divider', borderRadius: 2}}>
          {sortDetachments(records).map((record) => (
            <Box component="li" key={record.id} sx={{display: 'flex', alignItems: 'center', gap: 2, p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: record.id === draft?.id ? 'action.selected' : 'background.paper'}}>
              <Box sx={{flex: 1, minWidth: 0}}>
                <Typography variant="caption" color="text.secondary">{record.number ? `N.º / código ${record.number}` : 'Sin número'}</Typography>
                <Typography sx={{overflowWrap: 'anywhere'}}>{record.name || 'Nuevo destacamento'}</Typography>
              </Box>
              <Stack spacing={1}>
                <Button type="button" size="small" variant={record.id === draft?.id ? 'contained' : 'outlined'} disabled={isSaving} aria-label={`Editar ${record.name || 'nuevo destacamento'} (${record.number || 'sin número'})`} aria-pressed={record.id === draft?.id} onClick={() => setSelectedId(record.id)}>Editar</Button>
                <Button type="button" size="small" color="error" disabled={isSaving} aria-label={`Eliminar ${record.name || 'nuevo destacamento'} (${record.number || 'sin número'})`} onClick={() => setPendingDelete(record)}>Eliminar</Button>
              </Stack>
            </Box>
          ))}
        </Box>
      {draft ? <Box component="form" onSubmit={submit} sx={{minWidth: 0}}>
        <Typography component="h2" variant="h6" mb={3}>Editar: {draft.number ? `${draft.number} — ` : ''}{draft.name || 'Nuevo destacamento'}</Typography>
        <Stack spacing={3}>
          <TextField label="Nombre del destacamento" name="name" value={draft.name} onChange={change} required fullWidth inputProps={{maxLength: 160}} />
          <TextField label="Número de destacamento" name="number" value={draft.number} onChange={change} required fullWidth inputProps={{pattern: '[A-Za-z0-9][A-Za-z0-9-]{0,9}', maxLength: 10}} helperText="Número asignado o código institucional, como ON o PC." />
          <TextField label="Ubicación — enlace de Google Maps (opcional)" name="mapsUrl" value={draft.mapsUrl} onChange={change} fullWidth error={Boolean(map.error)} helperText={map.error || 'Puedes dejarlo vacío y agregar la ubicación más adelante.'} />
          {map.loading && <Stack direction="row" spacing={1} alignItems="center"><CircularProgress size={18} /><Typography>Preparando mapa…</Typography></Stack>}
          <ImageUploadField label="Logo del destacamento (opcional)" name="logo" value={draft.logo} onChange={change} />
          {draft.logo && <Button type="button" onClick={() => change({target: {name: 'logo', value: ''}})} sx={{alignSelf: 'flex-start'}}>Quitar logo</Button>}
          <Alert severity="info">La ubicación y el logo son opcionales. Los destacamentos sin ubicación se muestran como fichas informativas.</Alert>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button type="button" disabled={isSaving} onClick={cancel}>Cancelar</Button>
            <Button type="submit" variant="contained" disabled={isSaving || map.loading || Boolean(map.error) || incomplete}>{isSaving ? 'Guardando…' : 'Guardar destacamento'}</Button>
          </Stack>
        </Stack>
      </Box> : <Alert severity="info">No hay destacamentos registrados. Usa «Agregar destacamento» para crear uno.</Alert>}
      </Box>
      {draft && <>
      <Typography variant="h5" component="h2" mt={5}>Vista previa del destacamento seleccionado</Typography>
      <Detachment info={{...draft, embedUrl: map.embedUrl}} preview />
      </>}
      <Dialog open={Boolean(pendingDelete)} onClose={() => { if (!isSaving) setPendingDelete(null) }} aria-labelledby="delete-detachment-title">
        <DialogTitle id="delete-detachment-title">¿Eliminar destacamento?</DialogTitle>
        <DialogContent>
          <DialogContentText>Se eliminará {pendingDelete?.name || 'este destacamento'} ({pendingDelete?.number || 'sin número'}) del dashboard y de la página pública. Esta acción no se puede deshacer. Los cambios sin guardar de otros destacamentos no se guardarán.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={isSaving} onClick={() => setPendingDelete(null)}>Cancelar</Button>
          <Button color="error" variant="contained" disabled={isSaving} onClick={remove}>{isSaving ? 'Eliminando…' : 'Confirmar eliminación'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
