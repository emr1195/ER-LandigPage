import {DeleteOutline, SaveOutlined, UploadOutlined} from '@mui/icons-material'
import {Button, Grid, IconButton, TextField, Typography} from '@mui/material'
import React, {useEffect, useMemo, useRef} from 'react'
import {ImageGallery} from '../components'
import {useForm} from '../../hooks'
import {useDispatch, useSelector} from 'react-redux'
import {
  resetError,
  resetMessageSaved,
  setActiveNote,
  startDeletingNote,
  startSaveNotes,
  startUploadingFiles,
} from '../../store/dashboard'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export const NoteView = () => {
  const dispatch = useDispatch()
  const fileInputRef = useRef()

  const {
    active: noteActive,
    isSaving,
    messageSaved,
    errorDB,
  } = useSelector((state) => state.dashboard)
  const {body, title, date, onInputChange, formState} = useForm(noteActive)

  const dateString = useMemo(() => {
    const newDate = new Date(date).toLocaleString()

    return newDate
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire({
        title: 'Exito',
        text: messageSaved,
        timer: 2500,
        icon: 'success',
      })
      dispatch(resetMessageSaved())
    }
    if (errorDB.length > 0) {
      Swal.fire({
        title: 'Lo Siento',
        text: errorDB,
        timer: 2500,
        icon: 'error',
      })
      dispatch(resetError())
    }
  }, [messageSaved, errorDB])

  const onSaveNote = () => {
    dispatch(startSaveNotes())
  }

  const onFileInputChange = ({target}) => {
    if (target.files === 0) return

    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = () => {
    dispatch(startDeletingNote())
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{mb: 1}}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{display: 'none'}}
          ref={fileInputRef}
          accept="image/*"
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>

        <Button
          disabled={isSaving}
          onClick={onSaveNote}
          color="primary"
          sx={{padding: 2}}
        >
          <SaveOutlined sx={{fontSize: 30, mr: 1}} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un titulo"
          label="Titulo"
          sx={{border: 'none', mb: 1}}
          name="title"
          value={title}
          onChange={onInputChange}
        />
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Que sucedio en el dia de hoy?"
          minRows={5}
          sx={{border: 'none', mb: 1}}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent="end">
        <Button
          onClick={onDelete}
          disabled={isSaving}
          color="error"
          sx={{mt: 2}}
        >
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>

      {/* Galeria de imagenes */}
      <ImageGallery images={noteActive.imagesUrls} />
    </Grid>
  )
}
