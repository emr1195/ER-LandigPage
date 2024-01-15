import {Box, Grid, useTheme} from '@mui/material'
import React from 'react'
import {TypographyPersonalized} from '../../../common'

export const TextSection = ({group, secondaryColor, sectionTitle}) => {
  const theme = useTheme()
  return (
    <Box
      flex={1}
      className="textSection"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      mx={{xs: 'auto'}}
      maxWidth="445px"
      gap="32px"
      textAlign={{xs: 'center', laptop: 'left'}}
    >
      <Box className="expeditionGroup-header" gap="8px" width="100%">
        <TypographyPersonalized variant="h6" title={sectionTitle} />
        <TypographyPersonalized variant="h2" title={group.title} />
      </Box>
      <TypographyPersonalized
        variant="body"
        title={group.age && `Edad: ${group.age}`}
        sx={{textAlign: 'left', width: '100%', my: '-24px', fontWeight: 'bold'}}
      />

      <TypographyPersonalized variant="body" title={group.description} />

      <Grid
        container
        width="100%"
        textAlign={'center'}
        alignItems={'center'}
        justifyContent={'flex-start'}
      >
        <img src={group.image} alt="" />
      </Grid>
    </Box>
  )
}
