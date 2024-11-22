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
    ev.preventDefault();
    try {
      await axios.post("http://localhost:4000/register", {
        name,
        email,
        password,
        role, // Include role
      });
      alert("Registration successful. Now you can log in");
      navigate("/login");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4 font-semibold">
          Register now
        </h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input type="name" placeholder="Enter your name" value={name}
            onChange={(ev) => setName(ev.target.value)} />
          <input type="email"  placeholder="your@email.com"  value={email}
            onChange={(ev) => setEmail(ev.target.value)}/>
          <input type="password" placeholder="password" value={password}
            onChange={(ev) => setPassword(ev.target.value)}/>
          {/*  */}
          <div className="mt-4">
            <h3 className="mb-2">Select Role:</h3>
            <label className="block">
              <input
                type="radio" name="role" value="user"
                checked={role === "user"}
                onChange={(ev) => setRole(ev.target.value)}/>{" "}
              User
            </label>
            <label className="block">
              <input
                type="radio" name="role" value="admin"
                checked={role === "admin"}
                onChange={(ev) => setRole(ev.target.value)}/>{" "}
              Admin
            </label>
            <label className="block">
              <input
                type="radio" name="role" value="agent"
                checked={role === "agent"}
                onChange={(ev) => setRole(ev.target.value)}/>{" "}
              Agent
            </label>
          </div>

          {/*  */}
          <button className="primary">Register</button>
          <div className="text-center py-2"> Already a member?
            <Link className="underline text-black" to={"/login"}>{" "}Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
