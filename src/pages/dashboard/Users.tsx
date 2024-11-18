import React, { useState } from 'react';

const Users: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<number | null>(null); // Track the open dropdown menu
  const [searchQuery, setSearchQuery] = useState(''); // For search query
  const users = [
    { id: 1, name: 'John Doe', age: 45, status: 'Tested' },
    { id: 2, name: 'Jane Smith', age: 50, status: 'Not Tested' },
    // Add more users here
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMenu = (index: number) => {
    setOpenMenu(openMenu === index ? null : index); // Toggle dropdown visibility
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
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr className="border-b hover:bg-gray-50" key={user.id}>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.age}</td>
                  <td className="px-4 py-2">{user.status}</td>
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
                            <button className="block px-4 py-2 text-red-600 hover:bg-red-100 w-full text-left">
                              Delete
                            </button>
                            <button className="block px-4 py-2 text-blue-600 hover:bg-blue-100 w-full text-left">
                              Update
                            </button>
                            <div className="block px-4 py-2 text-gray-600 hover:bg-gray-100 w-full text-left">
                              <select className="w-full bg-transparent border-none text-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none py-2 px-3 rounded-md">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
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

