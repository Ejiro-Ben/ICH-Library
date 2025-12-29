
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

function SearchBar() {

    return (
        <div className="flex w-full justify-center px-4 mt-8 mb-6">
            <div className="relative w-full sm:max-w-sm md:max-w-md lg:max-w-lg mb-4">
                <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 pointer-events-none sm:h-4 sm:w-4 md:h-5 md:w-5 text-slate-400" />
                <input placeholder="Search by course code, topic or author..." className="w-full rounded-lg border border-gray-600 bg-chem-dark text-white py-2.5 pl-10 pr-4 text-sm md:pl-12 md:text-base focus:border-chem-cyan focus:outline-none focus:ring-chem-cyan overflow-hidden"></input>
            </div>

            <button className="bg-chem-cyan hover:text-white mx-2 text-sm md:text-base rounded-lg p-2 md:px-3 flex mb-4">
                <FontAwesomeIcon icon={faSearch} className="mr-2 mt-1 md:mt-1.5 text-sm" />Search
            </button>
        </div>
    )

}

export default SearchBar