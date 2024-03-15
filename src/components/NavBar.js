
function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 p-2 shadow-md">
            <div className="flex items-center">
                <input type="text" placeholder="Search..." className="text-sm px-2 py-1 rounded leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded">
                Help
            </button>
        </nav>
    );
}

export default Navbar;
