import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const emptyForm = {
        title_ar: '', title_en: '', short_desc_ar: '', short_desc_en: '',
        long_desc_ar: '', long_desc_en: '', features_ar: '', features_en: '',
        image: '', icon: '', order: 0, is_active: true,
        slug: '', meta_title: '', meta_description: '', keywords: '', img_alt: '',
        canonical_url: '', tags: '', og_title: '', og_description: '', schema_markup: ''
    };
    const [formData, setFormData] = useState(emptyForm);
    const [activeTab, setActiveTab] = useState('basic');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const { data } = await axios.get('/api/admin/services');
            setServices(data);
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
        formDataUpload.append('folder', 'services');
        
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
            const payload = {
                ...formData,
                features_ar: formData.features_ar.split('\n').filter(Boolean),
                features_en: formData.features_en.split('\n').filter(Boolean),
            };

            if (editId) {
                await axios.put(`/api/admin/services/${editId}`, payload);
            } else {
                await axios.post('/api/admin/services', payload);
            }
            setFormOpen(false);
            fetchServices();
        } catch (err) {
            console.error(err);
            alert('حدث خطأ');
        }
    };

    const handleEdit = (service) => {
        setEditId(service.id);
        setFormData({
            title_ar: service.title_ar, title_en: service.title_en,
            short_desc_ar: service.short_desc_ar, short_desc_en: service.short_desc_en,
            long_desc_ar: service.long_desc_ar, long_desc_en: service.long_desc_en,
            features_ar: (service.features_ar || []).join('\n'),
            features_en: (service.features_en || []).join('\n'),
            image: service.image || '', icon: service.icon || '',
            order: service.order || 0, is_active: service.is_active,
            slug: service.slug || '', meta_title: service.meta_title || '',
            meta_description: service.meta_description || '', keywords: service.keywords || '',
            img_alt: service.img_alt || '', canonical_url: service.canonical_url || '',
            tags: service.tags || '', og_title: service.og_title || '',
            og_description: service.og_description || '', schema_markup: service.schema_markup || ''
        });
        setActiveTab('basic');
        setFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
        try {
            await axios.delete(`/api/admin/services/${id}`);
            fetchServices();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>جاري التحميل...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">الخدمات</h1>
                    <p className="text-gray-500 mt-1">إضافة وتعديل الخدمات المقدمة.</p>
                </div>
                <button 
                    onClick={() => { setEditId(null); setFormData({...emptyForm}); setActiveTab('basic'); setFormOpen(true); }}
                    className="flex items-center gap-2 bg-[#0d2233] text-white px-4 py-2 rounded-lg hover:bg-[#1a3651] transition"
                >
                    <Plus size={20} />
                    إضافة خدمة
                </button>
            </div>

            {formOpen ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold">{editId ? 'تعديل الخدمة' : 'خدمة جديدة'}</h2>
                        <button onClick={() => setFormOpen(false)} className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg text-sm font-semibold flex gap-2 items-center">
                            إلغاء <X size={20} />
                        </button>
                    </div>

                    <div className="flex gap-4 mb-6 border-b">
                        <button type="button" onClick={() => setActiveTab('basic')} className={`pb-2 px-4 font-bold ${activeTab === 'basic' ? 'border-b-2 border-[#0d2233] text-[#0d2233]' : 'text-gray-500'}`}>البيانات الأساسية</button>
                        <button type="button" onClick={() => setActiveTab('seo')} className={`pb-2 px-4 font-bold ${activeTab === 'seo' ? 'border-b-2 border-[#0d2233] text-[#0d2233]' : 'text-gray-500'}`}>إعدادات محركات البحث (SEO)</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {activeTab === 'basic' ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان (عربي)</label>
                                <input value={formData.title_ar} onChange={e => setFormData({...formData, title_ar: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان (إنجليزي)</label>
                                <input value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" dir="ltr" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">وصف قصير (عربي)</label>
                                <textarea value={formData.short_desc_ar} onChange={e => setFormData({...formData, short_desc_ar: e.target.value})} required className="w-full px-4 py-2 border rounded-lg h-20" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">وصف قصير (إنجليزي)</label>
                                <textarea value={formData.short_desc_en} onChange={e => setFormData({...formData, short_desc_en: e.target.value})} required className="w-full px-4 py-2 border rounded-lg h-20" dir="ltr" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">كيفية تقديم الخدمة / وصف طويل (عربي)</label>
                                <textarea value={formData.long_desc_ar} onChange={e => setFormData({...formData, long_desc_ar: e.target.value})} required className="w-full px-4 py-2 border rounded-lg h-32" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">كيفية تقديم الخدمة / وصف طويل (إنجليزي)</label>
                                <textarea value={formData.long_desc_en} onChange={e => setFormData({...formData, long_desc_en: e.target.value})} required className="w-full px-4 py-2 border rounded-lg h-32" dir="ltr" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">المميزات (عربي) - كل ميزة في سطر منفصل</label>
                                <textarea value={formData.features_ar} onChange={e => setFormData({...formData, features_ar: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-32" placeholder="ميزة 1&#10;ميزة 2..." />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">المميزات (إنجليزي) - كل ميزة في سطر منفصل</label>
                                <textarea value={formData.features_en} onChange={e => setFormData({...formData, features_en: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-32" dir="ltr" placeholder="Feature 1&#10;Feature 2..." />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-gray-50 p-4 rounded-lg">
                             <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">أيقونة الخدمة (SVG Path)</label>
                                <input value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full px-4 py-2 border rounded-lg" dir="ltr" placeholder="M3 9l9-7..." />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">صورة الخدمة</label>
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
                            </>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">رابط الخدمة (Slug)</label>
                                        <input value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full px-4 py-2 border rounded-lg" dir="ltr" placeholder="يُترك فارغاً للتوليد التلقائي" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Canonical URL</label>
                                        <input value={formData.canonical_url} onChange={e => setFormData({...formData, canonical_url: e.target.value})} className="w-full px-4 py-2 border rounded-lg" dir="ltr" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">عنوان الميتا (Meta Title)</label>
                                        <input value={formData.meta_title} onChange={e => setFormData({...formData, meta_title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">الكلمات المفتاحية (Keywords)</label>
                                        <input value={formData.keywords} onChange={e => setFormData({...formData, keywords: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="كلمة, أخرى, ..." />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">وصف الميتا (Meta Description)</label>
                                    <textarea value={formData.meta_description} onChange={e => setFormData({...formData, meta_description: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-20" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">عنوان Open Graph (للسوشيال ميديا)</label>
                                        <input value={formData.og_title} onChange={e => setFormData({...formData, og_title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">وصف بديل للصور (Alt Text)</label>
                                        <input value={formData.img_alt} onChange={e => setFormData({...formData, img_alt: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">وصف Open Graph</label>
                                    <textarea value={formData.og_description} onChange={e => setFormData({...formData, og_description: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-20" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">الوسوم (Tags)</label>
                                        <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="tag1, tag2" />
                                    </div>
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">كود Schema Markup (JSON-LD)</label>
                                        <textarea value={formData.schema_markup} onChange={e => setFormData({...formData, schema_markup: e.target.value})} className="w-full px-4 py-2 border rounded-lg h-32" dir="ltr" placeholder="{ ... }" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="border-t pt-6 flex justify-end gap-3">
                            <button type="button" onClick={() => setFormOpen(false)} className="px-6 py-2 rounded-lg font-semibold bg-gray-100 hover:bg-gray-200">إلغاء</button>
                            <button type="submit" className="bg-[#0d2233] text-white px-8 py-2 rounded-lg hover:bg-[#1a3651] font-semibold">حفظ التغييرات</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-right h-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">الصورة</th>
                                <th className="p-4 font-semibold text-gray-600">اسم الخدمة</th>
                                <th className="p-4 font-semibold text-gray-600 w-32">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {services.map(service => (
                                <tr key={service.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4">
                                        {service.image ? <img src={service.image} alt={service.title_ar} className="w-16 h-10 object-cover rounded shadow-sm" /> : '-'}
                                    </td>
                                    <td className="p-4 font-semibold text-gray-900">{service.title_ar}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(service)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit2 size={18} /></button>
                                            <button onClick={() => handleDelete(service.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ServicesManager;
