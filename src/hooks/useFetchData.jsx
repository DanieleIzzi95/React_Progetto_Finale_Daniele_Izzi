import { useState, useEffect } from "react";

export default function useFetchData(url, gameId = null) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [gameDetails, setgameDetails] = useState([]);
    const [error, setError] = useState(null);
    const [platformName, setPlatformName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result.results || []);

                if (url.includes("platforms=")) {
                    const platformId = new URL(url).searchParams.get("platforms");
                    if (platformId) {
                        const platformResponse = await fetch(`https://api.rawg.io/api/platforms/${platformId}?key=a3b6f11fb60b4c2e8b470e5dad6be312`);
                        const platformResult = await platformResponse.json();
                        setPlatformName(platformResult.name || "Unknown Platform");
                    }
                }

                if (gameId) {
                    const gameResponse = await fetch(`https://api.rawg.io/api/games/${gameId}?key=a3b6f11fb60b4c2e8b470e5dad6be312`);
                    if (!gameResponse.ok) {
                        throw new Error("Errore durante il recupero del gioco");
                    }
                    const gameData = await gameResponse.json();
                    setgameDetails(gameData);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, gameId]);

    return { data, loading, error, platformName, gameDetails };
}
