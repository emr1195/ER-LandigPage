import {Box, Card, CardContent, useTheme} from '@mui/material'
import React, {useState} from 'react'
import {TypographyPersonalized} from '../../common'

export const CardContainer = ({events, sliderValue}) => {
  const theme = useTheme()

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  let breakpointValue

  const handleResize = () => {
    setScreenWidth(window.innerWidth)
  }

  // Attach the event listener when the component mounts
  window.addEventListener('resize', handleResize)

  if (
    screenWidth >= theme.breakpoints.values.xs &&
    screenWidth < theme.breakpoints.values.tablet
  ) {
    breakpointValue = 1
  } else if (
    screenWidth >= theme.breakpoints.values.tablet &&
    screenWidth < theme.breakpoints.values.laptop
  ) {
    breakpointValue = 2
  } else {
    breakpointValue = 3
  }

  return (
    <Box
      className="EventsSection-CardContainer"
      display="flex"
      flexDirection="row"
      gap="32px"
      width={{xs: 'fit-content', laptop: '100%'}}
      margin="auto"
    >
      {events
        .map((item, index) => {
          // Function to render Typography components with line breaks
          const renderTypographyWithLineBreaks = (text, variant, color, sx) => (
            <>
              {text.split(';').map((part, idx) => {
                return (
                  <TypographyPersonalized
                    key={idx}
                    title={part.trim()} // Trim to remove leading/trailing spaces
                    variant={variant}
                    color={color}
                    sx={sx}
                  />
                )
              })}
            </>
          )

          return (
            <Card
              key={index}
              className={`EventCard_${item.title} EventsCards`}
              sx={{
                //   width: 373,
                maxWidth: 415,
                height: 575,
                margin: 'auto',
                borderRadius: '24px',
                backgroundColor: theme.palette.light.main,
                transition: 'all 0.5s',
                boxShadow: `0px 7px 16px 0px rgba(0, 0, 0, 0.15), 0px 29px 29px 0px rgba(0, 0, 0, 0.13), 0px 66px 40px 0px rgba(0, 0, 0, 0.08), 0px 117px 47px 0px rgba(0, 0, 0, 0.02), 0px 183px 51px 0px rgba(0, 0, 0, 0.00);`,
                // boxShadow: `0px 4px 10px 0px rgba(0, 0, 0, 0.25),0px 18px 18px 0px rgba(0, 0, 0, 0.21),0px 40px 24px 0px rgba(0, 0, 0, 0.13),0px 71px 28px 0px rgba(0, 0, 0, 0.04),0px 111px 31px 0px rgba(0, 0, 0, 0.00)`,
              }}
            >
              <CardContent
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  textAlign: 'center',
                  p: 0,
                }}
              >
                <img src={item.image} alt={item.title} height={300} />
                <Box
                  padding="32px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  textAlign="left"
                  width="100%"
                  className={'Card_' + index}
                >
                  <Box display="flex" flexDirection="column" gap="12px">
                    <Box display="flex" flexDirection="column" gap="16px">
                      <Box display="flex" flexDirection="column" gap="8px">
                        <Box display="flex" flexDirection="column" gap="0">
                          {renderTypographyWithLineBreaks(
                            item.title,
                            'h5',
                            theme.palette.black.main,
                            {fontSize: '23px'},
                          )}
                        </Box>
                        <Box display="flex" flexDirection="column" gap="0">
                          {renderTypographyWithLineBreaks(
                            item.date,
                            'body',
                            theme.palette.secondary.main,
                            {fontSize: '20px', fontWeight: 'bold'},
                          )}
                        </Box>
                      </Box>
                      <Box display="flex" flexDirection="column" gap="0">
                        {renderTypographyWithLineBreaks(
                          item.ubication,
                          'body',
                          theme.palette.black50.main,
                          {fontSize: '18px'},
                        )}
                      </Box>
                    </Box>
                    <Box display="flex" flexDirection="column" gap="0">
                      {renderTypographyWithLineBreaks(
                        item.byWho,
                        'body',
                        theme.palette.gradient.main,
                        {
                          fontSize: '18px',
                          fontWeight: 'bold',
                          background: `linear-gradient(to right, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%);`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        },
                      )}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )
        })
        .slice(sliderValue, sliderValue + breakpointValue)}
    </Box>
  )
}
