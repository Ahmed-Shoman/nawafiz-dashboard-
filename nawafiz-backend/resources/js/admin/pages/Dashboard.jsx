import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layers, Briefcase, FileText, Settings, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ title, count, icon: Icon, to, colorClass }) => (
    <Link to={to} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{count}</p>
        </div>
        <div className={`p-4 rounded-xl ${colorClass}`}>
            <Icon size={24} />
        </div>
    </Link>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        services: 0,
        projects: 0,
        blogs: 0,
        testimonials: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch basic counts
                const [servRes, projRes, blogRes, testRes] = await Promise.all([
                    axios.get('/api/admin/services'),
                    axios.get('/api/admin/projects'),
                    axios.get('/api/admin/blogs'),
                    axios.get('/api/admin/testimonials')
                ]);
                
                setStats({
                    services: servRes.data.length,
                    projects: projRes.data.length,
                    blogs: blogRes.data.length,
                    testimonials: testRes.data.length,
                });
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <div className="animate-pulse">جاري تحميل الإحصائيات...</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">نظرة عامة</h1>
                <p className="text-gray-500">مرحباً بك في لوحة تحكم موقع نوافذ المستقبل.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="الخدمات" 
                    count={stats.services} 
                    icon={Briefcase} 
                    to="/services" 
                    colorClass="bg-blue-50 text-blue-600"
                />
                <StatCard 
                    title="المشاريع" 
                    count={stats.projects} 
                    icon={Layers} 
                    to="/projects" 
                    colorClass="bg-green-50 text-green-600"
                />
                <StatCard 
                    title="المقالات" 
                    count={stats.blogs} 
                    icon={FileText} 
                    to="/blogs" 
                    colorClass="bg-purple-50 text-purple-600"
                />
                <StatCard 
                    title="آراء العملاء" 
                    count={stats.testimonials} 
                    icon={Users} 
                    to="/testimonials" 
                    colorClass="bg-orange-50 text-orange-600"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">اختصارات لوحة التحكم</h2>
                    <ul className="space-y-3">
                        <li>
                            <Link to="/sections/hero" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition">
                                <div className="w-2 h-2 rounded-full bg-[hsl(42,87%,55%)]"></div>
                                تحديث القسم الرئيسي (Hero)
                            </Link>
                        </li>
                        <li>
                            <Link to="/seo" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition">
                                <div className="w-2 h-2 rounded-full bg-[hsl(42,87%,55%)]"></div>
                                إدارة أكواد التتبع والسيو (GTM, Pixel)
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 text-gray-700 transition">
                                <div className="w-2 h-2 rounded-full bg-[hsl(42,87%,55%)]"></div>
                                تعديل بيانات الاتصال ومواعيد العمل
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
