import { useEffect, useState } from "react";
import { databases } from "../appwrite/appwrite";
import { useNavigate, useParams } from "react-router-dom";
import GlobalSkeleton from "../components/GlobalSkeleton";
import FormStatusAlert from "../components/FormStatusAlert";

const UpdateClient = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const clientStatusID = import.meta.env.VITE_APPWRITE_CLIENTSSTATUS_COLLECTION_ID;
  const projectStatusID = import.meta.env.VITE_APPWRITE_PROJECTSSTATUS_COLLECTION_ID;
  const clientSourceID = import.meta.env.VITE_APPWRITE_CLIENTSOURCE_COLLECTION_ID;
  const clients = import.meta.env.VITE_APPWRITE_CLENTS_COLLECTION_ID;
  // state variables
  const { docID } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [clientStatus, setClientStatus] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [clientSource, setClientSource] = useState([]);
  // state variables for controlling default and new values
  const [clientName, setClientName] = useState('');
  const [contactInfo, setContactInfo] = useState(0);
  const [clientStatusValue, setClientStatusValue] = useState('');
  const [projectStatusValue, setProjectStatusValue] = useState('');
  const [clientSourceValue, setClientSourceValue] = useState('');
  // form status
  const [formStatus, setFormStatus] = useState('');

  const getClientStatus = async () => {
    try {
      const data = await databases.listDocuments(
        databaseID,
        clientStatusID,
      )

      setClientStatus(data.documents);
    } catch (error) {
      console.error("Fetching Error: " + error.message);
    }
  }

  const getProjectStatus = async () => {
    try {
      const data = await databases.listDocuments(
        databaseID,
        projectStatusID,
      )

      setProjectStatus(data.documents);
    } catch (error) {
      console.error("Fetching Error: " + error.message);
    }
  }

  const getClientSource = async () => {
    try {
      const data = await databases.listDocuments(
        databaseID,
        clientSourceID,
      )

      setClientSource(data.documents);
    } catch (error) {
      console.error("Fetching Error: " + error.message);
    }
  }

  const getDefaultClientData = async (docID) => {
    setLoading(true);

    try {
      const response = await databases.getDocument(
        databaseID,
        clients,
        docID
      )

      setClientName(response.client_name);
      setContactInfo(response.contact_info);
      setClientStatusValue(response.client_status);
      setProjectStatusValue(response.project_status);
      setClientSourceValue(response.client_source);
    } catch (error) {
      console.error("Error fetching client: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      await databases.updateDocument(
        databaseID,
        clients,
        docID,
        {
          client_name : clientName,
          contact_info : parseInt(contactInfo, 10),
          client_status : clientStatusValue,
          project_status : projectStatusValue,
          client_source : clientSourceValue
        }
      )

      setFormStatus('success');

      setTimeout(() => {
        setFormStatus('');

        // navigating after successful update
        navigate(`/client-data/${docID}`);
      }, 3000);

    } catch (error) {
      console.error("Update error: " + error.message);

      setFormStatus('failed');

      setTimeout(() => {
        setFormStatus('');
      }, 3000);
    }
  }

  useEffect(() => {
    getDefaultClientData(docID);
    getClientStatus();
    getProjectStatus();
    getClientSource();
  }, [docID])

  if (loading) {
    return <GlobalSkeleton />
  } else if (formStatus === 'success') {
    return <FormStatusAlert status={'success'} type={'Update'} />
  } else if (formStatus === 'failed') {
    return <FormStatusAlert status={'failed'} type={'Update'} />
  }

  return (
    <div className="h-auto w-full py-12 flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center items-center gap-16
      lg:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl text-zinc-200 font-heading font-medium">
            Update Client Data
          </h2>
        </div>
        <div className="h-auto w-full flex justify-center items-center">
          <form onSubmit={handleSubmit} className="h-auto w-full lg:w-[50%] flex flex-col
          justify-center items-center gap-8">
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Client Name
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="text"
                 name="client_name"
                 value={clientName}
                 onChange={(ev) => setClientName(ev.target.value)}
                 className="input bg-zinc-900
                 input-neutral w-full rounded text-activeColor font-text font-medium" />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Contact Info
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="number"
                 name="contact_info"
                 value={contactInfo}
                 onChange={(ev) => setContactInfo(ev.target.value)}
                 className="input bg-zinc-900
                 input-neutral w-full rounded text-activeColor font-text font-medium" />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Client Status
                </h2>
              </div>
              <div className="h-auto w-full">
                <select  className="select select-neutral bg-zinc-900
                w-full rounded text-activeColor font-text font-medium"
                name="client_status"
                value={clientStatusValue}
                onChange={(ev) => setClientStatusValue(ev.target.value)}
                >
                  {
                    clientStatus.map((v, i) => {
                      return <option key={i} value={v.status}>{v.status}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Project Status
                </h2>
              </div>
              <div className="h-auto w-full">
                <select className="select select-neutral bg-zinc-900
                w-full rounded text-activeColor font-text font-medium"
                name="project_status"
                value={projectStatusValue}
                onChange={(ev) => setProjectStatusValue(ev.target.value)}
                >
                  {
                    projectStatus.map((v, i) => {
                      return <option key={i} value={v.status}>{v.status}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Client Source
                </h2>
              </div>
              <div className="h-auto w-full">
                <select className="select select-neutral bg-zinc-900
                w-full rounded text-activeColor font-text font-medium"
                name="client_source"
                value={clientSourceValue}
                onChange={(ev) => setClientSourceValue(ev.target.value)}
                >
                  {
                    clientSource.map((v, i) => {
                      return <option key={i} value={v.source}>{v.source}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className="h-auto w-full">
              <button className="w-full py-3 rounded font-text font-medium
              cursor-pointer text-base bg-stone-900 text-activeColor
              hover:text-white" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdateClient