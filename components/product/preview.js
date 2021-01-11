import CoverImage from './cover-image'
import Link from 'next/link'

export default function ProductPreview({
  title,
  image,
  slug,
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} url={image.url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/product/${slug}`} href="/product/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <p className="text-lg leading-relaxed mb-4">{`description`}</p>
    </div>
  )
}
