import {
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
import { useManageUsers } from './useManageUsers';

export function UsersLayout() {
  const {
    users,
    editingId,
    editedUsers,
    newUser,
    message,
    setNewUser,
    handleEditClick,
    handleChange,
    handleSave,
    handleDelete,
    handleAddUser,
  } = useManageUsers();

  return (
    <Paper elevation={6} sx={{ p: 4, borderRadius: 4 }}>
      <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
        <Typography
          variant="h3"
          sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}
        >
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
  );
}