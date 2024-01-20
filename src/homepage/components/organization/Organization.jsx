import React from 'react'
import {SectionContainer, TypographyPersonalized} from '../common'
import {Box} from '@mui/material'
import {MembersContainer} from './membersContainer/MembersContainer'
import {Neworg} from './neworg'
import './styles.css'

export const Organization = ({organizationInfo}) => {
  const {sectionTitle, title, members} = organizationInfo

  return (
    <SectionContainer
      className="OrganizationSection"
      sxContainer={{
        flexDirection: {
          xs: 'column',
        },
      }}
    >
      <Box
        className="OrganizationSection-header"
        textAlign="center"
        flex={1}
        gap="8px"
        width="100%"
      >
        <TypographyPersonalized variant="h6" title={sectionTitle} />
        <TypographyPersonalized variant="h2" title={title} />
      </Box>

      <MembersContainer members={members} />
      {/* <Neworg /> */}
    </SectionContainer>
  )
}
