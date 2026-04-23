import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LoginLayout from './components/LoginLayout';
import SeoSettings from './pages/SeoSettings';
import SiteSettings from './pages/SiteSettings';
import BlogsManager from './pages/BlogsManager';
import ServicesManager from './pages/ServicesManager';
import ProjectsManager from './pages/ProjectsManager';
import TestimonialsManager from './pages/TestimonialsManager';
import SectionsManager from './pages/SectionsManager';
import ContactSubmissionsManager from './pages/ContactSubmissionsManager';

const App = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('adminToken');
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const res = await axios.get('/api/admin/me');
                    setUser(res.data);
                } catch (err) {
                    localStorage.removeItem('adminToken');
                    delete axios.defaults.headers.common['Authorization'];
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">جاري التحميل...</div>;
    }

    return (
        <Routes>
            <Route path="/login" element={
                user ? <Navigate to="/" /> : <LoginLayout><Login setUser={setUser} /></LoginLayout>
            } />
            <Route path="/" element={
                user ? <Layout setUser={setUser} /> : <Navigate to="/login" />
            }>
                <Route index element={<Dashboard />} />
                <Route path="seo" element={<SeoSettings />} />
                <Route path="settings" element={<SiteSettings />} />
                <Route path="blogs" element={<BlogsManager />} />
                <Route path="services" element={<ServicesManager />} />
                <Route path="projects" element={<ProjectsManager />} />
                <Route path="testimonials" element={<TestimonialsManager />} />
                <Route path="sections/:key" element={<SectionsManager />} />
                <Route path="contact-submissions" element={<ContactSubmissionsManager />} />
            </Route>
        </Routes>
    );
};

export default App;
