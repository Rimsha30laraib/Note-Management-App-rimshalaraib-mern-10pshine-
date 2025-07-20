
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';
import HomePage from './components/HomePage/HomePage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/homepage" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
