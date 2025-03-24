import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { BrowserRouter, Routes, Route } from "react-router";
import Markup from "./Markup/index.jsx";
import Home from "./pages/HomePage";
import Genre from "./pages/GenrePage";
import GamePage from "./pages/GamePage";
import Platform from "./pages/PlatformPage";
import SearchPage from "./pages/SearchPage";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import Account from "./pages/AccountPage/Account";
import SessionContextProvider from "./Context/SessionContextProvider.jsx";
import ProtectedRoute from './components/protectedRoute.jsx';
import FavContextProvider from './Context/FavContextProvider.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Markup />}>
          <Route path="/" element={<Home />} />
          <Route path="/games/:genre" element={<Genre />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/platform/:platform" element={<Platform />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/register" element={<SignUp />} />
          <Route path='/account' element={<ProtectedRoute />}>
            <Route path="" element={<Account />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Route >
      </Routes>
    </BrowserRouter>
  )
}

function Root() {
  return (
    <>
      <SessionContextProvider>
        <FavContextProvider>
          <App />
        </FavContextProvider>
      </SessionContextProvider>
    </>
  )
}

export default Root