import { fetchStrapi } from "@/lib/strapi"
import { Post } from "@/types/post"

export default async function sitemap() {
  const posts = await fetchStrapi({
    path: '/posts',
  }) as Post[]

  const routes = ['/', posts.map(post => `/acompanhantes/${post.slug}`)].map((route) => ({
    url: `https://clubacompanhantes.com${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes]
}
