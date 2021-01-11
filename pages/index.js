import Container from '@/components/container'
import More from '@/components/product/more'
import ProductHero from '@/components/product/hero'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import { getProductsForHome } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'

export default function Index({ products, preview }) {
  const hero = products[0]
  const moreProducts = products.slice(1)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Next.js Marketplace Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          {hero?.image.length > 0 && (
            <ProductHero
              title={hero.title}
              image={hero.image[0]}
              slug={hero.slug}
            />
          )}
          {moreProducts.length > 0 && <More products={moreProducts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const products = (await getProductsForHome(preview)) || []
  return {
    props: { products, preview },
  }
}
