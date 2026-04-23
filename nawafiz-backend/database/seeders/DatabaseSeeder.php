<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Project;
use App\Models\Section;
use App\Models\SeoSetting;
use App\Models\Service;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ── Admin User ──
        User::updateOrCreate(
            ['email' => 'admin@nawafiz-dev.sa'],
            [
                'name' => 'Admin',
                'password' => Hash::make('admin123'),
            ]
        );

        // ── Sections ──
        $sections = [
            [
                'key' => 'hero',
                'order' => 1,
                'content' => [
                    'slides' => [
                        ['title_ar' => 'نبني مستقبل العقارات في المملكة العربية السعودية', 'title_en' => 'Building the Future of Real Estate in Saudi Arabia', 'image' => '/images/hero-1.png'],
                        ['title_ar' => 'التميز في البناء والتطوير', 'title_en' => 'Excellence in Construction & Development', 'image' => '/images/hero-2.png'],
                        ['title_ar' => 'رؤيتك، خبرتنا', 'title_en' => 'Your Vision, Our Expertise', 'image' => '/images/hero-3.png'],
                        ['title_ar' => 'نشكّل المشهد العمراني', 'title_en' => 'Shaping Urban Landscapes', 'image' => '/images/hero-4.png'],
                    ],
                    'subtitle_ar' => 'نوافذ المستقبل للتطوير العقاري تقدم مساحات معيشة وعمل فاخرة ومستدامة ومبتكرة.',
                    'subtitle_en' => 'Nawafiz Al-Mustaqbal Real Estate Development provides premium, sustainable, and innovative living and working spaces.',
                    'cta_more_ar' => 'تواصل معنا',
                    'cta_more_en' => 'Learn More',
                    'cta_projects_ar' => 'عرض المشاريع',
                    'cta_projects_en' => 'View Projects',
                ],
            ],
            [
                'key' => 'about',
                'order' => 2,
                'content' => [
                    'badge_ar' => 'من نحن', 'badge_en' => 'About Us',
                    'title_ar' => 'نوافذ المستقبل', 'title_en' => 'Who We Are',
                    'desc1_ar' => 'نوافذ المستقبل هي شركة رائدة في مجال التطوير العقاري في المملكة العربية السعودية، مكرسة لصياغة بيئات حضرية استثنائية تمزج بين الفخامة الحديثة والاستدامة العميقة.',
                    'desc1_en' => 'Nawafiz Al-Mustaqbal is a leading real estate development company in Saudi Arabia, dedicated to crafting exceptional urban environments that blend modern luxury with profound sustainability.',
                    'desc2_ar' => 'من قلب المدينة المنورة، نفخر بتقديم مشاريع تاريخية تثري المجتمعات وتوفر قيمة لا مثيل لها لعملائنا ومستثمرينا.',
                    'desc2_en' => 'Based in the heart of Medina, we take pride in delivering landmark projects that enrich communities and provide unparalleled value to our clients and investors.',
                    'vision_title_ar' => 'رؤيتنا', 'vision_title_en' => 'Our Vision',
                    'vision_desc_ar' => 'أن نكون المطور العقاري الأول في المملكة، لدفع عجلة التحول في المعيشة الحضرية تماشياً مع رؤية 2030.',
                    'vision_desc_en' => 'To be the premier real estate developer in the Kingdom, driving the transformation of urban living in alignment with Vision 2030.',
                    'mission_title_ar' => 'مهمتنا', 'mission_title_en' => 'Our Mission',
                    'mission_desc_ar' => 'تقديم حلول عقارية مبتكرة وعالية الجودة ومستدامة تتجاوز التوقعات وتعزز ازدهار المجتمع.',
                    'mission_desc_en' => 'To deliver innovative, high-quality, and sustainable real estate solutions that exceed expectations and foster community prosperity.',
                    'image' => '/images/about-bg.png',
                ],
            ],
            [
                'key' => 'stats',
                'order' => 3,
                'content' => [
                    'title_ar' => 'لماذا تختار نوافذ المستقبل؟',
                    'title_en' => 'Why Choose Nawafiz Al-Mustaqbal?',
                    'subtitle_ar' => 'مع فريق من المهندسين والخبراء في البناء، نقدم خدماتنا بأعلى معايير الجودة والاحترافية، لنبني معك مستقبلاً آمناً ومستداماً.',
                    'subtitle_en' => 'With a team of engineers and construction experts, we deliver our services to the highest standards of quality and professionalism, building a safe and sustainable future with you.',
                    'items' => [
                        ['value' => 500, 'suffix' => '+', 'label_ar' => 'مشروع منجز', 'label_en' => 'Completed Projects'],
                        ['value' => 15, 'suffix' => '+', 'label_ar' => 'سنة خبرة', 'label_en' => 'Years of Experience'],
                        ['value' => 1000, 'suffix' => '+', 'label_ar' => 'عميل راضٍ', 'label_en' => 'Satisfied Clients'],
                        ['value' => 50, 'suffix' => '+', 'label_ar' => 'جائزة تميز', 'label_en' => 'Excellence Awards'],
                    ],
                ],
            ],
            [
                'key' => 'contact',
                'order' => 7,
                'content' => [
                    'badge_ar' => 'تواصل معنا', 'badge_en' => 'Get In Touch',
                    'title_ar' => 'اتصل بنا', 'title_en' => 'Contact Us',
                    'subtitle_ar' => 'هل لديك سؤال أو مهتم بمشاريعنا؟ يسعدنا أن نسمع منك.',
                    'subtitle_en' => 'Have a question or interested in our projects? We\'d love to hear from you.',
                ],
            ],
            [
                'key' => 'footer',
                'order' => 8,
                'content' => [
                    'desc_ar' => 'شريكك الأمثل لتحقيق طموحاتك المعمارية. نبني المستقبل بتصاميم مبتكرة وتنفيذ فائق الجودة.',
                    'desc_en' => 'Your ideal partner for achieving your architectural ambitions. We build the future with innovative designs and superior quality execution.',
                    'rights_ar' => 'جميع الحقوق محفوظة © 2026 لشركة نوافذ المستقبل للتطوير العقاري - المدينة المنورة.',
                    'rights_en' => '© 2026 Nawafiz Al-Mustaqbal Real Estate Development – Medina. All Rights Reserved.',
                    'social_links' => [
                        ['label' => 'X', 'url' => 'https://x.com/Nawafedza7'],
                        ['label' => 'Instagram', 'url' => 'https://www.instagram.com/qrrr.39/'],
                        ['label' => 'Snapchat', 'url' => 'https://www.snapchat.com/add/nwf600700'],
                        ['label' => 'TikTok', 'url' => 'https://www.tiktok.com/@nfw705'],
                    ],
                ],
            ],
        ];

        foreach ($sections as $s) {
            Section::updateOrCreate(['key' => $s['key']], $s);
        }

        // ── Projects ──
        $projects = [
            ['title_ar' => 'أبراج نوافذ', 'title_en' => 'Nawafiz Towers', 'desc_ar' => 'مجمع سكني فاخر في وسط المدينة المنورة.', 'desc_en' => 'Luxury residential complex in central Medina.', 'image' => '/images/hero-2.png', 'order' => 1],
            ['title_ar' => 'المركز التجاري المدينة', 'title_en' => 'Al-Madinah Commercial Center', 'desc_ar' => 'مركز نابض بالحياة للأعمال والتجزئة.', 'desc_en' => 'A vibrant hub for business and retail.', 'image' => '/images/hero-1.png', 'order' => 2],
            ['title_ar' => 'مجمع فيلات المستقبل', 'title_en' => 'Future Villas Complex', 'desc_ar' => 'مجتمع سكني مسور حصري مع مرافق ممتازة.', 'desc_en' => 'Exclusive gated community with premium amenities.', 'image' => '/images/hero-3.png', 'order' => 3],
            ['title_ar' => 'مركز الأعمال المدينة', 'title_en' => 'Business Hub Al-Madina', 'desc_ar' => 'مكاتب شركات حديثة مصممة للابتكار.', 'desc_en' => 'Modern corporate offices designed for innovation.', 'image' => '/images/hero-4.png', 'order' => 4],
            ['title_ar' => 'برج النور السكني', 'title_en' => 'Al-Noor Residential Tower', 'desc_ar' => 'معيشة في المباني الشاهقة مع إطلالات خلابة على المدينة.', 'desc_en' => 'High-rise living with breathtaking city views.', 'image' => '/images/about-bg.png', 'order' => 5],
            ['title_ar' => 'منتجع الوادي الأخضر', 'title_en' => 'Green Valley Resort', 'desc_ar' => 'ملاذ فاخر صديق للبيئة.', 'desc_en' => 'An eco-friendly luxury getaway.', 'image' => '/images/hero-2.png', 'order' => 6],
        ];
        foreach ($projects as $p) {
            Project::updateOrCreate(['title_en' => $p['title_en']], $p);
        }

        // ── Testimonials ──
        $testimonials = [
            ['text_ar' => 'الاحترافية والاهتمام بالتفاصيل من نوافذ المستقبل غيرت تمامًا توقعاتنا الاستثمارية.', 'text_en' => 'The professionalism and attention to detail from Nawafiz Al-Mustaqbal have completely transformed our investment expectations.', 'name_ar' => 'أحمد الرشيدي', 'name_en' => 'Ahmed Al-Rashidi', 'role_ar' => 'مستثمر', 'role_en' => 'Investor', 'order' => 1],
            ['text_ar' => 'مقر شركتنا الجديد في مركز الأعمال مذهل. التزامهم بالجودة لا مثيل له حقًا.', 'text_en' => 'Our new corporate headquarters in the Business Hub is spectacular. Their commitment to quality is truly unmatched.', 'name_ar' => 'فاطمة الزهراني', 'name_en' => 'Fatima Al-Zahrani', 'role_ar' => 'الرئيس التنفيذي، تيك فوروارد', 'role_en' => 'CEO, Tech Forward', 'order' => 2],
            ['text_ar' => 'منذ اليوم الأول، كان الفريق شفافًا ومخلصًا وداعمًا بشكل لا يصدق. شريك تطوير رائع.', 'text_en' => 'From day one, the team was transparent, dedicated, and incredibly supportive. A fantastic development partner.', 'name_ar' => 'محمد الغامدي', 'name_en' => 'Mohammed Al-Ghamdi', 'role_ar' => 'مالك منزل', 'role_en' => 'Homeowner', 'order' => 3],
        ];
        foreach ($testimonials as $t) {
            Testimonial::updateOrCreate(['name_en' => $t['name_en']], $t);
        }

        // ── Blogs ──
        $blogs = [
            ['slug' => 'future-of-real-estate-saudi-arabia', 'title_ar' => 'مستقبل العقارات في المملكة العربية السعودية', 'title_en' => 'The Future of Real Estate in Saudi Arabia', 'excerpt_ar' => 'اكتشف كيف تعيد رؤية 2030 تشكيل سوق العقارات بممارسات مبتكرة ومستدامة.', 'excerpt_en' => 'Explore how Vision 2030 is reshaping the real estate market with innovative and sustainable practices.', 'content_ar' => 'يشهد قطاع العقارات السعودي ازدهارًا غير مسبوق، مدفوعًا بالأهداف الطموحة لرؤية 2030.', 'content_en' => 'The Saudi real estate sector is witnessing an unprecedented boom, driven by the ambitious goals of Vision 2030.', 'image' => '/images/about-bg.png', 'publish_date' => '2026-04-05', 'is_published' => true],
            ['slug' => 'sustainable-urban-development', 'title_ar' => 'التنمية الحضرية المستدامة', 'title_en' => 'Sustainable Urban Development', 'excerpt_ar' => 'لماذا تتطلب المجتمعات الحديثة تصميمات صديقة للبيئة.', 'excerpt_en' => 'Why modern communities require eco-friendly designs and green technological integration.', 'content_ar' => 'لم تعد الاستدامة رفاهية؛ إنها ضرورة للحياة الحضرية الحديثة.', 'content_en' => 'Sustainability is no longer a luxury; it is a necessity for modern urban living.', 'image' => '/images/hero-4.png', 'publish_date' => '2026-03-28', 'is_published' => true],
            ['slug' => 'smart-homes-in-medina', 'title_ar' => 'المنازل الذكية في المدينة المنورة الحديثة', 'title_en' => 'Smart Homes in Modern Medina', 'excerpt_ar' => 'نظرة عميقة حول كيفية ارتقاء التقنيات الآلية الذكية بالقدرات السكنية.', 'excerpt_en' => 'A deep dive into how smart automated technologies are elevating residential capabilities.', 'content_ar' => 'تحتضن المدينة المنورة المستقبل مع صعود المنازل الذكية.', 'content_en' => 'Medina is embracing the future with the rise of smart homes.', 'image' => '/images/hero-1.png', 'publish_date' => '2026-03-15', 'is_published' => true],
        ];
        foreach ($blogs as $b) {
            Blog::updateOrCreate(['slug' => $b['slug']], $b);
        }

        // ── SEO Settings ──
        $seoItems = [
            ['key' => 'gtm_id', 'value' => ''],
            ['key' => 'ga_id', 'value' => 'G-TCKQ0X82HR'],
            ['key' => 'search_console', 'value' => 'rxDbboJsW8_pYi2uYNT-SPoVHajF2UsTrLEcgvrWYl8'],
            ['key' => 'meta_pixel', 'value' => ''],
            ['key' => 'custom_head_scripts', 'value' => ''],
        ];
        foreach ($seoItems as $s) {
            SeoSetting::updateOrCreate(['key' => $s['key']], $s);
        }

        // ── Site Settings ──
        $siteItems = [
            ['key' => 'phone', 'value' => '0537502035'],
            ['key' => 'email', 'value' => 'info@nawafiz-dev.sa'],
            ['key' => 'whatsapp', 'value' => '0537502035'],
            ['key' => 'address_ar', 'value' => 'طريق الملك عبدالله، المدينة المنورة، المملكة العربية السعودية'],
            ['key' => 'address_en', 'value' => 'King Abdullah Road, Medina, Saudi Arabia'],
            ['key' => 'hours_sun_thu_ar', 'value' => '8:00 ص - 5:00 م'],
            ['key' => 'hours_sun_thu_en', 'value' => '8:00 AM – 5:00 PM'],
            ['key' => 'hours_sat_ar', 'value' => '9:00 ص - 2:00 م'],
            ['key' => 'hours_sat_en', 'value' => '9:00 AM – 2:00 PM'],
            ['key' => 'hours_fri_ar', 'value' => 'مغلق'],
            ['key' => 'hours_fri_en', 'value' => 'Closed'],
        ];
        foreach ($siteItems as $s) {
            SiteSetting::updateOrCreate(['key' => $s['key']], $s);
        }

        // ── Services (from existing servicesData.ts) ──
        $services = [
            ['slug' => 'general-contracting', 'title_ar' => 'المقاولات العامة', 'title_en' => 'General Contracting', 'short_desc_ar' => 'تنفيذ شامل لكافة المشاريع الإنشائية بأعلى معايير الجودة.', 'short_desc_en' => 'Comprehensive execution of all construction projects with the highest quality standards.', 'long_desc_ar' => 'نوافذ المستقبل للتطوير العقاري تقدم خدمات مقاولات عامة متكاملة تشمل جميع مراحل البناء.', 'long_desc_en' => 'Nawafiz Al-Mustaqbal provides comprehensive general contracting services covering all construction phases.', 'features_ar' => ['إدارة المشروع من البداية إلى النهاية', 'توفير مواد البناء عالية الجودة', 'الالتزام بالجداول الزمنية والميزانيات', 'فريق هندسي متخصص ومؤهل'], 'features_en' => ['End-to-end project management', 'Supply of high-quality materials', 'Adherence to timelines and budgets', 'Specialized engineering team'], 'image' => '/images/hero-1.png', 'icon' => 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z', 'order' => 1],
            ['slug' => 'architectural-design', 'title_ar' => 'التصميم المعماري', 'title_en' => 'Architectural Design', 'short_desc_ar' => 'تصاميم عصرية ومبتكرة تجمع بين الجماليات والوظيفية.', 'short_desc_en' => 'Modern and innovative designs combining aesthetics and functionality.', 'long_desc_ar' => 'يقدم فريق التصميم المعماري لدينا حلولاً إبداعية تجمع بين الجمال والوظيفية.', 'long_desc_en' => 'Our architectural design team offers creative solutions that combine beauty and functionality.', 'features_ar' => ['تصاميم ثلاثية الأبعاد عالية الجودة', 'واجهات عصرية وتقليدية', 'تصاميم مستدامة وصديقة للبيئة'], 'features_en' => ['High-quality 3D designs', 'Modern and traditional facades', 'Sustainable eco-friendly designs'], 'image' => '/images/hero-2.png', 'icon' => 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5', 'order' => 2],
            ['slug' => 'real-estate-management', 'title_ar' => 'إدارة العقارات', 'title_en' => 'Real Estate Management', 'short_desc_ar' => 'خدمات متكاملة لإدارة أملاكك واستثماراتها.', 'short_desc_en' => 'Integrated services for managing your properties and investments.', 'long_desc_ar' => 'ندير ممتلكاتك العقارية بشكل احترافي متكامل.', 'long_desc_en' => 'We manage your real estate properties in a comprehensive and professional manner.', 'features_ar' => ['إدارة عقود الإيجار', 'تحصيل الإيجارات وإعداد التقارير', 'صيانة وإصلاح العقارات'], 'features_en' => ['Lease contract management', 'Rent collection and reporting', 'Property maintenance and repair'], 'image' => '/images/hero-3.png', 'icon' => 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10', 'order' => 3],
        ];
        foreach ($services as $s) {
            Service::updateOrCreate(['slug' => $s['slug']], $s);
        }
    }
}
