import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

export function RootLayoutFooter() {
  return (
    <footer className="sticky bottom-0 z-10 bg-white border-t py-4 hidden lg:block">
      <div className="container mx-auto max-w-screen-xl flex items-center justify-between font-sm">
        <span className="opacity-60 text-sm">
          © 2023 ClubAcompanhantes, Ltd.
        </span>
        <div className="space-x-4 flex-1 ml-8">
          <Link
            href="https://blog.clubacompanhantes.com"
            className="text-sm opacity-60"
            target="_blank"
          >
            Blog
          </Link>
          <Link
            href="/sitemap.xml"
            className="text-sm opacity-60"
            target="_blank"
          >
            Sitemap
          </Link>
        </div>

        <Link
          href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}
          className="text-sm opacity-60 flex items-center"
          target="_blank"
        >
          Anuncie conosco
          <ArrowRightIcon className="w-3 h-3 ml-2" />
        </Link>
      </div>
    </footer>
  )
}
