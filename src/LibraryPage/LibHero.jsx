
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faNewspaper, faUsers, faBookOpen, faClock } from "@fortawesome/free-solid-svg-icons"
import SearchBar from "../HomePage/SearchBar"

function LibHero() {

    return (
        <section className="bg-chem-dark p-4 md:pt-24 lg:pt-4">
            <div className="mb-2">
                <h1 className="text-white font-bold text-2xl">Digital Library</h1>
                <p className="text-gray-400 text-sm md:text-base">Explore 1,240+ academic resources curated for industrial Chemistry students</p>
            </div>

            <SearchBar />

            <div className="grid grid-cols-2 md:flex md:space-x-2">
                <div className='p-2 w-fit mb-2 flex align-middle'>
                    <FontAwesomeIcon icon={faNewspaper} className="bg-chem-cyan/10 px-1.5 py-2 rounded-lg my-2 mr-2 text-chem-cyan" />
                    <div>
                        <h1 className="font-bold text-white mb-0">1,240+</h1>
                        <p className="text-sm text-gray-400">Documents Available</p>
                    </div>
                </div>

                <div className='p-2 w-fit mb-2 flex align-middle'>
                    <FontAwesomeIcon icon={faUsers} className="bg-chem-green/10 px-1.5 py-2 rounded-lg my-2 mr-2 text-chem-green" />
                    <div>
                        <h1 className="font-bold text-white mb-0">500+</h1>
                        <p className="text-sm text-gray-400">Active Users</p>
                    </div>
                </div>

                <div className='p-2 w-fit mb-2 flex align-middle'>
                    <FontAwesomeIcon icon={faBookOpen} className="bg-chem-cyan/10 px-1.5 py-2 rounded-lg my-2 mr-2 text-chem-cyan" />
                    <div>
                        <h1 className="font-bold text-white mb-0">45+</h1>
                        <p className="text-sm text-gray-400">Course Covered</p>
                    </div>
                </div>

                <div className='p-2 w-fit mb-2 flex align-middle'>
                    <FontAwesomeIcon icon={faClock} className="bg-chem-cyan/10 px-1.5 py-2 rounded-lg my-2 mr-2 text-chem-cyan" />
                    <div>
                        <h1 className="font-bold text-white mb-0">Today</h1>
                        <p className="text-sm text-gray-400">Last Updated</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LibHero