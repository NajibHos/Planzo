import { Check, CircleCheck, X } from "lucide-react";

const FormStatusAlert = ({ status, type }) => {

  return (
     <div className='h-[90vh] w-full flex flex-col justify-center
    items-center gap-16 lg:gap-12'>
      <div className={`p-4 rounded-full flex justify-center items-center
      ${status === 'success' ? 'bg-green-600' : 'bg-red-600'} `}>
        <div className={`${status === 'success' ? 'block' : 'hidden'} `}>
          <Check size={46} className="text-white" />
        </div>
        <div className={`${status === 'failed' ? 'block' : 'hidden'} `}>
          <X size={46} className="text-white" />
        </div>
      </div>
      <div className="h-auto w-full text-center">
        <div className={`${status === 'success' ? 'block' : 'hidden'} `}>
          <h2 className="text-lg font-text font-medium
          text-zinc-200">
            {
              type === 'Update' && `${type} Successful!`
            }
            {
              type !== 'Update' && `${type} Added Successfully!`
            }
          </h2>
        </div>
        <div className={`${status === 'failed' ? 'block' : 'hidden'} `}>
          <h2 className="text-lg font-text font-medium
          text-zinc-200">
            {
              type === 'Update' && `{${type}!} Unsuccessful!`
            }
            {
              type !== 'Update' && `Failed to add ${type}!`
            }
          </h2>
        </div>
      </div>
    </div>
  )
}

export default FormStatusAlert