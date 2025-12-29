import NavBar from "../HomePage/NavBar"
import Footer from "../HomePage/Footer"
import Resources from "./Resources"
import LibHero from "./LibHero"
import Filters from "./Filters"

function Library() {

    return (
        <>
            <NavBar />
            <LibHero />            

            <section className="bg-chem-dark p-3">
            
                <Filters />

                <div className="mt-2">
                    <div className="text-gray-400">
                        <h1>Showing <span className="text-white">5</span> Resources</h1>
                    </div>

                    <div className="space-y-2 lg:grid lg:grid-cols-2 lg:gap-2 lg:space-y-0">
                        <Resources />
                        <Resources />
                        <Resources />
                        <Resources />
                        <Resources />
                    </div>
                </div>
            </section>


            <Footer />
        </>
    )

}

export default Library