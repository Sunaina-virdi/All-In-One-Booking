import {Link, Navigate} from "react-router-dom";
import axios from 'axios';
import {useContext,useState} from "react";
import { UserContext } from "../UserContext";

export default function Loginpage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('http://localhost:4000/login',{email,password})
            setUser(data);
            alert('Login successful');
            setRedirect(true);
        }
        catch(e){
            alert('Login failed');
        }
        
    }

    if(redirect){
        return<Navigate to={'/'} />
    }
    return (
    <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-md p-6 bg-gradient-to-br from-blue-100 to-blue-300 shadow-xl rounded-lg">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Welcome Back
        </h1>
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-600">
                Email
            </label>
            <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-600">
                Password
            </label>
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-700 transition" >
            Login
            </button>
        </form>
        <div className="text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link
            className="text-blue-600 hover:underline font-medium"
            to={"/register"}>
            Register now
            </Link>
        </div>
        </div>
    </div>
    );
}