import React, {useEffect, useState} from 'react'
import {SectionContainer} from '../common'
import {Grid} from '@mui/material'
import {ImageSection, TextSection} from './sections'

export const ExpeditionGroup = ({expeditionGroupInfo}) => {
  const {expeditionGroups, sectionTitle, title} = expeditionGroupInfo

  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)

  useEffect(() => {
    if (selectedGroupIndex >= expeditionGroups.length) {
      setSelectedGroupIndex(0)
    }
  }, [expeditionGroups.length, selectedGroupIndex])

  if (expeditionGroups.length === 0) return null

  const secondaryColor =
    expeditionGroups[selectedGroupIndex]?.colors?.secondary || ''
  return (
    <SectionContainer className="ExpeditionGroup">
      {expeditionGroups.map((group, index) => (
        <Grid
          key={index}
          display={selectedGroupIndex === index ? 'flex' : 'none'}
          container
          width="100%"
          gap="64px"
          className="ExpeditionGroup-Container"
          flexDirection={{xs: 'column', laptop: 'row'}}
        >
          <ImageSection
            group={group}
            selectedGroupIndex={selectedGroupIndex}
            setSelectedGroupIndex={setSelectedGroupIndex}
            expeditionGroups={expeditionGroups}
          />

          <TextSection
            group={group}
            secondaryColor={secondaryColor}
            sectionTitle={sectionTitle}
          />
        </Grid>
      ))}
    </SectionContainer>
  )
}

// group = {
//     aditionalInfo[]: {description: String, title: string},
//     colors: {primary: string, secondary: string},
//     description: 'string,
//     id: 'string,
//      title: string
// }
