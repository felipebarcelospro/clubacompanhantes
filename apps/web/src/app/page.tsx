import Link from 'next/link'

import { PostFeed } from '@/components/post-feed'
import { cn } from '@/lib/cn'

export const dynamic = 'force-dynamic'
export const revalidate = 3600

export const metadata = {
  title: 'ClubAcompanhantes - Acompanhantes em São Paulo, SP',
  description:
    'Encontre as melhores acompanhantes de São Paulo, SP. Garotas de programa, massagistas e acompanhantes de luxo. Acompanhantes de São Paulo, SP, para todos os gostos.',
}

export default function Page({
  searchParams,
}: {
  searchParams?: {
    location?: string
    term?: string
    genre?: string
  }
}) {
  let texts = {
    title: 'As melhores acompanhantes de São Paulo, SP',
    description:
      'Encontre as melhores acompanhantes de São Paulo, SP. Garotas de programa, massagistas e acompanhantes de luxo. Acompanhantes de São Paulo, SP, para todos os gostos.',
  } as {
    title: string
    description: string | null
  }

  const titles = {
    hasSearch: {
      title: `10 resultados para '${searchParams?.term}'`,
      description: null,
    },
    hasLocation: {
      title: `Acompanhantes em "${searchParams?.location}"`,
      description: null,
    },
    hasLocationAndSearch: {
      title: `Acompanhantes em "${searchParams?.location}" para '${searchParams?.term}'`,
      description: null,
    },
  }

  if (searchParams?.location && searchParams?.term) {
    texts = titles.hasLocationAndSearch
  } else if (searchParams?.location) {
    texts = titles.hasLocation
  } else if (searchParams?.term) {
    texts = titles.hasSearch
  }

  return (
    <>
      <PostFilter genre={searchParams?.genre} />

      <div className="container mx-auto max-w-screen-xl py-8">
        <section>
          <header className="mb-8">
            <h1 className="text-xl font-bold mb-2 md:max-w-[25%]">
              {texts.title}
            </h1>
            <p className="opacity-60">{texts.description}</p>
          </header>

          <main>
            {/* @ts-ignore */}
            <PostFeed
              term={searchParams?.term}
              genre={searchParams?.genre}
              location={searchParams?.location}
            />
          </main>
        </section>
      </div>
    </>
  )
}

