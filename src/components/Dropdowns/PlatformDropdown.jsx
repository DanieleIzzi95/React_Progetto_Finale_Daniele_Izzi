import useFetchData from "../../hooks/useFetchData";
import { Link } from "react-router";

export default function PlatformDropdown() {
    const url = `https://api.rawg.io/api/platforms?key=a3b6f11fb60b4c2e8b470e5dad6be312`;
    const { data } = useFetchData(url);

    return (
        <div className="dropdown">
            <button className="btn c-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Piattaforme
            </button>
            <ul className="dropdown-menu">
                {data.map((platform) => (
                    <li key={platform.id} className="small-body my-1 ps-2">
                        <Link to={`/platform/${platform.id}`} className="c-dropdown">
                            {platform.name}
                        </Link>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}