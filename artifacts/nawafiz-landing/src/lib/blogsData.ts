export interface BlogPost {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  date: string;
  img: string;
}

export const blogsData: BlogPost[] = [
  {
    id: "1",
    slug: "future-of-real-estate-saudi-arabia",
    titleKey: "blogs.1.title",
    excerptKey: "blogs.1.excerpt",
    contentKey: "blogs.1.content",
    date: "2026-04-05",
    img: `${import.meta.env.BASE_URL}images/about-bg.png`
  },
  {
    id: "2",
    slug: "sustainable-urban-development",
    titleKey: "blogs.2.title",
    excerptKey: "blogs.2.excerpt",
    contentKey: "blogs.2.content",
    date: "2026-03-28",
    img: `${import.meta.env.BASE_URL}images/hero-4.png`
  },
  {
    id: "3",
    slug: "smart-homes-in-medina",
    titleKey: "blogs.3.title",
    excerptKey: "blogs.3.excerpt",
    contentKey: "blogs.3.content",
    date: "2026-03-15",
    img: `${import.meta.env.BASE_URL}images/hero-1.png`
  }
];
