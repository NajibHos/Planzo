import { ExternalLink, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ClientCards = ({ data, action }) => {

  const navigate = useNavigate();

  return (
    <div className="h-[150px] w-full flex flex-col justify-center items-center gap-4
    p-8 border rounded border-stone-700">
      <div className="h-auto w-full text-left">
        <h2 className="text-base text-zinc-200 font-heading font-medium truncate">
          {data.client_name}
        </h2>
      </div>
      <div className="h-auto w-full text-left">
        <h2 className={`text-base text-zinc-200 font-heading font-medium
         ${data.client_status === 'Completed' && '!text-green-600'}
         ${data.client_status === 'Confirmed' && '!text-green-600'}
         ${data.client_status === 'Lost' && '!text-red-600'}  `}>
          {data.client_status}
        </h2>
      </div>
      <div className="h-auto w-full flex justify-start items-center gap-5">
        <div className="h-auto w-auto">
          <button className="bg-transparent text-activeColor cursor-pointer
          hover:text-white"
          onClick={() => navigate(`/client-data/${data.$id}`)}>
            <ExternalLink size={22} />
          </button>
        </div>
        <div className="h-auto w-auto">
          <button className="bg-transparent text-red-600 cursor-pointer
          hover:text-white" onClick={() => action(data.$id)}>
            <Trash2 size={22} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ClientCards