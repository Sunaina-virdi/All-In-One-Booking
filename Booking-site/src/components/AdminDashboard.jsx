import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [places, setPlaces] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all places
    axios.get('/admin/places')
      .then(response => setPlaces(response.data))
      .catch(error => console.error('Error fetching places:', error));

    // Fetch all users
    axios.get('/admin/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Places Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Places</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Location</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {places.map(place => (
              <tr key={place._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{place.title}</td>
                <td className="border border-gray-300 p-2">{place.category}</td>
                <td className="border border-gray-300 p-2">{place.address}</td>
                <td className="border border-gray-300 p-2">
                  {/* Add buttons for actions like delete/edit */}
                  <button className="text-blue-500 mr-2">Edit</button>
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Users Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
