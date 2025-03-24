export default function Pagination({ page, setPage }) {
    const goToPage = (newPage) => {
        if (newPage > 0) {
            setPage(newPage);
        }
    };

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination m-0">
                    <li
                        onClick={() => goToPage(page = 1)}
                        className="page-item">
                        <a
                            className="page-link c-bg-lighterDark c-text-lightWhite border-0 pagination" href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li
                        onClick={() => goToPage(page - 1)}
                        className="page-item">
                        <a
                            className="page-link c-bg-lighterDark c-text-lightWhite border-0 pagination" href="#" aria-label="Previous">
                            <span aria-hidden="true">&lsaquo;</span>
                        </a>
                    </li>
                    <li
                        className="page-item "><a className="page-link c-bg-lighterDark c-text-lightWhite border-0 pagination active" href="#">{page}</a>
                    </li>
                    <li onClick={() => goToPage(page + 1)}
                        className="page-item"><a className="page-link c-bg-lighterDark c-text-lightWhite border-0 pagination" href="#">{page + 1}</a>
                    </li>

                    <li onClick={() => goToPage(page + 1)}
                        className="page-item">
                        <a
                            className="page-link c-bg-lighterDark c-text-lightWhite border-0 pagination" href="#" aria-label="Next">
                            <span aria-hidden="true">&rsaquo;</span>
                        </a>
                    </li>
                    <li onClick={() => goToPage(page = 416)}
                        className="page-item">
                        <a
                            className="page-link c-bg-lighterDark c-text-lightWhite border-0 pagination" href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </>
    )
}