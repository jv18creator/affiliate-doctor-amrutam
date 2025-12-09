import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-semibold text-text-main mb-3">
        404 – Page Not Found
      </h1>
      <p className="text-text-soft mb-6">
        The page you were looking for doesn't exist.
      </p>

      <Link
        to="/affiliate/dashboard"
        className="px-6 py-2 rounded-lg bg-primary text-white font-medium hover:opacity-90 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
