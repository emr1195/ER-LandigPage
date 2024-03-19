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
import {useDispatch, useSelector} from 'react-redux'
import {TypographyPersonalized} from '../../../../homepage/components/common'
import {ProgramStructure as ProgramStructurePreview} from '../../../../homepage/components'
import {resetInfo} from '../../../../store/dashboard'
import {savingNewProgramStructure} from '../../../../store/landingPage'

export const ProgramStructure = ({info}) => {
  const qqq = structuredClone(info)
  const [infoCopy, setInfoCopy] = useState(qqq)
  const dispatch = useDispatch()
  const {isSaving} = useSelector((state) => state.programStructure)

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

    if (section == 'programValues' && id) {
      const updatedInfoCopy = structuredClone(infoCopy)

      const newQ = updatedInfoCopy.programValues.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            [name]: checkBox ? checked : value,
          }
        }
        return item
      })
      updatedInfoCopy.programValues = newQ
      setInfoCopy(updatedInfoCopy)
    } else {
      setInfoCopy((prevInfoCopy) => ({
        ...prevInfoCopy,
        [name]: value,
      }))
    }
  }

  const handleReset = () => {
    dispatch(resetInfo('programStructure'))
  }

  const onSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault()

    dispatch(savingNewProgramStructure(infoCopy))
  }

  return (
    <form onSubmit={onSubmit}>
      <Box
        className="HeroSection-Dashboard"
        display="block"
        width="100%"
        overflow={'auto'}
      >
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

            {infoCopy.programValues.map(
              (
                {
                  active,
                  description,
                  details,
                  display,
                  id,
                  image,
                  position,
                  title,
                },
                index,
              ) => {
                return (
                  <Grid
                    className={`programValue-${index}`}
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
                        justifyContent: 'space-between',
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
                          handleChange(e, false, 'programValues', null, id)
                        }
                        value={title}
                        required
                        error={title === '' && display}
                        helperText={
                          title === '' && display && '* Es obligatorio'
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
                        title={'Descripcion: '}
                      />
                      <TextField
                        multiline
                        rows={4}
                        type="text"
                        fullWidth
                        name="description"
                        onChange={(e) =>
                          handleChange(e, false, 'programValues', null, id)
                        }
                        value={description}
                        required
                        error={description === '' && display}
                        helperText={
                          description === '' && display && '* Es obligatorio'
                        }
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
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <TypographyPersonalized
                        // sx={{minWidth: '150px'}}
                        variant="body"
                        title={'Posicion: '}
                      />
                      <TextField
                        type="number"
                        name="position"
                        onChange={(e) =>
                          handleChange(e, false, 'programValues', null, id)
                        }
                        value={position}
                        required
                        error={(position === '' || position < 1) && display}
                        helperText={
                          (position === '' || position < 1) &&
                          display &&
                          '* Es obligatorio'
                        }
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
                          handleChange(e, false, 'programValues', null, id)
                        }
                        value={image}
                        // required
                        // error={image === '' && display}
                        // helperText={image === '' && display && '* Es obligatorio'}
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
                    <FormControlLabel
                      label="Mostrar?"
                      control={
                        <Checkbox
                          // value={infoCopy.textSection.buttons[0].display}
                          value={display}
                          name="display"
                          // checked={infoCopy.textSection.buttons[0].display}
                          checked={display}
                          onChange={(e, checked) =>
                            handleChange(e, true, 'programValues', null, id)
                          }
                        />
                      }
                    />
                  </Grid>
                )
              },
            )}
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
            <ProgramStructurePreview programStructureInfo={infoCopy} />
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
