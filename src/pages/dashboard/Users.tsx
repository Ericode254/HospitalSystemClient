import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // For storing the users fetched from the backend
  const [openMenu, setOpenMenu] = useState<number | null>(null); // Track the open dropdown menu
  const [searchQuery, setSearchQuery] = useState(''); // For search query

  // Fetch users data from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/users');
        setUsers(response.data); // Assuming response contains a list of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Memoize filtered users to optimize performance
  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, users]);

  // Function to handle user update (changing role)
  const updateUser = async (id: number, updatedRole: string) => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/users/${id}`, { role: updatedRole });
      toast.success(response.data.message);
      setUsers(users.map(user => (user.id === id ? { ...user, role: updatedRole } : user)));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Function to handle user deletion
  const deleteUser = async (id: number) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/users/${id}`);
      toast.success(response.data.message);
      // Remove the user from the state after successful deletion
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const toggleMenu = (index: number) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Users</h1>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr className="border-b hover:bg-gray-50" key={user.id}>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone_number}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => toggleMenu(index)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none"
                      >
                        Actions
                      </button>
                      {openMenu === index && (
                        <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          <div className="py-1">
                            <button
                              onClick={() => deleteUser(user.id)} // Call the deleteUser function
                              className="block px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => updateUser(user.id, 'admin')} // Set to 'admin' or 'user'
                              className="block px-4 py-2 text-blue-600 hover:bg-blue-100 w-full text-left"
                            >
                              Make Admin
                            </button>
                            <button
                              onClick={() => updateUser(user.id, 'user')} // Set to 'user'
                              className="block px-4 py-2 text-blue-600 hover:bg-blue-100 w-full text-left"
                            >
                              Make User
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

