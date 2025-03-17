import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from '../Components/Navbar';
import ToDosContainer from '../Pages/ToDosContainer';
import LogInPage from '../Pages/LogInPage';
import SignUpPage from '../Pages/SignUpPage';
import TodosList from '../Pages/TodosLists';

export const RouterNavigation: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/todo_lists" element={<TodosList />} />
          <Route path="/todos_list/:id" element={<ToDosContainer />} />{' '}
          {/* Dynamic route */}
        </Routes>
      </div>
    </Router>
  );
};
