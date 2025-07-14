// myblog/src/app/qing/page.tsx
import { redirect } from 'next/navigation';

export default async function QingPage() {
  // 这里替换为你的后台实际地址
  const adminUrl = 'https://www.wisp.blog/app/write'; 
  redirect(adminUrl);
}