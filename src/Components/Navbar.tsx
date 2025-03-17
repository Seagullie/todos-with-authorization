import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/todo_lists">Insiders TODOs Test Project</Link>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-300 hover:text-white">
            Log In
          </Link>
          <Link to="/signup" className="text-gray-300 hover:text-white">
            Sign Up
          </Link>
          <Link to="/todo_lists" className="text-gray-300 hover:text-white">
            ToDo lists
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
