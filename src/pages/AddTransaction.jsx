import { useState } from "react";
import FormStatusAlert from "../components/FormStatusAlert";
import { databases } from "../appwrite/appwrite";
import { ID } from "appwrite";

const AddTransaction = () => {

  const databaseID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
  const collectionID = import.meta.env.VITE_APPWRITE_TRANSACTIONS_COLLECTION_ID;
  const [formStatus, setFormStatus] = useState('');

  const formAction = async (formData) => {
    const client_name = formData.get('client_name');
    const contact_info = parseInt(formData.get('contact_info'), 10);
    const amount = parseInt(formData.get('amount'), 10);
    const date = formData.get('date');
    const due_pay = parseInt(formData.get('due_pay'), 10);

    try {
      await databases.createDocument(
        databaseID,
        collectionID,
        ID.unique(),
        {
          client_name : client_name,
          contact_info : contact_info,
          amount : amount,
          date : date,
          due_pay : due_pay
        }
      )

      setFormStatus('success');

      setTimeout(() => {
        setFormStatus('');
      }, 3000);
    } catch (error) {
      console.error("Database error: " + error.message);

      setFormStatus('failed');

      setTimeout(() => {
        setFormStatus('');
      }, 3000);
    }
  }

  if (formStatus === 'success') {
    return <FormStatusAlert status={'success'} type={'Transaction'} />
  } else if (formStatus === 'failed') {
    return <FormStatusAlert status={'failed'} type={'Transaction'} />
  }

  return (
    <div className="h-auto w-full py-12 flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center items-center gap-16
      lg:gap-12">
        <div className="h-auto w-full text-center">
          <h2 className="text-2xl text-zinc-200 font-heading font-medium">
            Add New Transaction
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
                <input type="text" placeholder="Type Here" name="client_name"
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
                <input type="number" placeholder="Type here" name="contact_info"
                 required
                 className="input bg-zinc-900
                 input-neutral w-full rounded text-activeColor font-text font-medium" />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Amount
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="number" placeholder="Type here" name="amount" required
                 className="input bg-zinc-900
                 input-neutral w-full rounded text-activeColor font-text font-medium" />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Date
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="text" placeholder="Type Here" name="date" required
                className="input bg-zinc-900
                 input-neutral w-full rounded text-activeColor font-text font-medium" />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Due Pay(if any)
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="number" placeholder="Type Here" name="due_pay"
                className="input bg-zinc-900
                 input-neutral w-full rounded text-activeColor font-text font-medium" />
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

export default AddTransaction