import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-black text-yellow-500 mb-4">404</h1>
        <p className="text-2xl font-bold mb-2">الصفحة غير موجودة</p>
        <p className="text-gray-400 mb-6">الرابط غير صحيح أو الصفحة تم نقلها</p>

        <Link
          to="/"
          className="inline-block rounded-xl bg-yellow-500 px-6 py-3 font-bold text-black transition hover:bg-yellow-400"
        >
          الرجوع للرئيسية
        </Link>
      </div>
    </div>
  );
};

export default NotFound;