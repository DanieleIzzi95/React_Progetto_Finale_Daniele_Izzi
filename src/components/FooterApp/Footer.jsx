import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="c-bg-lightDark ps-0 ps-md-3 ps-lg-5 mt-5">
            <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center gap-0 gap-md-5 py-4 ps-3 ps-md-3 ps-lg-5">
                <div className="ms-0 ms-md-5 ps-0 ps-md-3 ps-lg-5 mb-2 mb-md-0">
                    <Link to="/" className="small-title c-text-lightGrey text-decoration-none text-uppercase">ReHack</Link>
                </div>
                <div className="d-flex align-items-center">
                    <p className="small-body c-text-lightGrey me-1 p-0 m-0">©</p>
                    <p className="breadcrumbs c-text-lightWhite p-0 m-0">Daniele izzi x aulab 2025 </p>
                </div>
                <div className="d-flex align-items-center">
                    <i className="bi bi-linkedin c-text-lightGrey me-2"></i>
                    <a className="breadcrumbs p-0 m-0" href="https://www.linkedin.com/in/danieleizzi-junior-dev/">Linkedin</a>
                </div>
                <div className="d-flex align-items-center">
                    <i className="bi bi-github c-text-lightGrey me-2"></i>
                    <a className="breadcrumbs p-0 m-0" href="https://github.com/DanieleIzzi95">GitHub Repo</a>
                </div>
            </div>
        </footer>
    );
}
