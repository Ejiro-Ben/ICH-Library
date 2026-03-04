import NavBar from "../HomePage/NavBar"
import Footer from "../HomePage/Footer"
import Resources from "./Resources"
import LibHero from "./LibHero"
import Filters from "./Filters.jsx"
import { useState, useEffect } from "react"
import { supabase } from "../../config/supabaseClient.js"

function Library() {
    const [resourceCount, setResourceCount] = useState(0)

    useEffect(() => {
        const fetchResourceCount = async () => {
            const { count, error } = await supabase
                .from('books')
                .select('*', { count: 'exact', head: true })

            if (error) {
                console.error('Error fetching count:', error)
            } else {
                setResourceCount(count || 0)
            }
        }

        fetchResourceCount()
    }, [])

    return (
        <>
            <NavBar />
            <LibHero />

            <section className="bg-chem-dark p-3">
                <Filters />

                <div className="mt-2">
                    <div className="text-gray-400">
                        <h1>Showing <span className="text-white">{resourceCount}</span> Resources</h1>
                    </div>

                    <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-2 lg:space-y-0">
                        <Resources />
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Library