import React from 'react'
import {SectionContainer} from '../common'
import {Box} from '@mui/material'
import {ExtraInfo, MainSection, MenuSection, SocialMedia} from './sections'
export const Footer = ({footerInfo}) => {
  const {mainSection, menus, socialMedia, aditionalFooterInfo} = footerInfo

  return (
    <SectionContainer
      sxContainer={{
        display: 'flex',
        flexDirection: 'column',
        gap: {xs: '32px', laptop: '64px'},
      }}
      className="FooterSection"
    >
      <Box
        className="footerContainer"
        sx={{
          display: 'flex',
          flexDirection: {xs: 'column', md: 'row'},
          alignItems: 'stretch',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          gap: {xs: '32px', sm: 'inherit'},
        }}
      >
        <MainSection mainSection={mainSection} />

        <MenuSection menus={menus} />
      </Box>

      <Box
        className="FooterExtraInfoContainer"
        display="flex"
        flexDirection={{xs: 'column', md: 'row'}}
        alignItems={{xs: 'flex-start', md: 'center'}}
        justifyContent="space-between"
        width="100%"
        gap="32px"
      >
        <SocialMedia socialMedia={socialMedia} />
        <ExtraInfo aditionalFooterInfo={aditionalFooterInfo} />
      </Box>
    </SectionContainer>
  )
}

/**
 * Main Section: logo: string, logoTitle: string, moreInfo[]: {name: string, description: string}
 * menus[]: {title: string, links[]: {name: string, outsideURL: boolean, url: string}}
 * sectionTitle: string
 * title: string
 * socialMedia[]: {name: string, icon: iconName, position: number, url: string }
 * aditionalFooterInfo[]: {name: string, disable: boolean, outsideURL: boolean, url:  string}
 */
