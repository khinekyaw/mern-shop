import React from 'react'

const Badge = ({ status }) => {
  const className = ['badge', 'mb-4']
  if (status === 'pending') className.push('badge-warning')
  else if (status === 'delivered') className.push('badge-success')
  else if (status === 'cancelled') className.push('badge-error')

  return (
    <div className="tooltip" data-tip="nothing is forever🥸">
      <div className={className.join(' ')}>{status}</div>
    </div>
  )
}

export default Badge
