
import { useState, useRef, useEffect } from 'react';
import AtomLogo from '../assets/ich-images/AtomLogo.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook, faCog, faFileCircleQuestion, faExclamationCircle, faBars, faScroll, faX } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from 'react-router-dom';

const NavItem = ({ icon, label, to, href }) => (
    <li className="transition duration-300">
        {to ? (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex items-center gap-2 ${isActive ? 'text-chem-cyan' : 'text-chem-text hover:text-chem-cyan'}`
                }
            >
                <FontAwesomeIcon icon={icon} />
                {label}
            </NavLink>
        ) : (
            <a className="flex items-center gap-2 text-chem-text hover:text-chem-cyan" href={href}>
                <FontAwesomeIcon icon={icon} />
                {label}
            </a>
        )}
    </li>
);

const MobileNavItem = ({ icon, label, to, href }) => (
    <li className="transition duration-300 rounded-full bg-chem-cyan/10 p-2">
        {to ? (
            <NavLink
                to={to}
                className={({ isActive }) =>
                    `flex items-center gap-2 ${isActive ? 'text-chem-cyan' : 'text-chem-text hover:text-chem-cyan'}`
                }
            >
                <FontAwesomeIcon icon={icon} /> {label}
            </NavLink>
        ) : (
            <a className="flex items-center gap-2 text-chem-text hover:text-chem-cyan" href={href}>
                <FontAwesomeIcon icon={icon} />
                {label}
            </a>
        )}
    </li>
);

const navItems = [
    { icon: faHome, label: "Home", to: "/" },
    { icon: faBook, label: "Library", to: "/library" },
    { icon: faFileCircleQuestion, label: "Past Questions", to: "/pastquestions" },
    { icon: faCog, label: "Admin", to: "/login" }
];

function NavBar() {
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
        <nav ref={ref} className="bg-chem-dark p-4 flex items-center sticky top-0 z-50 md:flex md:justify-around md:text-sm lg:text-base">
            <button
                className="text-white text-2xl ml-2 md:hidden cursor-pointer mr-4"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <FontAwesomeIcon icon={faBars} className={`${isOpen ? 'hidden' : 'flex'}`} />
                <FontAwesomeIcon icon={faX} className={`${isOpen ? 'flex' : 'hidden'}`} />
            </button>

            <div className='flex'>
                <img src={AtomLogo} alt="ICH Library Logo" className="h-10 w-10" />
                <h1 className="mt-1 text-xl font-bold bg-gradient-to-r from-chem-cyan to-chem-green bg-clip-text text-transparent">ICH Digital Library</h1>
            </div>

            {/* Larger screens navigation */}
            <div className="hidden md:flex space-x-6 justify-center">
                <ul className="flex space-x-6 justify-center">
                    {navItems.map((item, index) => (
                        <NavItem key={index} {...item} />
                    ))}
                </ul>
            </div>

            {/* Smaller screens navigation */}
            <div className={`${isOpen ? 'flex' : 'hidden'} md:hidden absolute top-16 mt-2 p-4 bg-chem-dark max-w-48 rounded-lg`}>
                <ul className="flex flex-col space-y-6">
                    {navItems.map((item, index) => (
                        <MobileNavItem key={index} {...item} />
                    ))}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;