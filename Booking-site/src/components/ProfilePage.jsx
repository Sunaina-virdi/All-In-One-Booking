import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  // const [photoUrl, setPhotoUrl] = useState(user?.photo || "/api/placeholder/150/150");
  // const [isHovering, setIsHovering] = useState(false);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
    setRedirect("/");
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPhotoUrl(reader.result);
  //       // Upload to backend if required
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  if (!ready) {
    return "Loading....";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav role={user?.role} />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto mt-6 rounded-2xl shadow-md shadow-blue-800 p-5">
          {/* Profile Picture
          <div className="flex flex-row justify-between items-center gap-4">
            <div
              className={`relative w-32 h-32 rounded-full border-4 border-red-400 overflow-hidden`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <img
                src={photoUrl}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
              {isHovering && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <label className="text-white cursor-pointer">
                    Change
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              )}
            </div>
          </div> */}

          {/* User Details */}
          <div className="text-left mt-4">
            <p className="text-lg font-semibold">
              <span className="mr-2">📝 Name:</span> {user?.name}
            </p>
            <p className="text-lg font-semibold">
              <span className="mr-2">📧 Email:</span> {user?.email}
            </p>
            <p className="text-lg font-semibold">
              <span className="mr-2">🛠 Role:</span> {user?.role}
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4 justify-center">
            <button
              onClick={logout}
              className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-700"
            >
              Logout
            </button>
            <Link
              to="/account/profile/edit"
              className="bg-primary text-white py-2 px-4 rounded-full hover:bg-blue-700"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      )}

      {/* Render PlacesPage for non-user roles */}
      {subpage === "places" || subpage === "bookings" && user?.role !== "user" && <PlacesPage />}
    </div>
  );
}

