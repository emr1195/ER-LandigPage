import {Box, useTheme} from '@mui/material'
import React from 'react'

export const ImageSection = ({
  group,
  expeditionGroups,
  setSelectedGroup,
  setSecondaryColor,
}) => {
  const theme = useTheme()

  return (
    <Box
      flex={1.25}
      className="imageSection-Container"
      height="100%"
      width={{xs: '100%', laptop: '705px'}}
      display="flex"
      flexDirection="column"
      sx={{
        transition: '1.5s',
      }}
    >
      <Box
        className="BackgroundBox-Color"
        sx={{
          backgroundColor: `${group.colors.secondary}`,
          width: {xs: '100%', laptop: '120%'},
          borderTopRightRadius: '500px',
          borderBottomRightRadius: '500px',
          height: '505px',
          // maxWidth: '705px',
          // {xs: 'column', laptop: 'row'}
          maxWidth: {xs: '705px', laptop: '832px'},
          marginLeft: {xs: '0', laptop: '-128px'},
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          transition: '1.5s',

          '& img': {
            height: {xs: '150px', lgMobile: '250px', sm: '350px'},
            transition: '.5s',
            filter: `drop-shadow(rgba(0, 0, 0, .5) 0px 20px 1.75rem)`,
          },
        }}
      >
        <img width="auto" src={group.emblema} alt={group.title} />

        <Box
          className="smallLeft-circle"
          sx={{
            position: 'absolute',
            left: '27%',
            top: '-20px',
            width: '40px',
            height: '40px',
            filter: 'blur(2px)',
            // background: theme.palette.gradient.main,
            background: group.title.toLowerCase().includes('exploradores')
              ? `linear-gradient(${group.colors.secondary}, ${group.colors.primary})`
              : group.colors.primary,
            // background: group.colors.primary,
            // background: theme.palette.red.main,
            transition: '1.5s',
            borderRadius: '50%',
          }}
        />
        <Box
          className="smallRight-circle"
          sx={{
            position: 'absolute',
            right: '-7%',
            top: '40px',
            width: '40px',
            height: '40px',
            filter: 'blur(2px)',
            // background: theme.palette.blue.main,
            background: group.title.toLowerCase().includes('exploradores')
              ? group.colors.secondary
              : group.colors.primary,
            // background: group.colors.primary,
            // background: theme.palette.red.main,
            transition: '1.5s',
            borderRadius: '50%',
          }}
        />
        <Box
          className="bigRight-circle"
          sx={{
            position: 'absolute',
            right: '48px',
            top: '-96px',
            width: '96px',
            height: '96px',
            filter: 'blur(6px)',
            // background: theme.palette.gradient.main,
            // background:
            //   group.title === 'exploradores'
            //     ? group.colors.secondary
            //     : group.colors.primary,
            background: group.title.toLowerCase().includes('exploradores')
              ? `linear-gradient(${group.colors.primary}, ${group.colors.secondary})`
              : group.colors.primary,
            // background: theme.palette.red.main,
            transition: '1.5s',
            borderRadius: '50%',
          }}
        />
        <Box
          className="smallCenter-circle"
          sx={{
            position: 'absolute',
            right: '60px',
            top: '40%',
            width: '16px',
            height: '16px',
            filter: 'blur(2px)',
            background: theme.palette.light.main,
            // background: theme.palette.red.main,
            transition: '1.5s',
            borderRadius: '50%',
          }}
        />
        <Box
          className="smallBottom-circle"
          sx={{
            position: 'absolute',
            right: '30px',
            top: '60%',
            width: '16px',
            height: '16px',
            filter: 'blur(2px)',
            background: group.colors.primary,
            transition: '1.5s',
            borderRadius: '50%',
          }}
        />
      </Box>
      <Box
        className="groupSelector"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width={{xs: '100%', sm: '75%'}}
        flexWrap="wrap"
        height={{xs: '200px', sm: '100px'}}
        gap="32px"
      >
        {expeditionGroups.map((item, index) => (
          <img
            key={`_${index}`}
            src={item.emblema}
            alt={item.title}
            width={75}
            height={75}
            onClick={() => {
              setSelectedGroup(item.title)
              setSecondaryColor(item.colors.secondary)
            }}
            style={{
              cursor: 'pointer',
              filter: `drop-shadow(rgba(0, 0, 0, .5) 3px 4px 0.25rem)`,
              objectFit:
                item.title.toLowerCase() === 'lideres' ? 'cover' : 'contain',
              transition: '1.5s',
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
