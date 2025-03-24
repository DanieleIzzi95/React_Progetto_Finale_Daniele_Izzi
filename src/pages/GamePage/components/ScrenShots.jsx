import { useEffect, useState } from "react";

export default function ScreenShots({ id }) {
    const [screenshots, setScreenShots] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchScreenShots = async () => {
            const url = `https://api.rawg.io/api/games/${id}/screenshots?key=a3b6f11fb60b4c2e8b470e5dad6be312`;
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Errore nel caricamento degli screenshot");
                const json = await response.json();
                setScreenShots(json.results || []);
            } catch (error) {
                console.error(`Errore nel recupero degli screenshot: ${error}`);
            }
        };
        fetchScreenShots();
    }, [id]);

    if (!screenshots.length) return <p>Caricamento degli screenshot...</p>;

    return (
        <div>
            {/* Galleria di Screenshot */}
            <div className="d-flex flex-wrap gap-3">
                {screenshots.map((shot, index) => (
                    <div key={index} className="card bg-transparent border-0">
                        <img
                            className="img-card-top border-0 rounded-3"
                            src={shot.image}
                            alt={`ScreenShot ${index + 1}`}
                            onClick={() => setSelectedImage(shot.image)}
                            style={{ cursor: "pointer" }}
                        />
                    </div>
                ))}
            </div>

            {/* Modale */}
            {selectedImage && (
                <div
                    className="modal-overlay c-modal"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="modal-content">
                        <img
                            src={selectedImage}
                            alt="Screenshot del gioco"
                            className="img-modal"
                        />
                        {/* <button
                            onClick={() => setSelectedImage(null)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                background: "#fff",
                                border: "none",
                                borderRadius: "50%",
                                padding: "5px 10px",
                                cursor: "pointer",
                                fontSize: "20px",
                            }}
                        >
                            ✕
                        </button> */}
                    </div>
                </div>
            )}
        </div>
    );
}
