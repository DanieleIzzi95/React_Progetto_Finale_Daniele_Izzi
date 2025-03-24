import { useState } from "react";
import { useLocation } from "react-router";
import { MoonLoader } from "react-spinners";
import Gamecard from "../../components/Gamecard";
import Pagination from "../../components/Pagination/Pagination";
import useFetchData from "../../hooks/useFetchData";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
    const query = useQuery();
    const searchQuery = query.get("q") || "";
    const [page, setPage] = useState(1);
    const url = `https://api.rawg.io/api/games?key=a3b6f11fb60b4c2e8b470e5dad6be312&search=${searchQuery}&page_size=24&page=${page}`;
    const { data, loading, error, } = useFetchData(url)

    return (
        <div className="container-fluid mt-4 pt-0">
            <div className="row px-4">
                <div className="col-12 d-flex align-items-center gap-3">
                    <h1 className="text-center small-title fst-italic py-3 me-3">Risultati per: "{searchQuery}"</h1>
                    {loading && <MoonLoader size={28} color="#F5F000" />}
                </div>
            </div>
            <div className="row p-4">
                {error && <p className="caption c-text-acc">{error}</p>}
                <div className="game-wrapper">
                    {data.length > 0 ? (
                        data.map((game) => <Gamecard key={game.id} game={game} />)
                    ) : (
                        <p>Nessun gioco trovato</p>
                    )}
                </div>
            </div>

            {/* pagination */}
            <div className="row mt-5 px-4 me-2 mb-1 justify-content-end">
                <div className="col-12 d-flex justify-content-center">
                    <Pagination page={page} setPage={setPage} />
                </div>
            </div>
        </div>
    );
}