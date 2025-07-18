// myblog/src/app/tag/[slug]/page.tsx
import { BlogPostsPreview } from "@/components/BlogPostPreview";
import { BlogPostsPagination } from "@/components/BlogPostsPagination";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { wisp } from "@/lib/wisp";
import { CircleX } from "lucide-react";
import Link from "next/link";
import { menuItems } from "@/components/Header"; // 导入导航栏菜单项

interface Params {
  slug: string;
}

export async function generateMetadata(
  props: {
    params: Promise<Params>;
  }
) {
  const params = await props.params;

  const {
    slug
  } = params;

  // 查找对应的导航栏名称
  const navItem = menuItems.find(item => item.href === `/tag/${slug}`);
  const title = navItem ? navItem.name : `#${slug}`;

  return {
    title, // 使用找到的导航栏名称作为页面标题
    description: `Posts tagged with #${slug}`,
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

  const {
    slug
  } = params;

  const page = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const result = await wisp.getPosts({ limit: 6, tags: [slug], page });
  return (
    <div className="container mx-auto px-5 mb-10">
      <Header />
      {/* 移除显示 "Posts tagged with" 的代码 */}
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
