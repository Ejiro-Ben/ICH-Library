
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookOpen,
    faCheckCircle,
    faDownload,
    faUsers,
    faBoltLightning,
    faShield,
    faLock,
    faGlobe,
    faLocationArrow,
    faHome,
    faShareNodes,
    faUpload,
    faBook,
    faFileCircleQuestion,
    faExclamationCircle,
    faHistory,
    faScroll,
    faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import Hero from "./Hero";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Hero />

            <section className="bg-chem-dark px-10 pt-20 md:pt-44">
                <div className="text-center">
                    <h1 className="bg-gradient-to-r from-chem-cyan to-chem-green bg-clip-text text-transparent text-2xl font-bold">Why Choose ICH Digital Library</h1>
                    <p className="text-gray-400 text-sm md:text-base">A comprehensive platform designed specifically for Industrial Chemistry students and researchers</p>
                </div>

                <div className="grid grid-col-1 gap-2 justify-center mt-4 md:flex md:space-x-3">
                    <div className="bg-chem-slate text-white flex p-3 w-72 h-auto rounded-lg md:mt-2">
                        <FontAwesomeIcon icon={faBoltLightning} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mr-3" />
                        <div>
                            <h1 className="text-xl mb-2">Lightning Fast Search</h1>
                            <p className="text-sm text-gray-400">Find exactly what you need with our advanced search and filtering system. Search by course code, topic or author instantly.</p>
                        </div>
                    </div>

                    <div className="bg-chem-slate text-white flex p-3 w-72 h-auto rounded-lg md:mt-2">
                        <FontAwesomeIcon icon={faShield} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mr-3" />
                        <div>
                            <h1 className="text-xl mb-2">Verified Content</h1>
                            <p className="text-sm text-gray-400">All materials are reviewed and verified by department faculty to ensure academic quality and relevance.</p>
                        </div>
                    </div>

                    <div className="bg-chem-slate text-white flex p-3 w-72 h-auto rounded-lg md:mt-2">
                        <FontAwesomeIcon icon={faLock} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mr-3" />
                        <div>
                            <h1 className="text-xl mb-2">Secure Access</h1>
                            <p className="text-sm text-gray-400">Your academic materials are protected with secure access controls and proper attribution.</p>
                        </div>
                    </div>

                    <div className="bg-chem-slate text-white flex p-3 w-72 h-auto rounded-lg md:mt-2">
                        <FontAwesomeIcon icon={faGlobe} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mr-3" />
                        <div>
                            <h1 className="text-xl mb-2">Always Available</h1>
                            <p className="text-sm text-gray-400">Access resources 24/7 from anywhere. Optimized for desktop, tablet, and mobile devices.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-chem-dark px-16 pt-10 md:pt-16">
                <div className="text-center">
                    <h1 className="bg-gradient-to-r from-chem-cyan to-chem-green bg-clip-text text-transparent text-2xl font-bold">Quick Access</h1>
                    <p className="text-gray-400 text-sm md:text-base">Navigate to your favourite sections and start exploring</p>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4">
                    <div className="grid grid-cols-1 gap-2">
                        <h1 className="text-white">
                            <FontAwesomeIcon icon={faLocationArrow} className="text-chem-cyan" />
                            Explore
                        </h1>

                        <Link to="/" className="py-1 border border-chem-cyan/10 hover:border-chem-cyan text-center rounded-lg">
                            <FontAwesomeIcon icon={faHome} className="text-chem-cyan" />
                            <p className="text-white">Home</p>
                        </Link>

                        <Link to="/library" className="py-1 border border-chem-cyan/10 hover:border-chem-cyan text-center rounded-lg">
                            <FontAwesomeIcon icon={faBook} className="text-chem-cyan" />
                            <p className="text-white">Library</p>
                        </Link>

                        <Link to="/past-questions" className="py-1 border border-chem-cyan/10 hover:border-chem-cyan text-center rounded-lg">
                            <FontAwesomeIcon icon={faFileCircleQuestion} className="text-chem-cyan" />
                            <p className="text-white">Past Questions</p>
                        </Link>
                    </div>
                </div>

                <div className="bg-chem-slate w-full mt-10 text-center rounded-lg p-3">
                    <h1 className="text-white text-lg md:text-2xl font-bold mb-2">Ready to Explore?</h1>
                    <p className="text-gray-400 mb-3">Start your journey through our comprehensive digital library. Browse thousands of academic resources or contribute your own materials </p>

                    <div className="md:flex md:justify-around">
                        <Link to="/library">
                            <button className="text-sm md:text-base bg-chem-cyan rounded-lg p-2 w-48 mb-3 md:mb-0 mr-3 hover:text-white">
                                <FontAwesomeIcon icon={faBook} />
                                Browse Library
                            </button>

                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default Home