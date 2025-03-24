import { useContext, useEffect, useState } from "react";
import SessionContext from "../Context/SessionContext";
import { Outlet, Navigate } from "react-router";

export default function ProtectedRoute() {
    const { session } = useContext(SessionContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedSession = localStorage.getItem('session');
        if (storedSession && !session) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [session]);

    if (loading) {
        return <p>Caricamento...</p>;
    }

    if (!session) {
        return <Navigate to={"/login"} />;
    }

    return <Outlet />;
}
