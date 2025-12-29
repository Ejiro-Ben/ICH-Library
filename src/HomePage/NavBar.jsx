
import React from 'react';
import AtomLogo from '../assets/ich-images/AtomLogo.png';
import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faSearch, faBook, faFileCircleQuestion, faExclamationCircle, faBars, faScroll, faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';


function NavBar() {
    // Mobile menu toggle 
    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [])
    

  return (
    
    <nav ref={ref} className="bg-chem-dark p-4 flex justify-between items-center sticky top-0 z-50 md:flex md:justify-around md:text-sm lg:text-base">
        <button
            className="text-white text-2xl ml-2 md:hidden cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(prev => !prev)}
            >
            <FontAwesomeIcon icon={faBars} className={`${isOpen ? 'hidden' : 'flex'}`} />
            <FontAwesomeIcon icon={faX}  className={`${isOpen ? 'flex' : 'hidden'}`} />
        </button>
        

        <div className='flex'>
            <img src={AtomLogo} alt="ICH Library Logo" className="h-10 w-10" />
            <h1 className="mt-1 text-xl font-bold bg-gradient-to-r from-chem-cyan to-chem-green bg-clip-text text-transparent">ICH Digital Library</h1>
        </div>

        {/*larger screens navigation */}
        <div className="hidden lg:flex space-x-6 justify-center">
            <ul className="flex space-x-6 justify-center">
                <li className="text-chem-text hover:text-chem-cyan transition duration-300">
                    <FontAwesomeIcon icon={faHome} />
                    <Link to="/">Home</Link>
                </li>

                <li className="text-chem-text hover:text-chem-cyan transition duration-300">
                    <FontAwesomeIcon icon={faBook} />
                    <Link to="/library">Library</Link>
                </li>

                <li className="text-chem-text hover:text-chem-cyan transition duration-300">
                    <FontAwesomeIcon icon={faScroll} />
                    <a href="#researchpapers">Research Papers</a>
                </li>

                <li className="text-chem-text hover:text-chem-cyan transition duration-300">
                    <FontAwesomeIcon icon={faFileCircleQuestion} />
                    <a href="#pastquestions">Past Questions</a>
                </li>

                <li className="text-chem-text hover:text-chem-cyan transition duration-300">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <a href="#about">About</a>
                </li>
            </ul>
        </div>

        {/*medium screens navigation */}
        <div className= "hidden md:flex lg:hidden absolute top-16 mt-4 p-4 bg-chem-cyan/10 rounded-lg w-auto">
            <ul className="flex space-x-4">
                <li className="text-chem-text hover:text-chem-cyan transition duration-300 rounded-full bg-chem-cyan/10 p-2">
                    <FontAwesomeIcon icon={faHome} />
                    <Link to="/">Home</Link>
                </li>

                <li className="text-chem-text hover:text-chem-cyan transition duration-300 rounded-full bg-chem-cyan/10 p-2">
                    <FontAwesomeIcon icon={faBook} />
                    <Link to="/library">Library</Link>
                </li>

                 <li className="text-chem-text hover:text-chem-cyan transition duration-300 rounded-full bg-chem-cyan/10 p-2">
                    <FontAwesomeIcon icon={faScroll} />
                    <a href="#researchpapers">Research Papers</a>
                </li>

                <li className="text-chem-text hover:text-chem-cyan transition duration-300 rounded-full bg-chem-cyan/10 p-2">
                    <FontAwesomeIcon icon={faFileCircleQuestion} />
                    <a href="#pastquestions">Past Questions</a>
                </li>

                <li className="text-chem-text hover:text-chem-cyan transition duration-300 rounded-full bg-chem-cyan/10 p-2">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <a href="#about">About</a>
                </li>
            </ul>
        </div>

        {/*smaller screens navigation */}
        <div className={`${isOpen ? 'flex' : 'hidden'} md:hidden absolute top-16 mt-2 p-4 bg-chem-dark max-w-48 rounded-lg`}>
            <ul className="flex flex-col space-y-6">
                <li className="text-chem-text hover:text-chem-cyan transition duration-300 rounded-full bg-chem-cyan/10 p-2">
                    <FontAwesomeIcon icon={faHome} />
                    <Link to="/">Home</Link>    
                </li>

                <li className="text-chem-text hover:text-chem-cyan transition duration-300 rounded-full bg-chem-cyan/10 p-2">
                    <FontAwesomeIcon icon={faBook} />
                    <Link to="/library">Library</Link>
                </li>

                 <li className="text-chem-text hover:text-chem-cyan transition duration-300 rounded-full bg-chem-cyan/10 p-2">
                    <FontAwesomeIcon icon={faScroll} />
                    <a href="#researchpapers">Research Papers</a>
                </li>

                <li className="text-chem-text hover:text-chem-cyan transition duration-300 rounded-full bg-chem-cyan/10 p-2">
                    <FontAwesomeIcon icon={faFileCircleQuestion} />
                    <a href="#pastquestions">Past Questions</a>
                </li>

                <li className="text-chem-text hover:text-chem-cyan transition duration-300 rounded-full bg-chem-cyan/10 p-2">
                    <FontAwesomeIcon icon={faExclamationCircle} />
                    <a href="#about">About</a>
                </li>
            </ul>
        </div>

        <div>
            <ul className='flex'> 
                <li className="text-chem-text font-bold border border-white rounded-lg px-2 space-x-1 hover:text-chem-cyan hover:border-chem-cyan transition duration-300">
                    <FontAwesomeIcon icon={faSearch} />
                    <a href="#home">Search</a>
                </li>
            </ul>
        </div>
    </nav>
  );
}

export default NavBar;