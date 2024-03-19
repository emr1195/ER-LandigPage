import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, {useEffect, useRef, useState} from 'react'
import {TypographyPersonalized} from '../../../../homepage/components/common'
import {DeleteOutline, UploadOutlined} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import {Footer as FooterPreview} from '../../../../homepage/components'
import Swal from 'sweetalert2'
import {fileUpload} from '../../../../helpers'
import {resetInfo} from '../../../../store/dashboard'
import {Link as RouterLink} from 'react-router-dom'
import {savingNewFooter} from '../../../../store/landingPage/footer'

export const Footer = ({info}) => {
  console.log(info)
  const qqq = structuredClone(info)
  const [infoCopy, setInfoCopy] = useState(qqq)
  const dispatch = useDispatch()
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const {isSaving} = useSelector((state) => state.footer)
  const fileInputRef = useRef()

  useEffect(() => {
    const qqq = structuredClone(info)
    setInfoCopy(qqq)
  }, [info])

  const onSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault()
    dispatch(savingNewFooter(infoCopy))
  }

  const handleReset = () => {
    dispatch(resetInfo('footer'))
  }

  const onFileInputChange = async ({target}) => {
    if (target.files.length === 0) return
    if (target.files.length > 1) {
      console.log('only one image can be uploaded')
      return
    }
    const newImageURL = await fileUpload(target.files[0])
    if (newImageURL) {
      Swal.fire({
        title: 'Copia el URL e insertalo donde deseas cambiar la imagen',
        text: newImageURL,
        icon: 'success',
      })
    }
  }

  // Handle Changes
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

      if (insideSection) {
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
        const itemIndex = updatedInfoCopy[section].findIndex(
          (item) => item.id === id,
        )

        if (itemIndex !== -1) {
          updatedInfoCopy[section][itemIndex] = {
            ...updatedInfoCopy[section][itemIndex],
            [name]: checkBox ? checked : value,
          }

          setInfoCopy(updatedInfoCopy)
        }
      }
    } else if (section) {
      setInfoCopy((prevInfoCopy) => ({
        ...prevInfoCopy,
        [section]: {
          ...prevInfoCopy[section],
          [name]: checkBox ? checked : value,
        },
      }))
    } else {
      setInfoCopy((prevInfoCopy) => ({
        ...prevInfoCopy,
        [name]: checkBox ? checked : value,
      }))
    }
  }

  const handleChange_Menus = (
    {target},
    checkBox = false,
    section = null,
    sectionID = null,
    insideSection = null,
    itemID = null,
  ) => {
    const {name, value, checked} = target

    const updatedInfoCopy = structuredClone(infoCopy)
    const foundSectionIndex = updatedInfoCopy[section].findIndex(
      (item) => item.menuId === sectionID,
    )

    const foundInsideSectionIndex = updatedInfoCopy[section][foundSectionIndex][
      insideSection
    ].findIndex((item) => item.id === itemID)

    if (foundInsideSectionIndex !== -1) {
      updatedInfoCopy[section][foundSectionIndex][insideSection][
        foundInsideSectionIndex
      ] = {
        ...updatedInfoCopy[section][foundSectionIndex][insideSection][
          foundInsideSectionIndex
        ],
        [name]: checkBox ? checked : value,
      }

      setInfoCopy(updatedInfoCopy)
    }
  }

  // Add New Item
  const handleAddMember = (section) => {
    setLoading(true)
    const updatedInfoCopy = structuredClone(infoCopy)

    // Create a new item with default values or modify as needed
    let newID
    let newPosition
    do {
      newID = Math.floor(Math.random() * updatedInfoCopy[section].length + 2)
    } while (updatedInfoCopy[section].some((item) => item.id === newID))

    do {
      newPosition = Math.floor(
        Math.random() * updatedInfoCopy[section].length + 2,
      )
    } while (
      updatedInfoCopy[section].some((item) => item.position === newPosition)
    )

    let newItem
    switch (section) {
      // case 'mainSection':
      //   newItem = {
      //     id: newID,
      //     name: '',
      //     description: '',
      //   }
      //   break
      // case 'menus':
      //   newItem = {
      //     id: newID,
      //     name: '',
      //     url: '',
      //     outsideURL: false,
      //   }
      //   break
      case 'socialMedia':
        newItem = {
          id: newID,
          icon: '',
          name: '',
          position: newPosition,
          url: '#',
        }
        break
      default: // aditionFooterInfo
        newItem = {
          id: newID,
          disabled: 'false',
          name: '',
          outsideURL: false,
          url: '#',
        }
        break
    }

    updatedInfoCopy[section].push(newItem)
    setInfoCopy(updatedInfoCopy)
    setLoading(false)
  }
  const handleAddMember_MainSection = (section, insideSection) => {
    setLoading(true)
    const updatedInfoCopy = structuredClone(infoCopy)

    // Create a new item with default values or modify as needed
    let newID
    let newPosition
    do {
      newID = Math.floor(
        Math.random() * updatedInfoCopy[section][insideSection].length + 2,
      )
    } while (
      updatedInfoCopy[section][insideSection].some((item) => item.id === newID)
    )

    do {
      newPosition = Math.floor(
        Math.random() * updatedInfoCopy[section][insideSection].length + 2,
      )
    } while (
      updatedInfoCopy[section][insideSection].some(
        (item) => item.position === newPosition,
      )
    )

    const newItem = {
      id: newID,
      name: '',
      description: '',
    }

    // switch (section) {
    //   case 'mainSection':
    //     newItem = {
    //       id: newID,
    //       name: '',
    //       description: '',
    //     }
    //     break
    //   case 'menus':
    //     newItem = {
    //       id: newID,
    //       name: '',
    //       url: '',
    //       outsideURL: false,
    //     }
    //     break
    //   case 'socialMedia':
    //     newItem = {
    //       id: newID,
    //       icon: '',
    //       name: '',
    //       position: newPosition,
    //       url: '#',
    //     }
    //     break
    //   default: // aditionFooterInfo
    //     newItem = {
    //       id: newID,
    //       disabled: 'false',
    //       name: '',
    //       outsideURL: false,
    //       url: '#',
    //     }
    //     break
    // }

    updatedInfoCopy[section][insideSection].push(newItem)
    setInfoCopy(updatedInfoCopy)
    setLoading(false)
  }

  const handleAddMember_Menus = (section, index, insideSection) => {
    setLoading(true)
    const updatedInfoCopy = structuredClone(infoCopy)

    // Create a new item with default values or modify as needed
    let newID
    let newPosition
    const foundSectionIndex = updatedInfoCopy[section].findIndex(
      (item) => item.menuId === index,
    )
    do {
      newID = Math.floor(
        Math.random() *
          updatedInfoCopy[section][foundSectionIndex][insideSection].length +
          2,
      )
    } while (
      updatedInfoCopy[section][foundSectionIndex][insideSection].some(
        (item) => item.id === newID,
      )
    )

    do {
      newPosition = Math.floor(
        Math.random() *
          updatedInfoCopy[section][foundSectionIndex][insideSection].length +
          2,
      )
    } while (
      updatedInfoCopy[section][foundSectionIndex][insideSection].some(
        (item) => item.position === newPosition,
      )
    )
    const newItem = {
      id: newID,
      name: '',
      url: '',
      outsideURL: false,
    }

    updatedInfoCopy[section][foundSectionIndex][insideSection].push(newItem)
    setInfoCopy(updatedInfoCopy)
    setLoading(false)
  }

  // Deletes
  const handleDeleteMember = (section, insideSection, itemID) => {
    setLoading(true)
    if (insideSection) {
      const updatedInfoCopy = structuredClone(infoCopy)
      const itemIndex = updatedInfoCopy[section][insideSection].findIndex(
        (item) => item.id === itemID,
      )

      if (itemIndex !== -1) {
        updatedInfoCopy[section][insideSection].splice(itemIndex, 1)
        setInfoCopy(updatedInfoCopy)
      }
    } else {
      const updatedInfoCopy = structuredClone(infoCopy)
      const itemIndex = updatedInfoCopy[section].findIndex(
        (item) => item.id === itemID,
      )

      if (itemIndex !== -1) {
        updatedInfoCopy[section].splice(itemIndex, 1)
        setInfoCopy(updatedInfoCopy)
      }
    }
    setLoading(false)
  }

  const handleDeleteMember_Menus = (
    section,
    sectionId,
    insideSection,
    itemID,
  ) => {
    setLoading(true)

    const updatedInfoCopy = structuredClone(infoCopy)
    const foundSectionIndex = updatedInfoCopy[section].findIndex(
      (item) => item.menuId === sectionId,
    )

    const foundInsideSectionIndex = updatedInfoCopy[section][foundSectionIndex][
      insideSection
    ].findIndex((item) => item.id === itemID)

    if (foundInsideSectionIndex !== -1) {
      updatedInfoCopy[section][foundSectionIndex][insideSection].splice(
        foundInsideSectionIndex,
        1,
      )
      setInfoCopy(updatedInfoCopy)
    }
    setLoading(false)
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
                title={'Logo: '}
              />
              <TextField
                type="text"
                fullWidth
                name="logo"
                onChange={(e) => handleChange(e, false, 'mainSection')}
                value={infoCopy.mainSection.logo}
                required
                error={infoCopy.mainSection.logo === ''}
                helperText={
                  infoCopy.mainSection.logo === '' && '* Es obligatorio'
                }
                autoComplete="off"
                inputProps={{
                  autoComplete: 'new-password',
                  form: {
                    autoComplete: 'off',
                  },
                }}
              />
              <Grid
                item
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="4px"
                flex={1}
                sx={{
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  fileInputRef.current.click()
                }}
              >
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
                  // disabled={isSaving}
                  // onClick={() => fileInputRef.current.click()}
                >
                  <UploadOutlined />
                </IconButton>
                <TypographyPersonalized
                  title="Sube Imagen"
                  sx={{minWidth: '90px', fontSize: '14px'}}
                />
              </Grid>
            </Grid>
            <Grid
              className="TextSection-Form"
              item
              xs={12}
              sx={{
                mt: 2,
                mb: 6,
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
                title={'Titulo del Logo: '}
              />
              <TextField
                type="text"
                fullWidth
                name="logoTitle"
                onChange={(e) => handleChange(e, false, 'mainSection')}
                value={infoCopy.mainSection.logoTitle}
                required
                error={infoCopy.mainSection.logoTitle === ''}
                helperText={
                  infoCopy.mainSection.logoTitle === '' && '* Es obligatorio'
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

            {/* Main Section */}
            <Box textAlign={'center'} width="100%" mb={5}>
              <TypographyPersonalized variant="h4" title={'Información'} />
            </Box>
            {infoCopy.mainSection.moreInfo.map(
              ({name, description, id}, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sx={{
                      mt: 2,
                      mb: 6,
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
                      title={'Campo: '}
                    />
                    <TextField
                      type="text"
                      fullWidth
                      name="name"
                      onChange={(e) =>
                        handleChange(e, false, 'mainSection', 'moreInfo', id)
                      }
                      value={name}
                      required
                      error={name === ''}
                      helperText={name === '' && '* Es obligatorio'}
                      autoComplete="off"
                      inputProps={{
                        autoComplete: 'new-password',
                        form: {
                          autoComplete: 'off',
                        },
                      }}
                    />
                    <TypographyPersonalized
                      sx={{minWidth: '150px'}}
                      variant="body"
                      title={'Descripcion: '}
                    />
                    <TextField
                      type="text"
                      fullWidth
                      name="description"
                      onChange={(e) =>
                        handleChange(e, false, 'mainSection', 'moreInfo', id)
                      }
                      value={description}
                      required
                      error={description === ''}
                      helperText={description === '' && '* Es obligatorio'}
                      autoComplete="off"
                      inputProps={{
                        autoComplete: 'new-password',
                        form: {
                          autoComplete: 'off',
                        },
                      }}
                    />
                    <Box
                      sx={{
                        display:
                          infoCopy.mainSection.moreInfo.length > 1
                            ? 'flex'
                            : 'none',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        rowGap: 2,
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <IconButton
                        className="DeleteMenuItem-Form"
                        disabled={loading}
                        onClick={() =>
                          handleDeleteMember('mainSection', 'moreInfo', id)
                        }
                      >
                        <DeleteOutline
                          sx={{
                            fill: `${theme.palette.red.main} !important`,
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Grid>
                )
              },
            )}
            <Box
              className="AgregaNuevoCampo-Informacion-Form"
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
                onClick={() =>
                  handleAddMember_MainSection('mainSection', 'moreInfo')
                }
                // fullWidth
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                }}
              >
                {loading ? <CircularProgress /> : 'Agrega Nuevo Campo'}
              </Button>
            </Box>

            {/* Menus */}

            {infoCopy.menus.map(({links, title, menuId}, index) => {
              return (
                <Box key={index} mb={5} mt={5}>
                  <Box textAlign={'center'} width="100%" mb={5}>
                    <TypographyPersonalized variant="h4" title={title} />
                  </Box>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      mt: 2,
                      mb: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '32px',
                    }}
                  >
                    <TypographyPersonalized
                      sx={{minWidth: '200px'}}
                      variant="body"
                      title={'Titulo de la seccion: '}
                    />
                    <TextField
                      type="text"
                      fullWidth
                      name="title"
                      onChange={(e) => handleChange(e, false)}
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
                  </Grid>
                  {links.map(({name, outsideURL, url, id}, linkIndex) => {
                    return (
                      <Grid
                        item
                        key={linkIndex}
                        xs={12}
                        sx={{
                          mt: 2,
                          mb: 2,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          gap: '32px',
                        }}
                      >
                        <TypographyPersonalized
                          variant="body"
                          title={'Nombre: '}
                        />
                        <TextField
                          type="text"
                          fullWidth
                          name="name"
                          onChange={(e) =>
                            handleChange_Menus(
                              e,
                              false,
                              'menus',
                              menuId,
                              'links',
                              id,
                            )
                          }
                          value={name}
                          required
                          error={name === ''}
                          helperText={name === '' && '* Es obligatorio'}
                          autoComplete="off"
                          inputProps={{
                            autoComplete: 'new-password',
                            form: {
                              autoComplete: 'off',
                            },
                          }}
                        />
                        <TypographyPersonalized
                          variant="body"
                          title={'Link: '}
                        />
                        <TextField
                          type="text"
                          fullWidth
                          name="url"
                          onChange={(e) =>
                            handleChange_Menus(
                              e,
                              false,
                              'menus',
                              menuId,
                              'links',
                              id,
                            )
                          }
                          value={url}
                          required
                          error={url === ''}
                          helperText={url === '' && '* Es obligatorio'}
                          autoComplete="off"
                          inputProps={{
                            autoComplete: 'new-password',
                            form: {
                              autoComplete: 'off',
                            },
                          }}
                        />
                        <FormControlLabel
                          label="Abrir en pagina nueva?"
                          sx={{minWidth: '150px'}}
                          control={
                            <Checkbox
                              // value={infoCopy.textSection.buttons[0].display}
                              value={outsideURL}
                              name="outsideURL"
                              // checked={infoCopy.textSection.buttons[0].display}
                              checked={outsideURL}
                              onChange={(e) =>
                                handleChange_Menus(
                                  e,
                                  true,
                                  'menus',
                                  menuId,
                                  'links',
                                  id,
                                )
                              }
                            />
                          }
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            rowGap: 2,
                            alignItems: 'center',
                            height: '100%',
                          }}
                        >
                          <IconButton
                            className="DeleteMenuItem-Form"
                            disabled={loading}
                            onClick={() =>
                              handleDeleteMember_Menus(
                                'menus',
                                menuId,
                                'links',
                                id,
                              )
                            }
                          >
                            <DeleteOutline
                              sx={{
                                fill: `${theme.palette.red.main} !important`,
                              }}
                            />
                          </IconButton>
                        </Box>
                      </Grid>
                    )
                  })}
                  <Box
                    className="AgregaNuevoCampo-Menus-Form"
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
                      onClick={() =>
                        handleAddMember_Menus('menus', menuId, 'links')
                      }
                      // fullWidth
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: '#fff',
                      }}
                    >
                      {loading ? <CircularProgress /> : 'Agrega Nuevo Campo'}
                    </Button>
                  </Box>
                </Box>
              )
            })}

            {/* AditionalInfo */}
            <Box textAlign={'center'} width="100%" mb={5}>
              <TypographyPersonalized variant="h4" title={'Sección Inferior'} />
            </Box>
            {infoCopy.aditionalFooterInfo.map(
              ({name, disabled, id, outsideURL, url}, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sx={{
                      mt: 2,
                      mb: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '32px',
                    }}
                  >
                    <TypographyPersonalized variant="body" title={'Campo: '} />
                    <TextField
                      type="text"
                      fullWidth
                      name="name"
                      onChange={(e) =>
                        handleChange(e, false, 'aditionalFooterInfo', null, id)
                      }
                      value={name}
                      required
                      error={name === ''}
                      helperText={name === '' && '* Es obligatorio'}
                      autoComplete="off"
                      inputProps={{
                        autoComplete: 'new-password',
                        form: {
                          autoComplete: 'off',
                        },
                      }}
                    />
                    <TypographyPersonalized variant="body" title={'Link: '} />
                    <TextField
                      type="text"
                      fullWidth
                      name="url"
                      onChange={(e) =>
                        handleChange(e, false, 'aditionalFooterInfo', null, id)
                      }
                      value={url}
                      required
                      error={url === '' && disabled}
                      helperText={url === '' && disabled && '* Es obligatorio'}
                      autoComplete="off"
                      disabled={disabled}
                      inputProps={{
                        autoComplete: 'new-password',
                        form: {
                          autoComplete: 'off',
                        },
                      }}
                    />
                    <FormControlLabel
                      label="Abrir en pagina nueva?"
                      sx={{minWidth: '150px'}}
                      control={
                        <Checkbox
                          // value={infoCopy.textSection.buttons[0].display}
                          value={outsideURL}
                          name="outsideURL"
                          // checked={infoCopy.textSection.buttons[0].display}
                          checked={outsideURL}
                          onChange={(e) =>
                            handleChange(
                              e,
                              true,
                              'aditionalFooterInfo',
                              null,
                              id,
                            )
                          }
                        />
                      }
                    />
                    <FormControlLabel
                      label="Deshabilitar Link?"
                      sx={{minWidth: '150px'}}
                      control={
                        <Checkbox
                          // value={infoCopy.textSection.buttons[0].display}
                          value={disabled}
                          name="disabled"
                          // checked={infoCopy.textSection.buttons[0].display}
                          checked={disabled}
                          onChange={(e) =>
                            handleChange(
                              e,
                              true,
                              'aditionalFooterInfo',
                              null,
                              id,
                            )
                          }
                        />
                      }
                    />
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        rowGap: 2,
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <IconButton
                        className="DeleteMenuItem-Form"
                        disabled={loading}
                        onClick={() =>
                          handleDeleteMember('aditionalFooterInfo', null, id)
                        }
                      >
                        <DeleteOutline
                          sx={{
                            fill: `${theme.palette.red.main} !important`,
                          }}
                        />
                      </IconButton>
                    </Box>
                  </Grid>
                )
              },
            )}
            <Box
              className="AgregaNuevoCampo-AditionalFooterInfo-Form"
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
                onClick={() => handleAddMember('aditionalFooterInfo')}
                // fullWidth
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: '#fff',
                }}
              >
                {loading ? <CircularProgress /> : 'Agrega Nuevo Campo'}
              </Button>
            </Box>
          </Box>

          {/* Social Media */}

          <Box textAlign={'center'} width="100%" mb={5}>
            <TypographyPersonalized variant="h4" title={'Redes Sociales'} />
          </Box>
          {infoCopy.socialMedia.map(
            ({icon, id, name, position, url}, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '32px',
                  }}
                >
                  <TypographyPersonalized variant="body" title={'Campo: '} />
                  <TextField
                    type="text"
                    fullWidth
                    name="name"
                    onChange={(e) =>
                      handleChange(e, false, 'socialMedia', null, id)
                    }
                    value={name}
                    required
                    error={name === ''}
                    helperText={name === '' && '* Es obligatorio'}
                    autoComplete="off"
                    inputProps={{
                      autoComplete: 'new-password',
                      form: {
                        autoComplete: 'off',
                      },
                    }}
                  />
                  <TypographyPersonalized variant="body" title={'Icono: '} />
                  <TextField
                    type="text"
                    fullWidth
                    name="icon"
                    onChange={(e) =>
                      handleChange(e, false, 'socialMedia', null, id)
                    }
                    value={icon}
                    required
                    error={icon === ''}
                    helperText={icon === '' && '* Es obligatorio'}
                    autoComplete="off"
                    inputProps={{
                      autoComplete: 'new-password',
                      form: {
                        autoComplete: 'off',
                      },
                    }}
                  />
                  <TypographyPersonalized variant="body" title={'Link: '} />
                  <TextField
                    type="text"
                    fullWidth
                    name="url"
                    onChange={(e) =>
                      handleChange(e, false, 'socialMedia', null, id)
                    }
                    value={url}
                    required
                    error={url === ''}
                    helperText={url === '' && '* Es obligatorio'}
                    autoComplete="off"
                    inputProps={{
                      autoComplete: 'new-password',
                      form: {
                        autoComplete: 'off',
                      },
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      rowGap: 2,
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <IconButton
                      className="DeleteMenuItem-Form"
                      disabled={loading}
                      onClick={() =>
                        handleDeleteMember('socialMedia', null, id)
                      }
                    >
                      <DeleteOutline
                        sx={{
                          fill: `${theme.palette.red.main} !important`,
                        }}
                      />
                    </IconButton>
                  </Box>
                  {/* <Box
                    className="AgregaNuevoCampo-AditionalFooterInfo-Form"
                    display="flex"
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      type="button"
                      // disabled={isAuthenticating}
                      variant="contained"
                      disabled={loading}
                      // onClick={() => handleAddMember('aditionalFooterInfo')}
                      // fullWidth
                      sx={{
                        // backgroundColor: theme.palette.primary.main,
                        color: '#fff',
                      }}
                    >
                      <Link
                        component={RouterLink}
                        color="inherit"
                        to={`https://mui.com/material-ui/material-icons/`}
                        target={'_blank'}
                        sx={{
                          textDecoration: 'none',
                          display: 'inline-block',
                          color: theme.palette.light.main,
                        }}
                      >
                        <TypographyPersonalized
                          variant={'body'}
                          title={'Mas Iconos'}
                          color="inherit"
                        />
                      </Link>
                    </Button>
                  </Box> */}
                </Grid>
              )
            },
          )}
          <Box
            className="AgregaNuevoCampo-socialMedia-Form"
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
              onClick={() => handleAddMember('socialMedia')}
              // fullWidth
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
              }}
            >
              {loading ? <CircularProgress /> : 'Agrega Nueva Red Social'}
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
            <FooterPreview footerInfo={infoCopy} />
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
