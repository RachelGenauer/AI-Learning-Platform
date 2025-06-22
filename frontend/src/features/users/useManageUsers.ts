import { useEffect, useState } from 'react';
import { getAllUsers, updateUser, deleteUser, registerUser } from '../../api/users';

export interface User {
  id_number: string;
  name: string;
  phone: string;
}

export function useManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedUsers, setEditedUsers] = useState<Record<string, Partial<User>>>({});
  const [newUser, setNewUser] = useState<User>({ id_number: '', name: '', phone: '' });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
      setEditingId(null);
      setEditedUsers({});
    } catch {
      setMessage({ type: 'error', text: 'Failed to load users.' });
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    editingId,
    editedUsers,
    newUser,
    message,
    setEditedUsers,
    setEditingId,
    setNewUser,
    setMessage,
    handleChange: (id: string, field: keyof User, value: string) => {
      setEditedUsers((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [field]: value,
        },
      }));
    },
    handleEditClick: (user: User) => {
      setEditingId(user.id_number);
      setEditedUsers((prev) => ({
        ...prev,
        [user.id_number]: { name: user.name, phone: user.phone },
      }));
    },
    handleSave: async (id: string) => {
      try {
        const data = editedUsers[id];
        if (!data) return;
        await updateUser(id, data);
        setMessage({ type: 'success', text: 'User updated successfully.' });
        loadUsers();
      } catch {
        setMessage({ type: 'error', text: 'Failed to update user.' });
      }
    },
    handleDelete: async (id: string) => {
      try {
        await deleteUser(id);
        setMessage({ type: 'success', text: 'User deleted successfully.' });
        loadUsers();
      } catch {
        setMessage({ type: 'error', text: 'Failed to delete user.' });
      }
    },
    handleAddUser: async () => {
      try {
        if (!newUser.id_number || !newUser.name || !newUser.phone) {
          setMessage({ type: 'error', text: 'Please fill all fields.' });
          return;
        }

        await registerUser(newUser);
        setMessage({ type: 'success', text: 'User added successfully.' });
        setNewUser({ id_number: '', name: '', phone: '' });
        loadUsers();
      } catch (error: any) {
        const detail = error?.response?.data?.detail || error.message;

        if (detail.includes('id_number')) {
          setMessage({ type: 'error', text: 'A user with this ID number already exists.' });
        } else if (detail.includes('name')) {
          setMessage({ type: 'error', text: 'A user with this name already exists.' });
        } else if (detail.includes('phone')) {
          setMessage({ type: 'error', text: 'A user with this phone number already exists.' });
        } else {
          setMessage({ type: 'error', text: 'Failed to add user.' });
        }
      }
    },
  };
}
