import { useNavigate } from "react-router-dom"

const ErrorRoute = () => {

  const navigate = useNavigate();

  return (
    <div className="h-[80vh] lg:h-[90vh] flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center items-center
      gap-16 lg:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl text-activeColor font-heading font-medium">
            Error 404
          </h2>
        </div>
        <div className="h-auto w-full text-center">
          <h2 className="text-lg text-zinc-200 font-heading font-medium">
            This Page do not exist!
          </h2>
        </div>
        <div className="h-auto w-full text-center">
          <button className="px-6 py-3 rounded bg-stone-900 text-activeColor
          hover:text-white font-text font-medium text-base cursor-pointer"
          onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorRoute