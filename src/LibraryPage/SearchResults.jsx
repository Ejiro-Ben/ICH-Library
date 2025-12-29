import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NavBar from "../HomePage/NavBar"
import SearchBar from "../HomePage/SearchBar"
import { faArrowLeft, faCheckCircle, faHome, faSearch } from "@fortawesome/free-solid-svg-icons"
import Filters from "./Filters"
import Footer from "../HomePage/Footer"

function SearchResult() {

    return(
        <section className="bg-chem-dark">
            <NavBar />
            <div className="md:pt-16 lg:pt-0 px-3">
                <SearchBar />
                <div className="flex justify-between p-2 text-sm md:text-base">
                    <div className="flex text-gray-400">
                        <FontAwesomeIcon icon={faSearch} className="px-2 pt-1" />
                        <p>Found <span className="text-white">0</span> results for <span className="text-chem-cyan">"reactor"</span></p>
                    </div>

                    <button className="flex text-gray-400">
                        <FontAwesomeIcon icon={faArrowLeft} className="px-2 pt-1" />
                        <p>Back to Library</p>
                    </button>
                </div>

                <Filters />

                <div className="text-center bg-chem-cyan/10 my-3 rounded-lg p-4">
                    <FontAwesomeIcon icon={faSearch} className="bg-chem-cyan/10 text-chem-cyan/10 text-3xl py-3.5 px-2.5 md:text-4xl md:py-4.5 rounded-full my-2" />
                    <h1 className="text-white font-bold text-xl md:text-2xl">No Results Found</h1>
                    <p className="text-gray-400 text-sm md:text-base mt-2 mb-3">We couldn't find any resources matching <span>Reactor</span>. try adjusting your search terms or filters.</p>

                    <div className="flex justify-center space-x-4">
                        <button className="flex justify-between w-40 text-white px-4 py-2 border border-chem-cyan/10 hover:border-chem-cyan rounded-lg text-sm font-bold">
                            <FontAwesomeIcon icon={faArrowLeft} className="mt-1" />
                            <p>Back to Library</p>
                        </button>

                        <button className="flex justify-between w-40 text-black px-4 py-2 bg-chem-cyan hover:text-white rounded-lg text-sm font-bold">
                            <FontAwesomeIcon icon={faHome} className="mt-1" />
                            <p>Go to Home</p>
                        </button>
                    </div>

                    <div className="text-gray-400 text-sm">
                        <p className="mt-10 mb-3">Suggestions:</p>

                        <div>
                            <p><FontAwesomeIcon icon={faCheckCircle} className="text-chem-green" /> Check your spelling and try again</p>
                            <p><FontAwesomeIcon icon={faCheckCircle} className="text-chem-green" /> Use filters to narrow down by level or material type</p>
                            <p><FontAwesomeIcon icon={faCheckCircle} className="text-chem-green" /> Browse the library to explore all available resources</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )

}

export default SearchResult