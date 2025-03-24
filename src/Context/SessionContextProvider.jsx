import { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import supabase from "../Supabase/Client";

export default function SessionContextProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {

        const storedSession = localStorage.getItem('session');
        if (storedSession) {
            setSession(JSON.parse(storedSession));
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    setSession(null);
                    localStorage.removeItem('session');
                    setProfile(null);
                } else if (session) {
                    setSession(session);
                    localStorage.setItem('session', JSON.stringify(session));
                }
            });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (session) {
            async function getUser() {
                const { data: { user } } = await supabase.auth.getUser();
                setUser(user);


                const { data: profileData, error } = await supabase
                    .from("profiles")
                    .select("username, first_name, last_name, avatar_url")
                    .eq("id", user.id)
                    .single();

                if (error) {
                    console.error("Error fetching profile: ", error.message);
                } else {
                    setProfile(profileData);
                }
            }
            getUser();
        }
    }, [session]);

    return (
        <SessionContext.Provider value={{
            session,
            user,
            profile
        }} >
            {children}
        </SessionContext.Provider>
    )
}
