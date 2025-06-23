import { useEffect, useState } from "react";
import { databases } from "../appwrite/appwrite";
import { useNavigate, useParams } from "react-router-dom";
import GlobalSkeleton from "../components/GlobalSkeleton";
import FormStatusAlert from "../components/FormStatusAlert";

const UpdateProject = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const projectStatusID = import.meta.env.VITE_APPWRITE_PROJECTSSTATUS_COLLECTION_ID;
  const projectsID = import.meta.env.VITE_APPWRITE_PROJECTS_COLLECTION_ID;
  // state variables
  const { docID } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [projectStatus, setProjectStatus] = useState([]);
  // state variables for controlling default and new values
  const [clientName, setClientName] = useState('');
  const [contactInfo, setContactInfo] = useState(0);
  const [advancePay, setAdvancePay] = useState(0);
  const [duePay, setDuePay] = useState(0);
  const [projectStatusValue, setProjectStatusValue] = useState('');
  const [deadline, setDeadline] = useState('');
  // form status
  const [formStatus, setFormStatus] = useState('');

  const getProjectStatus = async () => {
    try {
      const res = await databases.listDocuments(
        databaseID,
        projectStatusID
      )

      setProjectStatus(res.documents);
    } catch (error) {
      console.error("Error fetching docs: " + error.message);
    }
  }

  const getDefaultProjectData = async (docID) => {
    setLoading(true);

    try {
      const res = await databases.getDocument(
        databaseID,
        projectsID,
        docID
      )

      setClientName(res.client_name);
      setContactInfo(res.contact_info);
      setAdvancePay(res.advance_pay);
      setDuePay(res.due_pay);
      setProjectStatusValue(res.project_status);
      setDeadline(res.deadline);
    } catch (error) {
      console.error("Fetching error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    try {
      await databases.updateDocument(
        databaseID,
        projectsID,
        docID,
        {
          client_name : clientName,
          contact_info : parseInt(contactInfo, 10),
          advance_pay : parseInt(advancePay, 10),
          due_pay : parseInt(duePay, 10),
          deadline : deadline,
          project_status : projectStatusValue
        }
      )

      setFormStatus('success');

      setTimeout(() => {
        setFormStatus('');
        navigate(`/project-data/${docID}`)
      }, 3000);

    } catch (error) {
      console.error('Error updating data: ' + error.message);

      setFormStatus('failed');

      setTimeout(() => {
        setFormStatus('');
      }, 3000);
    }
  }

  useEffect(() => {
    getDefaultProjectData(docID);
    getProjectStatus();
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
            Update Project Data
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
                  Advance Pay
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="number"
                 name="advance_pay"
                 value={advancePay}
                 onChange={(ev) => setAdvancePay(ev.target.value)}
                 className="input bg-zinc-900
                 input-neutral w-full rounded text-activeColor font-text font-medium" />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Due Pay
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="number"
                 name="due_pay"
                 value={duePay}
                 onChange={(ev) => setDuePay(ev.target.value)}
                 className="input bg-zinc-900
                 input-neutral w-full rounded text-activeColor font-text font-medium" />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Deadline
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="text"
                 name="deadline"
                 value={deadline}
                 onChange={(ev) => setDeadline(ev.target.value)}
                 className="input bg-zinc-900
                 input-neutral w-full rounded text-activeColor font-text font-medium" />
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
                onChange={(ev) => setProjectStatusValue(ev.target.value)} >
                  {
                    projectStatus.map((v, i) => {
                      return <option key={i} value={v.status}>{v.status}</option>
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

export default UpdateProject