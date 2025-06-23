import { useNavigate } from "react-router-dom"

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="h-[80vh] lg:h-[90vh] w-full flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center items-center
      gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-3xl text-activeColor font-heading font-medium">
            Planzo
          </h2>
        </div>
        <div className="h-auto w-full text-center">
          <h2 className="text-lg text-zinc-200 font-heading font-medium">
            Your personal dashboard <br className="block md:hidden" /> for tasks and
            money
          </h2>
        </div>
        <div className="h-auto w-full text-center">
          <button className="px-6 py-3 rounded font-text font-medium
          cursor-pointer text-base bg-stone-900 text-activeColor
          hover:text-white" onClick={() => navigate('/sign-in')}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home