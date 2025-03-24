import { useContext } from "react";
import SessionContext from "../../Context/SessionContext";
import Tabs from "./components/Tabs";
import useUserProfile from "../../hooks/useAvatar";

export default function Account() {
    const { user, session } = useContext(SessionContext);
    const { avatarUrl, loading } = useUserProfile(user);

    if (loading) return <p>Caricamento...</p>;

    return (
        <div className="container m-0">
            <div className="d-flex flex-column align-items-center mt-5">
                <img
                    className="rounded-pill object-fit-cover me-2"
                    src={avatarUrl || '/img-default.jpg'}
                    style={{ height: 150, width: 150 }}
                    alt="Avatar"
                />
                <h1 className="bigger-title mb-4">
                    {user?.user_metadata?.username || "Utente"}
                </h1>
            </div>

            <Tabs user={user} />
        </div>
    );
}
