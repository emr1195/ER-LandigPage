import {Box, Tooltip, useTheme} from '@mui/material'
import React from 'react'
import {TypographyPersonalized} from '../../common'

export const MembersContainer = ({members}) => {
  const theme = useTheme()

  return (
    <Box display="flex" flexDirection="column" gap="32px" width="100%">
      <Box
        className="MembersContainer"
        display={members?.coorNac ? 'flex' : 'none'}
        width="100%"
        justifyContent="center"
        alignItems="center"
        gap={{xs: '32px', laptop: '0'}}
        flexWrap="wrap"
      >
        {members?.coorNac
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
                  <img src={member.image} alt={member.name} />
                </Box>
                <Box py="8px" display="flex" flexDirection="column" gap="8px">
                  {/* {member.role.length > 11 ? (
                    <Tooltip title={member.role}>
                      <Box>
                        <TypographyPersonalized
                          title={member.role.substring(0, 11) + '...'}
                          color={theme.palette.black.main}
                          variant="body"
                          sx={{fontWeight: 'bold'}}
                        />
                      </Box>
                    </Tooltip>
                  ) : (
                    <TypographyPersonalized
                      title={member.role}
                      color={theme.palette.black.main}
                      variant="body"
                      sx={{fontWeight: 'bold'}}
                    />
                  )} */}
                  <TypographyPersonalized
                    title={member.role}
                    color={theme.palette.black.main}
                    variant="body"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  />

                  {/* {member.name.length > 11 ? (
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
                  )} */}
                  <TypographyPersonalized
                    title={member.name}
                    variant="button"
                    color={theme.palette.black50.main}
                    sx={{textAlign: 'center'}}
                  />
                </Box>
              </Box>
            )
          })
          .sort((a, b) => a.position - b.position)}
      </Box>

      <Box
        className="MembersContainer"
        display={members?.comNac ? 'flex' : 'none'}
        width="100%"
        justifyContent="center"
        alignItems="center"
        gap={{xs: '32px', laptop: '0'}}
        flexWrap="wrap"
      >
        {members?.comNac
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
                  <img src={member.image} alt={member.name} />
                </Box>

                <Box py="8px" display="flex" flexDirection="column" gap="8px">
                  {/* {member.role.length > 11 ? (
                    <Tooltip title={member.role}>
                      <Box>
                        <TypographyPersonalized
                          title={member.role.substring(0, 11) + '...'}
                          color={theme.palette.black.main}
                          variant="body"
                          sx={{fontWeight: 'bold'}}
                        />
                      </Box>
                    </Tooltip>
                  ) : (
                    <TypographyPersonalized
                      title={member.role}
                      color={theme.palette.black.main}
                      variant="body"
                      sx={{fontWeight: 'bold'}}
                    />
                  )} */}
                  <TypographyPersonalized
                    title={member.role}
                    color={theme.palette.black.main}
                    variant="body"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  />

                  {/* {member.name.length > 11 ? (
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
                  )} */}
                  <TypographyPersonalized
                    title={member.name}
                    variant="button"
                    color={theme.palette.black50.main}
                    sx={{textAlign: 'center'}}
                  />
                </Box>
              </Box>
            )
          })
          .sort((a, b) => a.position - b.position)}
      </Box>

      <Box
        className="MembersContainer"
        display={members?.teamNac ? 'flex' : 'none'}
        width="100%"
        justifyContent="center"
        alignItems="center"
        gap={{xs: '32px', laptop: '0'}}
        flexWrap="wrap"
      >
        {members?.teamNac
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
                  <img src={member.image} alt={member.name} />
                </Box>

                <Box py="8px" display="flex" flexDirection="column" gap="8px">
                  {/* {member.role.length > 11 ? (
                    <Tooltip title={member.role}>
                      <Box>
                        <TypographyPersonalized
                          title={member.role.substring(0, 11) + '...'}
                          color={theme.palette.black.main}
                          variant="body"
                          sx={{fontWeight: 'bold'}}
                        />
                      </Box>
                    </Tooltip>
                  ) : (
                    <TypographyPersonalized
                      title={member.role}
                      color={theme.palette.black.main}
                      variant="body"
                      sx={{fontWeight: 'bold'}}
                    />
                  )} */}
                  <TypographyPersonalized
                    title={member.role}
                    color={theme.palette.black.main}
                    variant="body"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  />

                  {/* {member.name.length > 11 ? (
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
                  )} */}
                  <TypographyPersonalized
                    title={member.name}
                    variant="button"
                    color={theme.palette.black50.main}
                    sx={{textAlign: 'center'}}
                  />
                </Box>
              </Box>
            )
          })
          .sort((a, b) => a.position - b.position)}
      </Box>

      <Box
        className="MembersContainer"
        display={members?.cmDist ? 'flex' : 'none'}
        width="100%"
        justifyContent="center"
        alignItems="center"
        gap={{xs: '32px', laptop: '0'}}
        flexWrap="wrap"
      >
        {members?.cmDist
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
                  <img src={member.image} alt={member.name} />
                </Box>

                <Box py="8px" display="flex" flexDirection="column" gap="8px">
                  {/* {member.role.length > 11 ? (
                    <Tooltip title={member.role}>
                      <Box>
                        <TypographyPersonalized
                          title={member.role.substring(0, 11) + '...'}
                          color={theme.palette.black.main}
                          variant="body"
                          sx={{fontWeight: 'bold'}}
                        />
                      </Box>
                    </Tooltip>
                  ) : (
                    <TypographyPersonalized
                      title={member.role}
                      color={theme.palette.black.main}
                      variant="body"
                      sx={{fontWeight: 'bold'}}
                    />
                  )} */}
                  <TypographyPersonalized
                    title={member.role}
                    color={theme.palette.black.main}
                    variant="body"
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  />

                  {/* {member.name.length > 11 ? (
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
                  )} */}
                  <TypographyPersonalized
                    title={member.name}
                    variant="button"
                    color={theme.palette.black50.main}
                    sx={{textAlign: 'center'}}
                  />
                </Box>
              </Box>
            )
          })
          .sort((a, b) => a.position - b.position)}
      </Box>
    </Box>
  )
}
