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

  return fetch(`${strapiAPIURL}${path}?${parsedQuery}`, {
    next: { revalidate: 60 },
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}
