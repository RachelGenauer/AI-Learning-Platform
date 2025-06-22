import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; 

import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import History from './pages/History';
import ManageCategories from './pages/ManageCategories';
import ManageUsers from './pages/ManageUsers';
import NewPrompt from './pages/NewPrompt';
import ViewPrompts from './pages/ViewPrompts';
import Welcome from './pages/Welcome';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/welcome/history" element={<History />} />
          <Route path="/admin/categories" element={<ManageCategories />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/welcome/newPrompt" element={<NewPrompt />} />
          <Route path="/admin/prompts" element={<ViewPrompts />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
