import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Alert,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { getAllUsers, updateUser, deleteUser, registerUser } from '../api/users';

interface User {
  id_number: string;
  name: string;
  phone: string;
}

export default function ManageUsers() {
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

  const handleEditClick = (user: User) => {
    setEditingId(user.id_number);
    setEditedUsers((prev) => ({
      ...prev,
      [user.id_number]: { name: user.name, phone: user.phone },
    }));
  };

  const handleChange = (id: string, field: keyof User, value: string) => {
    setEditedUsers((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (id: string) => {
    try {
      const data = editedUsers[id];
      if (!data) return;
      await updateUser(id, data);
      setMessage({ type: 'success', text: 'User updated successfully.' });
      loadUsers();
    } catch {
      setMessage({ type: 'error', text: 'Failed to update user.' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setMessage({ type: 'success', text: 'User deleted successfully.' });
      loadUsers();
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete user.' });
    }
  };

  const handleAddUser = async () => {
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
  };

  return (
    <Container maxWidth="md" sx={{ fontFamily: '"Amatic SC", cursive', mt: 5 }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        href="/admin"
        sx={{ mb: 3 }}
      >
        Return to Admin Dashboard
      </Button>

      <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <Typography
            variant="h3"
            sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}
          >
            <ManageAccountsIcon sx={{ fontSize: '2.8rem' }} />
            Manage Users
          </Typography>
        </Box>

        {message && <Alert severity={message.type}>{message.text}</Alert>}

        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          mt={4}
          mb={4}
        >
          <Typography variant="h5" sx={{ color: 'primary.main', mb: 2 }}>
            Add New User
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap" justifyContent="center">
            <TextField
              label="ID Number"
              variant="outlined"
              value={newUser.id_number}
              onChange={(e) => setNewUser({ ...newUser, id_number: e.target.value })}
            />
            <TextField
              label="Name"
              variant="outlined"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField
              label="Phone"
              variant="outlined"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddUser}
              sx={{ height: '56px' }}
            >
              Add User
            </Button>
          </Box>
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id_number}>
                <TableCell>{user.id_number}</TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={
                      editingId === user.id_number
                        ? editedUsers[user.id_number]?.name ?? ''
                        : user.name
                    }
                    disabled={editingId !== user.id_number}
                    onChange={(e) => handleChange(user.id_number, 'name', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    variant="standard"
                    value={
                      editingId === user.id_number
                        ? editedUsers[user.id_number]?.phone ?? ''
                        : user.phone
                    }
                    disabled={editingId !== user.id_number}
                    onChange={(e) => handleChange(user.id_number, 'phone', e.target.value)}
                  />
                </TableCell>
                <TableCell align="center">
                  {editingId === user.id_number ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleSave(user.id_number)}
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditClick(user)}>
                        <EditIcon sx={{ color: 'primary.main' }} />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user.id_number)}>
                        <DeleteIcon sx={{ color: 'primary.main' }} />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
