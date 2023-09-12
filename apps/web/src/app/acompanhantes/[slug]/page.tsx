import { Breadcrumb } from '@/components/breadcrumb'
import { PostFeed } from '@/components/post-feed'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getAssetUrl } from '@/lib/get-asset-url'
import { fetchStrapi } from '@/lib/strapi'
import { Post } from '@/types/post'
import { IdCardIcon } from '@radix-ui/react-icons'
import {
  ArrowRightIcon,
  Brush,
  Check,
  CheckCircle2,
  Cigarette,
  Clock,
  DollarSign,
  Languages,
  MapPin,
  Ruler,
  Search,
  User,
} from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PostGallery } from './components/gallery'

type PageProps = {
  params: {
    slug: string
  }
}

export const revalidate = 3600
export const dynamic = 'force-static'
export const dynamicParams = true

const getPostFromSlug = async (slug: string): Promise<Post> => {
  const posts = await fetchStrapi({
    path: `/posts`,
    query: {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        gallery: {
          fields: ['url'],
        },
        extra: {
          fields: ['*'],
        },
      },
    },
  })

  return posts.data[0]
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata | null> {
  const post = await getPostFromSlug(params.slug)

  if (!post) return null

  return {
    title: `${post.name} acompanhante em São Paulo, SP`,
    description: post.description.slice(0, 160),
    openGraph: {
      title: `${post.name} acompanhante em São Paulo, SP`,
      description: post.description.slice(0, 160),
      images: post.gallery.map((item) => ({
        url: getAssetUrl(item.url),
      })),
    },
  }
}

