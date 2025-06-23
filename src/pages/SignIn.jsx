import { useAuth } from "../utils/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react"

const SignIn = () => {

  // getting user status from AuthContext
  const {user, logInUser, authStatus} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //if user is available then navigate user to dashboard
    if (user) {
      navigate('/dashboard');
    }
  }, [user]) // user status is the dependency here

  // function to handle user sign-in
  const signIn = async (formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    // calling log in function
    await logInUser({ email, password });
  }

  return (
    <div className="h-[80vh] lg:h-[90vh] w-full flex justify-center items-center">
      <div className="h-full w-[90%] flex flex-col justify-center items-center
      gap-16 lg:gap-12">
        <div className="p-5 rounded-[90%] bg-stone-900 text-activeColor">
          <Zap size={32} />
        </div>
        <div className="h-auto w-full flex flex-col justify-center items-center gap-4">
          <div className="h-auto w-full text-center">
            <h2 className="text-2xl text-zinc-200 font-heading font-medium">
              Sign In
            </h2>
          </div>
          <div className="h-auto w-full text-center">
            <h2 className={`text-base font-text font-medium
              ${!authStatus && 'text-zinc-400'}
              // ${authStatus === 'success' && 'text-green-600'}
              ${authStatus === 'failed' && 'text-red-600'}  `}>
              {
                !authStatus && 'Enter Correct Credentials to Sign In'
              }
              {
                authStatus === 'success' && 'Log In Success'
              }
              {
                authStatus === 'failed' && 'Invalid Credentials'
              }
            </h2>
          </div>
        </div>
        <div className="h-auto w-full flex justify-center items-center">
          <form action={signIn} className="h-auto w-full lg:w-[50%] flex flex-col
          justify-center items-center gap-8">
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Email
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="email" placeholder="mail@gmail.com" name="email"
                 className="input bg-zinc-900
                 input-neutral w-full rounded text-activeColor font-text font-medium" />
              </div>
            </div>
            <div className="h-auto w-full flex flex-col justify-center items-center
            gap-2">
              <div className="h-auto w-full text-left">
                <h2 className="text-sm text-zinc-200 font-heading font-medium">
                  Password
                </h2>
              </div>
              <div className="h-auto w-full">
                <input type="password" placeholder="Type here" name="password"
                 className="input bg-zinc-900
                 input-neutral w-full rounded text-activeColor font-text font-medium" />
              </div>
            </div>
            <div className="h-auto w-full">
              <button className="w-full py-3 rounded font-text font-medium
              cursor-pointer text-base bg-stone-900 text-activeColor
              hover:text-white" type="submit">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn