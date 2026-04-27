import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Save, Image as ImageIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import RichTextEditor from '../components/RichTextEditor';


const SectionsManager = () => {
    const { key } = useParams();
    const [section, setSection] = useState(null);
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchSection();
    }, [key]);

    const fetchSection = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/admin/sections');
            const sec = data.find(s => s.key === key);
            if (sec) {
                setSection(sec);
                setContent(sec.content || {});
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setContent(prev => ({ ...prev, [field]: value }));
    };

    const handleSlideChange = (index, field, value) => {
        const newSlides = [...content.slides];
        newSlides[index] = { ...newSlides[index], [field]: value };
        setContent(prev => ({ ...prev, slides: newSlides }));
    };

    const handleStatChange = (index, field, value) => {
        const newStats = [...content.items];
        newStats[index] = { ...newStats[index], [field]: value };
        setContent(prev => ({ ...prev, items: newStats }));
    };

    const handleUpload = async (e, fieldPath) => {
        const file = e.target.files[0];
        if (!file) return;
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('folder', 'sections');
        
        setUploading(true);
        try {
            const { data } = await axios.post('/api/admin/upload', formDataUpload);
            if (typeof fieldPath === 'function') {
                fieldPath(data.path);
            } else {
                handleChange(fieldPath, data.path);
            }
        } catch (err) {
            alert('فشل رفع الصورة');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.put(`/api/admin/sections/${key}`, { content });
            alert('تم حفظ القسم بنجاح!');
        } catch (err) {
            console.error(err);
            alert('حدث خطأ أثناء الحفظ.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>جاري التحميل...</div>;
    if (!section) return <div>القسم غير موجود.</div>;

    const renderInput = (label, fieldKey, isTextarea = false, useLtr = false) => (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
            {isTextarea ? (
                <RichTextEditor
                    value={content[fieldKey] || ''}
                    onChange={val => handleChange(fieldKey, val)}
                    dir={useLtr ? 'ltr' : 'auto'}
                />
            ) : (
                <input
                    type="text"
                    value={content[fieldKey] || ''}
                    onChange={e => handleChange(fieldKey, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 outline-none"
                    dir={useLtr ? 'ltr' : 'auto'}
                />
            )}
        </div>
    );


    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 capitalize">إدارة قسم: {key}</h1>
                </div>
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#0d2233] text-white px-6 py-3 rounded-lg hover:bg-[#1a3651] transition font-semibold"
                >
                    <Save size={20} />
                    {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                
                {key === 'hero' && (
                    <>
                        <h2 className="text-xl font-bold border-b pb-2 mb-4">النصوص العامة</h2>
                        {renderInput('النص الفرعي', 'subtitle_ar', true)}
                        {renderInput('زر 1', 'cta_more_ar')}
                        {renderInput('زر 2', 'cta_projects_ar')}

                        <h2 className="text-xl font-bold border-b pb-2 mt-8 mb-4">الشرائح (Slides)</h2>
                        {content.slides?.map((slide, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-lg mb-6 border">
                                <h3 className="font-bold mb-3 text-[hsl(42,87%,55%)]">الشريحة {idx + 1}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm mb-1">العنوان (عربي)</label>
                                        <input value={slide.title_ar} onChange={e => handleSlideChange(idx, 'title_ar', e.target.value)} className="w-full p-2 border rounded" />
                                    </div>
                                    <div>
                                        <label className="block text-sm mb-1">العنوان (إنجليزي)</label>
                                        <input value={slide.title_en} onChange={e => handleSlideChange(idx, 'title_en', e.target.value)} className="w-full p-2 border rounded" dir="ltr" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">الصورة الخلفية</label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2 bg-white px-3 py-1 border rounded cursor-pointer">
                                            <ImageIcon size={16} /> تغيير
                                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, (path) => handleSlideChange(idx, 'image', path))} />
                                        </label>
                                        {slide.image && <img src={slide.image} className="h-10 rounded" alt="view" />}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {key === 'about' && (
                    <>
                        <div className="grid grid-cols-1 gap-4">
                            {renderInput('شارة القسم', 'badge_ar')}
                            {renderInput('العنوان الرئيسي', 'title_ar')}
                        </div>
                        {renderInput('وصف 1', 'desc1_ar', true)}
                        {renderInput('وصف 2', 'desc2_ar', true)}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                {renderInput('عنوان الرؤية', 'vision_title_ar')}
                                {renderInput('وصف الرؤية', 'vision_desc_ar', true)}
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                {renderInput('عنوان المهمة', 'mission_title_ar')}
                                {renderInput('وصف المهمة', 'mission_desc_ar', true)}
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-bold mb-2">صورة القسم</label>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 bg-white px-4 py-2 border rounded cursor-pointer">
                                    <ImageIcon size={16} /> رفع وتغيير
                                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'image')} />
                                </label>
                                {content.image && <img src={content.image} className="h-16 rounded" alt="view" />}
                            </div>
                        </div>
                    </>
                )}

                {key === 'stats' && (
                    <>
                        {renderInput('العنوان', 'title_ar')}
                        {renderInput('الوصف', 'subtitle_ar', true)}

                        <h2 className="text-xl font-bold border-b pb-2 mt-8 mb-4">عناصر الإحصائيات</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {content.items?.map((item, idx) => (
                                <div key={idx} className="bg-gray-50 p-4 rounded-lg border">
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        <div>
                                            <label className="text-xs font-bold">الرقم</label>
                                            <input type="number" value={item.value} onChange={e => handleStatChange(idx, 'value', e.target.value)} className="w-full p-2 border rounded text-left" dir="ltr" />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold">اللاحقة (+)</label>
                                            <input value={item.suffix} onChange={e => handleStatChange(idx, 'suffix', e.target.value)} className="w-full p-2 border rounded text-left" dir="ltr" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-xs">الاسم (عربي)</label>
                                            <input value={item.label_ar} onChange={e => handleStatChange(idx, 'label_ar', e.target.value)} className="w-full p-2 border rounded" />
                                        </div>
                                        <div>
                                            <label className="text-xs">الاسم (إنجليزي)</label>
                                            <input value={item.label_en} onChange={e => handleStatChange(idx, 'label_en', e.target.value)} className="w-full p-2 border rounded" dir="ltr" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                
                {key === 'footer' && (
                    <>
                        {renderInput('وصف التذييل', 'desc_ar', true)}
                        {renderInput('حقوق الملكية', 'rights_ar')}

                        <h2 className="text-xl font-bold border-b pb-2 mt-8 mb-4">روابط سوشل ميديا</h2>
                        {content.social_links?.map((link, idx) => (
                            <div key={idx} className="flex gap-4 mb-2">
                                <input value={link.label} readOnly className="w-1/3 p-2 border rounded bg-gray-50 font-bold" />
                                <input value={link.url} onChange={e => {
                                    const newLinks = [...content.social_links];
                                    newLinks[idx] = { ...newLinks[idx], url: e.target.value };
                                    setContent(prev => ({ ...prev, social_links: newLinks }));
                                }} className="w-2/3 p-2 border rounded text-left" dir="ltr" />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default SectionsManager;
