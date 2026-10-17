"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center bg-white shadow-xl rounded-2xl p-10 max-w-md w-full"
      >
        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-red-500 mb-4">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-6">
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        {/* Button */}
        <Link href={"/"}>
          <button className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition duration-300">
            Go Back Home
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
