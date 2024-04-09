function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-gray-900 p-2 shadow-md">
            <div className="flex items-center">
                {/* Styling the h3 element with text gradient and shadow for a cool effect */}
                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 font-bold shadow-lg">
                    Group 10 Project CS 4474
                </h3>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 text-sm rounded">
                {/* Button content here */}
            </button>
        </nav>
    );
}

export default Navbar;
