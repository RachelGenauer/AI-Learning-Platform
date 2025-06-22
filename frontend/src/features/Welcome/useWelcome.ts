import { useNavigate, useLocation } from 'react-router-dom';

export function useWelcome() {
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: 'Guest' };

  const navigateToHistory = () => {
    navigate('/welcome/history');
  };

  const navigateToNewPrompt = () => {
    navigate('/welcome/newPrompt');
  };

  return { name, navigateToHistory, navigateToNewPrompt };
}