function PostFilter({ genre }: { genre?: string }) {
  return (
    <section className="border-b border-border">
      <div className="container mx-auto max-w-screen-xl py-6 flex items-center space-x-8">
        <Link
          href="/?genre=woman"
          className={cn([
            'flex items-center justify-center flex-col opacity-60 border-b-2',
            genre === 'woman' && 'border-primary opacity-100',
          ])}
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.2352 29.0527H13.0723V25.7439H22.2352V29.0527Z"
              fill="#263238"
            ></path>{' '}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.9995 31.4705V21.7986H19.3083V31.4705H15.9995Z"
              fill="#263238"
            ></path>{' '}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.6539 18.9989C20.6058 18.9989 22.9989 16.6058 22.9989 13.6539C22.9989 10.7019 20.6058 8.30883 17.6539 8.30883C14.7019 8.30883 12.3088 10.7019 12.3088 13.6539C12.3088 16.6058 14.7019 18.9989 17.6539 18.9989ZM17.6539 22.3077C22.4332 22.3077 26.3077 18.4332 26.3077 13.6539C26.3077 8.87446 22.4332 5 17.6539 5C12.8745 5 9 8.87446 9 13.6539C9 18.4332 12.8745 22.3077 17.6539 22.3077Z"
              fill="#263238"
            ></path>
          </svg>
          <span className="font-sm">Mulheres</span>
        </Link>

        <Link
          href="/?genre=man"
          className={cn([
            'flex items-center justify-center flex-col opacity-60 border-b-2',
            genre === 'man' && 'border-primary opacity-100',
          ])}
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.6889 26.4444C18.794 26.4444 21.3111 23.9273 21.3111 20.8222C21.3111 17.7171 18.794 15.2 15.6889 15.2C12.5838 15.2 10.0667 17.7171 10.0667 20.8222C10.0667 23.9273 12.5838 26.4444 15.6889 26.4444ZM15.6889 29.5111C20.4876 29.5111 24.3778 25.6209 24.3778 20.8222C24.3778 16.0234 20.4876 12.1333 15.6889 12.1333C10.8901 12.1333 7 16.0234 7 20.8222C7 25.6209 10.8901 29.5111 15.6889 29.5111Z"
              fill="#263238"
            ></path>{' '}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M22.3334 6H30.0001V14.1778H26.9334V11.2351L21.8843 16.2842L19.7158 14.1158L24.7649 9.06667H22.3334V6Z"
              fill="#263238"
            ></path>
          </svg>
          <span className="font-sm">Homens</span>
        </Link>

        <Link
          href="/?genre=trans"
          className={cn([
            'flex items-center justify-center flex-col opacity-60 border-b-2',
            genre === 'trans' && 'border-primary opacity-100',
          ])}
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.1554 4.25H5.25H4.25V5.25V11.746H6.25V7.59595L9.23209 10.578L7.54289 12.2672L8.95711 13.6814L10.6463 11.9923L11.6021 12.948C9.00035 16.1942 9.2044 20.9473 12.2142 23.9571C13.5737 25.3166 15.2889 26.1037 17.0603 26.3183V28.2126H13.9265V30.2126H17.0603V32.1653H19.0603V30.2126H22.1941V28.2126H19.0603V26.3183C20.8316 26.1037 22.5468 25.3166 23.9064 23.9571C26.8389 21.0245 27.1079 16.437 24.7132 13.2008L29.3181 8.59595V12.6774H31.3181V6.18145V5.18145H30.3181H24.4127V7.18145H27.9042L23.3386 11.747C20.3677 9.277 16.0726 9.21073 13.0306 11.5482L12.0605 10.578L13.6814 8.95711L12.2672 7.54289L10.6463 9.16383L7.73248 6.25H11.1554V4.25ZM13.6284 13.6792C16.0761 11.2315 20.0445 11.2315 22.4921 13.6792C24.9398 16.1268 24.9398 20.0952 22.4921 22.5429C20.0445 24.9905 16.0761 24.9905 13.6284 22.5429C11.1808 20.0952 11.1808 16.1268 13.6284 13.6792Z"
              fill="#263238"
            ></path>{' '}
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4 4H11.4054V6.5H8.33603L10.6463 8.81027L12.2672 7.18934L14.035 8.95711L12.4141 10.578L13.0543 11.2183C16.1155 8.98936 20.326 9.05357 23.3209 11.4111L27.3006 7.43145H24.1627V4.93145H31.5681V12.9274H29.0681V9.1995L25.0404 13.2272C27.3709 16.5501 27.052 21.165 24.0831 24.1339C22.739 25.478 21.0568 26.2792 19.3103 26.5369V27.9626H22.4441V30.4626H19.3103V32.4153H16.8103V30.4626H13.6765V27.9626H16.8103V26.5369C15.0637 26.2792 13.3815 25.478 12.0374 24.1339C8.99072 21.0871 8.73467 16.3069 11.269 12.9685L10.6463 12.3458L8.95711 14.035L7.18934 12.2672L8.87853 10.578L6.5 8.1995V11.996H4V4ZM4.5 4.5V11.496H6V6.9924L9.58564 10.578L7.89645 12.2672L8.95711 13.3279L10.6463 11.6387L11.9372 12.9296L11.7971 13.1044C9.27427 16.2522 9.47231 20.8616 12.391 23.7803C13.7096 25.0989 15.3725 25.862 17.0904 26.0701L17.3103 26.0967V28.4626H14.1765V29.9626H17.3103V31.9153H18.8103V29.9626H21.9441V28.4626H18.8103V26.0967L19.0302 26.0701C20.748 25.862 22.411 25.0989 23.7296 23.7803C26.5733 20.9366 26.8344 16.4876 24.5123 13.3495L24.3841 13.1764L29.5681 7.9924V12.4274H31.0681V5.43145H24.6627V6.93145H28.5077L23.3542 12.085L23.1788 11.9392C20.2981 9.54424 16.1326 9.47989 13.1829 11.7464L13.009 11.8801L11.707 10.578L13.3279 8.95711L12.2672 7.89645L10.6463 9.51738L7.12892 6H10.9054V4.5H4.5ZM13.4516 13.5024C15.9969 10.9571 20.1236 10.9571 22.6689 13.5024C25.2142 16.0477 25.2142 20.1744 22.6689 22.7196C20.1236 25.2649 15.9969 25.2649 13.4516 22.7196C10.9064 20.1744 10.9064 16.0477 13.4516 13.5024ZM22.3154 13.8559C19.9653 11.5059 16.1552 11.5059 13.8052 13.8559C11.4552 16.2059 11.4552 20.0161 13.8052 22.3661C16.1552 24.7161 19.9653 24.7161 22.3154 22.3661C24.6654 20.0161 24.6654 16.2059 22.3154 13.8559Z"
              fill="#263238"
            ></path>
          </svg>
          <span className="font-sm">Trans</span>
        </Link>
      </div>
    </section>
  )
}
