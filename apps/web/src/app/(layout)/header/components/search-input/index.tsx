'use client'

import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { FormEvent, useRef } from 'react'

export function SearchInput() {
  const searchParams = useSearchParams()

  const inputTermRef = useRef<HTMLInputElement>(null)
  const selectLocationRef = useRef<HTMLSelectElement>(null)

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    const term = inputTermRef.current?.value
    const location = selectLocationRef.current?.value

    const url = new URL(window.location.href)
    const searchPageUrl = new URL(url.origin)

    if (term) {
      searchPageUrl.searchParams.set('term', term)
    }

    if (location) {
      searchPageUrl.searchParams.set('location', location)
    }

    window.open(searchPageUrl.toString(), '_self')
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-between pl-4 pr-3 border rounded-full lg:w-fit shadow-sm w-full"
    >
      <input
        ref={inputTermRef}
        type="text"
        placeholder="O que você procura?"
        className="h-12 lg:w-[20rem] outline-none"
        defaultValue={searchParams.get('term') || ''}
      />
      <Button size="icon" className="!rounded-full" type="submit" title='Pesquisar' aria-label='Pesquisar'>
        <SearchIcon className="h-4 w-4" />
      </Button>
    </form>
  )
}
