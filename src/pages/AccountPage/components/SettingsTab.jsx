import { useState, useEffect, useContext } from "react";
import supabase from "../../../Supabase/Client";
import SessionContext from "../../../Context/SessionContext";
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import Avatar from "./Avatar";
dayjs.extend(advancedFormat);

export default function SettingsTab({ user }) {
    const { session } = useContext(SessionContext);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState(null);
    const [first_name, setFirstName] = useState(null);
    const [last_name, setLastName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    const [updatedAt, setUpdatedAt] = useState(null);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const getProfile = async () => {
            setLoading(true);
            const { user } = session;

            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("username, first_name, last_name, avatar_url, updated_at")
                    .eq("id", user.id)
                    .single();

                if (error) {
                    setError("Error loading profile. Please try again later.");
                    console.error(error.message);
                } else if (data) {
                    setUsername(data.username);
                    setFirstName(data.first_name);
                    setLastName(data.last_name);
                    setAvatarUrl(data.avatar_url);
                    setUpdatedAt(data.updated_at);
                }
            } catch (error) {
                setError("Error loading profile. Please try again later.");
                console.error(error.message);
            }
            setLoading(false);
        };

        if (session) {
            getProfile();
        }
    }, [session]);

    async function updateProfile(field, value) {
        setLoading(true);
        const { user } = session;

        const updates = {
            id: user.id,
            username,
            first_name,
            last_name,
            avatar_url,
            updated_at: new Date(),
        };

        updates[field] = value;

        try {
            const { error } = await supabase.from("profiles").upsert(updates);

            if (error) {
                setError("Error updating profile. Please try again later.");
                console.error(error.message);
            } else {
                if (field === "username") setUsername(value);
                if (field === "first_name") setFirstName(value);
                if (field === "last_name") setLastName(value);
            }
        } catch (error) {
            setError("Error updating profile. Please try again later.");
            console.error("Error updating profile:", error.message);
        } finally {
            setLoading(false);
        }
    }

    function handleAvatarUpload(avatarUrl) {
        setAvatarUrl(avatarUrl);
        updateProfile("avatar_url", avatarUrl);
    }

    //* EVENTO 'PREMI IL TASTO INVIO'
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            updateProfile();
        }
    };

    return (
        <>
            <form className="form-widget mb-lg-5 pb-lg-5">
                <div className='row justify-content-center mt-5'>
                    <div className="col-12 px-5 px-md-4 px-lg-5 text-center text-md-start">
                        <h2 className='small-title mb-0'>Riepilogo Account</h2>
                        {updatedAt
                            ? <p className="message-chat-date">Ultimo aggiornamento: {dayjs(updatedAt).format('DD MMMM YYYY, HH:mm')}</p> // Formatta la data
                            : <p className="message-chat-date">Ultimo aggiornamento: non disponibile</p>
                        }
                    </div>
                </div>
                <div className="row justify-content-center column-gap-md-3 row-gap-md-1 mt-3">
                    {/* AVATAR */}
                    <div className="col-12 col-md-5 my-1 p-3 d-flex flex-column justify-content-center c-bg-lightDark rounded-2">
                        <p className="breadcrumbs mb-1">Avatar</p>
                        <div className="d-flex align-items-center">
                            <img
                                className="rounded-pill object-fit-cover me-2"
                                src={avatar_url || '/public/img-default.jpg'}
                                style={{ height: 40, width: 40 }}
                            />
                            <div>
                                <Avatar onUpload={handleAvatarUpload} />
                            </div>
                            <i className="bi bi-pencil c-text-lightGrey ms-auto pt-1"></i>
                        </div>
                    </div>
                    {/* USERNAME */}
                    <div className="col-12 col-md-6 my-1 p-3 d-flex flex-column justify-content-center c-bg-lightDark rounded-2">
                        <p className="breadcrumbs mb-1">Username</p>
                        <div className="d-flex align-items-center">
                            <input
                                className="small-body bg-transparent border-0 p-0 w-100"
                                id="username"
                                type="text"
                                value={username || "Non disponibile"}
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <i className="bi bi-pencil c-text-lightGrey ms-auto pt-1"></i>
                        </div>
                    </div>
                    {/* NOME */}
                    <div className="col-12 col-md-6 my-1 p-3 d-flex flex-column justify-content-center c-bg-lightDark rounded-2">
                        <p className="breadcrumbs mb-1">Nome</p>
                        <div className="d-flex align-items-center">
                            <input
                                className="small-body bg-transparent border-0 w-100 p-0"
                                id="first_name"
                                type="text"
                                value={first_name || "Non disponibile"}
                                onChange={(e) => setFirstName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <i className="bi bi-pencil c-text-lightGrey ms-auto pt-1"></i>
                        </div>
                    </div>
                    {/* COGNOME */}
                    <div className="col-12 col-md-5 my-1 p-3 d-flex flex-column justify-content-center c-bg-lightDark rounded-2">
                        <p className="breadcrumbs mb-1">Cognome</p>
                        <div className="d-flex align-items-center">
                            <input
                                className="small-body w-100 border-0 bg-transparent p-0"
                                id="last_name"
                                type="text"
                                value={last_name || "Non disponibile"}
                                onChange={(e) => setLastName(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <i className="bi bi-pencil c-text-lightGrey ms-auto pt-1"></i>
                        </div>
                    </div>
                    {/* EMAIL */}
                    <div className="col-12 col-md-5 my-1 p-3 d-flex flex-column justify-content-center c-bg-lightDark rounded-2">
                        <p className="breadcrumbs mb-1">Email</p>
                        <div className="d-flex align-items-center">
                            <input
                                className="small-body bg-transparent border-0 p-0"
                                id="email"
                                type="text"
                                value={user.email || "Non disponibile"}
                                disabled
                            />
                            <i className="bi bi-lock c-text-lightGrey ms-auto pt-1"></i>
                        </div>
                    </div>
                    {/* REGISTRATO IL */}
                    <div className="col-12 col-md-6 my-1 p-3 d-flex flex-column justify-content-center c-bg-lightDark rounded-2">
                        <p className="breadcrumbs mb-1">Registrato dal</p>
                        <div className="d-flex align-items-center">
                            <p className="small-body mb-0">
                                {user.created_at
                                    ? dayjs(user.created_at).format('DD MMMM YYYY')
                                    : "Data non disponibile"}
                            </p>
                            <i className="bi bi-clock-history c-text-lightGrey ms-auto"></i>
                        </div>
                    </div>
                    {/* BOTTONI */}
                    <div className="d-flex gap-2 mt-2 ms-0 ms-md-5 ps-lg-4 ps-0">
                        <button
                            className="c-bg-lighterDark small-body py-2 px-3 rounded-3 border-0"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Caricamento ..." : "Aggiorna"}
                        </button>
                        <button
                            className="c-bg-lighterDark small-body py-2 px-3 rounded-3 border-0"
                            type="button"
                            onClick={() => supabase.auth.signOut()}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
