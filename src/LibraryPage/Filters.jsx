import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faAngleDown, faAngleUp, } from "@fortawesome/free-solid-svg-icons"

function Filters() {

    const [isOpen1, setIsOpen1] = useState(false);

    const ref1 = useRef(null);

    useEffect(() => {
        const handler1 = (e) => {
            if (ref1.current && !ref1.current.contains(e.target)) {
                setIsOpen1(false);
            }
        };

        document.addEventListener("mousedown", handler1);
        return () => document.removeEventListener("mousedown", handler1);
    }, []);


    const [isOpen2, setIsOpen2] = useState(false);

    const ref2 = useRef(null);

    useEffect(() => {
        const handler2 = (e) => {
            if (ref2.current && !ref2.current.contains(e.target)) {
                setIsOpen2(false);
            }
        };

        document.addEventListener("mousedown", handler2);
        return () => document.removeEventListener("mousedown", handler2);
    }, []);

    return (
        <>
            <div className="bg-chem-cyan/10 border border-chem-cyan/10 p-3 rounded-lg flex justify-between flex-col md:flex-row">
                <div className="flex space-x-2 py-2">
                    <FontAwesomeIcon icon={faFilter} className="text-chem-cyan" />
                    <h1 className="text-white">Filters</h1>
                </div><hr></hr>

                <div ref={ref1} className="relative flex flex-col my-3">
                    <div className="flex justify-between">
                        <p className="text-chem-cyan">Level</p>
                        <button onClick={() => setIsOpen1(!isOpen1)} className="px-4 text-white rounded">
                            <FontAwesomeIcon icon={faAngleDown} className={`${isOpen1 ? 'hidden' : 'flex'}`} />
                            <FontAwesomeIcon icon={faAngleUp} className={`${isOpen1 ? 'flex' : 'hidden'}`} />
                        </button>
                    </div>

                    {isOpen1 && (
                        <div className="relative md:absolute mt-2 md:mt-6 border border-chem-cyan/10 p-2 w-28 md:bg-chem-slate rounded-lg flex flex-col">
                            <div>
                                <input type="checkbox" className="mr-1"></input>
                                <label className="mb-2 text-white">100 Level</label>
                            </div>

                            <div>
                                <input type="checkbox" className="mr-1"></input>
                                <label className="mb-2 text-white">200 Level</label>
                            </div>

                            <div>
                                <input type="checkbox" className="mr-1"></input>
                                <label className="mb-2 text-white">300 Level</label>
                            </div>

                            <div>
                                <input type="checkbox" className="mr-1"></input>
                                <label className="text-white">400 Level</label>
                            </div>

                        </div>
                    )}
                </div><hr></hr>

                <div ref={ref2} className="relative flex flex-col my-3">
                    <div className="flex justify-between">
                        <p className="text-chem-cyan">Material Type</p>
                        <button onClick={() => setIsOpen2(!isOpen2)} className="px-4 text-white rounded">
                            <FontAwesomeIcon icon={faAngleDown} className={`${isOpen2 ? 'hidden' : 'flex'}`} />
                            <FontAwesomeIcon icon={faAngleUp} className={`${isOpen2 ? 'flex' : 'hidden'}`} />
                        </button>
                    </div>

                    {isOpen2 && (
                        <div className="relative md:absolute mt-2 md:mt-6 border border-chem-cyan/10 p-2 w-40 md:bg-chem-slate rounded-lg flex flex-col">
                            <div>
                                <input type="checkbox" className="mr-1"></input>
                                <label className="mb-2 text-white">Lecture Notes</label>
                            </div>

                            <div>
                                <input type="checkbox" className="mr-1"></input>
                                <label className="mb-2 text-white">Past Questions</label>
                            </div>

                            <div>
                                <input type="checkbox" className="mr-1"></input>
                                <label className="mb-2 text-white">Lab Materials</label>
                            </div>

                            <div>
                                <input type="checkbox" className="mr-1"></input>
                                <label className="text-white">Research Papers</label>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Filters