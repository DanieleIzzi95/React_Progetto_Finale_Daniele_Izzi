import { useState } from "react";
import { Link } from "react-router";

export default function Gamecard({ game }) {
    const [hidden, setHidden] = useState(true)
    const genres = game.genres.map((genre) => genre.name).join(', ')
    return (
        <Link to={`/game/${game.id}`} className="card border-0 mb-4 bg-transparent">
            <article
                onMouseEnter={() => setHidden(false)}
                onMouseLeave={() => setHidden(true)}
            >
                <img
                    className="img-card-top rounded-top-3"
                    src={game.background_image}
                    alt={game.name}
                />
                <div className="card-body rounded-bottom-3 shadow c-bg-lightDark">
                    <h2 className="small-title c-text-white mb-2">{game.name}</h2>
                    <div className="container-rating-card d-flex flex-column align-items-center">
                        <div className="d-flex w-100 mb-2">
                            <p className="ratings c-text-lightWhite c-bg-lighterDark rounded-1 py-1 px-2 m-0 me-2">
                                <i className="bi bi-star-fill c-text-acc me-1"></i>{game.rating}/{game.rating_top}
                            </p>

                            <p className="ratings c-text-lightWhite c-bg-lighterDark rounded-1 py-1 px-2 m-0 me-2">
                                <i className="bi bi-heart-fill c-text-acc me-1"></i>{game.added}
                            </p>
                        </div>
                        <div className="w-100 text-decoration-none small-body">
                            {hidden ? <small></small> :
                                <div className="w-100 p-3 mt-3 d-flex flex-column align-items-between extra-content rounded-bottom-3">
                                    <div className="d-flex justify-content-between">
                                        <p className="caption c-text-lLighterGrey">Genre</p>
                                        <p className="caption c-text-lLighterGrey">{genres}</p>
                                    </div>
                                    <div className="d-flex justify-content-between pt-1">
                                        <p className="caption c-text-lLighterGrey">Release date</p>
                                        <p className="caption c-text-lLighterGrey">{game.released}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="caption c-text-lLighterGrey">Metacritics</p>
                                        {game.metacritic
                                            ? <p className="metacritics c-text-acc ">{game.metacritic}</p>
                                            : <p className="metacritics c-text-acc ">none</p>}
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
