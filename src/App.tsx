import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import "./assets/css/index.css";
import { useAppContext } from "./context";
import { checkAuth } from "./http/user";

const App = () => {
  const { user } = useAppContext();

  useEffect(() => {
    checkAuth()
      .then((userResponse) => {
        if (userResponse.username) {
          user.setIsAuth(true);
        }
      })
      .catch(() => { })
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;