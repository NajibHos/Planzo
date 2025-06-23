import { createContext, useContext, useState, useEffect } from 'react';
import { account } from '../appwrite/appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true); // Loading state
  const [user, setUser] = useState(null); // Store user details
  const [userName, setUserName] = useState(null); // Store user Name
  const [authStatus, setAuthStatus] = useState(''); // login state feedback

  useEffect(() => {
    checkUserStatus();
  }, [])

  // Check user session
  const checkUserStatus = async () => {
    setLoading(true);

    try {
      const currentUser = await account.get();
      setUser(currentUser);
      setUserName(currentUser.name);

    } catch (error) {
      console.error('User Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  // Login function
  const logInUser = async (userInfo) => {
    // setLoading(true);

    try {
      // login session
      await account.createEmailPasswordSession(
        userInfo.email, userInfo.password
      );

      // get user and username
      const currentUser = await account.get();
      setUser(currentUser);
      setUserName(currentUser.name);

      // login successfull
      setAuthStatus('success');

      // reset status
      setTimeout(() => {
        setAuthStatus('');
      }, 4000);

    } catch (error) {
      console.error("Login error:", error.message);

      // login failed
      setAuthStatus('failed');

      // reset status
      setTimeout(() => {
        setAuthStatus('');
      }, 4000);

    }
    
    // setLoading(false);

  }

  // Logout function
  const logOutUser = async () => {
    try {
      await account.deleteSession("current"); // Delete current session
      setUser(null); // Reset user state
      setUserName(null); // Reset username
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  }

  // logout()

  const contextData =  {
    user,
    userName,
    logInUser,
    logOutUser,
    loading,
    authStatus
  }

  return (
    <AuthContext.Provider value={contextData}>
      {/* always return children */}
      { children }
    </AuthContext.Provider>
  )
};

// Custom Hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);
export default AuthContext;