import FilterDropdown from "./Dropdowns/FilterDropdown"
import GenreDropdown from "./Dropdowns/GenreDropdown"
import PlatformDropdown from "./Dropdowns/PlatformDropdown"

export default function FilterSection({sortOption, setSortOption}) {
    return (
        <>
            {/* SEZIONE FILTRI */}
            <div className="col-12 d-flex pb-2 mb-3 px-3 align-items-center justify-content-end">
                <div className=" flex-wrap ps-2 ps-md-4 d-flex gap-3 me-3 w-100 c-index">
                    {/* DROPDOWN GENERI */}
                    <GenreDropdown />
                    {/* DROPDOWN PLATFORMS */}
                    <PlatformDropdown />
                    {/* DROPDOWN FILTRI */}
                    <FilterDropdown sortOption={sortOption} setSortOption={setSortOption}/>
                </div>
            </div>
        </>
    )
}