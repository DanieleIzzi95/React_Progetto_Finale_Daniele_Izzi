import { useState } from "react";
import useFetchData from "../../../../../hooks/useFetchData.jsx";
import { Link } from "react-router";

export default function GenreSidebarFilter() {
    const initialUrl = `https://api.rawg.io/api/genres?key=a3b6f11fb60b4c2e8b470e5dad6be312`;
    const { data } = useFetchData(initialUrl);
    const [showAll, setShowAll] = useState(false);

    const visibleGenres = showAll ? data : data.slice(0, 6);

    return (
        <div className="row">
            <div className="d-flex align-items-center pt-2 mb-2">
                <i className="bi bi-joystick c-text-acc fs-5 c-bg-lightDark rounded-3 px-2 me-2"></i>
                <h2 className="sidebar-title m-0 p-0">Generi</h2>
            </div>

            <ul className="list-unstyled mb-1">
                {visibleGenres.length > 0 ? (
                    visibleGenres.map((genre) => (
                        <li key={genre.id} className="small-body my-1 ps-2">
                            <Link to={`/games/${genre.slug}`} className="text-decoration-none c-text-lightWhite">
                                {genre.name}
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>Nessun genere disponibile</p>
                )}
            </ul>

            {data.length > 6 && (
                <button className="sidebar-button bg-transparent m-0 p-0 border-0 ps-2 mb-3" onClick={() => setShowAll(!showAll)}>
                    {showAll
                        ? <div className="d-flex align-items-center p-0 m-0">
                            <i className=" bi bi-caret-up c-text-lighterGrey fs-6 rounded-3 px-2 py-1 sidebar-button small-body">Hide</i>
                        </div>
                        : <div className="d-flex align-items-center p-0 m-0">
                            <i className=" bi bi-caret-down c-text-lighterGrey fs-6 rounded-3 px-2 py-1 sidebar-button small-body">Show all</i>
                        </div>
                    }
                </button>
            )}
        </div>
    );
}
