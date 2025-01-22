
function Error() {
    return (
        <div className="flex items-center justify-center h-[70vh] bg-green-50">
            <div className="text-center bg-green-800 text-white p-12 rounded-xl shadow-lg w-full max-w-lg">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
                <button
                    onClick={() => window.location.replace("/")}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg transition duration-300 hover:bg-green-500">
                    Go Back Home
                </button>
            </div>
        </div>
    );
}

export default Error;
