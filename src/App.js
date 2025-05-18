// src/App.js
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout  from "./components/MainLayout";
import CoreLayout  from "./components/CoreLayout";

import Home from "./pages/Home";
import Film from "./pages/Film";
import Tech from "./pages/Tech";
import Art  from "./pages/Art";
import Blog from "./pages/Blog";
import Web  from "./pages/Web";
import BingoEdit from "./pages/EditBingo";
import BingoPlay from "./pages/PlayBingo";

import Bingo  from "./pages/RaveMusicalBingo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="film" element={<Film />} />
          <Route path="tech" element={<Tech />} />
          <Route path="art"  element={<Art  />} />
          <Route path="blog" element={<Blog />} />
        </Route>

        {/* pages that skip the hero Navbar but STILL have Sticky & Footer */}
        <Route element={<CoreLayout />}>
          <Route path="web" element={<Web />} />
          <Route path="bingo" element={<Bingo />} />
            <Route path="web" element={<Web />} />
            <Route path="bingo" element={<Bingo />} />
            <Route path="bingo/edit" element={<BingoEdit />} />
            <Route path="bingo/play" element={<BingoPlay />} />
        </Route>

        {/* unknown URLs → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
