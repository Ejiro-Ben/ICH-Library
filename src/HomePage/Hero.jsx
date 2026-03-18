import NavBar from "./NavBar";
import ichlogo from '../assets/ich-images/ich-logo.png';
import image1 from '../assets/ich-images/image1.jpg';
import image2 from '../assets/ich-images/image2.jpg';
import image3 from '../assets/ich-images/image3.jpg';
import { faSearch, faBook, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

const Images = ({ desktop, tablet, mobile }) => (
    <>
        {desktop && <div className="opacity-20 hidden lg:flex justify-evenly">{desktop}</div>}
        {tablet && <div className="opacity-20 hidden md:flex justify-evenly lg:hidden">{tablet}</div>}
        {mobile && <div className="opacity-20 flex justify-evenly md:hidden">{mobile}</div>}
    </>
);

function Hero() {
    return (
        <>
            <NavBar />
            <section className="min-h-screen relative bg-chem-dark pt-20">
                <div className="container mx-auto px-6 text-center absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_60%)]">
                    <div className="relative z-10 pt-20">
                        <div className="text-chem-cyan text-sm font-bold border border-chem-cyan bg-chem-dark rounded-full inline-block px-4 py-2 mb-6">
                            <img src={ichlogo} alt="ICH Logo" className="inline h-6 mr-2 mb-1" />
                            Welcome to ICH Digital Library
                        </div>
                        <h1 className="text-3xl font-bold mb-3 bg-gradient-to-r from-chem-cyan to-chem-green bg-clip-text text-transparent md:text-5xl">
                            Department of Industrial<br /><span>Chemistry</span>
                        </h1>
                        <h1 className="text-3xl font-bold mb-3 text-white md:text-5xl">Digital Library</h1>
                        <p className="text-lg text-gray-600">Research. Knowledge. Innovation</p>
                    </div>

                    <SearchBar />

                    <div className="mb-4 flex flex-col md:flex-row justify-center">
                        <Link to="/library" className="bg-chem-cyan hover:text-white mx-2 text-sm md:text-base rounded-lg py-2 px-6 md:px-8 mb-4">
                            <FontAwesomeIcon icon={faBook} className="mr-3 mt-1 md:mt-1.5 text-sm" />
                            Explore Library
                        </Link>
                    </div>

                    <Images
                        desktop={<><img src={image1} alt="Chemical Structures" /><img src={image2} alt="Chemical Structures" /><img src={image3} alt="Chemical Structures" /></>}
                        tablet={<><img src={image1} alt="Chemical Structures" /><img src={image2} alt="Chemical Structures" /></>}
                        mobile={<img src={image1} alt="Chemical Structures" />}
                    />
                </div>
            </section>
        </>
    )
}

export default Hero
