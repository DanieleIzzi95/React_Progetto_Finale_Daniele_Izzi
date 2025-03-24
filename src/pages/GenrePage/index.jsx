import { MoonLoader } from "react-spinners"
import useFetchData from "../../hooks/useFetchData";
import { useState } from "react";
import Pagination from "../../components/Pagination/Pagination";
import { Link, useParams } from "react-router";
import Gamecard from "../../components/Gamecard";
import FilterSection from "../../components/FilterSection";
import useSortGames from "../../hooks/useSortGames";

export default function GenrePage() {
    const [page, setPage] = useState(1)
    const { genre } = useParams();
    const initialUrl = `https://api.rawg.io/api/games?key=a3b6f11fb60b4c2e8b470e5dad6be312&genres=${genre}&page=${page}&page_size=24`
    const { data, loading, error } = useFetchData(initialUrl);
    const [sortOption, setSortOption] = useState("date")
    const sortedGames = useSortGames(data, sortOption)


    return (
        <>
            <div className="container-fluid d-flex mb-5 pb-5">
                <div className="row justify-content-center ps-md-0 px-md-5">
                    <div className="col-12 d-flex flex-column ps-md-4 mt-5 mb-2 ms-4">
                        <div className="d-flex align-items-center">
                            <h1 className="bigger-title text-capitalize me-3 pb-3">{genre}</h1>
                            {loading && <MoonLoader size={28} color="#F5F000" />}
                        </div>
                    </div>

                    <FilterSection sortOption={sortOption} setSortOption={setSortOption} />
                    <div className="row mb-5 pb-5">
                        {error && <p className="caption c-text-acc">{error}</p>}
                        <div className="game-wrapper d-flex justify-content-center">
                            {sortedGames.map((game) => (
                                <Gamecard key={game.id} game={game} />
                            ))}
                        </div>
                    </div>

                    <div className="row mt-5 px-4 me-2 mb-1 justify-content-end">
                        <div className="col-12 d-flex justify-content-center">
                            <Pagination page={page} setPage={setPage} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}