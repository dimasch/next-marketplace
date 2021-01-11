import CoverImage from './cover-image'
import ProductTitle from './title'

export default function ProductHeader({ title, image }) {
  return (
    <div>
      <ProductTitle>{title}</ProductTitle>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} url={image.url} />
      </div>
    </div>
  )
}
