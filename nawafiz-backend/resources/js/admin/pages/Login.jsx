import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post('/api/admin/login', { email, password });
            const { token, user } = res.data;
            
            localStorage.setItem('adminToken', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(user);
        } catch (err) {
            setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-[#0d2233]">نوافذ المستقبل</h1>
                <p className="text-gray-500 mt-2">تسجيل الدخول للوحة التحكم</p>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2233] focus:border-[#0d2233] outline-none transition-colors text-left"
                        dir="ltr"
                        placeholder="admin@nawafiz-dev.sa"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">كلمة المرور</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2233] focus:border-[#0d2233] outline-none transition-colors text-left"
                        dir="ltr"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#0d2233] text-white py-3 rounded-lg font-semibold hover:bg-[#1a3651] transition-colors disabled:opacity-50"
                >
                    {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
                </button>
            </form>
        </div>
    );
};

export default Login;
