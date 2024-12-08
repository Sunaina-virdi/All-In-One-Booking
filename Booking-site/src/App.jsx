// import './App.css'
// import {Route,Routes} from "react-router-dom";
// import Homepage from "./components/homepage.jsx";
// import Loginpage from './components/loginpage.jsx';
// import Registerpage from './components/registerpage.jsx';
// import AdminDashboard from './components/AdminDashboard.jsx';
// import Layout from './Layout';
// // import SearchBar from './Searchbar';
// import { UserContextProvider } from './UserContext.jsx';
// import axios from "axios";
// import ProfilePage from './components/ProfilePage.jsx';
// import EditProfilePage from "./components/EditProfilePage";
// import PlacesPage from './components/PlacesPage.jsx';
// import PlacesFormPage from './components/PlacesFormPage.jsx';
// import HomePlacePage from './components/HomePlacePage.jsx';
// import BookingPage from './components/BookingPage.jsx';
// import BookingPlace from './components/BookingPlace.jsx';


// axios.defaults.baseURL = 'http://localhost:4000';
// axios.defaults.withCredentials = true;


// function App() {
//   return (
//     <UserContextProvider>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//             <Route index element={<Homepage/>}/>
//             <Route path="/login" element = {<Loginpage/>}/>
//             <Route path="/register" element = {<Registerpage/>}/>
//             <Route path="/account/admin/dashboard" element={<AdminDashboard />} />
//             <Route path="/account/" element={<ProfilePage/>}/>
//             <Route path="/account/profile/edit" element={<EditProfilePage />} />
//             <Route path="/account/places" element={<PlacesPage/>}/>
//             <Route path="/account/places/new" element={<PlacesFormPage/>}/>
//             <Route path="/account/places/:id" element={<PlacesFormPage/>}/>
//             <Route path="/place/:id" element={<HomePlacePage/>}/>
//             <Route path="/account/bookings" element={<BookingPage />} />
//             <Route path="/account/bookings/:id" element={<BookingPlace/>}/>
//         </Route>
//       </Routes>
//     </UserContextProvider>
//   )
// } 

// export default App
import './App.css';
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/homepage.jsx";
import Loginpage from './components/loginpage.jsx';
import Registerpage from './components/registerpage.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import Layout from './Layout';
import { UserContextProvider } from './UserContext.jsx';
import axios from "axios";
import ProfilePage from './components/ProfilePage.jsx';
import EditProfilePage from "./components/EditProfilePage";
import PlacesPage from './components/PlacesPage.jsx';
import PlacesFormPage from './components/PlacesFormPage.jsx';
import HomePlacePage from './components/HomePlacePage.jsx';
import BookingPage from './components/BookingPage.jsx';
import BookingPlace from './components/BookingPlace.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Import ProtectedRoute

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/account/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute> }/>
          <Route path="/account/" element={<ProfilePage />} />
          <Route path="/account/profile/edit" element={<EditProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<HomePlacePage />} />
          <Route path="/account/bookings" element={<BookingPage />} />
          <Route path="/account/bookings/:id" element={<BookingPlace />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
