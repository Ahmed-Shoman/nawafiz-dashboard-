export interface ServiceData {
  slug: string;
  image: string;
  titleAr: string;
  titleEn: string;
  shortDescAr: string;
  shortDescEn: string;
  longDescAr: string;
  longDescEn: string;
  featuresAr: string[];
  featuresEn: string[];
  icon: string;
}

export const SERVICES: ServiceData[] = [
  {
    slug: "general-contracting",
    image: "/images/hero-1.png",
    titleAr: "المقاولات العامة",
    titleEn: "General Contracting",
    shortDescAr: "تنفيذ شامل لكافة المشاريع الإنشائية بأعلى معايير الجودة والالتزام بالجداول الزمنية المحددة.",
    shortDescEn: "Comprehensive execution of all construction projects with the highest quality standards and commitment to specified timelines.",
    longDescAr: "نوافذ المستقبل للتطوير العقاري تقدم خدمات مقاولات عامة متكاملة تشمل جميع مراحل البناء من التخطيط إلى التسليم. فريقنا من المهندسين والفنيين المتخصصين يضمن تنفيذ مشروعك بأعلى معايير الجودة وفق الجداول الزمنية المتفق عليها. نستخدم أحدث المعدات والتقنيات لضمان نتائج تفوق توقعاتك.",
    longDescEn: "Nawafiz Al-Mustaqbal Real Estate Development provides comprehensive general contracting services covering all construction phases from planning to delivery. Our team of specialized engineers and technicians ensures your project is executed to the highest quality standards on the agreed timelines. We use the latest equipment and technologies to deliver results that exceed your expectations.",
    featuresAr: [
      "إدارة المشروع من البداية إلى النهاية",
      "توفير مواد البناء عالية الجودة",
      "الالتزام بالجداول الزمنية والميزانيات",
      "فريق هندسي متخصص ومؤهل",
      "ضمان الجودة وفق المعايير السعودية",
      "خدمات ما بعد التسليم",
    ],
    featuresEn: [
      "End-to-end project management",
      "Supply of high-quality building materials",
      "Adherence to timelines and budgets",
      "Specialized and qualified engineering team",
      "Quality assurance per Saudi standards",
      "Post-delivery services",
    ],
    icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z",
  },
  {
    slug: "architectural-design",
    image: "/images/hero-2.png",
    titleAr: "التصميم المعماري",
    titleEn: "Architectural Design",
    shortDescAr: "تصاميم عصرية ومبتكرة تجمع بين الجماليات والوظيفية لتلبية رؤيتك وتحويلها إلى واقع ملموس.",
    shortDescEn: "Modern and innovative designs that combine aesthetics and functionality to fulfill your vision and turn it into reality.",
    longDescAr: "يقدم فريق التصميم المعماري لدينا حلولاً إبداعية تجمع بين الجمال والوظيفية، مستوحاةً من الهوية العربية والمعاصرة. نعمل عن كثب مع عملائنا لفهم رؤيتهم وتحويلها إلى مخططات وتصاميم ثلاثية الأبعاد احترافية تعكس تطلعاتهم.",
    longDescEn: "Our architectural design team offers creative solutions that combine beauty and functionality, inspired by both Arab identity and contemporary styles. We work closely with our clients to understand their vision and transform it into professional blueprints and 3D designs that reflect their aspirations.",
    featuresAr: [
      "تصاميم ثلاثية الأبعاد عالية الجودة",
      "واجهات عصرية وتقليدية",
      "تصاميم مستدامة وصديقة للبيئة",
      "التنسيق مع جهات الترخيص",
      "تحديثات التصميم وفق ملاحظات العميل",
      "توافق مع متطلبات الكود السعودي",
    ],
    featuresEn: [
      "High-quality 3D designs",
      "Modern and traditional facades",
      "Sustainable and eco-friendly designs",
      "Coordination with licensing authorities",
      "Design updates per client feedback",
      "Compliance with Saudi building code",
    ],
    icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  },
  {
    slug: "real-estate-management",
    image: "/images/hero-3.png",
    titleAr: "إدارة العقارات",
    titleEn: "Real Estate Management",
    shortDescAr: "خدمات متكاملة لإدارة أملاكك واستثماراتها لضمان أفضل العوائد بأقل جهد من طرفك.",
    shortDescEn: "Integrated services for managing your properties and investments to ensure the best returns with minimal effort.",
    longDescAr: "ندير ممتلكاتك العقارية بشكل احترافي متكامل، بدءًا من التأجير وجذب المستأجرين، وصولًا إلى الصيانة الدورية والتحصيل المالي. نضمن لك تحقيق أعلى عائد على استثمارك مع الحد الأدنى من الجهد والمتابعة من طرفك.",
    longDescEn: "We manage your real estate properties in a comprehensive and professional manner, from leasing and attracting tenants, to periodic maintenance and financial collection. We ensure you achieve the highest return on your investment with minimal effort and follow-up on your part.",
    featuresAr: [
      "إدارة عقود الإيجار",
      "تحصيل الإيجارات وإعداد التقارير",
      "صيانة وإصلاح العقارات",
      "التسويق العقاري للوحدات الشاغرة",
      "متابعة قانونية للمستأجرين",
      "تقارير دورية لأصحاب العقارات",
    ],
    featuresEn: [
      "Lease contract management",
      "Rent collection and reporting",
      "Property maintenance and repair",
      "Real estate marketing for vacant units",
      "Legal tenant follow-up",
      "Periodic reports for property owners",
    ],
    icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10",
  },
  {
    slug: "commercial-projects",
    image: "/images/hero-4.png",
    titleAr: "المشاريع التجارية",
    titleEn: "Commercial Projects",
    shortDescAr: "تصميم وتنفيذ مساحات تجارية ذكية تعزز من نجاح أعمالك وتجذب المزيد من العملاء.",
    shortDescEn: "Design and execution of smart commercial spaces that enhance business success and attract more customers.",
    longDescAr: "نتخصص في تطوير وبناء المشاريع التجارية من مراكز تجارية ومكاتب ومجمعات خدمية بأعلى مستويات التخطيط والتنفيذ. نضع في اعتبارنا تجربة المستخدم وكفاءة الطاقة والجدوى التجارية لضمان نجاح مشروعك.",
    longDescEn: "We specialize in developing and building commercial projects including shopping centers, offices, and service complexes at the highest levels of planning and execution. We consider user experience, energy efficiency, and commercial viability to ensure your project's success.",
    featuresAr: [
      "تخطيط وتصميم المساحات التجارية",
      "بناء مراكز التسوق والمكاتب",
      "تطوير المجمعات الخدمية",
      "تنظيم حركة المرور والمواقف",
      "أنظمة الأمن والمراقبة المتطورة",
      "خدمات ما بعد التشغيل",
    ],
    featuresEn: [
      "Commercial space planning and design",
      "Construction of shopping centers and offices",
      "Development of service complexes",
      "Traffic and parking organization",
      "Advanced security and surveillance systems",
      "Post-operation services",
    ],
    icon: "M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9zM3 9V6a2 2 0 012-2h14a2 2 0 012 2v3",
  },
  {
    slug: "residential-projects",
    image: "/images/about-bg.png",
    titleAr: "المشاريع السكنية",
    titleEn: "Residential Projects",
    shortDescAr: "بناء فلل ومجمعات سكنية فاخرة توفر لك ولعائلتك أسلوب حياة استثنائي ومريح.",
    shortDescEn: "Building luxury villas and residential complexes that provide an exceptional and comfortable lifestyle.",
    longDescAr: "نبني مجتمعات سكنية متكاملة تجمع بين الجمال والراحة والأمان. من الفلل المستقلة إلى المجمعات السكنية المسورة، نقدم لك ولعائلتك بيئة معيشية راقية تلبي جميع احتياجاتكم وتعكس طموحاتكم.",
    longDescEn: "We build integrated residential communities that combine beauty, comfort, and security. From standalone villas to gated residential compounds, we provide you and your family with an upscale living environment that meets all your needs and reflects your aspirations.",
    featuresAr: [
      "فلل وشقق بتصاميم عصرية وكلاسيكية",
      "مجمعات سكنية مسورة مع مرافق متكاملة",
      "مساحات خضراء وملاعب أطفال",
      "أنظمة أمن متطورة",
      "قربها من الخدمات الحيوية",
      "خيارات تشطيب متنوعة",
    ],
    featuresEn: [
      "Villas and apartments with modern and classic designs",
      "Gated communities with integrated facilities",
      "Green spaces and playgrounds",
      "Advanced security systems",
      "Proximity to vital services",
      "Diverse finishing options",
    ],
    icon: "M10.5 21l-.5-1.5M13.5 21l.5-1.5M3 12l9-9 9 9M5 10v10h14V10",
  },
  {
    slug: "engineering-consulting",
    image: "/images/hero-1.png",
    titleAr: "الاستشارات الهندسية",
    titleEn: "Engineering Consultations",
    shortDescAr: "فريق من الخبراء لتقديم دراسات جدوى واستشارات فنية تضمن نجاح مشروعك من الفكرة حتى التسليم.",
    shortDescEn: "A team of experts providing feasibility studies and technical consultations ensuring your project's success.",
    longDescAr: "يضم فريق الاستشارات الهندسية لدينا نخبة من المهندسين والمتخصصين ذوي الخبرة الواسعة في مختلف التخصصات. نقدم دراسات جدوى شاملة، ومراجعة تصاميم، وإشراف هندسي، وحلولاً تقنية مبتكرة لضمان نجاح مشروعك بكفاءة عالية وتكلفة مثلى.",
    longDescEn: "Our engineering consultations team includes an elite group of engineers and specialists with extensive experience across various disciplines. We provide comprehensive feasibility studies, design reviews, engineering supervision, and innovative technical solutions to ensure your project's success with high efficiency and optimal cost.",
    featuresAr: [
      "دراسات الجدوى الاقتصادية والفنية",
      "مراجعة وتدقيق المخططات الهندسية",
      "الإشراف الهندسي الميداني",
      "حلول هندسية لمشاكل البناء",
      "تقييم العقارات والمشاريع",
      "استشارات ما بعد الإنشاء",
    ],
    featuresEn: [
      "Economic and technical feasibility studies",
      "Review and audit of engineering blueprints",
      "On-site engineering supervision",
      "Engineering solutions for construction issues",
      "Real estate and project valuation",
      "Post-construction consultations",
    ],
    icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
  },
  {
    slug: "operations-facility-management",
    image: "/images/hero-2.png",
    titleAr: "التشغيل وإدارة المرافق",
    titleEn: "Operations & Facility Management",
    shortDescAr: "خدمات متكاملة لتشغيل وصيانة المباني وإدارة المرافق بكفاءة عالية لضمان استمرارية أعمالك وراحة المستخدمين.",
    shortDescEn: "Integrated services for operating and maintaining buildings and managing facilities with high efficiency.",
    longDescAr: "نتولى إدارة وتشغيل مرافقك العقارية بشكل احترافي متكامل، من صيانة الأنظمة الكهربائية والميكانيكية، إلى خدمات النظافة والأمن وإدارة الطاقة. نضمن استمرارية تشغيل منشآتك بكفاءة عالية وتكلفة مُحسَّنة مع توفير بيئة مريحة وآمنة لجميع المستخدمين.",
    longDescEn: "We manage and operate your real estate facilities in a comprehensive and professional manner, from maintenance of electrical and mechanical systems, to cleaning, security, and energy management services. We ensure continuous operation of your facilities with high efficiency and optimized cost while providing a comfortable and safe environment for all users.",
    featuresAr: [
      "صيانة الأنظمة الكهربائية والميكانيكية",
      "خدمات النظافة والتعقيم",
      "إدارة الطاقة وترشيد الاستهلاك",
      "أنظمة الأمن والسلامة",
      "إدارة المقاولين من الباطن",
      "تقارير أداء دورية",
    ],
    featuresEn: [
      "Electrical and mechanical systems maintenance",
      "Cleaning and sanitization services",
      "Energy management and conservation",
      "Security and safety systems",
      "Sub-contractor management",
      "Periodic performance reports",
    ],
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
