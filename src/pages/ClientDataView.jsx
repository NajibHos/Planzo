import { useNavigate, useParams } from "react-router-dom"
import DataViewSkeleton from "../components/DataViewSkeleton"
import { useEffect, useState } from "react";
import { databases } from "../appwrite/appwrite";

const ClientDataView = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_CLENTS_COLLECTION_ID;
  const { docID } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const getData = async (docID) => {
    setLoading(true);

    try {
      const data = await databases.getDocument(
        databaseID,
        collectionID,
        docID
      )

      setData(data);
    } catch (error) {
      console.error('Fetching Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData(docID);
  }, [docID])

  return (
        <div className="h-[90vh] w-full flex justify-center items-center">
      <div className="h-[80%] w-[90%] flex flex-col justify-start items-center
      gap-16 lg:gap-12">
         <div className="h-auto w-full flex flex-col justify-center items-center
        gap-4">
          <div className="h-auto w-full text-center">
            <h2 className="text-2xl font-heading font-medium text-white">
              Client Data
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <button className="text-base font-text font-medium text-zinc-200
            bg-transparent underline cursor-pointer"
            onClick={() => navigate('/clients')}>
              Previous Page
            </button>
          </div>
        </div>
        {/* larger screen */}
        <div className="h-auto w-full hidden lg:block">
          <div className="h-[80px] w-full rounded bg-stone-950 mb-5
          flex justify-between items-center">
            <div className="h-auto w-[15%] text-center border-r
            border-r-activeColor">
              <h2 className="text-lg text-zinc-200 font-text font-medium">
                Client Name
              </h2>
            </div>
            <div className="h-auto w-[15%] text-center border-r
            border-r-activeColor">
              <h2 className="text-lg text-zinc-200 font-text font-medium">
                Contact Info
              </h2>
            </div>
            <div className="h-auto w-[15%] text-center border-r
            border-r-activeColor">
              <h2 className="text-lg text-zinc-200 font-text font-medium">
                Client Status
              </h2>
            </div>
            <div className="h-auto w-[15%] text-center border-r
            border-r-activeColor">
              <h2 className="text-lg text-zinc-200 font-text font-medium">
                Project Status
              </h2>
            </div>
            <div className="h-auto w-[15%] text-center border-r
            border-r-activeColor">
              <h2 className="text-lg text-zinc-200 font-text font-medium">
                Client Source
              </h2>
            </div>
            <div className="h-auto w-[15%] text-center">
              <h2 className="text-lg text-zinc-200 font-text font-medium">
                Action
              </h2>
            </div>
          </div>
          {
            loading && (<DataViewSkeleton />)
          }
          <div className={`${!loading ? 'block' : 'hidden'} h-auto w-full`}>
            <div className="h-[80px] w-full rounded bg-zinc-950
          flex justify-between items-center">
            <div className="h-auto w-[15%] text-center border-r
            border-r-zinc-400">
              <h2 className="text-lg text-activeColor font-text font-medium truncate">
                {data.client_name}
              </h2>
            </div>
            <div className="h-auto w-[15%] text-center border-r
            border-r-zinc-400">
              <h2 className="text-lg text-activeColor font-text font-medium truncate">
                {`0${data.contact_info}`}
              </h2>
            </div>
            <div className="h-auto w-[15%] text-center border-r
            border-r-zinc-400">
              <h2 className={`text-lg text-activeColor font-text font-medium truncate
               ${data.client_status === 'Completed' && '!text-green-600'}
               ${data.client_status === 'Confirmed' && '!text-green-600'}
               ${data.client_status === 'Lost' && '!text-red-600'}`}>
                {data.client_status}
              </h2>
            </div>
            <div className="h-auto w-[15%] text-center border-r
            border-r-zinc-400">
              <h2 className={`text-lg text-activeColor font-text font-medium truncate
               ${data.project_status === 'Completed' && '!text-green-600'}
               ${data.project_status === 'Cancelled' && '!text-red-600'}  `}>
                {data.project_status}
              </h2>
            </div>
            <div className="h-auto w-[15%] text-center border-r
            border-r-zinc-400">
              <h2 className="text-lg text-activeColor font-text font-medium truncate">
                {data.client_source}
              </h2>
            </div>
            <div className="h-auto w-[15%] text-center">
              <button className="px-6 py-3 rounded font-text font-medium
              cursor-pointer text-base bg-stone-900 text-activeColor
              hover:text-white" onClick={() => navigate(`/update-client/${docID}`)}>
                Update
              </button>
            </div>
            </div>
          </div>
        </div>
        {/* smaller screen */}
        <div className="h-auto w-full block lg:hidden">
          <div className="h-auto w-full flex justify-between items-center">
            <div className="h-auto w-[40%] flex flex-col justify-center
            items-center gap-6">
              <div className="h-auto w-full text-center">
                <h2 className="text-base text-zinc-200 font-text font-medium">
                  Client Name
                </h2>
              </div>
              <div className="h-auto w-full text-center">
                <h2 className="text-base text-zinc-200 font-text font-medium">
                  Contact Info
                </h2>
              </div>
              <div className="h-auto w-full text-center">
                <h2 className="text-base text-zinc-200 font-text font-medium">
                  Client Status
                </h2>
              </div>
              <div className="h-auto w-full text-center">
                <h2 className="text-base text-zinc-200 font-text font-medium">
                  Project Status
                </h2>
              </div>
              <div className="h-auto w-full text-center">
                <h2 className="text-base text-zinc-200 font-text font-medium">
                  Client Source
                </h2>
              </div>
              <div className="h-auto w-full text-center">
                <h2 className="text-base text-zinc-200 font-text font-medium">
                  Action
                </h2>
              </div>
            </div>
            {
              loading && (<DataViewSkeleton />)
            }
            <div className={`${!loading ? 'block' : 'hidden'} h-auto w-full`}>
              <div className="h-auto w-[50%] flex flex-col justify-center
            items-center gap-6">
              <div className="h-auto w-full text-center">
                <h2 className="text-base text-activeColor font-text font-medium">
                  {data.client_name}
                </h2>
              </div>
              <div className="h-auto w-full text-center">
                <h2 className="text-base text-activeColor font-text font-medium">
                  {`0${data.contact_info}`}
                </h2>
              </div>
              <div className="h-auto w-full text-center">
                <h2 className={`text-base text-activeColor font-text font-medium
                 ${data.client_status === 'Completed' && '!text-green-600'}
                 ${data.client_status === 'Confirmed' && '!text-green-600'}
                 ${data.client_status === 'Lost' && '!text-red-600'} `}>
                  {data.client_status}
                </h2>
              </div>
              <div className="h-auto w-full text-center">
                <h2 className={`text-base text-activeColor font-text font-medium
                 ${data.project_status === 'Completed' && '!text-green-600'}
                 ${data.project_status === 'Cancelled' && '!text-red-600'}  `}>
                  {data.project_status}
                </h2>
              </div>
              <div className="h-auto w-full text-center">
                <h2 className="text-base text-activeColor font-text font-medium">
                  {data.client_source}
                </h2>
              </div>
              <div className="h-auto w-full text-center">
                <button className="font-text font-medium cursor-pointer text-lg
                underline text-activeColor hover:text-white"
                onClick={() => navigate(`/update-client/${docID}`)}>
                  Update
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDataView