import { useState } from "react";
import { MoonLoader } from "react-spinners";
import useSortGames from "../../hooks/useSortGames"
import Gamecard from "../../components/Gamecard";
import FilterSection from "../../components/FilterSection";
import Pagination from "../../components/Pagination/Pagination";
import useFetchData from "../../hooks/useFetchData";

export default function Home() {
    const [page, setPage] = useState(1)
    const url = `https://api.rawg.io/api/games?key=a3b6f11fb60b4c2e8b470e5dad6be312&page=${page}&page_size=24`
    const { data, loading, error } = useFetchData(url);
    const [sortOption, setSortOption] = useState("date")
    const sortedGames = useSortGames(data, sortOption)

    return (
        <>
            <div className="container-fluid d-flex mb-5 pb-5">
                <div className="row justify-content-center">

                    {/* HEADER */}
                    <div className="col-12 d-flex align-items-center ps-md-4 mt-5 mb-md-3 ms-4">
                        <h1 className="bigger-title me-3">Migliori scelte</h1>
                        {loading && <MoonLoader size={28} color="#F5F000" />}
                    </div>

                    {/* FILTER  SECTION */}
                    <FilterSection sortOption={sortOption} setSortOption={setSortOption} />

                    {/* MAIN */}
                    <div className="row  mb-5 pb-5">
                        {error && <p className="caption c-text-acc">{error}</p>}
                        <div className="game-wrapper d-flex justify-content-between">
                            {sortedGames.map((game) => (
                                <Gamecard key={game.id} game={game} />
                            ))}
                        </div>
                    </div>

                    {/* PAGINATION */}
                    <div className="row mt-5 px-4 me-2 mb-1 justify-content-end">
                        <div className="col-12 d-flex justify-content-center">
                            <Pagination page={page} setPage={setPage} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}