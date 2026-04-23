import React, { useEffect, useState, Suspense } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

// Lazy-load ReactQuill to prevent crashes if the module fails
let ReactQuill = null;
// try {
//     ReactQuill = React.lazy(() => import('react-quill'));
// } catch (e) {
//     console.warn('ReactQuill failed to load, using textarea fallback');
// }

// Simple fallback rich-text editor
const FallbackEditor = ({ value, onChange, dir }) => (
    <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 outline-none min-h-[200px] font-sans"
        dir={dir || 'auto'}
    />
);

// Wrapper that tries ReactQuill, falls back to textarea
const RichTextEditor = ({ value, onChange, dir }) => {
    if (!ReactQuill) return <FallbackEditor value={value} onChange={onChange} dir={dir} />;
    return (
        <Suspense fallback={<FallbackEditor value={value} onChange={onChange} dir={dir} />}>
            <ReactQuill theme="snow" value={value || ''} onChange={onChange} className="bg-white" />
        </Suspense>
    );
};

const BlogsManager = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const emptyForm = {
        title_ar: '', title_en: '', excerpt_ar: '', excerpt_en: '',
        content_ar: '', content_en: '', image: '', publish_date: '', is_published: false,
        slug: '', meta_title: '', meta_description: '', keywords: '', img_alt: '',
        canonical_url: '', tags: '', og_title: '', og_description: '', schema_markup: ''
    };
    const [formData, setFormData] = useState(emptyForm);
    const [activeTab, setActiveTab] = useState('basic'); // 'basic' or 'seo'
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Try to import quill CSS
    useEffect(() => {
        try {
            import('react-quill/dist/quill.snow.css');
        } catch (e) {
            // ignore
        }
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/admin/blogs');
            setBlogs(data);
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
        formDataUpload.append('folder', 'blogs');
        
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
                await axios.put(`/api/admin/blogs/${editId}`, formData);
            } else {
                await axios.post('/api/admin/blogs', formData);
            }
            setFormOpen(false);
            setEditId(null);
            setFormData({...emptyForm});
            setActiveTab('basic');
            fetchBlogs();
        } catch (err) {
            console.error(err);
            alert('حدث خطأ أثناء الحفظ — تأكد من ملء جميع الحقول المطلوبة');
        }
    };

    const handleEdit = (blog) => {
        setEditId(blog.id);
        setFormData({
            title_ar: blog.title_ar, title_en: blog.title_en,
            excerpt_ar: blog.excerpt_ar, excerpt_en: blog.excerpt_en,
            content_ar: blog.content_ar || '', content_en: blog.content_en || '',
            image: blog.image || '', publish_date: blog.publish_date || '',
            is_published: blog.is_published,
            slug: blog.slug || '', meta_title: blog.meta_title || '',
            meta_description: blog.meta_description || '', keywords: blog.keywords || '',
            img_alt: blog.img_alt || '', canonical_url: blog.canonical_url || '',
            tags: blog.tags || '', og_title: blog.og_title || '',
            og_description: blog.og_description || '', schema_markup: blog.schema_markup || ''
        });
        setActiveTab('basic');
        setFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
        try {
            await axios.delete(`/api/admin/blogs/${id}`);
            fetchBlogs();
        } catch (err) {
            console.error(err);
        }
    };

    const openNewForm = () => {
        setEditId(null);
        setFormData({
            ...emptyForm,
            publish_date: new Date().toISOString().split('T')[0],
        });
        setActiveTab('basic');
        setFormOpen(true);
    };

    if (loading) return <div>جاري التحميل...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">المدونات والمقالات</h1>
                    <p className="text-gray-500 mt-1">إضافة وتعديل مقالات المدونة.</p>
                </div>
                <button 
                    onClick={openNewForm}
                    className="flex items-center gap-2 bg-[#0d2233] text-white px-4 py-2 rounded-lg hover:bg-[#1a3651] transition"
                >
                    <Plus size={20} />
                    إضافة مقال
                </button>
            </div>

            {formOpen ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">{editId ? 'تعديل مقال' : 'مقال جديد'}</h2>
                        <button onClick={() => setFormOpen(false)} className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex gap-4 mb-6 border-b">
                        <button type="button" onClick={() => setActiveTab('basic')} className={`pb-2 px-4 font-bold ${activeTab === 'basic' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>البيانات الأساسية</button>
                        <button type="button" onClick={() => setActiveTab('seo')} className={`pb-2 px-4 font-bold ${activeTab === 'seo' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>إعدادات محركات البحث (SEO)</button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {activeTab === 'basic' ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان (عربي) *</label>
                                <input value={formData.title_ar} onChange={e => setFormData({...formData, title_ar: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">العنوان (إنجليزي) *</label>
                                <input value={formData.title_en} onChange={e => setFormData({...formData, title_en: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" dir="ltr" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">مقتطف (عربي) *</label>
                                <textarea value={formData.excerpt_ar} onChange={e => setFormData({...formData, excerpt_ar: e.target.value})} required className="w-full px-4 py-2 border rounded-lg h-24" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">مقتطف (إنجليزي) *</label>
                                <textarea value={formData.excerpt_en} onChange={e => setFormData({...formData, excerpt_en: e.target.value})} required className="w-full px-4 py-2 border rounded-lg h-24" dir="ltr" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">المحتوى كاملاً (عربي) *</label>
                            <RichTextEditor value={formData.content_ar} onChange={val => setFormData({...formData, content_ar: val})} />
                        </div>

                        <div dir="ltr">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">المحتوى كاملاً (إنجليزي) *</label>
                            <RichTextEditor value={formData.content_en} onChange={val => setFormData({...formData, content_en: val})} dir="ltr" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">تاريخ النشر</label>
                                <input type="date" value={formData.publish_date} onChange={e => setFormData({...formData, publish_date: e.target.value})} className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">صورة المقال</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200">
                                        <ImageIcon size={20} />
                                        {uploading ? 'جاري الرفع...' : 'اختر صورة'}
                                        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                                    </label>
                                    {formData.image && <img src={formData.image} alt="Preview" className="h-10 w-16 object-cover rounded" />}
                                </div>
                            </div>
                            <div className="flex items-center gap-2 h-10">
                                <input type="checkbox" id="published" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} className="w-5 h-5" />
                                <label htmlFor="published" className="text-sm font-semibold text-gray-700">حالة النشر (مرئي للزوار)</label>
                            </div>
                            </div>
                            </>
                        ) : (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">رابط المقال (Slug)</label>
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
                            <button type="button" onClick={() => setFormOpen(false)} className="px-6 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">إلغاء</button>
                            <button type="submit" className="bg-[#0d2233] text-white px-8 py-2 rounded-lg hover:bg-[#1a3651] font-semibold">حفظ المقال</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-right h-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">الصورة</th>
                                <th className="p-4 font-semibold text-gray-600">العنوان</th>
                                <th className="p-4 font-semibold text-gray-600">الحالة</th>
                                <th className="p-4 font-semibold text-gray-600">تاريخ النشر</th>
                                <th className="p-4 font-semibold text-gray-600 w-32">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {blogs.map(blog => (
                                <tr key={blog.id} className="hover:bg-gray-50">
                                    <td className="p-4">
                                        {blog.image ? <img src={blog.image} alt={blog.title_ar} className="w-16 h-10 object-cover rounded" /> : '-'}
                                    </td>
                                    <td className="p-4 font-semibold">{blog.title_ar}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {blog.is_published ? 'منشور' : 'مسودة'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">{blog.publish_date || '-'}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(blog)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 size={18} /></button>
                                            <button onClick={() => handleDelete(blog.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {blogs.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">لا يوجد مقالات حتى الآن. اضغط "إضافة مقال" لإنشاء أول مقال.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BlogsManager;
