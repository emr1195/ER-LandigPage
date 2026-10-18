import React, {useState} from 'react'

export const LeaderCard = ({member, featured = false}) => {
  const [failedImage, setFailedImage] = useState(null)
  const initials = member.name?.trim().split(/\s+/).slice(0, 2).map((word) => word[0]).join('')

  return (
    <article className={`organization-leader${featured ? ' organization-leader--featured' : ''}`}>
      <div className="organization-portrait">
        {member.image && failedImage !== member.image ? (
          <img
            src={member.image}
            alt={member.name ? `Retrato de ${member.name}` : 'Retrato del integrante'}
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
            width={featured ? 184 : 144}
            height={featured ? 184 : 144}
            onError={() => setFailedImage(member.image)}
          />
        ) : (
          <span className="organization-avatar-fallback" aria-label="Fotografía no disponible">{initials || 'ER'}</span>
        )}
      </div>
      <div className="organization-leader-info">
        <h4>{member.name}</h4>
        <p className="organization-role">{member.role}</p>
        {member.district && <p className="organization-district">{member.district}</p>}
      </div>
    </article>
  )
}
