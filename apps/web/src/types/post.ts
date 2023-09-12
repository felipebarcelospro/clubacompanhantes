export type Post = {
  id: string
  name: string
  slug: string
  gallery: {
    url: string
  }[]
  verification: string | null
  description: string
  whatsapp?: string
  price?: number
  genre: 'woman' | 'man' | 'trans'
  extra: {
    hair: string
    age: number
    smoke: boolean
    height: number
    weight: number
    languages: string[]
  }
}
