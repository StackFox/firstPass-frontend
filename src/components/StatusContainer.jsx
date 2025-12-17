import { useEffect, useState } from "react";
import axios from "axios";

const StatusContainer = ({ darkMode, showToast }) => {
    const [status, setStatus] = useState(null);
    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await axios.get("/api/status");
                setStatus(response.data);
            } catch (error) {
                showToast('Error loading status: ' + error.message);
                console.error(error);
            }
        };
        fetchStatus();
    }, []);

    return (
        <div
            className={`mt-2 p-4 rounded-lg shadow-lg overflow-y-auto max-h-[200px] w-full
                ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
        >
            <h3 className="text-lg font-semibold mb-4">Status</h3>
            {status ? (
                <ul className="space-y-2">
                    <li>
                        <span className="font-medium">Database:</span> {status.isConnected ? '🟢Connected' : '🔴Disconnected'}
                    </li>
                    <li>
                        <span className="font-medium">Passwords:</span> {status.total}
                    </li>
                    <li>
                        <span className="font-medium">Last Sync:</span> {status.lastSync || 'N/A'}
                    </li>
                </ul>
            ) : (
                <p>Loading status...</p>
            )}
        </div>
    );
};

export default StatusContainer;