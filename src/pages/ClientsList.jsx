import { useEffect, useState } from "react";
import { databases } from "../appwrite/appwrite";
import { Query } from "appwrite";
import { useNavigate } from "react-router-dom";
import ClientCards from "../components/ClientCards";
import CardsSkeleton from "../components/CardsSkeleton";
import Alert from "../components/Alert";

const ClientsList = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_CLENTS_COLLECTION_ID;
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  //pagination variables
  const [page, setPage] = useState(1);
  const cardsPerPage = 8;

  const getAllClients = async (filterType = 'all', pageNumber = 1) => {
    setLoading(true);

    try {
      let filters = [
        Query.orderDesc("$createdAt"),
        Query.limit(cardsPerPage),
        Query.offset((pageNumber - 1) * cardsPerPage)
      ]

      if (filterType === '7days' || filterType === '30days') {
        const now = new Date();
        const daysAgo = new Date(
          now.setDate(now.getDate() - (filterType === '7days' ? 7 : 30))
        );
        filters.push(Query.greaterThan("$createdAt", daysAgo.toISOString()));
      }

      const data = await databases.listDocuments(
        databaseID,
        collectionID,
        filters
      )

      setClients(data.documents);
      setDataLength(data.total);
      setFilter(filterType);
      setPage(pageNumber);

    } catch (error) {
      console.error('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const removeDocument = async (documentID) => {
    try {
      await databases.deleteDocument(
        databaseID,
        collectionID,
        documentID
      )
    } catch (error) {
      console.error("Error removing doc: " + error.message);
    } finally{
      getAllClients('all', 1);
    }
  }

  useEffect(() => {
    getAllClients('all', 1);
  }, [])

  return (
    <div className="h-auto py-12 w-full flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center items-center
      gap-16 lg:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl text-zinc-200 font-heading font-medium">
            Clients
          </h2>
        </div>
        <div className="h-auto w-full flex justify-between items-center">
          <div className="h-auto w-[40%] text-left">
            <h2 className="text-base text-zinc-200 font-heading font-medium">
              Client History
            </h2>
          </div>
          <div className="h-auto w-[40%] text-right">
            <button className="px-6 py-3 rounded font-text font-medium
            cursor-pointer text-base bg-stone-900 text-activeColor
            hover:text-white" onClick={() => navigate('/add-client')}>
              Add New
            </button>
          </div>
        </div>
        <div className="h-auto w-full flex justify-start items-center gap-5">
          <div className="h-auto w-auto">
            <button className={`px-6 py-3 rounded font-text font-medium
            cursor-pointer text-base bg-stone-900 hover:text-white
            ${filter === 'all' ? 'text-white' : 'text-activeColor'} `}
            onClick={() => getAllClients('all', 1)}>
              All
            </button>
          </div>
          <div className="h-auto w-auto">
            <button className={`px-6 py-3 rounded font-text font-medium
            cursor-pointer text-base bg-stone-900 hover:text-white
            ${filter === '7days' ? 'text-white' : 'text-activeColor'} `}
            onClick={() => getAllClients('7days', 1)}>
              7 Days
            </button>
          </div>
          <div className="h-auto w-auto">
            <button className={`px-6 py-3 rounded font-text font-medium
            cursor-pointer text-base bg-stone-900 hover:text-white
            ${filter === '30days' ? 'text-white' : 'text-activeColor'} `}
            onClick={() => getAllClients('30days', 1)}>
              30 Days
            </button>
          </div>
        </div>
        <div className={`${dataLength < 1 ? 'hidden' : 'block'} h-auto w-full`}>
        <div className={`w-full grid grid-cols-1 lg:grid-cols-4 gap-y-8 gap-x-12
        ${loading || dataLength < 5 ? 'h-auto lg:h-[220px]' : 'h-auto'} `}>
          {
            loading ? (<CardsSkeleton />) : (clients.map((v, i) => {
              return <ClientCards
              key={i}
              data={v}
              action={removeDocument} />
            }))
          }
        </div>
        </div>
        <div className={`${dataLength < 1 ? 'block' : 'hidden'} h-auto lg:h-[220px]
         w-full ${loading && 'grid grid-cols-1 lg:grid-cols-4 gap-12'}`}>
          {
            loading ? <CardsSkeleton /> : <Alert />
          }
        </div>
        <div className={`h-auto w-auto
          ${dataLength > cardsPerPage ? 'block' : 'hidden'}`}>
          <div className="h-auto w-auto join grid grid-cols-2">
            <button className="join-item btn btn-outline text-activeColor
            hover:text-white font-text font-medium"
            disabled={page === 1}
            onClick={() => getAllClients(filter, page - 1)}>
              Previous page
            </button>
            <button className="join-item btn btn-outline text-activeColor
            hover:text-white font-text font-medium"
            disabled={page >= Math.ceil(dataLength / cardsPerPage)}
            onClick={() => getAllClients(filter, page + 1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientsList