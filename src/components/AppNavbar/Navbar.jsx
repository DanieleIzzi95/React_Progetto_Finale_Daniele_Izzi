import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import SearchForm from "./components/SearchForm";
import supabase from "../../Supabase/Client";
import SessionContext from "../../Context/SessionContext";
import useUserProfile from "../../hooks/useAvatar";

export default function Navbar() {
    const { session, user } = useContext(SessionContext);
    const [searchQuery, setSearchQuery] = useState('');
    const { avatarUrl } = useUserProfile(user);
    const navigate = useNavigate();

    const handleSearchSubmit = (query) => {
        if (!query) return;
        setSearchQuery(query);
        navigate(`/search?q=${query}`);
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg bg-transparent">
            <div className="container-fluid">
                <div className="d-flex align-items-center mx-auto w-100">
                    <Link to="/" className="big-title c-text-white text-decoration-none text-uppercase">ReHack</Link>
                    <SearchForm onSubmit={handleSearchSubmit} />
                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-list fs-2"></i>
                    </button>
                </div>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown d-none d-lg-block">
                            <a className="nav-link dropdown-toggle align-content-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {user ? (
                                    <img
                                        className="rounded-pill object-fit-cover me-2"
                                        src={avatarUrl || '/public/img-default.jpg'}
                                        style={{ height: 40, width: 40 }}
                                        alt="Avatar"
                                    />
                                ) : ("Utente")}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end border-0">
                                {!session ? (
                                    <>
                                        <li>
                                            <Link to="/login" className="dropdown-item bg-transparent c-text-white">Login</Link>
                                        </li>
                                        <li>
                                            <Link to="/register" className="dropdown-item bg-transparent c-text-white">Registrati</Link>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/account" className="dropdown-item bg-transparent c-text-white">Dashboard</Link>
                                        </li>
                                        <li>
                                            <a
                                                onClick={signOut}
                                                className="dropdown-item bg-transparent c-text-white">Logout</a>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </li>

                        <div className="d-lg-none">
                            {!session ? (
                                <>
                                    <li>
                                        <Link to="/login" className="nav-link c-text-white">Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className="nav-link c-text-white">Registrati</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/account" className="nav-link c-text-white">Dashboard</Link>
                                    </li>
                                    <li>
                                        <a onClick={signOut} className="nav-link c-text-white">Logout</a>
                                    </li>
                                </>
                            )}
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
