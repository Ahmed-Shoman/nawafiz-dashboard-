import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Save, Upload, Loader2 } from 'lucide-react';

const SiteSettings = () => {
    const [settings, setSettings] = useState([
        // Branding
        { key: 'logo', value: '', label: 'شعار الموقع (Logo)' },
        { key: 'favicon', value: '', label: 'أيقونة المتصفح (Favicon)' },
        
        // Basic Info
        { key: 'phone', value: '', label: 'رقم الهاتف' },
        { key: 'email', value: '', label: 'البريد الإلكتروني' },
        { key: 'whatsapp', value: '', label: 'رقم واتساب' },
        { key: 'address_ar', value: '', label: 'العنوان (عربي)' },
        { key: 'address_en', value: '', label: 'العنوان (إنجليزي)' },

        // Social Media
        { key: 'social_x', value: '', label: 'رابط X (تويتر سابقاً)' },
        { key: 'social_instagram', value: '', label: 'رابط انستجرام' },
        { key: 'social_snapchat', value: '', label: 'رابط سناب شات' },
        { key: 'social_tiktok', value: '', label: 'رابط تيك توك' },
        { key: 'social_facebook', value: '', label: 'رابط فيسبوك' },
        { key: 'social_linkedin', value: '', label: 'رابط لينكد إن' },
        
        // Hours
        { key: 'hours_sun_thu_ar', value: '', label: 'مواعيد العمل: الأحد-الخميس (عربي)' },
        { key: 'hours_sun_thu_en', value: '', label: 'مواعيد العمل: الأحد-الخميس (إنجليزي)' },
        { key: 'hours_sat_ar', value: '', label: 'مواعيد العمل: السبت (عربي)' },
        { key: 'hours_sat_en', value: '', label: 'مواعيد العمل: السبت (إنجليزي)' },
        { key: 'hours_fri_ar', value: '', label: 'مواعيد العمل: الجمعة (عربي)' },
        { key: 'hours_fri_en', value: '', label: 'مواعيد العمل: الجمعة (إنجليزي)' },
    ]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploadingKey, setUploadingKey] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get('/api/admin/settings');
                setSettings(prev => prev.map(p => {
                    const found = data.find(s => s.key === p.key);
                    return found ? { ...p, value: found.value || '' } : p;
                }));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (key, value) => {
        setSettings(prev => prev.map(p => p.key === key ? { ...p, value } : p));
    };

    const handleUpload = async (e, key) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'settings');
        
        setUploadingKey(key);
        try {
            const { data } = await axios.post('/api/admin/upload', formData);
            handleChange(key, data.path);
        } catch (err) {
            console.error(err);
            alert('فشل رفع الصورة');
        } finally {
            setUploadingKey(null);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.put('/api/admin/settings', {
                settings: settings.map(({ key, value }) => ({ key, value }))
            });
            alert('تم حفظ إعدادات الموقع بنجاح!');
        } catch (err) {
            console.error(err);
            alert('حدث خطأ أثناء الحفظ.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>جاري التحميل...</div>;

    const brandFields = ['logo', 'favicon'];
    const basicFields = ['phone', 'email', 'whatsapp', 'address_ar', 'address_en'];
    const socialFields = ['social_x', 'social_instagram', 'social_snapchat', 'social_tiktok', 'social_facebook', 'social_linkedin'];
    const hoursFields = settings.filter(s => !brandFields.includes(s.key) && !basicFields.includes(s.key) && !socialFields.includes(s.key));

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">إعدادات الموقع المتقدمة</h1>
                    <p className="text-gray-500 mt-1">إدارة الهوية البصرية، بيانات الاتصال، الروابط الاجتماعية ومواعيد العمل.</p>
                </div>
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#0d2233] text-white px-6 py-3 rounded-lg hover:bg-[#1a3651] transition font-semibold max-h-min"
                >
                    {saving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save size={20} />}
                    {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Branding Section */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6 md:col-span-2">
                    <h2 className="text-xl font-bold border-b pb-2 text-[#0d2233]">الهوية البصرية للموقع</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {settings.filter(s => brandFields.includes(s.key)).map((setting) => (
                            <div key={setting.key} className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                                <label className="block text-sm font-semibold text-gray-700">{setting.label}</label>
                                {setting.value && (
                                    <div className="bg-white p-2 rounded-lg inline-block border shadow-sm">
                                        <img src={setting.value} alt={setting.label} className="h-16 w-auto object-contain" />
                                    </div>
                                )}
                                <div className="flex gap-2 items-center">
                                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition shadow-sm font-medium">
                                        {uploadingKey === setting.key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                        {uploadingKey === setting.key ? 'جاري الرفع...' : 'اختر صورة جديدة'}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleUpload(e, setting.key)}
                                            disabled={uploadingKey !== null}
                                        />
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="أو ضع رابط الصورة هنا..."
                                        value={setting.value}
                                        onChange={(e) => handleChange(setting.key, e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2233] focus:border-[#0d2233] outline-none text-left"
                                        dir="ltr"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">
                                    {setting.key === 'logo' ? 'يفضل صورة شفافة بصيغة PNG وبأبعاد متناسقة للـ Navigation Bar.' : 'يُفضل صورة مربعة بحجم 64×64 بكسل.'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold border-b pb-2 text-[#0d2233]">روابط التواصل الاجتماعي</h2>
                    {settings.filter(s => socialFields.includes(s.key)).map((setting) => (
                        <div key={setting.key}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{setting.label}</label>
                            <input
                                type="url"
                                placeholder="https://"
                                value={setting.value}
                                onChange={(e) => handleChange(setting.key, e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2233] focus:border-[#0d2233] outline-none text-left"
                                dir="ltr"
                            />
                        </div>
                    ))}
                </div>

                {/* Basic Info */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold border-b pb-2 text-[#0d2233]">بيانات الاتصال</h2>
                    {settings.filter(s => basicFields.includes(s.key)).map((setting) => (
                        <div key={setting.key}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{setting.label}</label>
                            <input
                                type="text"
                                value={setting.value}
                                onChange={(e) => handleChange(setting.key, e.target.value)}
                                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2233] focus:border-[#0d2233] outline-none ${['phone', 'email', 'whatsapp'].includes(setting.key) ? 'text-left' : ''}`}
                                dir={['phone', 'email', 'whatsapp'].includes(setting.key) ? 'ltr' : 'auto'}
                            />
                        </div>
                    ))}
                </div>

                {/* Working Hours */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6 md:col-span-2">
                    <h2 className="text-xl font-bold border-b pb-2 text-[#0d2233]">ساعات العمل</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {hoursFields.map((setting) => (
                            <div key={setting.key}>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">{setting.label}</label>
                                <input
                                    type="text"
                                    value={setting.value}
                                    onChange={(e) => handleChange(setting.key, e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2233] focus:border-[#0d2233] outline-none"
                                    dir="auto"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SiteSettings;
