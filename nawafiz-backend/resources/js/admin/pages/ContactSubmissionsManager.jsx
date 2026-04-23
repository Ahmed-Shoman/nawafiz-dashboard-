import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Mail, CheckCircle, Trash2, Eye } from 'lucide-react';

const ContactSubmissionsManager = () => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMessage, setViewMessage] = useState(null);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const { data } = await axios.get('/api/admin/contact-submissions');
            setSubmissions(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkRead = async (id) => {
        try {
            await axios.put(`/api/admin/contact-submissions/${id}/read`);
            fetchSubmissions();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('هل أنت متأكد من مسح هذه الرسالة نهائياً؟')) return;
        try {
            await axios.delete(`/api/admin/contact-submissions/${id}`);
            fetchSubmissions();
        } catch (err) {
            console.error(err);
        }
    };

    const StatusBadge = ({ isRead }) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isRead ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
            {isRead ? 'مقروءة' : 'جديدة'}
        </span>
    );

    if (loading) return <div>جاري التحميل...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Mail className="text-gray-500" />
                        رسائل التواصل
                    </h1>
                    <p className="text-gray-500 mt-1">عرض وإدارة الرسائل الواردة من صفحة اتصل بنا.</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right h-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">الاسم</th>
                            <th className="p-4 font-semibold text-gray-600">البريد والهاتف</th>
                            <th className="p-4 font-semibold text-gray-600">التاريخ</th>
                            <th className="p-4 font-semibold text-gray-600">الحالة</th>
                            <th className="p-4 font-semibold text-gray-600 w-32">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y relative">
                        {submissions.map(sub => (
                            <tr key={sub.id} className={`hover:bg-gray-50 ${!sub.is_read ? 'bg-green-50/30' : ''}`}>
                                <td className="p-4 font-semibold">{sub.name}</td>
                                <td className="p-4">
                                    <div className="text-sm">{sub.email}</div>
                                    {sub.phone && <div className="text-xs text-gray-500 mt-1" dir="ltr">{sub.phone}</div>}
                                </td>
                                <td className="p-4 text-gray-500" dir="ltr">{new Date(sub.created_at).toLocaleString('ar-EG')}</td>
                                <td className="p-4">
                                    <StatusBadge isRead={sub.is_read} />
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => setViewMessage(sub)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="عرض الرسالة"><Eye size={18} /></button>
                                        {!sub.is_read && (
                                            <button onClick={() => handleMarkRead(sub.id)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="تحديد كمقروء"><CheckCircle size={18} /></button>
                                        )}
                                        <button onClick={() => handleDelete(sub.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="مسح"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {submissions.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">لا يوجد رسائل حتى الآن.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {viewMessage && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold">رسالة من {viewMessage.name}</h3>
                            <button onClick={() => setViewMessage(null)} className="text-gray-400 hover:text-gray-600">×</button>
                        </div>
                        <div className="p-6 bg-gray-50/50">
                            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{viewMessage.message}</p>
                        </div>
                        <div className="p-4 border-t border-gray-100 flex justify-end gap-3">
                            {!viewMessage.is_read && (
                                <button onClick={() => { handleMarkRead(viewMessage.id); setViewMessage({...viewMessage, is_read: true}); }} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">تحديد كمقروء</button>
                            )}
                            <button onClick={() => setViewMessage(null)} className="px-4 py-2 border rounded-lg text-sm font-semibold text-gray-600">إغلاق</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactSubmissionsManager;
