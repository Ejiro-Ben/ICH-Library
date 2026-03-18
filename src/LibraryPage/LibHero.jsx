import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper, faUsers, faBookOpen, faClock } from "@fortawesome/free-solid-svg-icons"
import SearchBar from "../HomePage/SearchBar"

function LibHero() {
    return (
        <section className="bg-chem-dark p-4 md:pt-24 lg:pt-4">
            <div className="mb-2">
                <h1 className="text-white font-bold text-2xl">Digital Library</h1>
            </div>

            <SearchBar />
        </section>
    )
}

export default LibHero