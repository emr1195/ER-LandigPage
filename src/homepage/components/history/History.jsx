import React from 'react'
import {SectionContainer} from '../common'
import {ImageSection, TextSection} from './sections'

export const History = ({historyInfo}) => {
  return (
    <SectionContainer
      className="History"
      sxBox={{paddingBottom: '0 !important'}}
      sxContainer={{
        flexDirection: {
          xs: 'column-reverse',
          lgMobile: 'column',
          md: 'row',
        },
      }}
    >
      <TextSection textSectionInfo={historyInfo} />
      <ImageSection imageSectionInfo={historyInfo.imageSection} />
    </SectionContainer>
  )
}
