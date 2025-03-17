import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthClient } from '../Data/AuthClient';
import { BACKEND_SERVER_URL } from '../Constants/Constants';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const authClient = new AuthClient(BACKEND_SERVER_URL);

const LogInPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const response = await axios.post('https://your-server.com/api/login', {
      //   email,
      //   password,
      // });
      const response = await authClient.login({
        email,
        password,
      });
      const token = response.token;

      // const { token } = response.data;
      Cookies.set('token', token);
      // Redirect or perform other actions after successful login

      // display toast and redirect to todo_lists

      toast.success('Log In Successful.');
      setTimeout(() => {
        // TODO: unhardcode
        navigate('/todo_lists');
      }, 2000);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Log In</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Log In
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LogInPage;
