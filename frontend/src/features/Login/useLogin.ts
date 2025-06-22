import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/users';

export function useLogin() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await loginUser(name, phone);

      localStorage.setItem('userId', user.id_number);
      localStorage.setItem('userPhone', user.phone);

      setMessage({ type: 'success', text: 'Login successful!' });

      setTimeout(() => {
        if (user.phone === '0527184881') {
          navigate('/admin');
        } else {
          navigate('/welcome', { state: { name: user.name } });
        }
      }, 1000);
    } catch (error: any) {
      const detail = error?.response?.data?.detail || error.message;

      if (detail.includes('not found')) {
        setMessage({ type: 'error', text: 'User not found. Please sign up first.' });
      } else if (detail.includes('incorrect')) {
        setMessage({ type: 'error', text: 'Phone number does not match the name.' });
      } else {
        setMessage({ type: 'error', text: detail });
      }
    }
  };

  return {
    name,
    setName,
    phone,
    setPhone,
    message,
    handleSubmit,
  };
}
