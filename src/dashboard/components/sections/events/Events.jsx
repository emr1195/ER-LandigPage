import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {TypographyPersonalized} from '../../../../homepage/components/common'
import {Events as EventsPreview} from '../../../../homepage/components'
import {resetInfo} from '../../../../store/dashboard'
import {DeleteOutline} from '@mui/icons-material'
import {savingNewEventsInfo} from '../../../../store/landingPage'

export const Events = ({info}) => {
  const qqq = structuredClone(info)
  const [infoCopy, setInfoCopy] = useState(qqq)
  const dispatch = useDispatch()
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const {isSaving} = useSelector((state) => state.expeditionGroup)

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

    if (section && id) {
      const updatedInfoCopy = structuredClone(infoCopy)

      const newQ = updatedInfoCopy.events.map((item) => {
        if (item.id === id && insideSection) {
          return {
            ...item,
            [insideSection]: {
              ...item[insideSection],
              [name]: value,
            },
          }
        } else if (item.id === id && !insideSection) {
          return {
            ...item,
            [name]: checkBox ? checked : value,
          }
        }
        return item
      })
      updatedInfoCopy.events = newQ
      setInfoCopy(updatedInfoCopy)
    } else {
      setInfoCopy((prevInfoCopy) => ({
        ...prevInfoCopy,
        [name]: value,
      }))
    }
  }

  const handleReset = () => {
    dispatch(resetInfo('events'))
  }

  const handleAddMenuItem = () => {
    setLoading(true)
    const updatedInfoCopy = structuredClone(infoCopy)

    // Create a new item with default values or modify as needed
    let newID
    let newPosition

    do {
      newID = Math.floor(Math.random() * updatedInfoCopy.events.length + 2)
    } while (updatedInfoCopy.events.some((item) => item.id === newID))

    do {
      newPosition = Math.floor(
        Math.random() * updatedInfoCopy.events.length + 2,
      )
    } while (
      updatedInfoCopy.events.some((item) => item.position === newPosition)
    )

    const newItem = {
      byWho: '',
      date: '',
      id: newID,
      image: '',
      title: '',
      ubication: '',
    }

    updatedInfoCopy.events.push(newItem)
    setInfoCopy(updatedInfoCopy)
    setLoading(false)
  }

  const handleDeleteMenuItem = (itemID) => {
    setLoading(true)

    const updatedInfoCopy = structuredClone(infoCopy)
    const menuItemIndex = updatedInfoCopy.events.findIndex(
      (item) => item.id === itemID,
    )
    if (menuItemIndex !== -1) {
      updatedInfoCopy.events.splice(menuItemIndex, 1)
      setInfoCopy(updatedInfoCopy)
    }
    setLoading(false)
  }

  const onSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault()

    dispatch(savingNewEventsInfo(infoCopy))
  }

  return (
    <form onSubmit={onSubmit}>
      <Box className="Events-Dashboard" display="block" width="100%">
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
                mb: 3,
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

            {infoCopy.events.map(
              ({date, byWho, id, image, title, ubication}, index) => {
                return (
                  <Grid
                    className={`events-${index}`}
                    key={index}
                    item
                    xs={12}
                    sx={{
                      mt: 2,
                      mb: 3,
                      paddingBottom: 3,
                      borderBottom: '1px solid black',
                      borderBottomWidth: '80%',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'stretch',
                      gap: '32px',
                      // flexWrap: 'wrap',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        rowGap: 2,
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
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
                          handleChange(e, false, 'events', null, id)
                        }
                        value={title}
                        required
                        error={title === ''}
                        helperText={title === '' && '* Es obligatorio'}
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
                        title={'Ubicacion: '}
                      />
                      <TextField
                        type="text"
                        fullWidth
                        name="ubication"
                        onChange={(e) =>
                          handleChange(e, false, 'events', null, id)
                        }
                        value={ubication}
                        required
                        error={ubication === ''}
                        helperText={ubication === '' && '* Es obligatorio'}
                        autoComplete="off"
                        inputProps={{
                          autoComplete: 'new-password',
                          form: {
                            autoComplete: 'off',
                          },
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 2,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <TypographyPersonalized
                        // sx={{minWidth: '150px'}}
                        variant="body"
                        title={'Fecha: '}
                      />
                      <TextField
                        type="text"
                        name="date"
                        onChange={(e) =>
                          handleChange(e, false, 'events', null, id)
                        }
                        value={date}
                        required
                        error={date === ''}
                        helperText={date === '' && '* Es obligatorio'}
                        autoComplete="off"
                        inputProps={{
                          autoComplete: 'new-password',
                          form: {
                            autoComplete: 'off',
                          },
                        }}
                        sx={{
                          width: '350px',
                        }}
                      />
                      <TypographyPersonalized
                        // sx={{minWidth: '150px'}}
                        variant="body"
                        title={'Imagen: '}
                      />
                      <TextField
                        type="text"
                        name="image"
                        onChange={(e) =>
                          handleChange(e, false, 'events', null, id)
                        }
                        value={image}
                        // required
                        // error={image === ''}
                        // helperText={image === '' && '* Es obligatorio'}
                        autoComplete="off"
                        inputProps={{
                          autoComplete: 'new-password',
                          form: {
                            autoComplete: 'off',
                          },
                        }}
                        sx={{
                          width: '350px',
                        }}
                      />
                    </Box>
                    <IconButton
                      className="DeleteMenuItem-Form"
                      disabled={loading}
                      onClick={() => handleDeleteMenuItem(id)}
                    >
                      <DeleteOutline
                        sx={{
                          fill: `${theme.palette.red.main} !important`,
                        }}
                      />
                    </IconButton>
                  </Grid>
                )
              },
            )}
          </Box>

          <Box
            className="AddNewMenuItem-Form"
            display="flex"
            width="100%"
            justifyContent="flex-end"
            mt={4}
          >
            <Button
              type="button"
              // disabled={isAuthenticating}
              variant="contained"
              disabled={loading}
              onClick={handleAddMenuItem}
              // fullWidth
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
              }}
            >
              {loading ? <CircularProgress /> : 'Add New Menu'}
            </Button>
          </Box>

          <Box textAlign={'center'} width="100%" mb={5}>
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
            <EventsPreview eventsInfo={infoCopy} />
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
