export default function FilterDropdown({sortOption, setSortOption}) {
    const getSortLabel = () => {
        switch (sortOption) {
            case "date":
                return "Recenti";
            case "relevance":
                return "Rilevanza";
            case "name":
                return "Nome";
            case "popularity":
                return "Popolarità";
            case "score":
                return "Punteggio";
            default:
                return "Recenti";
        }
    };
    return (
        <>
            <div className="dropdown">
                <button className="btn c-btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {getSortLabel()}
                </button>
                <ul className="dropdown-menu">
                    <li className="small-body my-1 ps-2 c-dropdown-item c-dropdown-item">
                        <a className="c-dropdown" onClick={() => setSortOption("date")}>
                            Recenti
                        </a>
                    </li>
                    <li className="small-body my-1 ps-2 c-dropdown-item">
                        <a className="c-dropdown" onClick={() => setSortOption("relevance")}>
                            Rilevanza
                        </a>
                    </li>
                    <li className="small-body my-1 ps-2 c-dropdown-item">
                        <a className="c-dropdown" onClick={() => setSortOption("name")}>
                            Nome
                        </a>
                    </li>
                    <li className="small-body my-1 ps-2 c-dropdown-item">
                        <a className="c-dropdown" onClick={() => setSortOption("popularity")}>
                            Popolarità
                        </a>
                    </li>
                    <li className="small-body my-1 ps-2 c-dropdown-item">
                        <a className="c-dropdown" onClick={() => setSortOption("score")}>
                            Punteggio
                        </a>
                    </li>
                </ul>
            </div>
        </>
    )
}