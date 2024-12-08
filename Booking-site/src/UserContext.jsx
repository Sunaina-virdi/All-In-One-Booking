import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a UserContext
export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Check if there's a logged-in user when the app loads
        async function fetchUser() {
            try {
                const { data } = await axios.get('/profile', { withCredentials: true });
                setUser(data); // Set user if logged in
            } catch (err) {
                setUser(null); // No user logged in
            } finally {
                setReady(true);
            }
        }
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, ready, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// // Create a UserContext
// export const UserContext = createContext();

// export function UserContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [ready, setReady] = useState(false);

//   useEffect(() => {
//     // Check if there's a logged-in user when the app loads
//     async function fetchUser() {
//       try {
//         const { data } = await axios.get('/profile', { withCredentials: true });
//         setUser(data); // Assume 'data' includes { id, name, email, role }
//       } catch (err) {
//         setUser(null); // No user logged in
//       } finally {
//         setReady(true);
//       }
//     }
//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, ready, setUser }}>
//       {children}
//     </UserContext.Provider>
//     );
// }
