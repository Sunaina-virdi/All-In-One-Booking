// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios"; 

// export default function RegisterPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user"); // Default to 'user'
//   const navigate = useNavigate();

//   async function registerUser(ev) {
//     // prevents the page from reloading 
//     ev.preventDefault();
//     try {
//       await axios.post("http://localhost:4000/register", {
//         name,
//         email,
//         password,
//         role,
//       });
//       alert("Registration successful. Now you can log in");
//       navigate("/login");
//     } catch (e) {
//       alert("Registration failed. Please try again later");
//     }
//   }

//   return (
//     <div className="mt-4 grow flex items-center justify-around">
//       <div className="mb-64">
//         <h1 className="text-4xl text-center mb-4 font-semibold">
//           Register now
//         </h1>
//         <form className="max-w-md mx-auto" onSubmit={registerUser}>
//           <input type="name" placeholder="Enter your name" value={name}
//             onChange={(ev) => setName(ev.target.value)} />
//           <input type="email"  placeholder="your@email.com"  value={email}
//             onChange={(ev) => setEmail(ev.target.value)}/>
//           <input type="password" placeholder="password" value={password}
//             onChange={(ev) => setPassword(ev.target.value)}/>
//           {/*  */}
//           <div className="mt-4">
//             <h3 className="mb-2">Select Role:</h3>
//             <label className="block">
//               <input
//                 type="radio" name="role" value="user"
//                 checked={role === "user"}
//                 onChange={(ev) => setRole(ev.target.value)}/>{" "}
//               User
//             </label>
//             {/* <label className="block">
//               <input
//                 type="radio" name="role" value="admin"
//                 checked={role === "admin"}
//                 onChange={(ev) => setRole(ev.target.value)}/>{" "}
//               Admin
//             </label> */}
//             <label className="block">
//               <input
//                 type="radio" name="role" value="agent"
//                 checked={role === "agent"}
//                 onChange={(ev) => setRole(ev.target.value)}/>{" "}
//               Agent
//             </label>
//           </div>

//           {/*  */}
//           <button className="primary">Register</button>
//           <div className="text-center py-2"> Already a member?
//             <Link className="underline text-black" to={"/login"}>{" "}Login</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to 'user'
  const navigate = useNavigate();

  async function registerUser(ev) {
    ev.preventDefault(); // Prevent page reload
    try {
      await axios.post("http://localhost:4000/register", {
        name,
        email,
        password,
        role,
      });
      alert("Registration successful. Now you can log in.");
      navigate("/login");
    } catch (e) {
      alert("Registration failed. Please try again later.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-6 shadow-xl rounded-lg bg-gradient-to-br from-blue-100 to-blue-300">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Create Your Account
        </h1>
        <form className="space-y-4" onSubmit={registerUser}>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-600">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-600">Role</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                  onChange={(ev) => setRole(ev.target.value)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">User</span>
              </label>
              {/* Uncomment for additional roles */}
              {/* <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={(ev) => setRole(ev.target.value)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Admin</span>
              </label> */}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="agent"
                  checked={role === "agent"}
                  onChange={(ev) => setRole(ev.target.value)}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">Agent</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
