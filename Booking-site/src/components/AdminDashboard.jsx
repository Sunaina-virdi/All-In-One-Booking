import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import AdminAccomodation from "./AdminAccomodation";
import AdminAddAcc from "./AdminAddAcc";

export default function AdminDashboard() {
  const [places, setPlaces] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const { user } = useContext(UserContext);
  const [activeSection, setActiveSection] = useState("dashboard"); // Default section

  useEffect(() => {
    // Fetch all places
    axios
      .get("/admin/places")
      .then((response) => setPlaces(response.data))
      .catch((error) => console.error("Error fetching places:", error));

    // Fetch all users
    axios
      .get("/admin/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
    
    // fetch count of total bookings
    axios
      .get("/admin/bookings/count")
      .then((response) => setTotalBookings(response.data.totalBookings))
      .catch((error) => console.error("Error fetching bookings count:", error));
  }, []);

  const handleDelete = async (id, type) => {
    try {
      const confirmed = window.confirm(`Are you sure you want to delete this ${type}?`);
      if (confirmed) {
        const endpoint = type === "place" ? `/places/${id}` : `/users/${id}`;
        await axios.delete(endpoint);

        if (type === "place") {
          // Update the state to remove the deleted place
          setPlaces(places.filter((place) => place._id !== id));
        } else {
          // Update the state to remove the deleted user
          setUsers(users.filter((user) => user._id !== id));
        }

        alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Failed to delete ${type}.`);
    }
  };

  return (
    <div className="p-3">
      <AccountNav role={user?.role} />
      <h1 className="text-3xl font-bold mb-6 text-primary text-center p-5">Admin Dashboard</h1>
      <div className="flex min-h-screen gap-3">
        {/* Sidebar */}
        <div className="w-64 bg-blue-800 text-white border-r rounded-2xl">
          <div className="p-4 text-center">
            <h3 className="mt-4 font-semibold text-lg">{user?.name || "Admin"}</h3>
            <p className="text-white">{user?.email || "admin@example.com"}</p>
          </div>
          <nav className="mt-6">
            <ul className="space-y-4 text-white">
              <li className={`pl-4 py-2 hover:bg-white hover:text-black cursor-pointer ${
                  activeSection === "dashboard" ? "bg-white text-black" : ""}`}
                onClick={() => setActiveSection("dashboard")}>
                Dashboard
              </li>
              <li className={`pl-4 py-2 hover:bg-white hover:text-black cursor-pointer ${
                  activeSection === "users" ? "bg-white text-black" : ""}`}
                onClick={() => setActiveSection("users")}>
                All Users
              </li>
              <li className={`pl-4 py-2 hover:bg-white hover:text-black cursor-pointer ${
                  activeSection === "places" ? "bg-white text-black" : ""}`}
                onClick={() => setActiveSection("places")}>
                All Places
              </li>
              <li className={`pl-4 py-2 hover:bg-white hover:text-black cursor-pointer ${
                  activeSection === "addplaces" ? "bg-white text-black" : ""}`}
                onClick={() => setActiveSection("addplaces")}>
                Add accommodations
              </li>
              <li className={`pl-4 py-2 hover:bg-white hover:text-black cursor-pointer ${
                  activeSection === "myplaces" ? "bg-white text-black" : ""}`}
                onClick={() => setActiveSection("myplaces")}>
                My accommodations
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-200 rounded-2xl">
          {activeSection === "dashboard" && (
            <>
              <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-200 p-10 rounded-lg text-center">
                  <h3 className="font-bold text-xl">{users.length}</h3>
                  <p>All Users</p>
                </div>
                <div className="bg-blue-200 p-10 rounded-lg text-center">
                  <h3 className="font-bold text-xl">{places.length}</h3>
                  <p>All Places</p>
                </div>
                <div className="bg-blue-200 p-10 rounded-lg text-center">
                  <h3 className="font-bold text-xl">{totalBookings}</h3>
                  <p>Total Bookings</p>
                </div>
              </div>
            </>
          )}

          {activeSection === "users" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">All Users</h2>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Role</th>
                    <th className="border border-gray-300 p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2">{user.name}</td>
                      <td className="border border-gray-300 p-2">{user.email}</td>
                      <td className="border border-gray-300 p-2">{user.role}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <button className="text-red-500"
                          onClick={() => handleDelete(user._id, "user")}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === "places" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">All Places</h2>
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
                  {places.map((place) => (
                    <tr key={place._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2">{place.title}</td>
                      <td className="border border-gray-300 p-2">{place.category}</td>
                      <td className="border border-gray-300 p-2">{place.address}</td>
                      <td className="border border-gray-300 p-2 text-center">
                        <button className="text-red-500"
                          onClick={() => handleDelete(place._id, "place")}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeSection === "addplaces" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Add Places</h2>
              <AdminAddAcc/>
            </div>
          )}
          {activeSection === "myplaces" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">My accommodations</h2>
              <AdminAccomodation/>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
