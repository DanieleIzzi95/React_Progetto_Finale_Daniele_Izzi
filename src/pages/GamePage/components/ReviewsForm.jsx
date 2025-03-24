import { Link, useParams } from "react-router";
import { useRef } from "react";
import supabase from "../../../Supabase/Client";
import { Toast } from "primereact/toast";
import { MoonLoader } from "react-spinners";

export default function ReviewForm({ gameDetails, loading, error, session }) {
    const { id } = useParams();
    const toast = useRef(null);

    const handleReviewSubmit = async (event) => {
        event.preventDefault();
        const review = event.currentTarget;
        const { title, content } = Object.fromEntries(new FormData(review));
        const { error } = await supabase
            .from("reviews")
            .insert([
                {
                    review_title: title,
                    review_content: content,
                    game_id: id,
                    game_name: gameDetails.name,
                    profile_username: session.user.user_metadata.username,
                    review_image: gameDetails.background_image
                },
            ])
            .select();
        if (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: `Errore, recensione non inviata, riprovare.`,
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
                detail: `Recensione inviata.`,
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
    }

    return (
        <>
            {loading && <MoonLoader size={28} color="#F5F000" />}
            {error &&
                <p
                    className="caption c-text-acc">{error}
                </p>}
            <h2
                className=" m-0 p-0 text-uppercase small-title">
                Recensioni
            </h2>
            <form
                className="p-0 mt-3"
                onSubmit={handleReviewSubmit}>
                <p
                    className="username-chat my-2">
                    Condividi la tua esperienza!
                    <br />
                    Lascia una recensione e aiuta altri gamer a scoprire se questo gioco fa per loro!
                </p>
                <p className="username-chat mb-3">
                    <strong className="c-text-lightWhite">Scrivi la tua recensione ora!</strong>
                </p>
                <fieldset
                    className="col-12">
                    <div className="col-12">
                        <div className="input-group">
                            <input
                                name="title"
                                placeholder="Inserisci il titolo"
                                type="text"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-group">
                            <textarea
                                className="w-100 border-0 c-bg-lighterDark rounded-3 py-2 px-3"
                                type="text"
                                name="content"
                                placeholder="Scrivi un messaggio..."
                                rows={5}
                                required
                            />
                        </div>

                        {session ? (
                            <button
                                className="mt-2 d-flex c-bg-lighterDark small-body py-2 px-3 rounded-3 border-0"
                                type="submit"
                                value="Invia"
                            >
                                <i className="bi bi-send fs-6 c-text-acc me-2"></i> Invia
                            </button>
                        ) : (
                            <Link to="/login" >
                                <button
                                    className="mt-2 d-flex c-bg-lighterDark small-body py-2 px-3 rounded-3 border-0"
                                    type="button"
                                >

                                    <i className="bi bi-lock fs-6 c-text-acc me-2"></i>  Accedi
                                </button>
                            </Link>
                        )}
                    </div>
                </fieldset>
            </form >
            <Toast ref={toast} />
        </>
    )
};
