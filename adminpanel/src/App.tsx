import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CategotiesPage from "./pages/CategotiesPage";
import CategoryWorkout from "./pages/CategoryWorkout";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<CategotiesPage />} />
        <Route path="/workouts" element={<CategoryWorkout />} />
        <Route path="*" element={<CategotiesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
