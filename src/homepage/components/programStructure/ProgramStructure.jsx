import React, {useState} from 'react'
import {EventButton, SectionContainer, TypographyPersonalized} from '../common'
import {Box, useTheme} from '@mui/material'
import {CardComponent} from './components'

export const ProgramStructure = ({programStructureInfo}) => {
  const theme = useTheme()
  const {programValues, sectionTitle, title} = programStructureInfo

  const [selectedItem, setSelectedItem] = useState(1) // Defaulting to the center item

  const adjustCarouselClass = (index) => {
    if (index === selectedItem - 1) return `prev`
    if (index === selectedItem) return `active`
    if (index === selectedItem + 1) return `next`
  }

  return (
    <SectionContainer
      sxContainer={{
        flexDirection: {
          xs: 'column',
          laptop: 'row',
        },
      }}
    >
      <Box
        className="textSection"
        flex={1}
        textAlign={{xs: 'center', laptop: 'left'}}
        justifyContent="center"
        alignItems="center"
        marginBottom={{xs: '16px', lgMobile: '32px'}}
      >
        <TypographyPersonalized
          title={sectionTitle}
          variant="h6"
          sx={{marginBottom: '8px'}}
        />
        <TypographyPersonalized
          title={title}
          variant="h2"
          sx={{marginBottom: '32px'}}
        />

        <Box
          display="flex"
          flexWrap="wrap"
          gap="16px"
          maxWidth={{xs: '500px', laptop: 'none'}}
          mx={{xs: 'auto', laptop: 'inherit'}}
          alignItems="center"
          justifyContent={{xs: 'center', laptop: 'flex-start'}}
        >
          {/* item: {active: boolean, description: string, details[]: {bullet: string, definition: string, position: number}, id: string, image: string, position: number, title: string} */}
          {programValues
            .map((item, index) => (
              <EventButton
                key={index}
                displayInfo={item}
                link={false}
                onClick={() => setSelectedItem(item.position)}
                sxBox={{
                  width: {xs: 'fit-content'},
                }}
                sxButton={{
                  width: 'fit-content',
                  transition: '.5s',
                  background:
                    selectedItem === item.position
                      ? theme.palette.gradient.main
                      : theme.palette.light.main,
                  color:
                    selectedItem === item.position
                      ? theme.palette.light.main
                      : theme.palette.black.main,
                }}
              />
            ))
            .sort((a, b) => a.position - b.position)}
        </Box>
      </Box>

      <Box
        className="cardSection"
        flex={1.25}
        width="100%"
        maxWidth={{xs: '300px', specialTablet: '700px'}}
        mx="auto"
      >
        <Box
          display="flex"
          className="cardContainer"
          position="relative"
          gap="8px"
          minHeight="600px"
        >
          {programValues
            .map((item, index) => (
              <CardComponent
                index={index}
                className={`${adjustCarouselClass(
                  item.position,
                )} carousel-item`}
                item={item}
              />
            ))
            .sort((a, b) => a.position - b.position)}
        </Box>
      </Box>
    </SectionContainer>
  )
}
