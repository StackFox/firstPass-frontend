import { useState } from 'react'
import SearchResult from './SearchResult'

// showDesktop / showMobile control where the search renders. Default keeps previous behavior.
const SearchBar = ({ darkMode, passwords, showDesktop = true, showMobile = true }) => {
    const [input, setInput] = useState('')
    const [results, setResults] = useState([])

    const handleChange = (value) => {
        setInput(value)
        const results = passwords.filter((user) => {
            return user && ((user.site || '').includes(value) || (user.username || '').includes(value))
        })
        if (value == '') {
            setResults([]);
            return
        }
        setResults(results)
    }

    const [selectedId, setSelectedId] = useState(null)

    const handleSelectResult = (item) => {
        if (!item?._id) return

        const el = document.getElementById(`password-${item._id}`)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            setSelectedId(item._id)
        }
    }

    return (
        <>
            <div className={darkMode ? 'dark relative' : 'relative'}>
                {/* Search Bar - Desktop */}
                {showDesktop && (
                    <div className="flex-1 max-w-md mx-4 hidden md:block">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => handleChange(e.target.value)}
                                placeholder="Search..."
                                className={`w-full px-4 py-2 pl-10 rounded-lg border-2 transition-colors ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                                    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-gray-400'
                                    } focus:outline-none`}
                            />
                            <svg
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                )}

                {/* Search Bar - Mobile */}
                {showMobile && (
                    <div className="mt-4 md:hidden">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => handleChange(e.target.value)}
                                placeholder="Search..."
                                className={`w-full px-4 py-2 pl-10 rounded-lg border-2 transition-colors ${darkMode
                                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-gray-500'
                                    : 'bg-gray-50 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-gray-400'
                                    } focus:outline-none`}
                            />
                            <svg
                                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                    </div>
                )}
                <SearchResult results={results} onSelect={handleSelectResult} />
            </div>
        </>
    )
}

export default SearchBar