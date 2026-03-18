import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFileText } from "@fortawesome/free-solid-svg-icons"
import PastQuestionsSearchBar from "./PastQuestionsSearchBar"

function PastQuestionsHero() {
    return (
        <section className="bg-chem-dark p-4 md:pt-24 lg:pt-4">
            <div className="mb-2">
                <h1 className="text-white font-bold text-2xl">Past Questions</h1>
                <p className="text-gray-400 text-sm md:text-base">Access previous exam papers and past questions for exam preparation</p>
            </div>

            <PastQuestionsSearchBar />
        </section>
    )
}

export default PastQuestionsHero
