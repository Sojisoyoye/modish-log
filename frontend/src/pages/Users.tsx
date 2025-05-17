import React, { useEffect, useState } from 'react';
import { deleteUser, getUsers, updateUser } from '../api/api';
import { User } from '../dto/dto';

const roles = ['Admin', 'Manager', 'Salesperson'];

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<string>('');

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setEditRole(user.role);
  };

  const handleSave = async (id: string) => {
    await updateUser(id, { role: editRole });
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: editRole } : u))
    );
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h2>User Management</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc' }}>Username</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Role</th>
            <th style={{ borderBottom: '1px solid #ccc' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td style={{ padding: '8px' }}>{user.username}</td>
              <td style={{ padding: '8px' }}>
                {editingId === user.id ? (
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td style={{ padding: '8px' }}>
                {editingId === user.id ? (
                  <>
                    <button onClick={() => handleSave(user.id)}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{ marginLeft: 8, color: 'red' }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={3} style={{ textAlign: 'center', padding: '16px' }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
