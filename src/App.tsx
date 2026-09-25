import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fetchSchedule } from "./http/schedule";
import Home from "./pages/home";
import Loader from "./components/UI/loader/loader";
import "./assets/css/index.css";
import { useAppContext } from "./context";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { schedules } = useAppContext();

  const getSchedule = async () => {
    setLoading(true);
    try {
      const result = await fetchSchedule(schedules.now);
      schedules.setSchedules(result.rasp);
    } catch (error) {
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchedule();
  }, []);

  if (loading) {
    return (
      <div className="loader-screen">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="error">
        <p>Произошла ошибка: {error}</p>
        <button
          className="button"
          onClick={() => window.location.reload()}
        >
          Перезагрузить страницу
        </button>
        <p>Или</p>
        <a href="https://pkgh.ru/">Перейти на официальный сайт</a>
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