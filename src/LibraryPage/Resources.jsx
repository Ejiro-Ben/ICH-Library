import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper, faBookOpen, faEye, faDownload } from "@fortawesome/free-solid-svg-icons"

function Resources() {

    return (
        <div className="bg-chem-cyan/10 border border-chem-cyan/10 p-3 rounded-lg flex w-fit">
            <FontAwesomeIcon icon={faNewspaper} className="text-chem-cyan bg-chem-cyan/10 p-2 rounded-lg mr-2 h-5" />
            <div>
                <div className="flex justify-between">
                    <h1 className="text-white font-bold">Analytical Chemistry</h1>
                    <p className="text-chem-cyan font-bold border border-chem-cyan rounded-lg px-2">PDF</p>
                </div>

                <div className="flex space-x-2 mt-2">
                    <p className="bg-chem-green px-2 rounded-lg">ICH 213</p>
                    <p className="bg-chem-green px-2 rounded-lg">Level 200</p>
                </div>

                <div className="flex space-x-2 mt-2 text-gray-400">
                    <FontAwesomeIcon icon={faBookOpen} className="my-1" />
                    <p>Lecture Note</p>
                </div>

                <p className="text-gray-400 my-2">Detailed notes covering all topics in Analitycal Chemistry</p>

                <div className="flex justify-between">
                    <button className="flex space-x-3 bg-chem-cyan py-2 px-3 w-fit h-10 rounded-lg hover:text-white">
                        <FontAwesomeIcon icon={faEye} className="my-1" />
                        <p>View</p>
                    </button>

                    <button className="flex space-x-3 border border-chem-cyan/10 hover:border-chem-cyan text-white py-2 px-3 w-fit h-10 rounded-lg">
                        <FontAwesomeIcon icon={faDownload} className="my-1" />
                        <p>Download</p>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Resources