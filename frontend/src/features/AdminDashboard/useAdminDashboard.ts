import { useNavigate } from 'react-router-dom';

export function useAdminDashboard() {
  const navigate = useNavigate();

  const goToUsers = () => navigate('/admin/users');
  const goToCategories = () => navigate('/admin/categories');
  const goToPrompts = () => navigate('/admin/prompts');

  return {
    goToUsers,
    goToCategories,
    goToPrompts,
  };
}
