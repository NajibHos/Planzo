import React from 'react'

const DataViewSkeleton = () => {
  return (
    <div className='h-auto w-full grid grid-cols-1 lg:grid-cols-6 gap-y-[28px] lg:gap-5'>
      <div className='skeleton h-5 lg:h-16 w-full bg-stone-900'></div>
      <div className='skeleton h-5 lg:h-16 w-full bg-stone-900'></div>
      <div className='skeleton h-5 lg:h-16 w-full bg-stone-900'></div>
      <div className='skeleton h-5 lg:h-16 w-full bg-stone-900'></div>
      <div className='skeleton h-5 lg:h-16 w-full bg-stone-900'></div>
      <div className='skeleton h-5 lg:h-16 w-full bg-stone-900'></div>
    </div>
  )
}

export default DataViewSkeleton