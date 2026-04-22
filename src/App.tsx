import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ROUTE_PATHS } from "./lib/index";

import Home from "./pages/Home";
import About from "./pages/About";
import Classes from "./pages/Classes";
import Transformations from "./pages/Transformations";
import Booking from "./pages/Booking";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";


function App() {
  const HOME_PATH = ROUTE_PATHS?.HOME || "/";
  const ABOUT_PATH = ROUTE_PATHS?.ABOUT || "/about";
  const CLASSES_PATH = ROUTE_PATHS?.CLASSES || "/classes";
  const TRANSFORMATIONS_PATH =
    ROUTE_PATHS?.TRANSFORMATIONS || "/transformations";
  const BOOKING_PATH = ROUTE_PATHS?.BOOKING || "/booking";

  return (
    <Router>

      <main className="min-h-screen">
        <Routes>
          <Route path={HOME_PATH} element={<Home />} />
          <Route path={ABOUT_PATH} element={<About />} />
          <Route path={CLASSES_PATH} element={<Classes />} />
          <Route path={TRANSFORMATIONS_PATH} element={<Transformations />} />
          <Route path={BOOKING_PATH} element={<Booking />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;