import {Box, Button, Tooltip, useTheme} from '@mui/material'
import React, {useState} from 'react'
import {TypographyPersonalized} from '../../common'

export const MembersContainer = ({members}) => {
  const theme = useTheme()
  const [maxSlice, setMaxSlice] = useState(8)

  return (
    <Box display="flex" flexDirection="column" gap="32px" width="100%">
      <Box
        className="MembersContainer"
        display="flex"
        width="100%"
        justifyContent="center"
        alignItems="center"
        gap={{xs: '32px', laptop: '0'}}
        flexWrap="wrap"
      >
        {members
          .map((member, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '8px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: {
                    xs: member.position == 0 ? '100%' : '140px',
                    tablet: '140px',
                  },
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
                  <img src={member.image} alt={member.title} />
                </Box>
                <Box py="8px" display="flex" flexDirection="column">
                  {member.title.length > 11 ? (
                    <Tooltip title={member.title}>
                      <Box>
                        <TypographyPersonalized
                          title={member.title.substring(0, 11) + '...'}
                          color={theme.palette.black.main}
                          variant="body"
                          sx={{fontWeight: 'bold'}}
                        />
                      </Box>
                    </Tooltip>
                  ) : (
                    <TypographyPersonalized
                      title={member.title}
                      color={theme.palette.black.main}
                      variant="body"
                      sx={{fontWeight: 'bold'}}
                    />
                  )}

                  {member.name.length > 11 ? (
                    <Tooltip
                      title={member.name}
                      sx={{display: member.name.length > 11}}
                    >
                      <Box>
                        <TypographyPersonalized
                          title={member.name.substring(0, 11) + '...'}
                          variant="button"
                          color={theme.palette.black50.main}
                        />
                      </Box>
                    </Tooltip>
                  ) : (
                    <TypographyPersonalized
                      title={member.name}
                      variant="button"
                      color={theme.palette.black50.main}
                    />
                  )}
                </Box>
              </Box>
            )
          })
          .sort((a, b) => a.position - b.position)
          .slice(0, maxSlice)}
      </Box>
      <Box
        width="100%"
        height={40}
        py="32px"
        position="relative"
        alignItems="center"
        justifyContent="center"
        display={members.length > 8 ? 'flex' : 'none'}
      >
        <Box
          sx={{
            border: '1px solid #DADCE0',
            width: '100%',
            position: 'absolute',
            left: 0,
          }}
        />
        <Button
          className={maxSlice > 8 ? 'MostrarMenos-Button' : 'MostrasMas-Button'}
          onClick={
            maxSlice > 8
              ? () => setMaxSlice(8)
              : () => setMaxSlice(members.length + 1)
          }
          sx={{
            backgroundColor: '#f1f3f4',
            borderRadius: '30px',
            width: '300px',
            height: '40px',
            transition: 'all .5s',

            '&:hover': {
              backgroundColor: '#e0e0e3',
            },
          }}
        >
          <TypographyPersonalized
            variant={'button'}
            title={maxSlice > 8 ? 'Mostras menos' : 'Mostrar mas'}
            sx={{fontWeight: 'bold'}}
          />
        </Button>
      </Box>
    </Box>
  )
}
