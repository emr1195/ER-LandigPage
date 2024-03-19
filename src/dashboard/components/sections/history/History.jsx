import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {resetInfo} from '../../../../store/dashboard'
import {Box, Button, Grid, TextField, Typography} from '@mui/material'
import {TypographyPersonalized} from '../../../../homepage/components/common'
import {History as HistoryPreview} from '../../../../homepage/components'
import {savingNewHistory} from '../../../../store/landingPage'

export const History = ({info}) => {
  const qqq = structuredClone(info)
  const [infoCopy, setInfoCopy] = useState(qqq)
  const dispatch = useDispatch()
  const {isSaving} = useSelector((state) => state.history)

  useEffect(() => {
    const qqq = structuredClone(info)
    setInfoCopy(qqq)
  }, [info])

  const handleChange = (
    {target},
    checkBox = false,
    section = null,
    insideSection = null,
    id = null,
  ) => {
    const {name, value, checked} = target
    if (section) {
      if (insideSection) {
        if (id) {
          const updatedInfoCopy = structuredClone(infoCopy)

          const itemIndex = updatedInfoCopy[section][insideSection].findIndex(
            (item) => item.id === id,
          )
          if (itemIndex !== -1) {
            updatedInfoCopy[section][insideSection][itemIndex] = {
              ...updatedInfoCopy[section][insideSection][itemIndex],
              [name]: checkBox ? checked : value,
            }

            setInfoCopy(updatedInfoCopy)
          }
        } else {
          setInfoCopy((prevInfoCopy) => ({
            ...prevInfoCopy,
            [section]: {
              ...prevInfoCopy[section],
              [insideSection]: {
                ...prevInfoCopy[section][insideSection],
                [name]: value,
              },
            },
          }))
        }
      } else {
        setInfoCopy((prevInfoCopy) => ({
          ...prevInfoCopy,
          [section]: {
            ...prevInfoCopy[section],
            [name]: value,
          },
        }))
      }
    } else {
      setInfoCopy((prevInfoCopy) => ({
        ...prevInfoCopy,
        [name]: value,
      }))
    }
  }

  const handleReset = () => {
    dispatch(resetInfo('history'))
  }

  const onSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault()

    dispatch(savingNewHistory(infoCopy))
  }

  return (
    <form onSubmit={onSubmit}>
      <Box className="HeroSection-Dashboard" display="block" width="100%">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '100%',
            gap: '32px',
            padding: '32px',
          }}
        >
          <Box textAlign={'center'} width="100%">
            <TypographyPersonalized
              variant="h4"
              title={infoCopy.sectionTitle}
            />
          </Box>

          <Box className="TextSection-Full-Form" sx={{width: '100%'}}>
            <Grid
              className="TextSection-Form"
              item
              xs={12}
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              <TypographyPersonalized
                sx={{minWidth: '150px'}}
                variant="body"
                title={'Titulo: '}
              />
              <TextField
                type="text"
                fullWidth
                name="title"
                onChange={(e) => handleChange(e, false)}
                value={infoCopy.title}
                required
                error={infoCopy.title === ''}
                helperText={infoCopy.title === '' && '* Es obligatorio'}
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
            </Grid>
            {/* <Grid
              className="TextSection-Form"
              item
              xs={12}
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              <TypographyPersonalized
                sx={{minWidth: '150px'}}
                variant="body"
                title={'Sub-Titulo: '}
              />
              <TextField
                type="text"
                fullWidth
                name="subTitle"
                onChange={(e) => handleChange(e, false)}
                value={infoCopy.subTitle}
                required
                error={infoCopy.subTitle === ''}
                helperText={infoCopy.subTitle === '' && '* Es obligatorio'}
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
            </Grid> */}

            <Grid
              className="imageSection-Form"
              item
              xs={12}
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              <TypographyPersonalized
                sx={{minWidth: '150px'}}
                variant="body"
                title={'Imagen Izquierda: '}
              />
              <TextField
                type="text"
                fullWidth
                name="imageLeft"
                onChange={(e) => handleChange(e, false, 'imageSection')}
                value={infoCopy.imageSection.imageLeft}
                required
                error={infoCopy.imageSection.imageLeft === ''}
                helperText={
                  infoCopy.imageSection.imageLeft === '' && '* Es obligatorio'
                }
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
            </Grid>

            <Grid
              className="imageSection-Form"
              item
              xs={12}
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              <TypographyPersonalized
                sx={{minWidth: '150px'}}
                variant="body"
                title={'Imagen Derecha: '}
              />
              <TextField
                type="text"
                fullWidth
                name="imageRight"
                onChange={(e) => handleChange(e, false, 'imageSection')}
                value={infoCopy.imageSection.imageRight}
                required
                error={infoCopy.imageSection.imageRight === ''}
                helperText={
                  infoCopy.imageSection.imageRight === '' && '* Es obligatorio'
                }
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
            </Grid>

            <Grid
              className="imageSection-Form"
              item
              xs={12}
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              <TypographyPersonalized
                sx={{minWidth: '150px'}}
                variant="body"
                title={'Icono: '}
              />
              <TextField
                type="text"
                fullWidth
                name="icon"
                onChange={(e) => handleChange(e, false, 'imageSection')}
                value={infoCopy.imageSection.icon}
                required
                error={infoCopy.imageSection.icon === ''}
                helperText={
                  infoCopy.imageSection.icon === '' && '* Es obligatorio'
                }
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
            </Grid>

            <Grid
              className="imageSection-Form"
              item
              xs={12}
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              <TypographyPersonalized
                sx={{minWidth: '150px'}}
                variant="body"
                title={'Texto del Icono: '}
              />
              <TextField
                type="text"
                fullWidth
                name="iconText"
                onChange={(e) => handleChange(e, false, 'imageSection')}
                value={infoCopy.imageSection.iconText}
                required
                error={infoCopy.imageSection.iconText === ''}
                helperText={
                  infoCopy.imageSection.iconText === '' && '* Es obligatorio'
                }
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
            </Grid>

            <Grid
              className="TextSection-Form"
              item
              xs={12}
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              <TypographyPersonalized
                sx={{minWidth: '150px'}}
                variant="body"
                title={'Descripcion: '}
              />
              <TextField
                multiline
                rows={10}
                // maxRows={10}
                type="text"
                fullWidth
                name="description"
                onChange={(e) => handleChange(e, false)}
                value={infoCopy.description}
                required
                error={infoCopy.description === ''}
                helperText={
                  infoCopy.description === ''
                    ? '* Es obligatorio'
                    : '"Punto y Coma (;)" hará salto de linea en el texto'
                }
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
            </Grid>
          </Box>
          <Box textAlign={'center'} width="100%">
            <TypographyPersonalized variant="h4" title={'Preview'} />
          </Box>
          <Box
            display="flex"
            flex={1}
            height="90%"
            width="100%"
            mx="auto"
            boxShadow={`0px 4px 25px 0px rgba(0, 0, 0, 0.21)`}
            px="32px"
            className={`Preview-History `}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <HistoryPreview historyInfo={infoCopy} />
          </Box>
        </Box>

        <Box
          className="LastModifiedByWho-Form"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-end"
          width="100%"
          mt={6}
        >
          <Box flex={1}>
            <TypographyPersonalized
              variant="caption"
              title={'Last Modified:'}
              sx={{fontStyle: 'italic', fontWeight: 'bold'}}
            />
            <TypographyPersonalized
              variant="caption"
              title={`${infoCopy.lastModified}`}
            />
            <TypographyPersonalized
              variant="caption"
              title={', by:'}
              sx={{fontStyle: 'italic', fontWeight: 'bold'}}
            />
            <TypographyPersonalized
              variant="caption"
              title={`${infoCopy.updatedBy}.`}
            />
          </Box>

          <Box flex={1} className="Cancel&Submit-Form">
            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  disabled={isSaving}
                  variant="contained"
                  fullWidth
                  onClick={handleReset}
                  sx={{backgroundColor: '#fff', color: '#000'}}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  disabled={isSaving}
                  variant="contained"
                  fullWidth
                >
                  <Typography sx={{ml: 1}}>Save</Typography>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </form>
  )
}
