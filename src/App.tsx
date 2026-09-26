import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Loader from "./components/UI/loader/loader";
import "./assets/css/index.css";
import { useAppContext } from "./context";
import { checkAuth } from "./http/user";

const App = () => {
  const [loading, setLoading] = useState(true);

  const { user } = useAppContext();

  useEffect(() => {
    checkAuth()
      .then((userResponse) => {
        if (userResponse.username) {
          user.setIsAuth(true);
        }
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <Loader />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;