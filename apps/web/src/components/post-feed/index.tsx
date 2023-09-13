import Link from 'next/link'
import QueryString from 'qs'

import { getAssetUrl } from '@/lib/get-asset-url'
import { fetchStrapi } from '@/lib/strapi'
import { Post } from '@/types/post'
import Image from 'next/image'

const getPosts = async ({
  term,
  genre,
}: {
  term?: string
  location?: string
  genre?: string
}): Promise<Post[]> => {
  let query = QueryString.stringify({
    populate: {
      gallery: {
        fields: ['url'],
      },
      extra: {
        fields: ['*'],
      },
    },
  })

  if (term) {
    const termQuery = QueryString.stringify({
      filters: {
        name: {
          $containsi: term,
        },
      },
    })

    query += `&${termQuery}`
  }

  if (genre) {
    const genreQuery = QueryString.stringify({
      filters: {
        genre: {
          $eq: genre,
        },
      },
    })

    query += `&${genreQuery}`
  }

  const posts = await fetchStrapi({
    path: `/posts`,
    query: QueryString.parse(query),
  })

  return posts.data
}

export async function PostFeed({
  term,
  location,
  genre,
}: {
  term?: string
  location?: string
  genre?: string
}) {
  const posts = await getPosts({
    term,
    location,
    genre,
  })

  return (
    <section className="grid lg:grid-cols-4 gap-8">
      {posts?.map((post) => <PostFeedCard data={post} key={post.name} />)}

      {!posts ||
        (posts.length === 0 && (
          <div className="col-span-full">
            <p>Nenhum resultado encontrado.</p>
          </div>
        ))}
    </section>
  )
}

export function PostFeedCard({ data }: { data: Post }) {
  return (
    <article>
      <header className="mb-4">
        <Link href={`/acompanhantes/${data.slug}`}>
          <Image
            alt={data.name}
            className="h-80 w-full rounded-xl object-cover hover:opacity-80 transition-opacity duration-300 ease-in-out"
            src={getAssetUrl(data.gallery[0].url)}
            width={512}
            height={512}
          />
        </Link>
      </header>
      <main>
        <div>
          <Link className="font-medium !capitalize" href="/">
            {data.name}
          </Link>
        </div>

        <div className="flex flex-col mb-2 opacity-60">
          <span className="!capitalize">São Paulo</span>
        </div>

        <span className="space-x-2">
          <span className="font-medium">R$ {data.price}</span>
          <span>hora</span>
        </span>
      </main>
    </article>
  )
}
