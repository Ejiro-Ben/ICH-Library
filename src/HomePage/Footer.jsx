import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AtomLogo from '../assets/ICH images/AtomLogo.png';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faBarChart, faBookOpen, faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';

function Footer() {

    return (

        <>
            <section className='bg-chem-dark pt-20'>
                <div className='bg-chem-cyan/10 flex flex-col p-6 space-y-8 lg:flex-row lg:justify-around lg:space-y-0 lg:space-x-8'>
                    <div>
                        <div className='flex mb-2'>
                            <img src={AtomLogo} alt="ICH Library Logo" className="h-6 w-6 mt-1 mr-1" />
                            <h1 className="mt-1 font-bold bg-gradient-to-r from-chem-cyan to-chem-green bg-clip-text text-transparent">ICH Digital Library</h1>
                        </div>

                        <p className='text-gray-400 text-sm'>The comprehensive digital resources hub</p> 
                        <p className='text-gray-400 text-sm'>for Industrial Chemistry education and research.</p>

                        <div className='mt-2'>
                            <a href='mailto:ejiroghenebenodiri@gmail.com' className='text-white p-1 border border-chem-cyan/10 rounded-lg mr-2 hover:border-chem-cyan'>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </a>

                            <a href='#' className='text-white p-1 border border-chem-cyan/10 rounded-lg mr-2 hover:border-chem-cyan'>
                                <FontAwesomeIcon icon={faGithub} />
                            </a>

                            <a href='#' className='text-white p-1 border border-chem-cyan/10 rounded-lg mr-2 hover:border-chem-cyan'>
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </div>
                    </div>

                    <div className='flex space-x-10'>
                        <div className='flex flex-col'>
                            <div className='flex mb-1'>
                                <FontAwesomeIcon icon={faLink} className='mt-1 mr-1 text-chem-cyan' />
                                <h1 className='text-white'>Quick Links</h1>
                            </div>

                            <div className='text-gray-400 flex flex-col text-sm'>
                                <a href='#' className='hover:text-chem-cyan'> About </a>
                                <a href='#' className='hover:text-chem-cyan'> Research </a>
                                <a href='#' className='hover:text-chem-cyan'> Contact </a>
                            </div>
                        </div>

                        <div>
                            <div className='flex mb-1'>
                                <FontAwesomeIcon icon={faBookOpen} className='mt-1 mr-1 text-chem-cyan' />
                                <h1 className='text-white'>Resources</h1>
                            </div>

                            <div className='text-gray-400 flex flex-col text-sm'>
                                <a href='#' className='hover:text-chem-cyan'> Library </a>
                                <a href='#' className='hover:text-chem-cyan'> Past Questions </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='flex mb-2'>
                            <FontAwesomeIcon icon={faBarChart} className='mt-1 mr-1 text-chem-cyan' />
                            <h1 className='text-white'>Library Stats</h1>
                        </div>

                        <div className='text-gray-400'>
                            <div className='bg-chem-slate border border-chem-cyan/10 p-2 rounded-lg w-64 mb-2'>
                                <h1 className="font-bold text-chem-cyan">1,240+</h1>
                                <p className="text-sm">Documents Available</p>
                            </div>

                            <div className='bg-chem-slate border border-chem-cyan/10 p-2 rounded-lg w-64'>
                                <h1 className="font-bold text-chem-green">500+</h1>
                                <p className="text-sm">Active Users</p>
                            </div>
                        </div>
                    </div><hr />
                </div>

                <div className='bg-chem-cyan/10 flex flex-col p-6 space-y-8 lg:flex-row lg:justify-around lg:space-y-0 lg:space-x-8'>
                    <div className='text-gray-400 text-sm'>
                        &copy; {new Date().getFullYear()} ICH Digital Library. All rights reserved.
                    </div>

                    <div className='text-gray-400 text-sm'>
                        <p>Built by Benodiri Ejiroghene Onovayen,</p>
                        <p>a Student of the Department of Industrial Chemistry, University of Ilorin.</p>
                    </div>

                    <div className='text-gray-400 text-sm font-bold'>
                        <a href='#' className='mr-3'>Privacy Policy</a>
                        .
                        <a href='#' className='ml-3'>Terms of Use</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Footer