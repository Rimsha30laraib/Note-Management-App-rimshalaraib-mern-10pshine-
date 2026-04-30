import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import HomePage from './components/HomePage/HomePage';
import AllNotes from "./pages/AllNotes";
import Starred from "./pages/Starred";
import Trash from "./pages/Trash";
import CreateNote from "./pages/CreateNote";
import Account from "./pages/Account";
import EditNote from "./pages/EditNote";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
function App() {
  return (
    <BrowserRouter>
         <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
       
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />


        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllNotes />} />
          <Route path="newnote" element={<CreateNote />} />
          <Route path="starred" element={<Starred />} />
          <Route path="trash" element={<Trash />} />
          <Route path="account" element={<Account />} />
          <Route path="editnote/:id" element={<EditNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
