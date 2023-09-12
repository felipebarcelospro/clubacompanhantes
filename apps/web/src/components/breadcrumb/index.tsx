import React from 'react'
import Link from 'next/link'

type Path = {
  name: string
  href?: string
}

type Props = {
  paths: Path[]
}

export function Breadcrumb(props: Props) {
  let { paths } = props

  paths = [
    {
      name: 'Club Acompanhantes',
    },
    ...paths,
  ]

  return (
    <nav className="flex items-center space-x-2 text-xs opacity-60 uppercase mb-9">
      {paths.map((path, index) => (
        <React.Fragment key={path.name}>
          {path.href && (
            <Link className="font-bold line-clamp-1" href={path.href}>
              {path.name}
            </Link>
          )}
          {!path.href && <span className="line-clamp-1">{path.name}</span>}

          {index !== paths.length - 1 && (
            <span className="text-gray-400 dark:text-gray-500">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
