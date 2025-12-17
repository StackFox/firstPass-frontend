const SearchResult = ({ results = [], onSelect }) => {
    if (!results || results.length === 0) return null

    return (
        <div className="absolute left-0 right-0 mt-2 z-50 max-w-md mx-4">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                <ul className="max-h-60 overflow-y-auto">
                    {results.map((r, idx) => (
                        <li
                            key={r.id ?? idx}
                            onClick={() => onSelect?.(r)}
                            className="px-4 py-3 border-b last:border-b-0 border-gray-100 dark:border-gray-700
                                       flex justify-between items-center cursor-pointer
                                       hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <div>
                                <div className="font-medium text-gray-800 dark:text-gray-100">
                                    {r.site ?? 'Unknown site'}
                                </div>
                                {r.username && (
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {r.username}
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SearchResult