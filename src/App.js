import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";

import Home  from "./pages/Home";
import Film  from "./pages/Film";
import Tech  from "./pages/Tech";
import Web   from "./pages/Web";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ----- main web flow, always shows layout chrome ----- */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />        {/* “/” */}
          <Route path="film" element={<Film />} />
          <Route path="tech" element={<Tech />} />
          {/* add “art”, “blog”, etc. here */}
        </Route>

        {/* ----- one‑off pages without navbar / footer / particles ----- */}
        <Route path="web" element={<Web />} />

        {/* any unknown URL → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
