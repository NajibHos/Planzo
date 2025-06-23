import AddClient from "./pages/AddClient"
import AddProject from "./pages/AddProject"
import AddTransaction from "./pages/AddTransaction"
import ClientDataView from "./pages/ClientDataView"
import Header from "./components/Header"
import ProjectView from "./pages/ProjectView"
import TransactionView from "./pages/TransactionView"
import Dashboard from "./pages/Dashboard"
import TransactionsList from "./pages/TransactionsList"
import ProjectsList from "./pages/ProjectsList"
import ClientsList from "./pages/ClientsList"
import SignIn from "./pages/SignIn"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider, useAuth } from "./utils/AuthProvider"
import PrivateRoute from "./utils/PrivateRoute"
import Home from "./pages/Home"
import GlobalSkeleton from "./components/GlobalSkeleton"
import ErrorRoute from "./components/ErrorRoute"
import Footer from "./components/Footer"
import UpdateClient from "./pages/UpdateClient"
import UpdateProject from "./pages/UpdateProject"
import UpdateTransaction from "./pages/UpdateTransaction"

//Component to handle loading state inside Routes
const AuthRoutes = () => {

  const { loading } = useAuth();

  if (loading) {
    return (
      <>
      <GlobalSkeleton />
      </>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/clients' element={<ClientsList />} />
        <Route path='/client-data/:docID' element={<ClientDataView />} />
        <Route path='/update-client/:docID' element={<UpdateClient />} />
        <Route path='/add-client' element={<AddClient />} />
        <Route path='/projects' element={<ProjectsList />} />
        <Route path='/project-data/:docID' element={<ProjectView />} />
        <Route path='/update-project/:docID' element={<UpdateProject />} />
        <Route path='/add-project' element={<AddProject />} />
        <Route path='/transactions' element={<TransactionsList />} />
        <Route path='/transaction-data/:docID' element={<TransactionView />} />
        <Route path='/add-transaction' element={<AddTransaction />} />
        <Route path='/update-transaction/:docID' element={<UpdateTransaction />} />
        <Route path='/*' element={<ErrorRoute />} />
      </Route>
    </Routes>
  )

}

const App = () => {
  return (
 <>
    <BrowserRouter>
      <AuthProvider>
      <Header />
      <main className="h-auto w-full">
        <AuthRoutes /> {/* Moved loading state inside here */}
      </main>
      <Footer />
      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App