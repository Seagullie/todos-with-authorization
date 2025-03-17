import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Navbar from "../Components/Navbar";
import Dashboard from "../Pages/Dashboard";
import LogInPage from '../Pages/LogInPage';
import SignUpPage from '../Pages/SignUpPage';
import TodosList from '../Pages/TodosList';

export const RouterNavigation: React.FC = () => {
    return (
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<TodosList />} />
          </Routes>
        </div>
      </Router>
    );
  };