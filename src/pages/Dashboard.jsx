import { useAuth } from "../utils/AuthProvider"
import { useNavigate } from "react-router-dom";
import { Coins, ExternalLink, FileCode, UserRoundCheck } from "lucide-react"

const Dashboard = () => {

  const { userName } = useAuth();
  const navigate = useNavigate();

  return (
        <div className="h-auto py-12 lg:h-[90vh] lg:py-0 w-full
     flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center
       items-center gap-16 lg:max-2xl:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl font-medium font-heading text-white">
            Dashboard
          </h2>
        </div>
        <div className="h-auto w-full flex flex-col justify-center
         items-center gap-2">
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-medium font-description
              text-zinc-400">
              Welcome <span className="text-activeColor">{ userName }</span>
              </h2>
            </div>
            <div className="h-auto w-full text-left">
              <h2 className="text-lg font-medium font-description
              text-zinc-400">
              Have a good day!
              </h2>
            </div>
        </div>
        <div className="h-auto w-full grid grid-cols-1 lg:grid-cols-3
         gap-8">
          <div className="h-[280px] lg:h-[260px] w-full flex flex-col
           justify-center items-center gap-5 border border-zinc-700
           rounded-xl">
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-activeColor">
                <FileCode size={42} />
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-lg font-medium font-description
              text-white">
                Projects
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-base font-medium font-description
              text-zinc-400 truncate">
                A list of all your creative stuff
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
            items-center">
              <div className="h-auto w-auto">
                <button type="button" className="cursor-pointer"
                  onClick={() => {
                    navigate('/projects') }} >
                  <ExternalLink size={32} className="text-activeColor
                  hover:text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-[280px] lg:h-[260px] w-full flex flex-col
           justify-center items-center gap-5 border border-zinc-700
           rounded-xl">
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-activeColor">
                <UserRoundCheck size={42} />
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-lg font-medium font-description
              text-white">
                Clients
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-base font-medium font-description
              text-zinc-400">
                For managing all your clients
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
            items-center">
              <div className="h-auto w-auto">
                <button type="button" className="cursor-pointer"
                  onClick={() => {
                    navigate('/clients')
                  }}  >
                  <ExternalLink size={32} className="text-activeColor
                  hover:text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="h-[280px] lg:h-[260px] w-full flex flex-col
           justify-center items-center gap-5 border border-zinc-700
           rounded-xl">
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-activeColor">
                <Coins size={42} />
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-lg font-medium font-description
              text-white">
                Transactions
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
             items-center">
              <h2 className="text-base font-medium font-description
              text-zinc-400">
                For managing your client payouts
              </h2>
            </div>
            <div className="h-auto w-full px-8 flex justify-start
            items-center">
              <div className="h-auto w-auto">
                <button type="button" className="cursor-pointer"
                  onClick={() => {
                    navigate('/transactions');
                  }}  >
                  <ExternalLink size={32} className="text-activeColor" />
                </button>
              </div>
            </div>
          </div>
        </div>
       </div>
    </div>
  )
}

export default Dashboard