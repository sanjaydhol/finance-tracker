"use client";
import { useEffect, useState } from "react";
import { getEntities, updateEntity, deleteEntity } from "../../firestoreHelpers";
import { User, Role } from "../../types";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getEntities<User>("users");
    setUsers(data);
    setLoading(false);
  };

  const fetchRoles = async () => {
    const data = await getEntities<Role>("roles");
    setRoles(data);
  };

  const handleApprove = async (id: string, role: string) => {
    await updateEntity<User>("users", id, { isApproved: true, role });
    fetchUsers();
  };

  const handleDeny = async (id: string) => {
    await updateEntity<User>("users", id, { isApproved: false });
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    await deleteEntity("users", id);
    fetchUsers();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-gray-100 via-blue-50 to-purple-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin User Dashboard</h1>
        {loading ? (
          <div className="text-gray-500">Loading users...</div>
        ) : (
          <table className="w-full border rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Approved</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b">
                  <td className="p-2 font-semibold text-gray-700">{user.name}</td>
                  <td className="p-2 text-gray-600">{user.email}</td>
                  <td className="p-2">
                    <select
                      className="border rounded p-1"
                      defaultValue={user.role}
                      disabled={user.isApproved}
                      onChange={e => handleApprove(user.id!, e.target.value)}
                    >
                      {roles.map(role => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2">{user.isApproved ? "Yes" : "No"}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded shadow"
                      onClick={() => handleApprove(user.id!, user.role)}
                      disabled={user.isApproved}
                    >
                      Approve
                    </button>
                    <button
                      className="bg-yellow-500 text-white px-2 py-1 rounded shadow"
                      onClick={() => handleDeny(user.id!)}
                      disabled={!user.isApproved}
                    >
                      Deny
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded shadow"
                      onClick={() => handleDelete(user.id!)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
