import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Save } from 'lucide-react';

const SeoSettings = () => {
    const [settings, setSettings] = useState([
        { key: 'gtm_id', value: '', label: 'Google Tag Manager ID (GTM-XXXXXXX)', group: 'scripts' },
        { key: 'ga_id', value: '', label: 'Google Analytics ID (G-XXXXXXXXXX)', group: 'scripts' },
        { key: 'search_console', value: '', label: 'Google Search Console Verification Code', group: 'scripts' },
        { key: 'meta_pixel', value: '', label: 'Meta Pixel ID', group: 'scripts' },
        { key: 'custom_head_scripts', value: '', label: 'Custom <head> Scripts (HTML)', isTextarea: true, group: 'scripts' },

        { key: 'home_meta_title_ar', value: '', label: 'عنوان الصفحة الرئيسية (Home Title - عربي)', group: 'global' },
        { key: 'home_meta_title_en', value: '', label: 'عنوان الصفحة الرئيسية (Home Title - إنجليزي)', group: 'global' },
        { key: 'global_meta_title_ar', value: '', label: 'العنوان الافتراضي لباقي الصفحات (Fallback Title - عربي)', group: 'global' },
        { key: 'global_meta_title_en', value: '', label: 'العنوان الافتراضي لباقي الصفحات (Fallback Title - إنجليزي)', group: 'global' },
        { key: 'global_meta_description_ar', value: '', label: 'الوصف العام للموقع (Meta Description - عربي)', isTextarea: true, group: 'global' },
        { key: 'global_meta_description_en', value: '', label: 'الوصف العام للموقع (Meta Description - إنجليزي)', isTextarea: true, group: 'global' },
        { key: 'global_keywords', value: '', label: 'كلمات مفتاحية عامة (Keywords)', isTextarea: true, group: 'global' },
        { key: 'default_og_image', value: '', label: 'رابط الصورة الافتراضي للمشاركة (OG Image)', group: 'global' },

        { key: 'robots_txt', value: '', label: 'محتوى ملف robots.txt', isTextarea: true, group: 'files' },
        { key: 'sitemap_xml', value: '', label: 'محتوى ملف sitemap.xml', isTextarea: true, group: 'files' },
    ]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const { data } = await axios.get('/api/admin/seo');
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

    const handleSave = async () => {
        setSaving(true);
        try {
            await axios.put('/api/admin/seo', {
                settings: settings.map(({ key, value }) => ({ key, value }))
            });
            alert('تم حفظ إعدادات SEO بنجاح!');
        } catch (err) {
            console.error(err);
            alert('حدث خطأ أثناء الحفظ.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>جاري التحميل...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">إعدادات توجيه محركات البحث (SEO)</h1>
                    <p className="text-gray-500 mt-1">أضف أكواد التتبع الخاص بك هنا لربط الموقع بالخدمات الخارجية.</p>
                </div>
                <button 
                    onClick={handleSave} 
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#0d2233] text-white px-6 py-3 rounded-lg hover:bg-[#1a3651] transition font-semibold max-h-min"
                >
                    <Save size={20} />
                    {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
            </div>

            <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold border-b pb-2">إعدادات الأرشفة الافتراضية (Global Fallback SEO)</h2>
                    {settings.filter(s => s.group === 'global').map((setting) => (
                        <div key={setting.key}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{setting.label}</label>
                            {setting.isTextarea ? (
                                <textarea
                                    value={setting.value}
                                    onChange={(e) => handleChange(setting.key, e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2233] focus:border-[#0d2233] outline-none h-24"
                                    dir={setting.key.includes('_en') ? "ltr" : "auto"}
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={setting.value}
                                    onChange={(e) => handleChange(setting.key, e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2233] focus:border-[#0d2233] outline-none"
                                    dir={setting.key.includes('_en') || setting.key.includes('image') ? "ltr" : "auto"}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold border-b pb-2">أكواد التتبع والتحليل السحابية (Scripts & Analytics)</h2>
                    {settings.filter(s => s.group === 'scripts').map((setting) => (
                        <div key={setting.key}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{setting.label}</label>
                            {setting.isTextarea ? (
                                <textarea
                                    value={setting.value}
                                    onChange={(e) => handleChange(setting.key, e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2233] focus:border-[#0d2233] outline-none h-32"
                                    dir="ltr"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={setting.value}
                                    onChange={(e) => handleChange(setting.key, e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2233] focus:border-[#0d2233] outline-none"
                                    dir="ltr"
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
                    <h2 className="text-xl font-bold border-b pb-2">ملفات محركات البحث (SEO Files)</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        يمكنك إضافة محتوى ملفي robots.txt و sitemap.xml هنا ليتم عرضهما لمحركات البحث بشكل ديناميكي.
                    </p>
                    {settings.filter(s => s.group === 'files').map((setting) => (
                        <div key={setting.key}>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">{setting.label}</label>
                            <textarea
                                value={setting.value}
                                onChange={(e) => handleChange(setting.key, e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d2233] focus:border-[#0d2233] outline-none h-48 font-mono text-sm"
                                dir="ltr"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SeoSettings;
