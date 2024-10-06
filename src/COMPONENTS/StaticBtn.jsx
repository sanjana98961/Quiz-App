import React from 'react'

export const StaticBtn = ({children}) => {
  return (
    <div className='fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg flex-end'>
        {children}
    </div>
  )
}
