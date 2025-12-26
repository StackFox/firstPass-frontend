import { useState } from "react"
import { apiCall } from "../api"

const SavedPasswords = ({ darkMode, passwords, deletePassword, showPasswords, setShowPasswords, setPasswords, showToast }) => {
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({
        site: "",
        username: "",
        password: ""
    });

    const copyToClipboard = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text);
            showToast(`${type} copied to clipboard!`, 'success');
        } catch (err) {
            showToast('Failed to copy to clipboard', 'error');
        }
    };

    const togglePasswordVisibility = (id) => {
        setShowPasswords({
            ...showPasswords,
            [id]: !showPasswords[id]
        });
    };

    const handleEditClick = (item) => {
        setEditingId(item._id);
        setEditForm({
            site: item.site,
            username: item.username,
            password: item.password
        })
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveEdit = async (_id) => {
        try {
            const response = await apiCall(`/passwords/${_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });

            // update local state
            setPasswords((prev) =>
                prev.map((p) => (p._id === _id ? response : p))
            );
            showToast("Password Editted!")
            setEditingId(null);
        } catch (error) {
            console.error(error);
            showToast("Error updating password", "error");
        }
    }

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    return (
        <div className={`w-full max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 md:p-8`}>
            <h2 className={`text-2xl font-semibold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
                Saved Passwords
            </h2>

            {passwords.length === 0 ? (
                <p className={`text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'} py-8`}>No passwords saved yet</p>
            ) : (
                <div className="space-y-4">
                    {passwords.map((item) => (
                        <div key={item._id}
                            className={`border rounded-lg p-4 relative group ${darkMode
                                ? 'border-gray-700 bg-gray-700'
                                : 'border-gray-200 bg-gray-50'
                                }`}
                            id={`password-${item._id}`}>

                            {/* Delete button */}
                            <button
                                onClick={() => deletePassword(item._id)}
                                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 hover:text-red-700"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>

                            {editingId === item._id ? (
                                // Edit mode
                                <div className="space-y-3">
                                    <div>
                                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Site</label>
                                        <input
                                            type="text"
                                            name="site"
                                            value={editForm.site}
                                            onChange={handleEditChange}
                                            className={`w-full px-3 py-2 rounded text-sm border ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'}`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={editForm.username}
                                            onChange={handleEditChange}
                                            className={`w-full px-3 py-2 rounded text-sm border ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'}`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-1`}>Password</label>
                                        <input
                                            type="text"
                                            name="password"
                                            value={editForm.password}
                                            onChange={handleEditChange}
                                            className={`w-full px-3 py-2 rounded text-sm border ${darkMode ? 'bg-gray-600 text-white border-gray-500' : 'bg-white text-gray-800 border-gray-300'}`}
                                        />
                                    </div>
                                    <div className="flex gap-2 justify-end pt-2">
                                        <button
                                            onClick={handleCancelEdit}
                                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleSaveEdit(item._id)}
                                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded transition-colors"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // View mode
                                <>
                                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>{item.site}</h3>

                                    <div className="space-y-3">
                                        {/* Username Row */}
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} sm:w-24`}>Username:</span>
                                            <span className={`flex-1 font-mono px-3 py-2 rounded text-sm ${darkMode
                                                ? 'bg-gray-600 text-gray-100'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>{item.username}</span>
                                            <button
                                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors"
                                                onClick={() => copyToClipboard(item.username, 'Username')}
                                            >
                                                Copy
                                            </button>
                                        </div>

                                        {/* Password Row */}
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'} sm:w-24`}>Password:</span>
                                            <span className={`flex-1 font-mono px-3 py-2 rounded text-sm ${darkMode
                                                ? 'bg-gray-600 text-gray-100'
                                                : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {showPasswords[item._id] ? item.password : '••••••••'}
                                            </span>
                                            <button
                                                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded transition-colors"
                                                onClick={() => togglePasswordVisibility(item._id)}
                                            >
                                                {showPasswords[item._id] ? 'Hide' : 'Show'}
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded transition-colors"
                                                onClick={() => copyToClipboard(item.password, 'Password')}
                                            >
                                                Copy
                                            </button>
                                        </div>

                                        {/* Edit Button */}
                                        <div className="flex justify-end pt-2">
                                            <button
                                                onClick={() => handleEditClick(item)}
                                                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded transition-colors"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SavedPasswords
