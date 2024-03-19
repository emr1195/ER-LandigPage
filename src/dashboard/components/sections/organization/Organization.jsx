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
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {TypographyPersonalized} from '../../../../homepage/components/common'
import {Organization as OrganizationPreview} from '../../../../homepage/components'
import {DeleteOutline, UploadOutlined} from '@mui/icons-material'
import {resetInfo} from '../../../../store/dashboard'
import {fileUpload} from '../../../../helpers'
import Swal from 'sweetalert2'
import {savingNewOrganization} from '../../../../store/landingPage'

export const Organization = ({info}) => {
  const qqq = structuredClone(info)
  const [infoCopy, setInfoCopy] = useState(qqq)
  const dispatch = useDispatch()
  const theme = useTheme()
  const [loading, setLoading] = useState(false)
  const {isSaving} = useSelector((state) => state.organization)
  const fileInputRef = useRef()

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

      const itemIndex = updatedInfoCopy.members[insideSection].findIndex(
        (item) => item.id === id,
      )

      if (itemIndex !== -1) {
        updatedInfoCopy.members[insideSection][itemIndex] = {
          ...updatedInfoCopy.members[insideSection][itemIndex],
          [name]: value,
        }

        setInfoCopy(updatedInfoCopy)
      }
    } else {
      setInfoCopy((prevInfoCopy) => ({
        ...prevInfoCopy,
        [name]: value,
      }))
    }
  }

  const handleReset = () => {
    dispatch(resetInfo('organization'))
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

  const handleAddMember = (insideSection) => {
    setLoading(true)
    const updatedInfoCopy = structuredClone(infoCopy)

    // Create a new item with default values or modify as needed
    let newID
    let newPosition

    do {
      newID = Math.floor(
        Math.random() * updatedInfoCopy.members[insideSection].length + 2,
      )
    } while (
      updatedInfoCopy.members[insideSection].some((item) => item.id === newID)
    )

    do {
      newPosition = Math.floor(
        Math.random() * updatedInfoCopy.members[insideSection].length + 2,
      )
    } while (
      updatedInfoCopy.members[insideSection].some(
        (item) => item.position === newPosition,
      )
    )

    const newItem = {
      id: newID,
      image: '',
      name: '',
      role: '',
      position: newPosition,
    }

    updatedInfoCopy.members[insideSection].push(newItem)
    setInfoCopy(updatedInfoCopy)
    setLoading(false)
  }

  const handleDeleteMember = (insideSection, itemID) => {
    setLoading(true)

    const updatedInfoCopy = structuredClone(infoCopy)
    const itemIndex = updatedInfoCopy.members[insideSection].findIndex(
      (item) => item.id === itemID,
    )

    if (itemIndex !== -1) {
      updatedInfoCopy.members[insideSection].splice(itemIndex, 1)
      setInfoCopy(updatedInfoCopy)
    }
    setLoading(false)
  }

  const onSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault()
    dispatch(savingNewOrganization(infoCopy))
  }

  const grabMemberTypeName = (name) => {
    switch (name) {
      case 'cmDist':
        return 'Coordinadores Distrital'
      case 'comNac':
        return 'Comandantes Nacionales'
      case 'coorNac':
        return 'Coordinador Nacional'
      case 'teamNac':
        return 'Equipo Nacional'

      default:
        break
    }
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

            {Object.entries(infoCopy.members).map(([memberType, members]) => {
              return (
                <Box
                  key={memberType}
                  mt={2}
                  borderBottom={'1px solid black'}
                  paddingBottom={3}
                >
                  <TypographyPersonalized
                    variant={'h4'}
                    sx={{textAlign: 'center'}}
                    title={grabMemberTypeName(memberType)}
                  />

                  {members.map(({image, name, position, id, role}, index) => {
                    return (
                      <Grid
                        className={`members-${index}`}
                        key={index}
                        item
                        xs={12}
                        sx={{
                          mt: 2,
                          mb: 3,
                          paddingBottom: 3,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
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
                            sx={{minWidth: '150px'}}
                            variant="body"
                            title={'Nombre: '}
                          />
                          <TextField
                            type="text"
                            fullWidth
                            name="name"
                            onChange={(e) =>
                              handleChange(e, false, 'members', memberType, id)
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
                            title={'TItulo: '}
                          />
                          <TextField
                            type="text"
                            fullWidth
                            name="role"
                            onChange={(e) =>
                              handleChange(e, false, 'members', memberType, id)
                            }
                            value={role}
                            required
                            error={role === ''}
                            helperText={role === '' && '* Es obligatorio'}
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
                            justifyContent: 'flex-start',
                            rowGap: 2,
                            alignItems: 'center',
                            width: '100%',
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              margin: 'auto',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              '& img': {
                                width: '120px',
                                height: '180px',
                                margin: 'auto',
                                objectFit: 'cover',
                              },
                            }}
                          >
                            <img src={image} alt={name} />
                          </Box>
                          {/* <TypographyPersonalized
                            sx={{minWidth: '150px'}}
                            variant="body"
                            title={'Imagen: '}
                          /> */}
                          <Box display="flex" width="100%" gap={'8px'}>
                            <TextField
                              type="text"
                              fullWidth
                              name="image"
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  false,
                                  'members',
                                  memberType,
                                  id,
                                )
                              }
                              value={image}
                              required
                              error={image === ''}
                              helperText={image === '' && '* Es obligatorio'}
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
                              key={index}
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
                                onChange={() => {
                                  onFileInputChange()
                                }}
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
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: members.length > 1 ? 'flex' : 'none',
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
                            onClick={() => handleDeleteMember(memberType, id)}
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
                    className="AddNewMember-Form"
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
                      onClick={() => handleAddMember(memberType)}
                      // fullWidth
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: '#fff',
                      }}
                    >
                      {loading ? <CircularProgress /> : 'Agrega Nuevo Miembro'}
                    </Button>
                  </Box>
                </Box>
              )
            })}
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
            <OrganizationPreview organizationInfo={infoCopy} />
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
