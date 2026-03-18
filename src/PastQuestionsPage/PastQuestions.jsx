import NavBar from "../HomePage/NavBar"
import Footer from "../HomePage/Footer"
import PastQuestionsResources from "./PastQuestionsResources"
import PastQuestionsHero from "./PastQuestionsHero"
import { useState, useEffect } from "react"
import { supabase } from "../../config/supabaseClient.js"

function PastQuestions() {
    const [questionCount, setQuestionCount] = useState(0)

    useEffect(() => {
        const fetchQuestionCount = async () => {
            const { count, error } = await supabase
                .from('pastquestions')
                .select('*', { count: 'exact', head: true })

            if (error) {
                console.error('Error fetching count:', error)
            } else {
                setQuestionCount(count || 0)
            }
        }

        fetchQuestionCount()
    }, [])

    return (
        <>
            <NavBar />
            <PastQuestionsHero />

            <section className="bg-chem-dark p-3">

                <div className="mt-2">
                    <div className="text-gray-400">
                        <h1>Showing <span className="text-white">{questionCount}</span> Past Questions</h1>
                    </div>

                    <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-2 lg:space-y-0">
                        <PastQuestionsResources />
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default PastQuestions
