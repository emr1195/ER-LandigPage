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
            onClick={() => setSliderValue((prev) => prev - 1)}
            disabled={sliderValue == 0}
            sx={{
              backgroundColor:
                sliderValue > 0 ? theme.palette.light.main : 'transparent',
              width: '100px',
              height: '100px',
              borderRadius: '100px',
              border: `1px solid ${theme.palette.black10.main}`,
              boxShadow: `0px 7px 16px 0px rgba(0, 0, 0, 0.15), 0px 29px 29px 0px rgba(0, 0, 0, 0.13), 0px 66px 40px 0px rgba(0, 0, 0, 0.08), 0px 117px 47px 0px rgba(0, 0, 0, 0.02), 0px 183px 51px 0px rgba(0, 0, 0, 0.00);`,

              '&:hover': {
                border: 'none',
                outline: 'none',
              },
              '&.Mui-disabled': {
                boxShadow: 'none',
              },
              '&.Mui-disabled .icon': {
                color: theme.palette.black.main,
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
            onClick={() => setSliderValue((prev) => prev + 1)}
            disabled={sliderValue + 2 > events.length}
            sx={{
              backgroundColor: theme.palette.primary.main,
              width: '100px',
              height: '100px',
              borderRadius: '100px',
              boxShadow: `0px 7px 16px 0px rgba(0, 0, 0, 0.15), 0px 29px 29px 0px rgba(0, 0, 0, 0.13), 0px 66px 40px 0px rgba(0, 0, 0, 0.08), 0px 117px 47px 0px rgba(0, 0, 0, 0.02), 0px 183px 51px 0px rgba(0, 0, 0, 0.00);`,

              '&:hover': {
                border: 'none',
                outline: 'none',
              },
              '&.Mui-disabled': {
                boxShadow: 'none',
              },
              '&.Mui-disabled .icon': {
                color: theme.palette.light.main,
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
