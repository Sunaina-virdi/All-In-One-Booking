import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProfilePage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();


  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");



  const handleSave = async () => {
    try {
      const response = await axios.put('/profile', { name, email});
      setUser(response.data);
      navigate('/account');
    } catch (error) {
      alert('Failed to update profile');
    }
  };


  return (
    <div className=" max-w-lg mx-auto mt-20 rounded-2xl shadow-md shadow-blue-800 p-8">
      <h1 className="text-2xl font-bold mb-4 text-primary text-center">Edit Profile</h1>
      <div className="flex flex-col gap-4">
        <label> Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded-2xl" />
        </label>
        <label> Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded-2xl" />
        </label>
        {/* <label>
          Profile Picture:
          <div className="flex items-center gap-4">
            <img
              src={photo || "/api/placeholder/150/150"}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </div>
        </label> */}
        <button
          onClick={handleSave}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}
