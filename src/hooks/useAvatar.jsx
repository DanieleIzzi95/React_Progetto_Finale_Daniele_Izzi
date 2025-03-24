import { useState, useEffect } from "react";
import supabase from "../Supabase/Client";

const useUserProfile = (user) => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const getProfile = async () => {
                try {
                    const { data, error } = await supabase
                        .from("profiles")
                        .select("avatar_url")
                        .eq("id", user.id)
                        .single();

                    if (error) {
                        console.warn(error.message);
                    } else {
                        setAvatarUrl(data.avatar_url);
                    }
                } catch (error) {
                    console.warn("Errore durante il recupero del profilo:", error.message);
                } finally {
                    setLoading(false);
                }
            };
            getProfile();
        }
    }, [user]);

    return { avatarUrl, loading };
};

export default useUserProfile;
