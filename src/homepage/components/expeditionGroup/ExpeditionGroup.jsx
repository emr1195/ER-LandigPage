import React, {useEffect, useState} from 'react'
import {SectionContainer} from '../common'
import {Grid} from '@mui/material'
import {ImageSection, TextSection} from './sections'
import './groupTransitions.css'

export const ExpeditionGroup = ({expeditionGroupInfo}) => {
  const {expeditionGroups, sectionTitle, title} = expeditionGroupInfo

  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0)
  const [displayedGroupIndex, setDisplayedGroupIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (selectedGroupIndex === displayedGroupIndex) { setLeaving(false); return }
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setDisplayedGroupIndex(selectedGroupIndex)
      setLeaving(false)
      return
    }
    setLeaving(true)
    const timer = window.setTimeout(() => {
      setDisplayedGroupIndex(selectedGroupIndex)
      setLeaving(false)
    }, 450)
    return () => window.clearTimeout(timer)
  }, [selectedGroupIndex, displayedGroupIndex])

  useEffect(() => {
    if (selectedGroupIndex >= expeditionGroups.length) {
      setSelectedGroupIndex(0)
    }
  }, [expeditionGroups.length, selectedGroupIndex])

  if (expeditionGroups.length === 0) return null

  const group = expeditionGroups[Math.min(displayedGroupIndex, expeditionGroups.length - 1)]
  const secondaryColor = group?.colors?.secondary || ''
  return (
    <SectionContainer className="ExpeditionGroup">
        <Grid
          display="flex"
          container
          width="100%"
          gap="64px"
          className="ExpeditionGroup-Container"
          data-transition={leaving ? 'leaving' : 'visible'}
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
