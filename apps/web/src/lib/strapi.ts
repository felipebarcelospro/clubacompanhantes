import QueryString from 'qs'

export function fetchStrapi({
  path,
  query,
}: {
  path: string
  query?: Record<string, any>
}) {
  const strapiAPIURL =
    process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337/api'

  const parsedQuery = QueryString.stringify(query)

  console.log(`${strapiAPIURL}/api${path}?${parsedQuery}`)

  return fetch(`${strapiAPIURL}/api${path}?${parsedQuery}`, {
    next: { revalidate: 60 },
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}
