import { useEffect, useState } from "react";
import { databases } from "../appwrite/appwrite";
import { ID } from "appwrite";
import FormStatusAlert from "../components/FormStatusAlert";

const AddClient = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const clientStatusID = import.meta.env.VITE_APPWRITE_CLIENTSSTATUS_COLLECTION_ID;
  const projectStatusID = import.meta.env.VITE_APPWRITE_PROJECTSSTATUS_COLLECTION_ID;
  const clientSourceID = import.meta.env.VITE_APPWRITE_CLIENTSOURCE_COLLECTION_ID;
  const clients = import.meta.env.VITE_APPWRITE_CLENTS_COLLECTION_ID;
  // state variables
  const [clientStatus, setClientStatus] = useState([]);
  const [projectStatus, setProjectStatus] = useState([]);
  const [clientSource, setClientSource] = useState([]);
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

  const formAction = async (formData) => {
    const client_name = formData.get('client_name');
    const contact_info = parseInt(formData.get('contact_info'), 10);
    const client_status = formData.get('client_status');
    const project_status = formData.get('project_status');
    const client_source = formData.get('client_source');

    try {
      await databases.createDocument(
        databaseID,
        clients,
        ID.unique(),
        {
          client_name: client_name,
          contact_info : contact_info,
          client_status : client_status,
          project_status : project_status,
          client_source : client_source
        }
      )

      setFormStatus('success');

      setTimeout(() => {
        setFormStatus('');
      }, 3000);

    } catch (error) {
      console.error('Form Submission Error: ' + error.message);

      setFormStatus('failed');

      setTimeout(() => {
        setFormStatus('');
      }, 3000);
    }
  }

  useEffect(() => {
    getClientStatus();
    getProjectStatus();
    getClientSource();
  }, [])


  if (formStatus === 'success') {
    return <FormStatusAlert status={'success'} type={'Client'} />
  } else if (formStatus === 'failed') {
    return <FormStatusAlert status={'failed'} type={'Client'} />
  }

  return (
    <div className="h-auto w-full py-12 flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center items-center gap-16
      lg:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl text-zinc-200 font-heading font-medium">
            Add New Client
          </h2>
        </div>
        <div className="h-auto w-full flex justify-center items-center">
          <form action={formAction} className="h-auto w-full lg:w-[50%] flex flex-col
          justify-center items-center gap-8">
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Client Name
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="text" placeholder="Type here" name="client_name"
                 required
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
                <input type="number" placeholder="Type Here" name="contact_info"
                 required
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
                <select defaultValue="Pick an option" className="select select-neutral
                w-full rounded text-activeColor font-text font-medium bg-zinc-900"
                name="client_status">
                  <option disabled={true}>Pick an option</option>
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
                <select defaultValue="Pick an option" className="select select-neutral
                w-full rounded text-activeColor font-text font-medium bg-zinc-900"
                name="project_status">
                  <option disabled={true}>Pick an option</option>
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
                <select defaultValue="Pick an option" className="select select-neutral
                w-full rounded text-activeColor font-text font-medium bg-zinc-900"
                name="client_source">
                  <option disabled={true}>Pick an option</option>
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
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddClient