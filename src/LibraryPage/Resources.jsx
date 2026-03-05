import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper, faBookOpen, faEye, faDownload } from "@fortawesome/free-solid-svg-icons"
import { supabase } from "../../config/supabaseClient.js"
import { useEffect, useState } from "react"
import { BooksCard } from "../Components.jsx/BooksCard"

function Resources() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            const { data, error } = await supabase
                .from('books')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Error fetching books:', error)
            } else {
                setBooks(data)
            }
        }

        fetchBooks()
    }, [])

    return (
        <div className="books-list grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
            {books.map((book) => (
                <BooksCard 
                    key={book.id}
                    book={book} 
                />
            ))}
        </div>
    )
}

export default Resources