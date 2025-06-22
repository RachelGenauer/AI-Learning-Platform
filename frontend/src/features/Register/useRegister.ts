import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/users';

export function useRegister() {
  const [idNumber, setIdNumber] = useState('');
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
      await registerUser({ id_number: idNumber, name, phone });

      setMessage({ type: 'success', text: 'Registration successful!' });

      localStorage.setItem('userId', idNumber);
      localStorage.setItem('userName', name);
      localStorage.setItem('userPhone', phone);

      setTimeout(() => {
        navigate('/welcome', { state: { name } });
      }, 1000);
    } catch (error: any) {
      let errorText = 'Registration failed.';
      const status = error?.response?.status;
      const detail = error?.response?.data?.detail;

      if (status === 400 && typeof detail === 'string') {
        if (detail.includes('ID number')) {
          errorText = 'This ID number is already registered.';
        } else if (detail.includes('Name')) {
          errorText = 'This name is already taken.';
        } else if (detail.includes('Phone number')) {
          errorText = 'This phone number is already registered.';
        } else if (detail.includes('missing')) {
          errorText = 'Missing required fields. Please fill out all fields.';
        } else {
          errorText = detail;
        }
      } else if (status === 404) {
        errorText = 'Server not found. Please try again later.';
      } else if (status === 500) {
        errorText = 'Server error occurred. Please try again soon.';
      } else if (status === 0 || !status) {
        errorText = 'Could not connect to the server. Check your internet connection.';
      }

      setMessage({ type: 'error', text: errorText });
    }
  };

  return {
    idNumber,
    setIdNumber,
    name,
    setName,
    phone,
    setPhone,
    message,
    handleSubmit,
  };
}
