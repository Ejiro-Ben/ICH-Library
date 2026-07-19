import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../src/HomePage/NavBar';
import Footer from '../src/HomePage/Footer';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                }
                setUsername('');
                setPassword('');
                setError('');
                navigate('/admin');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Network error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <NavBar />

        <div className="min-h-screen bg-chem-dark flex items-center justify-center px-4 py-8">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-40 h-40 bg-chem-cyan opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-chem-green opacity-10 rounded-full blur-3xl"></div>
            </div>

            {/* Login card */}
            <div className="relative w-full max-w-md">
                <div className="bg-chem-slate border border-chem-cyan border-opacity-30 rounded-lg shadow-2xl p-8 md:p-10">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <FontAwesomeIcon icon={faBook} className="text-chem-cyan text-3xl" />
                            <h1 className="text-3xl font-bold text-white">ICH Library</h1>
                        </div>
                        <p className="text-chem-muted text-sm">Admin Access Portal</p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        
                        {/* Username field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-chem-text mb-2">
                                <FontAwesomeIcon icon={faUser} className="text-chem-green mr-2" />
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="w-full px-4 py-3 bg-chem-dark border border-chem-cyan border-opacity-20 rounded-lg text-white placeholder-chem-muted focus:outline-none focus:border-chem-cyan focus:border-opacity-100 focus:ring-2 focus:ring-chem-cyan focus:ring-opacity-20 transition duration-200"
                            />
                        </div>

                        {/* Password field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-chem-text mb-2">
                                <FontAwesomeIcon icon={faLock} className="text-chem-green mr-2" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 pr-12 bg-chem-dark border border-chem-cyan border-opacity-20 rounded-lg text-white placeholder-chem-muted focus:outline-none focus:border-chem-cyan focus:border-opacity-100 focus:ring-2 focus:ring-chem-cyan focus:ring-opacity-20 transition duration-200"
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    className="absolute right-3  top-1/2 transform -translate-y-1/2 text-chem-muted hover:text-chem-cyan focus:outline-none"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    style={{ padding: 0, background: 'none', border: 'none' }}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>

                        {/* Login button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-chem-green to-chem-cyan text-chem-dark font-semibold rounded-lg hover:shadow-lg hover:shadow-chem-green hover:shadow-opacity-50 transition duration-300 mt-6 disabled:opacity-60 flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading && (
                                <svg className="animate-spin h-5 w-5 text-chem-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                </svg>
                            )}
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                                            {error && (
                                                <div className="text-red-500 text-center text-sm mt-2">{error}</div>
                                            )}
                    </form>

                    {/* Footer note */}
                    <p className="text-center text-xs text-chem-muted mt-6">
                        For authorized administrators only
                    </p>
                </div>

                {/* Border glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-chem-cyan to-chem-green opacity-0 group-hover:opacity-10 blur-xl -z-10 transition duration-500"></div>
            </div>
        </div>
        <Footer />
        </>
    )
}