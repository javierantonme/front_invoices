import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-blue-500 mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for doesnt exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-medium hover:bg-blue-600 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
      <div className="mt-12">
        <img
          src="https://via.placeholder.com/400x300"
          alt="Page not found illustration"
          className="w-full max-w-md mx-auto"
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
