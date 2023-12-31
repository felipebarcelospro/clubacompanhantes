import Link from 'next/link'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { SearchInput } from './components/search-input'

export function RootLayoutHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto max-w-screen-xl items-center grid grid-cols-[auto_3fr] lg:grid-cols-3 gap-4 h-20">
        <Link
          href="/"
          className="flex-items-center justify-start hover:opacity-80 transition-opacity duration-300 ease-in-out"
          title='Club Acompanhantes - As melhores acompanhantes de São Paulo'
          aria-label='Club Acompanhantes - As melhores acompanhantes de São Paulo'
        >
          <Logo />
        </Link>

        <div className="flex-items-center justify-between">
          <SearchInput />
        </div>

        <div className="lg:flex items-center justify-end space-x-4 hidden">
          <Button className="rounded-full" variant="ghost"  asChild>
            <Link
              href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}
              target="_blank"
            >
              <ArrowRight className="w-3 h-3 mr-2" />
              Anuncie no ClubAcompanhantes
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
