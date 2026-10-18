import React from 'react'
import {LeaderCard} from '../LeaderCard'

// Preserve the same category and record order used by the original section.
const memberCategories = ['coorNac', 'comNac', 'teamNac', 'cmDist']
const normalizedRole = (role = '') => role.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,;:]/g, '').trim().replace(/\s+/g, ' ').toLowerCase()

export const MembersContainer = ({members = {}}) => {
  const profiles = memberCategories.flatMap((category) =>
    (members?.[category] || []).map((member, index) => ({member, category, key: `${category}-${member.id || index}`})),
  ).filter(({member}) => member.name || member.role || member.image)
  const featured = profiles.find(({member}) => normalizedRole(member.role) === 'coordinador nacional')
  const remaining = profiles.filter((profile) => profile !== featured)
  const isDistrict = ({member, category}) => category === 'cmDist' || /distrital/.test(normalizedRole(member.role))
  const nationalCoordinators = remaining.filter((profile) => !isDistrict(profile))
  const districtCoordinators = remaining.filter(isDistrict)
  const renderGroup = (label, group) => group.length > 0 && (
    <section className="organization-level" aria-label={label}>
      <h3 className="organization-level-title">{label}</h3>
      <div className={`organization-grid${group.length === 1 ? ' organization-grid--single' : ''}${group.length === 2 ? ' organization-grid--pair' : ''}`}>
        {group.map(({member, key}) => <LeaderCard key={key} member={member} />)}
      </div>
    </section>
  )

  return (
    <div className="organization-members">
      {featured && (
        <section className="organization-level organization-level--principal" aria-label="Coordinador Nacional">
          <h3 className="organization-level-title">Coordinador Nacional</h3>
          <div className="organization-featured">
            <LeaderCard member={featured.member} featured />
          </div>
        </section>
      )}
      {renderGroup('Coordinadores Nacionales', nationalCoordinators)}
      {renderGroup('Coordinadores Distritales', districtCoordinators)}
    </div>
  )
}
