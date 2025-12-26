import { useState, useEffect } from 'react';
import { apiCall } from './api';
import ToastContainer from './components/ToastContainer';
import Navbar from './components/Navbar';
import FormContainer from './components/FormContainer';
import SavedPasswords from './components/SavedPasswords';
import StatusContainer from './components/StatusContainer';

const App = () => {

  const [passwords, setPasswords] = useState([]);
  const [showPasswords, setShowPasswords] = useState({});
  const [toasts, setToasts] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const addPassword = (newPassword) => {
    setPasswords(prev => [newPassword, ...prev]);
  };

  // display existing passwords from database
  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const data = await apiCall('/passwords');
        setPasswords(data);
      } catch (error) {
        showToast('Error loading passwords: ' + error.message);
        console.error(error);
      }
    };
    fetchPasswords();
  }, []);

  const deletePassword = async (_id) => {
    try {
      await apiCall(`/passwords/${_id}`, { method: 'DELETE' });

      setPasswords(passwords.filter(p => p._id !== _id));
      showToast('Password deleted', 'info');
    } catch (err) {
      showToast('Error deleting password: ' + err.message, 'error');
    }
  };

  // Toast functions
  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} passwords={passwords} showToast={showToast} />

        {/* Main Container */}
        <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8 items-start flex-col md:flex-row">
          {/* Left Column: sticky sidebar*/}
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto md:sticky md:top-0 md:self-start md:h-screen md:overflow-auto md:z-10 md:flex">
            <FormContainer
              darkMode={darkMode}
              showToast={showToast}
              passwords={passwords}
              setPasswords={setPasswords}
            />
            <div className="hidden md:block">
              <StatusContainer darkMode={darkMode} showToast={showToast} />
            </div>
          </div>

          {/* Right Column: Saved Passwords*/}
          <div className="flex-1 w-full">
            <SavedPasswords
              darkMode={darkMode}
              passwords={passwords}
              deletePassword={deletePassword}
              showPasswords={showPasswords}
              setShowPasswords={setShowPasswords}
              setPasswords={setPasswords}
              showToast={showToast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;