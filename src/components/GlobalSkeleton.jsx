
const GlobalSkeleton = () => {
  return (
    <div className="h-[80vh] lg:h-[90vh] w-full flex justify-center items-center">
      <div className="h-full w-[90%] lg:w-[50%] flex flex-col justify-center
      items-center gap-5">
        <div className="skeleton h-8 w-full bg-stone-900"></div>
        <div className="skeleton h-8 w-full bg-stone-900"></div>
        <div className="skeleton h-8 w-full bg-stone-900"></div>
      </div>
    </div>
  )
}

export default GlobalSkeleton