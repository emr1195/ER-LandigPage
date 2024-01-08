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
      alignItems="flex-start"
      justifyContent="center"
      mx={{xs: 'auto'}}
      maxWidth="445px"
      gap="32px"
      textAlign={{xs: 'center', laptop: 'left'}}
    >
      <Box className="expeditionGroup-header" gap="8px" width="100%">
        <TypographyPersonalized variant="h6" title={sectionTitle} />
        <TypographyPersonalized variant="h2" title={group.title} />
      </Box>
      <TypographyPersonalized variant="body" title={group.description} />

      <Grid
        container
        width="100%"
        gridTemplateColumns={'repeat(2, 1fr)'}
        gridTemplateRows={'repeat(2, 1fr)'}
        textAlign={'center'}
        alignItems={'center'}
        justifyContent={'flex-start'}
        rowGap="32px"
        columnGap="20px"
      >
        {group.aditionalInfo.map((item, index) => (
          <Grid
            key={index}
            className="aditionalInfo-expeditionGroup"
            item
            sx={{
              background: theme.palette.light.main,
              borderRadius: '32px',
              gap: '16px',
              p: '32px',
              display: 'flex',
              flexDirection: 'column',
              width: {xs: '212px', md: '100%', lg: '212px'},
              height: '165.5px',
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: ` 0px 6px 13px 0px rgba(0, 0, 0, 0.10), 0px 23px 23px 0px rgba(0, 0, 0, 0.09), 0px 52px 31px 0px rgba(0, 0, 0, 0.05), 0px 93px 37px 0px rgba(0, 0, 0, 0.01), 0px 146px 41px 0px rgba(0, 0, 0, 0.00);`,
            }}
          >
            <TypographyPersonalized
              variant="h4"
              title={item.title}
              color={secondaryColor}
            />
            <TypographyPersonalized
              variant="body"
              title={item.description}
              color={theme.palette.black.main}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
