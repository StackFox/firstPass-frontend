import axios from "axios";
import { useState } from "react";

const FormContainer = ({ darkMode, showToast, passwords, setPasswords }) => {
    // const [passwords, setPasswords] = useState([]);
    const [formData, setFormData] = useState({
        site: '',
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };



    const handleSave = async () => {
        // Validation
        if (!formData.site || !formData.username || !formData.password) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        try {
            const response = await axios.post('/api/passwords', formData);

            setPasswords([...passwords, response.data]);
            setFormData({ site: '', username: '', password: '' });
            showToast('Password saved successfully!', 'success');
        } catch (error) {
            showToast('Error saving password: ' + error.message, 'error');
            console.error(error);
        }
    };





    return (
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6 md:p-7 mb-8 w-full max-w-md`}>
            <h2 className={`text-2xl font-semibold text-center ${darkMode ? 'text-white' : 'text-gray-800'} mb-6`}>
                Add New Password
            </h2>

            <div className="mb-6">
                <label htmlFor="site" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Site
                </label>
                <input
                    type="text"
                    id="site"
                    name="site"
                    value={formData.site}
                    onChange={handleInputChange}
                    placeholder="e.g., facebook.com"
                    className={`w-full px-4 py-3 border-2 rounded-md focus:outline-none focus:border-green-500 transition-colors ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
                        }`}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="username" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter username"
                    className={`w-full px-4 py-3 border-2 rounded-md focus:outline-none focus:border-green-500 transition-colors ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
                        }`}
                />
            </div>

            <div className="mb-8">
                <label htmlFor="password" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    className={`w-full px-4 py-3 border-2 rounded-md focus:outline-none focus:border-green-500 transition-colors ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-200 text-gray-800 placeholder-gray-400'
                        }`}
                />
            </div>

            <button
                className="w-full py-4 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg rounded-md transition-colors duration-300"
                onClick={handleSave}
            >
                Save Password
            </button>
        </div>
    )
}

export default FormContainer
