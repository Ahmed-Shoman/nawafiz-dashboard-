import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title_ar: '', title_en: '', desc_ar: '', desc_en: '',
        image: '', order: 0, is_active: true
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await axios.get('/api/admin/projects');
            setProjects(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('folder', 'projects');
        
        setUploading(true);
        try {
            const { data } = await axios.post('/api/admin/upload', formDataUpload);
            setFormData(prev => ({ ...prev, image: data.path }));
        } catch (err) {
            alert('فشل رفع الصورة');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`/api/admin/projects/${editId}`, formData);
            } else {
                await axios.post('/api/admin/projects', formData);
            }
            setFormOpen(false);
            fetchProjects();
        } catch (err) {
            console.error(err);
            alert('حدث خطأ');
        }
    };

    const handleEdit = (project) => {
        setEditId(project.id);
        setFormData({
            title_ar: project.title_ar, title_en: project.title_en,
            desc_ar: project.desc_ar, desc_en: project.desc_en,
            image: project.image || '', order: project.order || 0,
            is_active: project.is_active
        });
        setFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
        try {
            await axios.delete(`/api/admin/projects/${id}`);
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>جاري التحميل...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">المشاريع</h1>
                    <p className="text-gray-500 mt-1">إضافة وتعديل المشاريع في المعرض.</p>
                </div>
                <button 
                    onClick={() => { setEditId(null); setFormData({ title_ar: '', title_en: '', desc_ar: '', desc_en: '', image: '', order: 0, is_active: true }); setFormOpen(true); }}
                    className="flex items-center gap-2 bg-[#0d2233] text-white px-4 py-2 rounded-lg hover:bg-[#1a3651] transition"
                >
                    <Plus size={20} />
                    إضافة مشروع
                </button>
            </div>

            {formOpen ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold">{editId ? 'تعديل المشروع' : 'مشروع جديد'}</h2>
                        <button onClick={() => setFormOpen(false)} className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg text-sm font-semibold flex gap-2 items-center">
                            إلغاء <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم (عربي)</label>
                                <input value={formData.title_ar} onChange={e => setFormData({...formData, title_ar: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم (إنجليزي)</label>
                                <input value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" dir="ltr" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف (عربي)</label>
                                <textarea value={formData.desc_ar} onChange={e => setFormData({...formData, desc_ar: e.target.value})} required className="w-full px-4 py-2 border rounded-lg h-24" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">الوصف (إنجليزي)</label>
                                <textarea value={formData.desc_en} onChange={e => setFormData({...formData, desc_en: e.target.value})} required className="w-full px-4 py-2 border rounded-lg h-24" dir="ltr" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-gray-50 p-4 rounded-lg">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">صورة المشروع</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                                        <ImageIcon size={20} />
                                        {uploading ? 'جاري الرفع...' : 'اختر صورة'}
                                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                                    </label>
                                    {formData.image && <img src={formData.image} alt="Preview" className="h-10 w-16 object-cover rounded shadow-sm border" />}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">الترتيب</label>
                                <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                        </div>

                        <div className="border-t pt-6 flex justify-end gap-3">
                            <button type="button" onClick={() => setFormOpen(false)} className="px-6 py-2 rounded-lg font-semibold bg-gray-100 hover:bg-gray-200">إلغاء</button>
                            <button type="submit" className="bg-[#0d2233] text-white px-8 py-2 rounded-lg hover:bg-[#1a3651] font-semibold">حفظ التغييرات</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {projects.map(project => (
                        <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition">
                            {project.image ? (
                                <img src={project.image} alt={project.title_ar} className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400">لا توجد صورة</div>
                            )}
                            <div className="p-4">
                                <h3 className="font-bold text-gray-900 mb-1">{project.title_ar}</h3>
                                <p className="text-sm text-gray-500 truncate">{project.desc_ar}</p>
                                <div className="mt-4 flex gap-2 justify-end">
                                    <button onClick={() => handleEdit(project)} className="text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 p-2 rounded-lg transition"><Edit2 size={18} /></button>
                                    <button onClick={() => handleDelete(project.id)} className="text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 p-2 rounded-lg transition"><Trash2 size={18} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectsManager;
