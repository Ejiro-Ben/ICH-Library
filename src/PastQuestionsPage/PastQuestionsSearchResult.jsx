import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import NavBar from "../HomePage/NavBar"
import { faArrowLeft, faCheckCircle, faHome, faSearch } from "@fortawesome/free-solid-svg-icons"
import Footer from "../HomePage/Footer"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { PastQuestionsCard } from "../Components.jsx/PastQuestionsCard"
import { apiGet } from "../config/apiClient"
import PastQuestionsSearchBar from "./PastQuestionsSearchBar"

const Suggestion = ({ icon, text }) => (
    <p>
        <FontAwesomeIcon icon={icon} className="text-chem-green" /> {text}
    </p>
);

function PastQuestionsSearchResult() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const query = searchParams.get('q') || ''
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)

    const suggestions = [
        "Check your spelling and try again",
        "Use filters to narrow down by level or material type",
        "Browse the past questions to explore all available resources",
    ];

    useEffect(() => {
        if (query) {
            searchPastQuestions(query)
        }
    }, [query])

    const searchPastQuestions = async (searchQuery) => {
        setLoading(true)
        try {
            const results = await apiGet(`/books/search-pastquestions?q=${encodeURIComponent(searchQuery)}`)
            setResults(results || [])
        } catch (error) {
            console.error('Search error:', error)
            setResults([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="bg-chem-dark">
            <NavBar />
            <div className="md:pt-16 lg:pt-0 px-3">
                <PastQuestionsSearchBar />
                <div className="flex justify-between p-2 text-sm md:text-base">
                    <div className="flex text-gray-400">
                        <FontAwesomeIcon icon={faSearch} className="px-2 pt-1" />
                        <p>Found <span className="text-white">{results.length}</span> results for <span className="text-chem-cyan">"{query}"</span></p>
                    </div>
                    <button 
                        onClick={() => navigate('/pastquestions')}
                        className="flex text-gray-400 hover:text-chem-cyan transition"
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="px-2 pt-1" />
                        <p>Back to Past Questions</p>
                    </button>
                </div>
                
                {loading ? (
                    <div className="text-center py-10">
                        <p className="text-gray-400">Searching...</p>
                    </div>
                ) : results.length > 0 ? (
                    <div className="questions-list grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
                        {results.map((question) => (
                            <PastQuestionsCard key={question.id} question={question} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-chem-cyan/10 my-3 rounded-lg p-4">
                        <FontAwesomeIcon icon={faSearch} className="bg-chem-cyan/10 text-chem-cyan/10 text-3xl py-3.5 px-2.5 md:text-4xl md:py-4.5 rounded-full my-2" />
                        <h1 className="text-white font-bold text-xl md:text-2xl">No Results Found</h1>
                        <p className="text-gray-400 text-sm md:text-base mt-2 mb-3">We couldn't find any past questions matching <span className="text-chem-cyan">"{query}"</span>. Try adjusting your search terms.</p>

                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={() => navigate('/pastquestions')}
                                className="flex justify-between w-40 text-white px-4 py-2 border border-chem-cyan/10 hover:border-chem-cyan rounded-lg text-sm font-bold transition"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="mt-1" />
                                <p>Back to Questions</p>
                            </button>
                            <button 
                                onClick={() => navigate('/')}
                                className="flex justify-between w-40 text-black px-4 py-2 bg-chem-cyan hover:text-white rounded-lg text-sm font-bold transition"
                            >
                                <FontAwesomeIcon icon={faHome} className="mt-1" />
                                <p>Go to Home</p>
                            </button>
                        </div>

                        <div className="text-gray-400 text-sm">
                            <p className="mt-10 mb-3">Suggestions:</p>
                            <div>
                                {suggestions.map((suggestion, index) => (
                                    <Suggestion key={index} icon={faCheckCircle} text={suggestion} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </section>
    )
}

export default PastQuestionsSearchResult
