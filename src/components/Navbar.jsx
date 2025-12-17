import { useState } from "react";
import SearchBar from "./SearchBar";
import StatusContainer from "./StatusContainer";

const Navbar = ({ darkMode, setDarkMode, passwords, showToast }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md px-4 md:px-8 py-4 flex justify-between items-center`}>
                <div className="logo">
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>firstPass</h1>
                </div>

                {/* Desktop search only */}
                <div className="hidden md:block">
                    <SearchBar darkMode={darkMode} passwords={passwords} showDesktop={true} showMobile={false} />
                </div>

                <div className="flex items-center gap-4">
                    {/* Desktop-only controls */}
                    <div className="hidden md:flex items-center gap-4">
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2 rounded-md transition-colors ${darkMode
                                ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {darkMode ? (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-10.607a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.464 7.464a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>

                        <a
                            href="https://github.com/StackFox"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-4 py-2 border-2 ${darkMode
                                ? 'border-gray-200 text-gray-200 hover:bg-gray-700'
                                : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                                } rounded-md font-medium transition-all duration-300`}
                        >
                            GitHub
                        </a>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-md focus:outline-none"
                        aria-label="Open menu"
                        onClick={() => setOpen(true)}
                    >
                        <svg className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile drawer + overlay (mobile only) */}
            <div className={`md:hidden`}>
                {/* overlay */}
                <div
                    className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    onClick={() => setOpen(false)}
                    aria-hidden={!open}
                />
                {/* panel */}
                <aside
                    className={`fixed top-0 right-0 h-full w-72 z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
                    aria-hidden={!open}
                >
                    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} h-full shadow-lg p-4 flex flex-col gap-4`}>
                        <div className="flex items-center justify-between">
                            <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Menu</h2>
                            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded-md">
                                <svg className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-800'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile search */}
                        <div>
                            <SearchBar darkMode={darkMode} passwords={passwords} showDesktop={false} showMobile={true} />
                        </div>

                        {/* Dark mode toggle */}
                        <div className="pt-2">
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
                            >
                                {darkMode ? 'Light mode' : 'Dark mode'}
                            </button>
                        </div>

                        {/* Status */}
                        <div>
                            <StatusContainer darkMode={darkMode} showToast={showToast} />
                        </div>

                        {/* GitHub */}
                        <div className="mt-auto">
                            <a
                                href="https://github.com/StackFox"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full block text-center px-4 py-2 border-2 ${darkMode
                                    ? 'border-gray-200 text-gray-200 hover:bg-gray-700'
                                    : 'border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                                    } rounded-md font-medium transition-all duration-300`}
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    )
}

export default Navbar
