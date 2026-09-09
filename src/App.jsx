import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { fetchSchedule } from "./http/schedule";
import Home from "./pages/home";
import Loader from "./components/UI/loader/loader";
import "./assets/css/index.css";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getSchedule = async () => {
    setLoading(true);
    try {
      const result = await fetchSchedule();
      setData(result.rasp);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <div className="error">
        <p>Произошла ошибка: {error}</p>
        <div
          role="button"
          onClick={() => window.location.reload()}
        >
          Перезагрузить страницу
        </div>
        <p>Или</p>
        <a href="https://pkgh.ru/">Перейти на официальный сайт</a>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home data={data} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;