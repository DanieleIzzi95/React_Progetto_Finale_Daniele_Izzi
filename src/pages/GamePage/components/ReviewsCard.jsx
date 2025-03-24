import { useState, useEffect, useContext } from "react";
import supabase from "../../../Supabase/Client";
import { formatDate } from "../../../utils/formatDate";
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import SessionContext from "../../../Context/SessionContext";
import useUserProfile from "../../../hooks/useAvatar"

dayjs.extend(advancedFormat);

export default function ReviewsCard({ game_id }) {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useContext(SessionContext);
    const { avatarUrl, loading } = useUserProfile(user);

    const readRev = async () => {
        try {
            const { data: reviews, error } = await supabase
                .from("reviews")
                .select("*, profiles(username, avatar_url)")
                .eq("game_id", game_id);
            if (error) throw error;
            setReviews(reviews);
        } catch (error) {
            console.error("Errore nel caricamento delle recensioni:", error);
            setError("Errore nel caricare le recensioni");
        }
    };

    useEffect(() => {
        if (game_id) readRev();
    }, [game_id]);

    console.log(avatarUrl);


    return (
        <>
            <div className="row gap-3 justify-content-center align-items-center">
                <div className="text-center">
                    {error && <p className="caption c-text-acc">{error}</p>}
                    {reviews.length === 0 && !error &&
                        <p className="message-chat"><strong>Non ci sono recensioni per questo gioco.</strong> <br />Lascia la tua recensione per primo e guida altri giocatori nella scelta di questo gioco!</p>}
                </div>
                {reviews &&
                    reviews.map((review) => (
                        <div className='w-100' key={review.id}>
                            <div className="d-flex flex-column flex-lg-row p-2 c-bg-lightDark rounded-2">
                                <div className="col-12 col-md-4 d-flex gap-3">
                                    <img
                                        className="object-fit-cover ms-2"
                                        src={review.profiles.avatar_url || '/img-default.jpg'}
                                        style={{ height: 80, width: 80 }}
                                        alt="Avatar"
                                    />
                                    <div>
                                        <p className="mb-0">{review.profile_username}</p>
                                        <p className="message-chat-date">
                                            {user?.created_at
                                                ? dayjs(user.created_at).format('DD MMMM YYYY')
                                                : "Data non disponibile"}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-12 col-lg-8 p-1 pt-4 pt-md-0">
                                    <p className="breadcrumbs c-text-white mb-1" title={review.game_name}>{review.game_name}</p>
                                    <p className="fav-title c-text-white my-2" title={review.review_title}>{review.review_title}</p>
                                    <p className="small-body c-text-white mb-1" title={review.review_content}>{review.review_content}</p>
                                    <p className="message-chat-date mb-0">Aggiunto il: {formatDate(review.created_at)}</p>
                                </div>
                            </div>
                        </div>
                    ))}

            </div>
        </>
    );
}
