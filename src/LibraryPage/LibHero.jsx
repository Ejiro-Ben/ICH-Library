import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faNewspaper, faUsers, faBookOpen, faClock } from "@fortawesome/free-solid-svg-icons"
import SearchBar from "../HomePage/SearchBar"

const StatCard = ({ icon, color, value, label }) => {
    const colorClasses = {
        cyan: "bg-chem-cyan/10 text-chem-cyan",
        green: "bg-chem-green/10 text-chem-green"
    };

    return (
        <div className='p-2 w-fit mb-2 flex align-middle'>
            <FontAwesomeIcon icon={icon} className={`${colorClasses[color]} px-1.5 py-2 rounded-lg my-2 mr-2`} />
            <div>
                <h1 className="font-bold text-white mb-0">{value}</h1>
                <p className="text-sm text-gray-400">{label}</p>
            </div>
        </div>
    );
};

function LibHero() {
    const stats = [
        { icon: faNewspaper, color: "cyan", value: "1,240+", label: "Documents Available" },
        { icon: faUsers, color: "green", value: "500+", label: "Active Users" },
        { icon: faBookOpen, color: "cyan", value: "45+", label: "Course Covered" },
        { icon: faClock, color: "cyan", value: "Today", label: "Last Updated" },
    ];

    return (
        <section className="bg-chem-dark p-4 md:pt-24 lg:pt-4">
            <div className="mb-2">
                <h1 className="text-white font-bold text-2xl">Digital Library</h1>
                <p className="text-gray-400 text-sm md:text-base">Explore 1,240+ academic resources curated for industrial Chemistry students</p>
            </div>

            <SearchBar />

            <div className="grid grid-cols-2 md:flex md:space-x-2">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
        </section>
    )
}

export default LibHero