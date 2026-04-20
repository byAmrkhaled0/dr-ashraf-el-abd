import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTE_PATHS } from "./lib/index";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Classes from "./pages/Classes";
import Booking from "./pages/Booking";

function App() {
  const [isDark] = useState(true);
  const [isArabic] = useState(true);

  const HOME_PATH = ROUTE_PATHS?.HOME || "/";
  const ABOUT_PATH = ROUTE_PATHS?.ABOUT || "/about";
  const SERVICES_PATH = ROUTE_PATHS?.SERVICES || "/services";
  const TRANSFORMATIONS_PATH = ROUTE_PATHS?.TRANSFORMATIONS || "/transformations";
  const CLASSES_PATH = ROUTE_PATHS?.CLASSES || "/classes";
  const BOOKING_PATH = ROUTE_PATHS?.BOOKING || "/booking";

  return (
    <Router>
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className={
          isDark
            ? "dark min-h-screen flex flex-col bg-gray-900 text-white"
            : "min-h-screen flex flex-col bg-white text-gray-900"
        }
      >
        {/* ❌ مفيش Header هنا */}

        {/* MAIN */}
        <main className="flex-1">
          <Routes>
            <Route path={HOME_PATH} element={<Home />} />
            <Route path={ABOUT_PATH} element={<About />} />
            <Route path={SERVICES_PATH} element={<Services />} />
            <Route path={CLASSES_PATH} element={<Classes />} />
            <Route path={BOOKING_PATH} element={<Booking />} />
          </Routes>
        </main>

        {/* FOOTER */}
        <footer className="p-4 text-center border-t border-gray-700">
          © 2026 د. أشرف العبد
        </footer>
      </div>
    </Router>
  );
}

export default App;