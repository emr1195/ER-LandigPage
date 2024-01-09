import React, {useState} from 'react'
import {SectionContainer} from '../common'
import {Grid} from '@mui/material'
import {ImageSection, TextSection} from './sections'

export const ExpeditionGroup = ({expeditionGroupInfo}) => {
  const {expeditionGroups, sectionTitle, title} = expeditionGroupInfo

  const [selectedGroup, setSelectedGroup] = useState(
    expeditionGroups[0].title || 'navegantes',
  )

  const [secondaryColor, setSecondaryColor] = useState(
    expeditionGroups[0].colors.secondary,
  )
  return (
    <SectionContainer className="ExpeditionGroup">
      {expeditionGroups.map((group, index) => (
        <Grid
          key={index}
          display={
            selectedGroup.toLowerCase() === group.title.toLowerCase()
              ? 'flex'
              : 'none'
          }
          container
          width="100%"
          gap="64px"
          className="ExpeditionGroup-Container"
          flexDirection={{xs: 'column', laptop: 'row'}}
        >
          <ImageSection
            group={group}
            setSelectedGroup={setSelectedGroup}
            setSecondaryColor={setSecondaryColor}
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
