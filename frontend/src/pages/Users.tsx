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
    <div className="max-w-[600px] mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b border-gray-300 py-2 text-left">
              Username
            </th>
            <th className="border-b border-gray-300 py-2 text-left">Role</th>
            <th className="border-b border-gray-300 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="p-2">{user.username}</td>
              <td className="p-2">
                {editingId === user.id ? (
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 w-full"
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
              <td className="p-2">
                {editingId === user.id ? (
                  <>
                    <button
                      onClick={() => handleSave(user.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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
              <td colSpan={3} className="text-center p-4 text-gray-500">
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
