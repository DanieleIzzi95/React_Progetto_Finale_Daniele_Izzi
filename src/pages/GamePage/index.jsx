import { useParams, Link } from "react-router";
import useFetchData from "../../hooks/useFetchData";
import { useContext, useEffect, useRef, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Toast } from 'primereact/toast';
import supabase from "../../Supabase/Client"
import SessionContext from "../../Context/SessionContext"
import Chat from "./components/Chat";
import RealTimeMessages from "./components/RealTimeMessages";
import ReviewForm from "./components/ReviewsForm";
import ScreenShots from "./components/ScrenShots";
import ReviewsCard from "./components/ReviewsCard";

export default function GamePage() {
    const { session } = useContext(SessionContext)
    const { id } = useParams();
    const url = `https://api.rawg.io/api/games?key=a3b6f11fb60b4c2e8b470e5dad6be312`;
    const { gameDetails, loading, error } = useFetchData(url, id);
    const [fav, setFav] = useState([])
    const toast = useRef(null)

    useEffect(() => {
        if (session) {
            readFav();
        }
    }, [session]);

    //* CHECK SE PREFERITO
    const isFavourite = () => {
        if (gameDetails) {
            return fav.find((el) => +el.game_id === gameDetails.id);
        }
    };

    //* LEGGI PREFERITI
    const readFav = async () => {
        if (session) {
            let { data: favourites, error } = await supabase
                .from("favourites")
                .select("*")
                .eq("profile_id", session.user.id);
            if (!error) setFav(favourites);
        }
    };

    useEffect(() => {
        readFav();
    }, []);

    //* AGGIUNGI AI PREFERITI
    const addToFav = async (game) => {
        const { error } = await supabase
            .from('favourites')
            .insert([
                {
                    profile_id: session.user.id,
                    game_id: game.id,
                    game_name: game.name,
                    game_image: gameDetails.background_image
                },
            ])
            .select();
        if (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: `Errore, ${gameDetails.name} non aggiunto ai preferiti.`,
                life: 3000,
                content: (props) => (
                    <div className="flex flex-column align-items-left" >
                        <div className="flex align-items-center gap-2">
                            <span className="big-body">Attenzione</span>
                        </div>
                        <div className="caption text-lg my-1">{props.message.detail}</div>
                    </div>
                )
            });

        } else {
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: `${gameDetails.name} aggiunto ai preferiti `,
                life: 3000,
                content: (props) => (
                    <div className="flex flex-column align-items-left w-100" >
                        <div className="flex align-items-center gap-2">
                            <div className="big-body">Ottimo!</div>
                        </div>
                        <div className="small-body text-lg my-1">{props.message.detail}</div>
                    </div>
                )
            });
        }
        readFav();
    }

    //* RIMUOVI DAI PREFERITI
    const removeFav = async (game) => {
        const { error } = await supabase
            .from("favourites")
            .delete()
            .eq("game_id", game.id)
            .eq("profile_id", session.user.id)
        if (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: `Errore, ${gameDetails.name} non non rimosso dai preferiti.`,
                life: 3000,
                content: (props) => (
                    <div className="flex flex-column align-items-left w-100" >
                        <div className="flex align-items-center gap-2">
                            <span className="big-body">Attenzione</span>
                        </div>
                        <div className="caption text-lg my-1">{props.message.detail}</div>
                    </div>
                )
            });

        } else {
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: `${gameDetails.name} rimosso dai preferiti `,
                life: 3000,
                content: (props) => (
                    <div className="flex flex-column align-items-left w-100" >
                        <div className="flex align-items-center gap-2">
                            <span className="big-body">Ottimo!</span>
                        </div>
                        <div className="small-body text-lg my-1">{props.message.detail}</div>
                    </div>
                )
            });
            readFav();
        }
    };

    //* SVUOTA CHAT
    const clearChat = async () => {
        const { error } = await supabase
            .from("messages")
            .delete()
            .eq("game_id", gameDetails.id);
        if (error) {
            console.error("Errore durante la cancellazione dei messaggi:", error.message);
            return;
        }
        setMessages([]);
    };

    return (
        <>
            <div className="container-fluid mt-md-5 p-md-5 pt-md-0">
                <Toast ref={toast} />
                {loading && <MoonLoader size={28} color="#F5F000" />}
                {error && <p className="caption c-text-acc">{error}</p>}
                {!loading && !error && gameDetails && (
                    <>
                        <div className="row c-flex px-md-3 py-3 py-md-0 pb-5">
                            {/* COLONNA DETTAGLI */}
                            <div className="col-12 col-lg-6 mt-5 mt-md-4 d-flex justify-content-center flex-column">
                                <small className="breadcrumbs"><Link to="/" className="c-text-lightWhite">home</Link> / {gameDetails.name}</small>
                                <h1 className="bigger-title py-2">{gameDetails.name}</h1>
                                {/* BOTTONI */}
                                <div className="d-flex gap-3 my-3">
                                    {session &&
                                        !isFavourite() ? (
                                        <button onClick={() => addToFav(gameDetails)} className="c-bg-lighterDark small-body py-2 px-3 rounded-3 border-0">
                                            <i className="bi bi-heart fs-6 c-text-acc me-2"></i> Aggiungi a preferiti
                                        </button>
                                    ) : (
                                        <button onClick={() => removeFav(gameDetails)} className="c-bg-lighterDark small-body py-2 px-3 rounded-3 border-0">
                                            <i className="bi bi-heart-fill fs-6 c-text-acc me-2"></i> Rimuovi dai preferiti
                                        </button>
                                    )}
                                    <button className="c-bg-lighterDark small-body py-2 px-3 rounded-3 border-0">
                                        <i className="bi bi-pencil-square fs-6 c-text-acc me-2"></i> Scrivi una recensione
                                    </button>
                                </div>
                                {/* RATINGS */}
                                <div className="section-details d-flex align-items-center justify-content-between">
                                    <p className="caption-details">Punteggio</p>
                                    <p className="caption-details">{gameDetails.rating} / {gameDetails.rating_top}</p>
                                </div>

                                {/* PIATTAFORME */}
                                <div className="section-details d-flex align-items-center justify-content-between">
                                    <p className="caption-details">Piattaforme</p>
                                    {/* TRASFORMO LE PIATTAFORME IN ICONE */}
                                    <div className="d-flex gap-2">
                                        {gameDetails.platforms?.slice(0, 3).map((platform) => {
                                            const platformName = platform.platform.name.toLowerCase();

                                            let iconClass = "";
                                            switch (true) {
                                                case /playstation/i.test(platformName):
                                                    iconClass = "bi bi-playstation";
                                                    break;
                                                case /xbox/i.test(platformName):
                                                    iconClass = "bi bi-xbox";
                                                    break;
                                                case /nintendo/i.test(platformName):
                                                    iconClass = "bi bi-nintendo-switch";
                                                    break;
                                                case /pc/i.test(platformName):
                                                    iconClass = "bi bi-windows";
                                                    break;
                                                case /mac/i.test(platformName):
                                                    iconClass = "bi bi-apple";
                                                    break;
                                                case /android/i.test(platformName):
                                                    iconClass = "bi bi-android2";
                                                    break;
                                                default:
                                                    iconClass = "bi bi-question-circle";
                                            }

                                            return (
                                                <i
                                                    key={platform.platform.id}
                                                    className={`${iconClass} fs-6`}
                                                    title={platform.platform.name}
                                                ></i>
                                            );
                                        }) || <p>Non disponibile</p>}
                                    </div>
                                </div>
                                {/* GENERI */}
                                <div className="section-details d-flex align-items-center justify-content-between">
                                    <p className="caption-details">Genere</p>
                                    <p className="caption-details">
                                        {gameDetails.genres?.map(genre => genre.name).join(', ') || "Ancora non disponibile"}
                                    </p>
                                </div>

                                {/* TAGS */}
                                <div className="section-details d-flex align-items-center justify-content-between">
                                    <p className="caption-details">Tags</p>
                                    <p className="caption-details">
                                        {gameDetails.tags?.slice(0, 3).map(tag => tag.name).join(', ') || "Non disponibile"}
                                    </p>
                                </div>
                                {/* DATA DI RILASCIO */}
                                <div className="section-details d-flex align-items-center justify-content-between">
                                    <p className="caption-details">Data di rilascio</p>
                                    <p className="caption-details">{gameDetails.released || "Data non disponibile"}</p>
                                </div>
                                {/* DESCRIZIONE */}
                                <div className="section-details border-bottom-0">
                                    <p className="caption text-uppercase mt-3">panoramica di gioco</p>
                                    <p className="caption">{gameDetails.description_raw || "Descrizione non disponibile"}</p>
                                </div>
                            </div>

                            {/* IMMAGINE DEL GIOCO*/}
                            <div className="col-12 col-lg-6 d-flex justify-content-center">
                                <img className="img-fluid rounded-4" src={gameDetails.background_image} alt={gameDetails.name} />
                            </div>
                        </div>

                        <hr />

                        {/* SCREENSHOTS */}
                        <div className="row my-3 py-5">
                            <p className="small-title text-uppercase">Immagini di gioco</p>
                            <div className="col-12 justify-content-center">
                                <ScreenShots id={id} />
                            </div>
                        </div>

                        <hr />

                        {/* REALTIME CHAT */}
                        <div className="row justify-content-between row-gap-5 py-5 my-5">
                            {/* LIVE CHAT TEXT */}
                            <div className="col-12 col-lg-5 d-flex flex-column justify-content-between">
                                <div>
                                    <p className="bigger-title c-text-white my-2 mb-4">Parla con altri gamer in tempo reale!</p>
                                    <p className="regular-body c-text-white">Usa la chat per condividere le tue impressioni sul gioco, scambiare consigli, scoprire segreti nascosti e connetterti con altri appassionati. <br /> Che tu sia un veterano o un nuovo giocatore, questo è il posto giusto per discutere strategie, fare domande e vivere insieme l’avventura!</p>
                                    <div className="d-flex align-items-center gap-2 my-4">
                                        <i className="bi bi-chat-text d-none d-md-block c-text-acc fs-3 me-2"></i>
                                        <p className="small-title c-text-white mb-0">Accedi e unisciti alla discussione ora e fai sentire la tua voce!</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="d-flex align-items-baseline gap-2">
                                        <i className="bi bi-exclamation-triangle-fill c-text-acc"></i>
                                        <p className="caption c-text-lightWhite mb-0">Nota:</p>
                                    </div>
                                    <p className="caption c-text-lightWhite mb-0">Questa chat è live e i tuoi messaggi saranno visibili in tempo reale agli altri utenti. <br /> Ti invitiamo a mantenere un linguaggio rispettoso, evitare insulti o comportamenti offensivi, e a non tollerare alcuna forma di bullismo. Creiamo insieme uno spazio accogliente e divertente per tutti!</p>

                                </div>
                            </div>
                            {/* LIVE CHAT */}
                            <div className="col-12 col-lg-7">
                                <div className="d-flex gap-2 align-items-center mb-2">
                                    <div className="live"></div>
                                    <p className="text-uppercase small-title m-0 p-0 w-100">live chat</p>
                                    <div className="d-flex justify-content-end">
                                        <button className="bg-transparent border-0" onClick={clearChat}>
                                            <i className="bi bi-trash c-text-lightWhite fs-6"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="container-chat rounded-3 py-3 px-2 mb-2">
                                    <RealTimeMessages gameDetails={gameDetails} />
                                </div>
                                <div>
                                    <Chat gameDetails={gameDetails} session={session} />
                                </div>
                            </div>
                        </div>

                        <hr className="my-5" />

                        {/* RECENSIONI */}
                        <div className="row">
                            <div className="col-12 col-lg-4 my-4 my-md-0">
                                <ReviewForm gameDetails={gameDetails} loading={loading} error={error} session={session} />
                            </div>
                            {/* RECENSIONI CARD */}
                            <div className="col-12 col-lg-8 my-4 pt-2 align-self-center ps-0 ps-lg-5">
                                <ReviewsCard game_id={gameDetails.id} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
