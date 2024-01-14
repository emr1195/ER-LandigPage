import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from '@mui/material'
import React, {useMemo, useRef, useState} from 'react'
import {TypographyPersonalized} from '../../../../homepage/components/common'
import {useForm, yupValidation} from '../../../../hooks'
import DeleteIcon from '@mui/icons-material/Delete'
import {Navbar as HomePageNavbar} from '../../../../homepage/components'
import {DeleteOutline, UploadOutlined} from '@mui/icons-material'

export const Navbar = ({info}) => {
  const qqq = structuredClone(info)
  qqq.listMenu.forEach((item) => (item.disabled = true))

  const [infoCopy, setInfoCopy] = useState(qqq)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef()
  const theme = useTheme()

  console.log(infoCopy)

  // Wrap the infoCopy in useMemo to memoize its value
  const memoizedInfoCopy = useMemo(() => infoCopy, [infoCopy])

  const handleChange = ({target}) => {
    const {name, value} = target
    setInfoCopy((prevInfoCopy) => ({
      ...prevInfoCopy,
      [name]: value,
    }))
  }

  const handleListMenuChange = (e, itemID, checkBox = false) => {
    const {name, value, checked} = e.target
    console.log(name, value, checked)

    const updatedInfoCopy = structuredClone(infoCopy)
    const menuItemIndex = updatedInfoCopy.listMenu.findIndex(
      (item) => item.id === itemID,
    )

    if (menuItemIndex !== -1) {
      updatedInfoCopy.listMenu[menuItemIndex] = {
        ...updatedInfoCopy.listMenu[menuItemIndex],
        [name]: checkBox ? checked : value,
      }
      setInfoCopy(updatedInfoCopy)
    }
  }

  const handleDeleteMenuItem = (itemID) => {
    setLoading(true)

    const updatedInfoCopy = structuredClone(infoCopy)
    const menuItemIndex = updatedInfoCopy.listMenu.findIndex(
      (item) => item.id === itemID,
    )
    if (menuItemIndex !== -1) {
      updatedInfoCopy.listMenu.splice(menuItemIndex, 1)
      setInfoCopy(updatedInfoCopy)
    }
    setLoading(false)
  }

  const handleAddMenuItem = () => {
    setLoading(true)
    const updatedInfoCopy = structuredClone(infoCopy)

    // Create a new item with default values or modify as needed
    let newID
    let newPosition

    do {
      newID = Math.floor(Math.random() * updatedInfoCopy.listMenu.length + 2)
    } while (updatedInfoCopy.listMenu.some((item) => item.id === newID))

    do {
      newPosition = Math.floor(
        Math.random() * updatedInfoCopy.listMenu.length + 2,
      )
    } while (
      updatedInfoCopy.listMenu.some((item) => item.position === newPosition)
    )
    console.log(newID, newPosition)
    const newItem = {
      active: false,
      eventButton: false,
      outsideURL: false,
      disabled: true,
      position: newPosition, // Set position based on the current length of the array
      id: newID, // Generate a unique ID or use your logic to set the ID
      title: '',
      url: '',
    }

    updatedInfoCopy.listMenu.push(newItem)
    setInfoCopy(updatedInfoCopy)
    setLoading(false)
  }

  const onFileInputChange = ({target}) => {
    if (target.files.length === 0) return
    if (target.files.length > 1) {
      console.log('only one image can be uploaded')
      return
    }

    console.log(target.files)
    // dispatch(startUploadingFiles(target.files))
  }

  const onSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault()

    // Perform form validation using the login schema
    const validation = await formValidation(loginSchema, formState)

    // Update the validation state with the validation results, or use the default login form data if validation is null
    setValidationState(validation ?? loginFormData)

    // Check if there are no validation errors (all values are empty strings)
    if (!Object.values(validation || {}).some((value) => value !== '')) {
      // Dispatch the action to start the login process with the provided email and password
      // dispatch(startLoginWithEmailPassword({email, password}))
    }
  }

  return (
    <Box className="Navbar-Dashboard" display="block" width="100%">
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
          <TypographyPersonalized variant="h4" title={infoCopy.sectionTitle} />
        </Box>

        <Box
          display="flex"
          flex={1}
          height="100%"
          width="100%"
          mx="auto"
          boxShadow={`0px 4px 25px 0px rgba(0, 0, 0, 0.21)`}
          px="32px"
          className={`Preview-Navbar `}
        >
          <HomePageNavbar navbarInfo={memoizedInfoCopy} />
        </Box>

        <Box
          className="FormGroup-Navbar"
          display="flex"
          flexDirection={'column'}
          flex={1}
        >
          <Box>
            <form
              // onSubmit={onSubmit}
              className="animate__animated animate__fadeIn animate_faster"
            >
              <Grid container gap={'8px'} className="LogoImage-Form">
                {/* Email Input */}
                <Grid
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
                    variant="body"
                    title={'Logo: '}
                    sx={{minWidth: '150px', flex: 1}}
                  />
                  <TextField
                    // label="Correo"
                    type="text"
                    fullWidth
                    name="infoCopy.logo"
                    onChange={handleChange}
                    value={infoCopy.logo}
                    // error={!!validationState.logoURL}
                    // helperText={validationState.logoURL}
                    autoComplete="off"
                    inputProps={{
                      flex: 3,
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
                    gap="16px"
                    flex={1}
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
                      onClick={() => fileInputRef.current.click()}
                    >
                      <UploadOutlined />
                    </IconButton>
                    <TypographyPersonalized
                      title="Sube Imagen"
                      sx={{minWidth: '150px'}}
                    />
                  </Grid>
                  {/* <img src={logo} alt={logoTitle} width="48px" height="48px" /> */}
                </Grid>
                <Grid
                  className="LogoTitle-Form"
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
                    title={'Logo Title: '}
                  />
                  <TextField
                    type="text"
                    fullWidth
                    name="logoTitle"
                    onChange={handleChange}
                    value={infoCopy.logoTitle}
                    // error={!!validationState.logoTitleText}
                    // helperText={validationState.logoTitleText}
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
                  className="ListMenu-Form"
                  display="flex"
                  mt={4}
                  gap="32px"
                >
                  <TypographyPersonalized
                    sx={{minWidth: '150px', paddingTop: 2}}
                    variant="body"
                    title={'Menu: '}
                  />
                  <Grid container>
                    {infoCopy.listMenu.map(
                      (
                        {
                          active,
                          id,
                          eventButton,
                          outsideURL,
                          position,
                          title,
                          url,
                        },
                        index,
                      ) => {
                        return (
                          <Grid
                            item
                            key={index}
                            xs={12}
                            sx={{
                              mt: 2,
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                              gap: '32px',
                            }}
                          >
                            <TextField
                              label="Title"
                              type="text"
                              name="title"
                              onChange={(e) => handleListMenuChange(e, id)}
                              value={title}
                              required
                              // error={!!validationState.logoTitleText}
                              // helperText={validationState.logoTitleText}
                              autoComplete="off"
                              inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                  autoComplete: 'off',
                                },
                              }}
                            />
                            <TextField
                              label="URL/SectionURL"
                              type="text"
                              name="url"
                              onChange={(e) => handleListMenuChange(e, id)}
                              value={url}
                              required
                              // error={!!validationState.logoTitleText}
                              // helperText={validationState.logoTitleText}
                              autoComplete="off"
                              inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                  autoComplete: 'off',
                                },
                              }}
                            />
                            <FormControlLabel
                              label="Link Externo?"
                              control={
                                <Checkbox
                                  value={outsideURL}
                                  name="outsideURL"
                                  checked={outsideURL}
                                  onChange={(e, checked) =>
                                    handleListMenuChange(e, id, true)
                                  }
                                />
                              }
                            />
                            <TextField
                              label="Position"
                              type="number"
                              name="position"
                              onChange={(e) => {
                                handleListMenuChange(e, id)
                              }}
                              value={position}
                              // error={!!validationState.logoTitleText}
                              // helperText={validationState.logoTitleText}
                              autoComplete="off"
                              inputProps={{
                                autoComplete: 'new-password',
                                form: {
                                  autoComplete: 'off',
                                },
                                min: 1,
                                max: infoCopy.listMenu.length + 1,
                              }}
                            />
                            <FormControlLabel
                              label="Transformalo a Boton"
                              control={
                                <Checkbox
                                  disabled={infoCopy.listMenu.some(
                                    (item) =>
                                      item.eventButton === true &&
                                      item.id !== id,
                                  )}
                                  value={eventButton}
                                  name="eventButton"
                                  checked={eventButton}
                                  onChange={(e, checked) =>
                                    handleListMenuChange(e, id, true)
                                  }
                                />
                              }
                            />

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
                    {/* // .sort((a, b) => a.position - b.position)} */}
                  </Grid>
                </Grid>

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
                      title={'Last Modified: '}
                    />
                    <TypographyPersonalized
                      variant="caption"
                      title={`${infoCopy.lastModified},`}
                    />
                    <TypographyPersonalized variant="caption" title={'by: '} />
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
                          // disabled={isAuthenticating}
                          variant="contained"
                          fullWidth
                          sx={{backgroundColor: '#fff', color: '#000'}}
                        >
                          Cancel
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Button
                          type="submit"
                          // disabled={isAuthenticating}
                          onClick={() => console.log('save')}
                          variant="contained"
                          fullWidth
                        >
                          <Typography sx={{ml: 1}}>Save</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>

                {/* Password Input */}
              </Grid>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
