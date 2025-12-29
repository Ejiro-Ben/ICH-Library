
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCheckCircle, faDownload, faUsers, faBoltLightning, faShield, faLock, faGlobe, faLocationArrow, faHome, faShareNodes, faUpload, faBook, faFileCircleQuestion, faExclamationCircle, faHistory, faScroll, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import Hero from "./Hero";
import Footer from "./Footer";



function Home() {
    return (
        <>
            <Hero />
            <section className="bg-chem-dark px-10 pt-32 md:pt-44">
                <div className="text-center ">
                    <h1 className="bg-gradient-to-r from-chem-cyan to-chem-green bg-clip-text text-transparent text-2xl font-bold">Library at a Glance</h1>
                    <p className="text-gray-400 text-sm md:text-base">Comprehensive statistics showing the scale and impact of our digital library</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5 lg:flex lg:justify-center">
                    <div className="bg-chem-slate text-white flex flex-col justify-start p-3 min-w-48 rounded-lg">
                        <FontAwesomeIcon icon={faBookOpen} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mb-2" />
                        <h1 className="text-xl">1240+</h1>
                        <p className="text-sm text-gray-400">Documents Available</p>
                    </div>

                    <div className="bg-chem-slate text-white flex flex-col justify-start p-3 min-w-48 rounded-lg">
                        <FontAwesomeIcon icon={faCheckCircle} className="p-1.5 rounded-lg text-chem-green bg-chem-green/15 mb-2" />
                        <h1 className="text-xl">450+</h1>
                        <p className="text-sm text-gray-400">Approved Submissions</p>
                    </div>

                    <div className="bg-chem-slate text-white flex flex-col justify-start p-3 min-w-48 rounded-lg">
                        <FontAwesomeIcon icon={faDownload} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mb-2" />
                        <h1 className="text-xl">87900+</h1>
                        <p className="text-sm text-gray-400">Annual Downloads</p>
                    </div>

                    <div className="bg-chem-slate text-white flex flex-col justify-start p-3 min-w-48 rounded-lg">
                        <FontAwesomeIcon icon={faUsers} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mb-2" />
                        <h1 className="text-xl">2350+</h1>
                        <p className="text-sm text-gray-400">Active Users</p>
                    </div>
                </div>
            </section>

            <section className="bg-chem-dark px-10 pt-16 md:pt-32">
                <div className="text-center">
                    <h1 className="bg-gradient-to-r from-chem-cyan to-chem-green bg-clip-text text-transparent text-2xl font-bold">Why Choose ICH Digital Library</h1>
                    <p className="text-gray-400 text-sm md:text-base">A comprehensive platform designed specifically for Industrial Chemistry students and researchers</p>
                </div>

                <div className="grid grid-col-1 gap-2 justify-center mt-4 md:flex md:space-x-3">
                    <div className="bg-chem-slate text-white flex p-3 w-96 h-32 rounded-lg md:mt-2 md:h-auto">
                        <FontAwesomeIcon icon={faBoltLightning} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mr-3" />
                        <div>
                            <h1 className="text-xl mb-2">Lightning Fast Search</h1>
                            <p className="text-sm text-gray-400">Find exactly what you need with our advanced search and filetering system. Search by course code, topic or author instantly.</p>
                        </div>
                    </div>

                    <div className="bg-chem-slate text-white flex p-3 w-96 h-32 rounded-lg md:mt-2 md:h-auto">
                        <FontAwesomeIcon icon={faShield} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mr-3" />
                        <div>
                            <h1 className="text-xl mb-2">Verified Content</h1>
                            <p className="text-sm text-gray-400">All materials are reviewed and verified by department faculty to endure academic quality and relevance.</p>
                        </div>
                    </div>

                    <div className="bg-chem-slate text-white flex p-3 w-96 h-32 rounded-lg md:mt-2 md:h-auto">
                        <FontAwesomeIcon icon={faShareNodes} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mr-3" />
                        <div>
                            <h1 className="text-xl mb-2">Easy Sharing</h1>
                            <p className="text-sm text-gray-400">Contribute your own materials and help fellow students. Simple upload process with comprehensive guidelines.</p>
                        </div>
                    </div>

                    <div className="bg-chem-slate text-white flex p-3 w-96 h-32 rounded-lg md:mt-2 md:h-auto">
                        <FontAwesomeIcon icon={faBarsStaggered} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mr-3" />
                        <div>
                            <h1 className="text-xl mb-2">Track Progress</h1>
                            <p className="text-sm text-gray-400">Monitor your submissions and see how your contributions impact the learning community.</p>
                        </div>
                    </div>

                    <div className="bg-chem-slate text-white flex p-3 w-96 h-32 rounded-lg md:mt-2 md:h-auto">
                        <FontAwesomeIcon icon={faLock} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mr-3" />
                        <div>
                            <h1 className="text-xl mb-2">Secure Access</h1>
                            <p className="text-sm text-gray-400">Your academic materials are protected with secure access controls and proper attribution.</p>
                        </div>
                    </div>

                    <div className="bg-chem-slate text-white flex p-3 w-96 h-32 rounded-lg md:mt-2 md:h-auto">
                        <FontAwesomeIcon icon={faGlobe} className="p-1.5 rounded-lg text-chem-cyan bg-chem-cyan/15 mr-3" />
                        <div>
                            <h1 className="text-xl mb-2">Always Available</h1>
                            <p className="text-sm text-gray-400">Access resources 24/7 from anywhere. Optimized for desktop, tablet, and mobile devices.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-chem-dark px-16 pt-16 md:pt-32">
                <div className="text-center">
                    <h1 className="bg-gradient-to-r from-chem-cyan to-chem-green bg-clip-text text-transparent text-2xl font-bold">Quick Access</h1>
                    <p className="text-gray-400 text-sm md:text-base">Navigate to your favourite sections and start exploring</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="grid grid-cols-1 gap-2">
                        <h1 className="text-white">
                            <FontAwesomeIcon icon={faLocationArrow} className="text-chem-cyan" />
                            Explore
                        </h1>

                        <a href="#" className="py-1 border border-chem-cyan/10 hover:border-chem-cyan text-center rounded-lg">
                            <FontAwesomeIcon icon={faHome} className="text-chem-cyan" />
                            <p className="text-white">Home</p>
                        </a>

                        <a href="#" className="py-1 border border-chem-cyan/10 hover:border-chem-cyan text-center rounded-lg">
                            <FontAwesomeIcon icon={faScroll} className="text-chem-cyan" />
                            <p className="text-white">Research Papers</p>
                        </a>

                        <a href="#" className="py-1 border border-chem-cyan/10 hover:border-chem-cyan text-center rounded-lg">
                            <FontAwesomeIcon icon={faBook} className="text-chem-cyan" />
                            <p className="text-white">Library</p>
                        </a>

                        <a href="#" className="py-1 border border-chem-cyan/10 hover:border-chem-cyan text-center rounded-lg">
                            <FontAwesomeIcon icon={faFileCircleQuestion} className="text-chem-cyan" />
                            <p className="text-white">Past Questions</p>
                        </a>

                        <a href="#" className="py-1 border border-chem-cyan/10 hover:border-chem-cyan text-center rounded-lg">
                            <FontAwesomeIcon icon={faExclamationCircle} className="text-chem-cyan" />
                            <p className="text-white">About Department</p>
                        </a>
                    </div>

                    <div>
                        <div className="grid grid-cols-1 gap-2">
                            <h1 className="text-white">
                                <FontAwesomeIcon icon={faShareNodes} className="text-chem-green" />
                                Contribute
                            </h1>

                            <a href="#" className="py-1 border border-chem-green/10 hover:border-chem-green text-center rounded-lg">
                                <FontAwesomeIcon icon={faUpload} className="text-chem-green" />
                                <p className="text-white">Upload</p>
                            </a>

                            <a href="#" className="py-1 border border-chem-green/10 hover:border-chem-green text-center rounded-lg">
                                <FontAwesomeIcon icon={faHistory} className="text-chem-green" />
                                <p className="text-white">Submission history</p>
                            </a>

                            <div className="bg-chem-slate rounded-lg p-2 text-gray-400 text-sm md:text-base ">
                                Help build our library by sharing your lecture notes, lab materials, research papers and more. All contributions are reviewed by faculty.
                            </div>

                        </div>
                    </div>
                </div>

                <div className="bg-chem-slate w-full mt-10 text-center rounded-lg p-3">
                    <h1 className="text-white text-lg md:text-2xl font-bold mb-2">Ready to Explore?</h1>
                    <p className="text-gray-400 mb-3">Start your journey through our comprehensive digital library. Browse thousands of academic resources or contribute your own materials </p>

                    <div className="md:flex md:justify-around">
                        <button className="text-sm md:text-base bg-chem-cyan rounded-lg p-2 w-48 mb-3 md:mb-0 mr-3 hover:text-white">
                            <FontAwesomeIcon icon={faBook} />
                            Browse Library
                        </button>

                        <button className="text-white text-sm md:text-base border border-chem-cyan/10 hover:border-chem-cyan rounded-lg p-2 w-48 mr-3">
                            <FontAwesomeIcon icon={faUpload} />
                            Contribute Materials
                        </button>
                    </div>
                </div>
            </section>
        <Footer />
        </>
    )
}

export default Home