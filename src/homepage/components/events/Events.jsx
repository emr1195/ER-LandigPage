import React, {useState} from 'react'
import {SectionContainer, TypographyPersonalized} from '../common'
import {Box, Button, useTheme} from '@mui/material'
import {CardContainer} from './cardContainer/CardContainer'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

export const Events = ({eventsInfo}) => {
  const theme = useTheme()

  const {sectionTitle, title, events} = eventsInfo

  const [sliderValue, setSliderValue] = useState(0)

  return (
    <SectionContainer
      className="EventsSection"
      sxContainer={{
        flexDirection: {
          xs: 'column',
        },
      }}
    >
      <Box
        className="EventsSection-header"
        display="flex"
        flexDirection={{xs: 'column', tablet: 'row'}}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        py="64px"
        rowGap="32px"
      >
        <Box
          display="flex"
          flexDirection="column"
          gap="8px"
          textAlign={{xs: 'center', tablet: 'left'}}
        >
          <TypographyPersonalized variant={'h6'} title={sectionTitle} />
          <TypographyPersonalized variant="h2" title={title} />
        </Box>

        <Box
          className="EventsSection-buttons"
          display={events.length > 3 ? 'flex' : 'none'}
          gap="32px"
        >
          <Button
            className="leftButton"
            aria-label="Eventos anteriores"
            onClick={() => setSliderValue((prev) => prev - 1)}
            disabled={sliderValue == 0}
            sx={{
              backgroundColor:
                sliderValue > 0 ? theme.palette.light.main : 'transparent',
              width: '100px',
              height: '100px',
              borderRadius: '100px',
              border: `1px solid ${theme.palette.black10.main}`,
              boxShadow: '0 4px 12px rgba(15,23,42,0.10)',

              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&.Mui-disabled': {
                boxShadow: 'none',
              },
              '&.Mui-disabled .icon': {
                color: theme.palette.action.disabled,
              },
              '& .icon': {
                color: theme.palette.black.main,
              },
            }}
          >
            <KeyboardBackspaceIcon className="icon" />
          </Button>
          <Button
            className="rightButton"
            aria-label="Siguientes eventos"
            onClick={() => setSliderValue((prev) => prev + 1)}
            disabled={sliderValue + 2 > events.length}
            sx={{
              backgroundColor: theme.palette.primary.main,
              width: '100px',
              height: '100px',
              borderRadius: '100px',
              boxShadow: '0 4px 12px rgba(15,23,42,0.12)',

              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              '&.Mui-disabled': {
                boxShadow: 'none',
                backgroundColor: 'action.disabledBackground',
              },
              '&.Mui-disabled .icon': {
                color: theme.palette.action.disabled,
              },
              '& .icon': {
                color: theme.palette.light.main,
              },
            }}
          >
            <KeyboardBackspaceIcon
              className="icon"
              sx={{transform: 'rotate(180deg)'}}
            />
          </Button>
        </Box>
      </Box>

      <CardContainer events={events} sliderValue={sliderValue} />
    </SectionContainer>
  )
}
