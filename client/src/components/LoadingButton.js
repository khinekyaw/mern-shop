import React from 'react'

const LoadingButton = ({ loading, onClick, screen }) => {
  const className = ['btn', 'btn-primary', 'btn-outline']
  if (loading) className.push('loading')

  let element = (
    <button className={className.join(' ')} onClick={onClick}>
      {loading ? 'Loading' : 'Load More'}
    </button>
  )
  if (screen)
    return (
      <div className="flex flex-1 items-center justify-center">{element}</div>
    )
  return element
}

export default LoadingButton
