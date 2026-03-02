import { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons"

const FilterDropdown = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <div ref={ref} className="relative flex flex-col my-3">
            <div className="flex justify-between">
                <p className="text-chem-cyan">{title}</p>
                <button onClick={() => setIsOpen(!isOpen)} className="px-4 text-white rounded">
                    <FontAwesomeIcon icon={faAngleDown} className={`${isOpen ? 'hidden' : 'flex'}`} />
                    <FontAwesomeIcon icon={faAngleUp} className={`${isOpen ? 'flex' : 'hidden'}`} />
                </button>
            </div>

            {isOpen && (
                <div className="relative md:absolute mt-2 md:mt-6 border border-chem-cyan/10 p-2 w-40 md:bg-chem-slate rounded-lg flex flex-col">
                    {items.map((item, index) => (
                        <div key={index}>
                            <input type="checkbox" className="mr-1" id={`${title}-${index}`} />
                            <label htmlFor={`${title}-${index}`} className={`text-white ${index < items.length - 1 ? 'mb-2' : ''}`}>
                                {item}
                            </label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

function Filters() {
    const levelItems = ["100 Level", "200 Level", "300 Level", "400 Level"];
    const materialItems = ["Lecture Notes", "Past Questions", "Lab Materials", "Research Papers"];

    return (
        <div className="bg-chem-cyan/10 border border-chem-cyan/10 p-3 rounded-lg flex justify-between flex-col md:flex-row">
            <div className="flex space-x-2 py-2">
                <FontAwesomeIcon icon={faFilter} className="text-chem-cyan" />
                <h1 className="text-white">Filters</h1>
            </div>
            <hr />

            <FilterDropdown title="Level" items={levelItems} />
            <hr />

            <FilterDropdown title="Material Type" items={materialItems} />
        </div>
    )
}

export default Filters