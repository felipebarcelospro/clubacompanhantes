'use client'

import { cn } from '@/lib/cn'
import React, { useEffect, useState } from 'react'

interface Props {
  images: string[]
  numCols: number
}

export const PostGallery: React.FC<Props> = ({ images, numCols }) => {
  const [columns, setColumns] = useState<
    {
      height: number
      images: string[]
      verticalCount: number
      squareCount: number
      squareImages: string[]
    }[]
  >([])

  useEffect(() => {
    const loadImages = async () => {
      const imageDetails: {
        src: string
        aspectRatio: number
      }[] = []

      for (const image of images) {
        const img = new Image()
        img.src = image
        await new Promise((resolve) => {
          img.onload = () => {
            resolve(null)
          }
        })

        const aspectRatio = img.width / img.height
        imageDetails.push({ src: image, aspectRatio })
      }

      // Ordena as imagens por proporção, colocando as quadradas por último
      imageDetails.sort((a, b) => {
        if (Math.abs(a.aspectRatio - 1) < 0.1) return 1
        if (Math.abs(b.aspectRatio - 1) > 0.7) return -1
        return b.aspectRatio - a.aspectRatio
      })

      const newColumns = Array.from({ length: numCols }, () => ({
        height: 0,
        images: [] as string[],
        verticalCount: 0,
        squareCount: 0,
        squareImages: [] as string[],
      }))

      for (const { src, aspectRatio } of imageDetails) {
        const minHeightCol = newColumns.reduce(
          (minCol, col) => (col.height < minCol.height ? col : minCol),
          newColumns[0],
        )

        if (aspectRatio < 1 && minHeightCol.verticalCount >= 1) {
          const squareSpaceCol = newColumns.find((col) => col.squareCount < 2)

          if (squareSpaceCol) {
            squareSpaceCol.height += 1
            squareSpaceCol.images.push(src)
            squareSpaceCol.squareImages.push(src)
            squareSpaceCol.squareCount += 1
            continue
          }
        }

        if (Math.abs(aspectRatio - 1) < 0.1 && minHeightCol.squareCount >= 2)
          continue

        minHeightCol.height += aspectRatio
        minHeightCol.images.push(src)

        if (aspectRatio < 1) minHeightCol.verticalCount += 1
        if (Math.abs(aspectRatio - 1) < 0.1) minHeightCol.squareCount += 1
      }

      setColumns(newColumns)
    }

    loadImages()
  }, [images, numCols])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-lg overflow-hidden">
      {columns.map((col, colIndex) => (
        <div key={colIndex} className="grid gap-2">
          {col.images.map((image, index) => (
            <img
              key={index}
              className={cn([
                `h-full min-h-[220px] max-w-full rounded-lg object-cover`,
                col.squareImages.includes(image)
                  ? 'max-h-[220px] w-full object-top'
                  : '',
              ])}
              src={image}
              alt={`image-${index}`}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
