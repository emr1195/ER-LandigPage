import {UploadOutlined} from '@mui/icons-material'
import {Box, Button, CircularProgress, TextField, Typography} from '@mui/material'
import React, {useState} from 'react'
import {fileUpload} from '../../helpers'

export const ImageUploadField = ({
  name,
  value = '',
  onChange,
  sx,
  ...textFieldProps
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const notifyChange = (nextValue) => {
    onChange?.({target: {name, value: nextValue}})
  }

  const onFileChange = async (event) => {
    const [file] = event.target.files || []
    event.target.value = ''
    if (!file) return

    setIsUploading(true)
    setUploadError('')
    try {
      notifyChange(await fileUpload(file))
    } catch (error) {
      setUploadError(error.message)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Box sx={{width: '100%', ...sx}}>
      <Box display="flex" gap={1} alignItems="flex-start">
        <TextField
          {...textFieldProps}
          type="text"
          fullWidth
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="off"
        />
        <Button
          component="label"
          variant="outlined"
          disabled={isUploading}
          startIcon={isUploading ? <CircularProgress size={18} /> : <UploadOutlined />}
          sx={{minWidth: 130, height: 56, whiteSpace: 'nowrap'}}
        >
          <input
            type="file"
            hidden
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            onChange={onFileChange}
          />
          {isUploading ? 'Subiendo' : 'Subir imagen'}
        </Button>
      </Box>
      {uploadError && (
        <Typography color="error" variant="caption">
          {uploadError}
        </Typography>
      )}
      {value && (
        <Box
          component="img"
          src={value}
          alt="Vista previa de la imagen seleccionada"
          sx={{display: 'block', mt: 1, width: 96, height: 72, objectFit: 'contain'}}
        />
      )}
    </Box>
  )
}
