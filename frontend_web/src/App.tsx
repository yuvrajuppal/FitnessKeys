import React from "react";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import BodyCategories from "./pages/BodyCategories";
import CategotyWorkouts from "./pages/CategotyWorkouts";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/BodyCategories" element={<BodyCategories />} />
        <Route path="/BodyCategories/:categoryName" element={<CategotyWorkouts />} />
      </Routes>
    </>
  );
}

export default App;
