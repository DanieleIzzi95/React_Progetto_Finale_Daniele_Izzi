import GenreSidebarFilter from "./components/GenreSidebarFilter";
import PlatformSidebarFilter from "./components/PlatformSidebarFilter";
import { Link } from "react-router";
import { useContext } from "react";
import SessionContext from "../../../../Context/SessionContext";
import useUserProfile from "../../../../hooks/useAvatar";

export default function Sidebar() {
    const { session, user } = useContext(SessionContext);
    const { avatarUrl, loading } = useUserProfile(user);

    return (
        <div className="sidebar d-none d-md-block mt-5">
            <div className="d-flex align-items-center pt-2 mb-2">
                <i className="bi bi-house c-text-acc fs-5 c-bg-lightDark rounded-3 px-2 me-2"></i>
                <Link className=" text-decoration-none c-text-white" to="/"><h2 className="sidebar-title m-0 p-0">Home</h2></Link>
            </div>
            <div className="d-flex align-items-center pt-2 mb-5">
                <div className=" d-flex align-items-center c-bg-lightDark rounded-3 px-2 py-1 me-2">
                    <img
                        className="rounded-pill object-fit-cover"
                        src={avatarUrl || '/public/img-default.jpg'}
                        style={{ height: 20, width: 20 }}
                        alt="Avatar"
                    />
                </div>
                <Link className=" text-decoration-none c-text-white" to="/account"><h2 className="sidebar-title m-0 p-0">{user ? (user.user_metadata.username) : ("Utente")}</h2></Link>
            </div>
            <GenreSidebarFilter />
            <PlatformSidebarFilter />
        </div>
    )
}