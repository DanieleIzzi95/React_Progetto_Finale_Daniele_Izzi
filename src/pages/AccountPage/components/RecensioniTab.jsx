import { useContext, useState, useEffect } from "react";
import supabase from "../../../Supabase/Client"
import { formatDate } from "../../../utils/formatDate"
import SessionContext from "../../../Context/SessionContext";
import { Link } from "react-router";

export default function Reviews() {
    const { session } = useContext(SessionContext);
    const [reviews, setReviews] = useState([]);

    const readRev = async () => {
        let { data: reviews, error } = await supabase
            .from("reviews")
            .select("*")
            .eq("profile_id", session.user.id);
        if (error) {
            console.log(error);
        } else {
            setReviews(reviews);
        }
    };

    useEffect(() => {
        if (session) {
            readRev();
        }
    }, [session]);

    return (
        <div className="row justify-content-center column-gap-md-3 row-gap-md-1">
            <div className='row mt-5'>
                <div className="col-12 px-0 mb-3 text-center text-md-start">
                    <h2 className='small-title'>Le tue recensioni</h2>
                </div>
            </div>
            {reviews.length === 0 && <p>Non ci sono recensioni al momento.</p>}

            <div className="d-flex flex-wrap gap-2 p-0 d-flex justify-content-center justify-content-md-start">
                {reviews &&
                    reviews.map((review) => (
                        <Link className='container-card-fav' to={`/game/${review.game_id}`} key={review.id}>
                            <div className="d-flex c-bg-lightDark rounded-2" >
                                <div className="col-4">
                                    <img className="img-fav rounded-2" src={review.review_image} alt={review.review_name} />
                                </div>
                                <div className="col-8 p-1">
                                    <p className="breadcrumbs c-text-white mb-0 text-truncate" title={review.game_name}>{review.game_name}</p>
                                    <p className="fav-title c-text-white mb-1 text-truncate" title={review.review_title}>{review.review_title}</p>
                                    <p className="small-body c-text-white mb-0 text-truncate" title={review.review_content}>{review.review_content}</p>
                                    <p className="message-chat-date mb-0">Aggiunto il: {formatDate(review.created_at)}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}