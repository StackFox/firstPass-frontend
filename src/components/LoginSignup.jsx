import { useState } from 'react';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // TODO: Handle authentication logic here
        console.log(isLogin ? 'Login' : 'Signup', { username, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-600 via-purple-500 to-pink-500">
            <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    {isLogin ? 'Master Login' : 'Create Account'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            id="username"
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Master username"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Master password"
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                        />
                    </div>

                    {!isLogin && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
                            />
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 bg-linear-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 active:scale-100 transition duration-200"
                    >
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-gray-600 text-sm">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                                setUsername('');
                                setPassword('');
                                setConfirmPassword('');
                            }}
                            className="text-purple-600 font-semibold hover:text-pink-500 transition"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
