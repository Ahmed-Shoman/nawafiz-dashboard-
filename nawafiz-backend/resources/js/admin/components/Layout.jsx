import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
    LayoutDashboard, FileText, Settings, Users, 
    Images, LogOut, PanelLeft, Briefcase, 
    MessageSquare, Globe
} from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, children }) => {
    const location = useLocation();
    const active = location.pathname === to || location.pathname.startsWith(to + '/');
    
    return (
        <Link 
            to={to} 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active 
                ? 'bg-[hsl(42,87%,55%)] text-[#0d2233] font-semibold' 
                : 'text-gray-300 hover:bg-[#1a3651] hover:text-white'
            }`}
        >
            <Icon size={20} />
            <span>{children}</span>
        </Link>
    );
};

const Layout = ({ setUser }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('/api/admin/logout');
        } catch (e) {
            console.error(e);
        }
        localStorage.removeItem('adminToken');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden" dir="rtl">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0d2233] text-white flex flex-col shadow-xl flex-shrink-0">
                <div className="p-6 border-b border-[#1a3651]">
                    <h1 className="text-2xl font-bold text-[hsl(42,87%,55%)]">نوافذ المستقبل</h1>
                    <p className="text-sm text-gray-400 mt-1">لوحة تحكم الإدارة</p>
                </div>
                
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    <SidebarLink to="/" icon={LayoutDashboard}>الرئيسية</SidebarLink>
                    <div className="pt-4 pb-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">أقسام الموقع</p>
                    </div>
                    {/* Placeholder links, we will implement these in the next step */}
                    <SidebarLink to="/sections/hero" icon={PanelLeft}>القسم الرئيسي (Hero)</SidebarLink>
                    <SidebarLink to="/sections/about" icon={FileText}>عن الشركة</SidebarLink>
                    <SidebarLink to="/sections/stats" icon={FileText}>الإحصائيات</SidebarLink>
                    <SidebarLink to="/services" icon={Briefcase}>الخدمات</SidebarLink>
                    <SidebarLink to="/projects" icon={Images}>المشاريع</SidebarLink>
                    <SidebarLink to="/testimonials" icon={Users}>آراء العملاء</SidebarLink>
                    <SidebarLink to="/blogs" icon={FileText}>المدونات</SidebarLink>
                    <SidebarLink to="/contact-submissions" icon={MessageSquare}>رسائل التواصل</SidebarLink>
                    
                    <div className="pt-4 pb-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4">النظام</p>
                    </div>
                    <SidebarLink to="/seo" icon={Globe}>أدوات SEO</SidebarLink>
                    <SidebarLink to="/settings" icon={Settings}>إعدادات الموقع</SidebarLink>
                </nav>

                <div className="p-4 border-t border-[#1a3651]">
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-[#1a3651] hover:text-red-300 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
