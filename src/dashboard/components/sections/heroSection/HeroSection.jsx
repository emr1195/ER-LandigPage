import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {TypographyPersonalized} from '../../../../homepage/components/common'
import {useDispatch, useSelector} from 'react-redux'
import {HeroSection as HeroSectionPreview} from '../../../../homepage/components/heroSection/HeroSection'
import {resetInfo} from '../../../../store/dashboard'
import {savingNewHeroSection} from '../../../../store/landingPage'

export const HeroSection = ({info}) => {
  const qqq = structuredClone(info)
  const [infoCopy, setInfoCopy] = useState(qqq)
  const dispatch = useDispatch()
  const {isSaving} = useSelector((state) => state.heroSection)

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
    const section = infoCopy.section
    dispatch(resetInfo('heroSection'))
  }

  const onSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault()

    dispatch(savingNewHeroSection(infoCopy))
  }
  const disableSubmitButton =
    infoCopy.title === '' ||
    infoCopy.textSection.description == '' ||
    infoCopy.textSection.icon == '' ||
    infoCopy.textSection.iconText == '' ||
    infoCopy.textSection.title == ''

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

          <Box className="TextSection-Full-Form">
            <Grid
              className="Section-Texto-Form"
              item
              xs={12}
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '32px',
                marginBottom: '32px',
              }}
            >
              <TypographyPersonalized
                sx={{minWidth: '150px', fontWeight: 'bold'}}
                variant="body"
                title={'Section de Texto: '}
              />
              {/* <TextField
              type="text"
              fullWidth
              name="title"
              onChange={handleChange}
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
            /> */}
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
                title={'Titulo: '}
              />
              <TextField
                type="text"
                fullWidth
                name="title"
                onChange={(e) => handleChange(e, false, 'textSection')}
                value={infoCopy.textSection.title}
                required
                error={infoCopy.textSection.title === ''}
                helperText={
                  infoCopy.textSection.title === '' && '* Es obligatorio'
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

            <Grid container className="TextSection-Inside-Form">
              <Grid
                className="description"
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
                  type="text"
                  fullWidth
                  name="description"
                  onChange={(e) => handleChange(e, false, 'textSection')}
                  value={infoCopy.textSection.description}
                  required
                  error={infoCopy.textSection.description === ''}
                  helperText={
                    infoCopy.textSection.description === '' &&
                    '* Es obligatorio'
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
                className="ubication"
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
                  title={'Ubicacion: '}
                />
                <TextField
                  type="text"
                  fullWidth
                  name="iconText"
                  onChange={(e) => handleChange(e, false, 'textSection')}
                  value={infoCopy.textSection.iconText}
                  required
                  error={infoCopy.textSection.iconText === ''}
                  helperText={
                    infoCopy.textSection.iconText === '' && '* Es obligatorio'
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
                className="icon"
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
                  onChange={(e) => handleChange(e, false, 'textSection')}
                  value={infoCopy.textSection.icon}
                  required
                  error={infoCopy.textSection.icon === ''}
                  helperText={
                    infoCopy.textSection.icon === '' && '* Es obligatorio'
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

              {infoCopy.textSection.buttons.map((btn, index) => {
                return (
                  <Grid
                    className={`button-${index}-title`}
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
                      title={'Boton Izquierda: '}
                    />
                    <FormControlLabel
                      label="Mostrar?"
                      control={
                        <Checkbox
                          // value={infoCopy.textSection.buttons[0].display}
                          value={btn.display}
                          name="display"
                          // checked={infoCopy.textSection.buttons[0].display}
                          checked={btn.display}
                          onChange={(e, checked) =>
                            handleChange(
                              e,
                              true,
                              'textSection',
                              'buttons',
                              // infoCopy.textSection.buttons[0].id,
                              btn.id,
                            )
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="URL Externo?"
                      control={
                        <Checkbox
                          // value={infoCopy.textSection.buttons[0].outsideURL}
                          value={btn.outsideURL}
                          name="outsideURL"
                          // checked={infoCopy.textSection.buttons[0].outsideURL}
                          checked={btn.outsideURL}
                          onChange={(e, checked) =>
                            handleChange(
                              e,
                              true,
                              'textSection',
                              'buttons',
                              // infoCopy.textSection.buttons[0].id,
                              btn.id,
                            )
                          }
                        />
                      }
                    />
                    <TypographyPersonalized
                      // sx={{minWidth: '150px'}}
                      variant="body"
                      title={'Titulo: '}
                    />
                    <TextField
                      type="text"
                      fullWidth
                      name="title"
                      onChange={(e) =>
                        handleChange(e, false, 'textSection', 'buttons')
                      }
                      // value={infoCopy.textSection.buttons[0].title}
                      value={btn.title}
                      // required={infoCopy.textSection.buttons[0].display}
                      required={btn.display}
                      // error={infoCopy.textSection.buttons[0].title === ''}
                      error={btn.display && btn.title === ''}
                      helperText={
                        // infoCopy.textSection.buttons[0].title === '' &&
                        btn.display && btn.title === '' && '* Es obligatorio'
                      }
                      autoComplete="off"
                      inputProps={{
                        autoComplete: 'new-password',
                        form: {
                          autoComplete: 'off',
                        },
                      }}
                    />
                    <TypographyPersonalized
                      // sx={{minWidth: '150px'}}
                      variant="body"
                      title={'URL: '}
                    />
                    <TextField
                      type="text"
                      fullWidth
                      name="title"
                      onChange={(e) =>
                        handleChange(e, false, 'textSection', 'buttons')
                      }
                      // value={infoCopy.textSection.buttons[0].url}
                      value={btn.url}
                      // required={infoCopy.textSection.buttons[0].display}
                      required={btn.display}
                      // error={infoCopy.textSection.buttons[0].url === ''}
                      error={btn.display && btn.url === ''}
                      helperText={
                        // infoCopy.textSection.buttons[0].url === '' &&
                        btn.display && btn.url === '' && '* Es obligatorio'
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
                )
              })}
            </Grid>
          </Box>

          <Box className="ImageSection-Full-Form">
            <Grid
              className="Section-image-Form"
              item
              xs={12}
              sx={{
                mt: 2,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '32px',
                marginBottom: '32px',
              }}
            >
              <TypographyPersonalized
                sx={{minWidth: '150px', fontWeight: 'bold'}}
                variant="body"
                title={'Section de Imagenes: '}
              />
            </Grid>
            <Grid
              className="imagen-superior-izquierda-Form"
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
                title={'Imagen Superior Izquierda: '}
              />
              <TextField
                type="text"
                fullWidth
                name="imageURL"
                onChange={(e) =>
                  handleChange(e, false, 'imageSection', 'imageTopLeft')
                }
                value={infoCopy.imageSection.imageTopLeft.imageURL}
                required
                error={infoCopy.imageSection.imageTopLeft.imageURL === ''}
                helperText={
                  infoCopy.imageSection.imageTopLeft.imageURL === '' &&
                  '* Es obligatorio'
                }
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
              <TypographyPersonalized variant="body" title={'Icon: '} />
              <TextField
                type="text"
                fullWidth
                name="icon"
                onChange={(e) =>
                  handleChange(e, false, 'imageSection', 'imageTopLeft')
                }
                value={infoCopy.imageSection.imageTopLeft.icon}
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
              <TypographyPersonalized variant="body" title={'Titulo: '} />
              <TextField
                type="text"
                fullWidth
                name="title"
                onChange={(e) =>
                  handleChange(e, false, 'imageSection', 'imageTopLeft')
                }
                value={infoCopy.imageSection.imageTopLeft.title}
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
            </Grid>
            {/* Imagen Inferior Izquierda */}
            <Grid
              className="imagen-inferior-izquierda-Form"
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
                title={'Imagen Inferior Izquierda: '}
              />
              <TextField
                type="text"
                fullWidth
                name="imageURL"
                onChange={(e) =>
                  handleChange(e, false, 'imageSection', 'imageBottomLeft')
                }
                value={infoCopy.imageSection.imageBottomLeft.imageURL}
                required
                error={infoCopy.imageSection.imageBottomLeft.imageURL === ''}
                helperText={
                  infoCopy.imageSection.imageBottomLeft.imageURL === '' &&
                  '* Es obligatorio'
                }
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
              <TypographyPersonalized variant="body" title={'Icon: '} />
              <TextField
                type="text"
                fullWidth
                name="icon"
                onChange={(e) =>
                  handleChange(e, false, 'imageSection', 'imageBottomLeft')
                }
                value={infoCopy.imageSection.imageBottomLeft.icon}
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
              <TypographyPersonalized variant="body" title={'Titulo: '} />
              <TextField
                type="text"
                fullWidth
                name="title"
                onChange={(e) =>
                  handleChange(e, false, 'imageSection', 'imageBottomLeft')
                }
                value={infoCopy.imageSection.imageBottomLeft.title}
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
            </Grid>
            {/* Image centro Derecha */}
            <Grid
              className="imagen-central-derecha-Form"
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
                title={'Imagen Central Derecha: '}
              />
              <TextField
                type="text"
                fullWidth
                name="imageURL"
                onChange={(e) =>
                  handleChange(e, false, 'imageSection', 'imageRightCenter')
                }
                value={infoCopy.imageSection.imageRightCenter.imageURL}
                required
                error={infoCopy.imageSection.imageRightCenter.imageURL === ''}
                helperText={
                  infoCopy.imageSection.imageRightCenter.imageURL === '' &&
                  '* Es obligatorio'
                }
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
              <TypographyPersonalized variant="body" title={'Icon: '} />
              <TextField
                type="text"
                fullWidth
                name="icon"
                onChange={(e) =>
                  handleChange(e, false, 'imageSection', 'imageRightCenter')
                }
                value={infoCopy.imageSection.imageRightCenter.icon}
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
              <TypographyPersonalized variant="body" title={'Titulo: '} />
              <TextField
                type="text"
                fullWidth
                name="title"
                onChange={(e) =>
                  handleChange(e, false, 'imageSection', 'imageRightCenter')
                }
                value={infoCopy.imageSection.imageRightCenter.title}
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
            </Grid>
            {/*  */}
          </Box>

          <Box textAlign={'center'} width="100%">
            <TypographyPersonalized variant="h4" title={'Preview'} />
          </Box>

          <Box
            display="flex"
            flex={1}
            height="100%"
            width="100%"
            mx="auto"
            boxShadow={`0px 4px 25px 0px rgba(0, 0, 0, 0.21)`}
            px="32px"
            alignItems={'center'}
            justifyContent={'center'}
            className={`Preview-HeroSection `}
          >
            <HeroSectionPreview heroSectionInfo={infoCopy} />
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
                  disabled={isSaving || disableSubmitButton}
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
