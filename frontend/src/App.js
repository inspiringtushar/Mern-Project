import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./components/Screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./components/Screens/MyNotes/MyNotes";
import LoginScreen from "./components/Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./components/Screens/RegisterScreen/RegisterScreen";

const App = () => {
  
  return (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<LandingPage />} exact />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/mynotes" element={<MyNotes />} />
    </Routes>
    <Footer />
  </BrowserRouter>
  )
};

export default App;
