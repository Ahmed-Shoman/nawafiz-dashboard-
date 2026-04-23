import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const TestimonialsManager = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        text_ar: '', text_en: '', name_ar: '', name_en: '',
        role_ar: '', role_en: '', order: 0, is_active: true
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const { data } = await axios.get('/api/admin/testimonials');
            setItems(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`/api/admin/testimonials/${editId}`, formData);
            } else {
                await axios.post('/api/admin/testimonials', formData);
            }
            setFormOpen(false);
            fetchItems();
        } catch (err) {
            console.error(err);
            alert('حدث خطأ');
        }
    };

    const handleEdit = (item) => {
        setEditId(item.id);
        setFormData({
            text_ar: item.text_ar, text_en: item.text_en,
            name_ar: item.name_ar, name_en: item.name_en,
            role_ar: item.role_ar, role_en: item.role_en,
            order: item.order || 0, is_active: item.is_active
        });
        setFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('هل أنت متأكد من الحذف؟')) return;
        try {
            await axios.delete(`/api/admin/testimonials/${id}`);
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div>جاري التحميل...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">آراء العملاء</h1>
                    <p className="text-gray-500 mt-1">تعديل التقييمات وآراء العملاء.</p>
                </div>
                <button 
                    onClick={() => { setEditId(null); setFormData({ text_ar: '', text_en: '', name_ar: '', name_en: '', role_ar: '', role_en: '', order: 0, is_active: true }); setFormOpen(true); }}
                    className="flex items-center gap-2 bg-[#0d2233] text-white px-4 py-2 rounded-lg hover:bg-[#1a3651] transition"
                >
                    <Plus size={20} />
                    إضافة تقييم
                </button>
            </div>

            {formOpen ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-xl font-bold">{editId ? 'تعديل التقييم' : 'تقييم جديد'}</h2>
                        <button onClick={() => setFormOpen(false)} className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
                            إلغاء <X size={20} className="inline ml-1" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">اسم العميل (عربي)</label>
                                <input value={formData.name_ar} onChange={e => setFormData({...formData, name_ar: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">اسم العميل (إنجليزي)</label>
                                <input value={formData.name_en} onChange={e => setFormData({...formData, name_en: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" dir="ltr" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">المنصب/الصفة (عربي)</label>
                                <input value={formData.role_ar} onChange={e => setFormData({...formData, role_ar: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">المنصب/الصفة (إنجليزي)</label>
                                <input value={formData.role_en} onChange={e => setFormData({...formData, role_en: e.target.value})} required className="w-full px-4 py-2 border rounded-lg" dir="ltr" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">النص (عربي)</label>
                                <textarea value={formData.text_ar} onChange={e => setFormData({...formData, text_ar: e.target.value})} required className="w-full px-4 py-2 border rounded-lg h-24" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">النص (إنجليزي)</label>
                                <textarea value={formData.text_en} onChange={e => setFormData({...formData, text_en: e.target.value})} required className="w-full px-4 py-2 border rounded-lg h-24" dir="ltr" />
                            </div>
                        </div>

                        <div className="border-t pt-6 flex justify-end gap-3">
                            <button type="submit" className="bg-[#0d2233] text-white px-8 py-2 rounded-lg hover:bg-[#1a3651] font-semibold">حفظ التغييرات</button>
                        </div>
                    </form>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-right h-full">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="p-4 font-semibold text-gray-600">اسم العميل</th>
                                <th className="p-4 font-semibold text-gray-600">المنصب</th>
                                <th className="p-4 font-semibold text-gray-600">النص المقتطف</th>
                                <th className="p-4 font-semibold text-gray-600 w-32">إجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {items.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50 transition">
                                    <td className="p-4 font-semibold text-gray-900">{item.name_ar}</td>
                                    <td className="p-4 text-gray-500">{item.role_ar}</td>
                                    <td className="p-4 text-gray-500 truncate max-w-xs">{item.text_ar}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"><Edit2 size={18} /></button>
                                            <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"><Trash2 size={18} /></button>
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

export default TestimonialsManager;
