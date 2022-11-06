import React from 'react'

const Alert = ({ alert }) => {
  if (!alert) return null

  const { message, type } = alert
  const className = ['alert', ' mb-3']
  let alertIcon = null

  if (type === 'success') {
    className.push('alert-success')
    alertIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    )
  } else if (type === 'error') {
    className.push('alert-error')
    alertIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    )
  }

  return (
    <div className={className.join(' ')}>
      <div>
        {alertIcon}
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Alert
