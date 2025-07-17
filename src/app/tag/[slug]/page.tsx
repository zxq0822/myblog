// src/app/tag/[slug]/page.tsx
import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { wisp } from "@/lib/wisp";
import { config } from "@/config";

// 导入菜单定义
import { menuItems } from "@/components/Header";

interface Params {
  slug: string;
}

export async function generateMetadata(
  props: {
    params: Promise<Params>;
  }
) {
  const params = await props.params;
  const { slug } = params;
  
  // 在菜单中查找对应的菜单项
  const menuItem = menuItems.find(item => item.slug === slug);
  
  // 使用菜单项的 name 作为标题，如果没找到则使用原始 slug
  const title = menuItem?.name || slug;
  
  return {
    title: `${title} - ${config.blog.name}`,
    description: `关于${title}的文章`,
  };
}

const Page = async (
  props: {
    params: Promise<Params>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const { slug } = params;
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const result = await wisp.getPosts({ limit: 6, tags: [slug], page });
  
  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      <BlogPostsPreview posts={result.posts} />
      <BlogPostsPagination
        pagination={result.pagination}
        basePath={`/tag/${slug}/?page=`}
      />
      <Footer />
    </div>
  );
};

export default Page;