export default async function Page({ params }: PageProps) {
  const post = await getPostFromSlug(params.slug)

  if (!post) return notFound()

  const genreLabels = {
    woman: 'Mulher',
    man: 'Homem',
    trans: 'Trans',
  }

  return (
    <>
      <div className="container mx-auto max-w-screen-xl space-y-8 py-8">
        <Breadcrumb
          paths={[
            {
              name: 'Acompanhantes em São Paulo',
              href: '/',
            },
            {
              name: post.name,
              href: `/posts/${post.slug}`,
            },
          ]}
        />

        <PostGallery
          numCols={4}
          images={post.gallery.map((item) => getAssetUrl(item.url))}
        />

        <section>
          <main className="mb-4">
            <span className="font-medium mb-1 text-sm text-primary flex items-center">
              <Check className="w-4 h-4 mr-2 animate-pulse" />
              Online
            </span>

            <h1 className="text-lg font-bold">
              {post.name} acompanhante em São Paulo, SP
            </h1>
          </main>
        </section>

        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-8 col-span-1">
            <section>
              <main className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border border-input p-6 space-y-2 rounded-lg bg-zinc-50">
                  <CheckCircle2 className="w-5 h-5 text-primary mb-2" />
                  <span className="!capitalize text-sm font-medium">
                    Verificada
                  </span>
                </div>

                <div className="border border-input p-6 space-y-2 rounded-lg">
                  <DollarSign className="w-5 h-5 opacity-60 mb-2" />
                  <span className="!capitalize text-sm font-medium">
                    R$ {post.price}
                  </span>
                </div>

                <div className="border border-input p-6 space-y-2 rounded-lg">
                  <MapPin className="w-5 h-5 opacity-60 mb-2" />
                  <span className="!capitalize text-sm font-medium">
                    São Paulo
                  </span>
                </div>

                <div className="border border-input p-6 space-y-2 rounded-lg">
                  <IdCardIcon className="w-5 h-5 opacity-60 mb-2" />
                  <span className="!capitalize text-sm font-medium">
                    {post.extra.age} anos
                  </span>
                </div>
              </main>
            </section>

            <section>
              <header className="mb-2">
                <h2 className="text-lg font-bold">Sobre a acompanhante</h2>
              </header>
              <main>
                <p className="text-lg opacity-60">{post.description}</p>
              </main>
            </section>

            <section>
              <header className="mb-4">
                <h2 className="text-lg font-bold">
                  Mais detalhes sobre a(o) acompanhante
                </h2>
              </header>
              <main className="space-y-4">
                {[
                  {
                    icon: <User className="w-5 h-5 text-primary" />,
                    title: 'Genero',
                    description: genreLabels[post.genre],
                  },
                  {
                    icon: <Brush className="w-5 h-5 text-primary" />,
                    title: 'Cor do cabelo',
                    description: post.extra.hair,
                  },
                  {
                    icon: <Ruler className="w-5 h-5 text-primary" />,
                    title: 'Altura',
                    description: post.extra.height,
                  },
                  {
                    icon: <Languages className="w-5 h-5 text-primary" />,
                    title: 'Idiomas',
                    description: post.extra.languages,
                  },
                  {
                    icon: <Cigarette className="w-5 h-5 text-primary" />,
                    title: 'Fumante',
                    description: post.extra.smoke ? 'Sim' : 'Não',
                  },
                ].map((feature) => (
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 flex items-center justify-center border border-border rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="opacity-60">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </main>
            </section>

            <section>
              <header className="mb-4">
                <h2 className="text-lg font-bold">
                  Porquê confiar no ClubAcompanhantes?
                </h2>
              </header>
              <main className="space-y-8">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: (
                        <CheckCircle2 className="w-4 h-4 opacity-60 mr-2" />
                      ),
                      title: 'Verificadas',
                      description:
                        'Todas as nossas acompanhantes são verificadas e aprovadas pela nossa equipe.',
                    },
                    {
                      icon: <Clock className="w-4 h-4 opacity-60 mr-2" />,
                      title: 'Direto ao ponto',
                      description:
                        'Ao se interessar por uma acompanhante, você já pode entrar em contato direto com ela.',
                    },
                    {
                      icon: <Search className="w-4 h-4 opacity-60 mr-2" />,
                      title: 'Transparência',
                      description:
                        'Todas as meninas que anunciam são maiores de idade e atuam por conta própria.',
                    },
                  ].map((feature) => (
                    <article className="space-y-2 p-6 border border-border rounded-lg">
                      <header className="flex items-center text-sm">
                        {feature.icon}
                        <h3 className="font-medium">{feature.title}</h3>
                      </header>
                      <main>
                        <p className="opacity-60">{feature.description}</p>
                      </main>
                    </article>
                  ))}
                </div>

                <Card>
                  <CardContent className="p-6 grid md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        Ficou com dúvidas?
                      </h3>

                      <p className="opacity-60 mb-4">
                        Entre em contato com a nossa equipe e tire todas as suas
                        dúvidas.
                      </p>

                      <Link
                        href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}
                        target="_blank"
                        className="flex"
                      >
                        <Button size="lg" variant="link">
                          Chamar no WhatsApp
                          <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </main>
            </section>
          </div>
          <aside className="relative h-full">
            <Card className="sticky top-20">
              <CardContent className="pt-6 space-y-4">
                <Avatar>
                  <AvatarFallback>
                    {post.name.split(' ').map((item) => item[0])}
                  </AvatarFallback>
                  <AvatarImage src={post.gallery[0].url} />
                </Avatar>

                <section>
                  <h2 className="text-lg font-bold mt-4">{post.name}</h2>
                  <span className="text-sm opacity-60">
                    {genreLabels[post.genre]} - {post.extra.age} anos
                  </span>
                </section>

                <section className="space-y-2">
                  <span className="font-medium text-sm flex items-center">
                    <MapPin className="w-4 h-4 opacity-60 mr-2" />
                    Atende em São Paulo
                  </span>

                  <span className="font-medium text-sm flex items-center">
                    <DollarSign className="w-4 h-4 opacity-60 mr-2" />
                    R$ {post.price} / hora
                  </span>
                </section>

                <Link
                  href={`https://wa.me/${post.whatsapp}`}
                  target="_blank"
                  className="flex"
                >
                  <Button className="w-full" size="lg">
                    Chamar no WhatsApp
                  </Button>
                </Link>

                <Separator className="mb-4" />

                <div>
                  <small className="text-center opacity-60">
                    Ao chamar, diga que viu o anúncio no ClubAcompanhantes.
                  </small>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      <div className="py-8 bg-zinc-50 border-t border-border">
        <div className="container mx-auto max-w-screen-xl">
          {/* @ts-ignore */}
          <PostFeed />
        </div>
      </div>
    </>
  )
}
