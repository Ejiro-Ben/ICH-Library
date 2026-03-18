import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper, faBookOpen, faEye, faDownload } from "@fortawesome/free-solid-svg-icons"
import { supabase } from "../../config/supabaseClient.js"
import { useEffect, useState } from "react"
import { PastQuestionsCard } from "../Components.jsx/PastQuestionsCard"

function PastQuestionsResources() {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        const fetchQuestions = async () => {
            const { data, error } = await supabase
                .from('pastquestions')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching past questions:', error)
            } else {
                setQuestions(data)
            }
        }

        fetchQuestions()
    }, [])

    return (
        <div className="questions-list grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {questions.map((question) => (
                <PastQuestionsCard 
                    key={question.id}
                    question={question} 
                />
            ))}
        </div>
    )
}

export default PastQuestionsResources
