export default async function sitemap() {
  const routes = ['', '/about', '/blog'].map((route) => ({
    url: `https://acme.com${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routes]
}
