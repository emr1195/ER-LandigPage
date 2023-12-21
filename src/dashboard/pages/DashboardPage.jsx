import React, {useEffect} from 'react'
import {DashboardLayout} from '../layout/DashboardLayout'
import {NoteView, NothingSelectedView} from '../views'
import {IconButton} from '@mui/material'
import {AddOutlined} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import {
  resetError,
  resetMessageSaved,
  startNewNote,
} from '../../store/dashboard'
import Swal from 'sweetalert2'

export const DashboardPage = () => {
  const dispatch = useDispatch()
  const {
    isSaving,
    active: noteActive,
    messageSaved,
    errorDB,
  } = useSelector((state) => state.dashboard)

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

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

  return (
    <DashboardLayout>
      {/* nothing selected */}

      {!!noteActive ? <NoteView /> : <NothingSelectedView />}
      {/* <NothingSelectedView /> */}
      {/* noteView */}
      {/* <NoteView /> */}

      <IconButton
        onClick={onClickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.8},
          position: 'fixed',
          bottom: 50,
          right: 50,
        }}
      >
        <AddOutlined sx={{fontSize: 30}} />
      </IconButton>
    </DashboardLayout>
  )
}
