import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import More from '@/components/product/more'
import Header from '@/components/header'
import ProductHeader from '@/components/product/header'
// import ProductBody from '@/components/product/body'
import ProductTitle from '@/components/product/title'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllProductsWithSlug, getProductAndMore } from '@/lib/api'
import Head from 'next/head'
// import markdownToHtml from '@/lib/markdownToHtml'

export default function Product({ product, moreItems, preview }) {
  const router = useRouter()
  if (!router.isFallback && !product?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <ProductTitle>Loading…</ProductTitle>
        ) : (
          <div>
            <article>
              <Head>
                <title>
                  {product.title}
                </title>
                <meta property="og:image" content={product.ogImage.url} />
              </Head>
              <ProductHeader
                title={product.title}
                image={product.image}
              />
              <Product content={product.description} />
            </article>
            <SectionSeparator />
            {moreItems.length > 0 && <More products={moreItems} />}
          </div>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getProductAndMore(params.slug, preview)
  console.log('data', data);
  // const content = await markdownToHtml(data?.products[0]?.content || '')

  return {
    props: {
      preview,
      product: {
        ...data?.products[0],
        // content,
      },
      moreItems: data?.moreProducts,
    },
  }
}

export async function getStaticPaths() {
  const all = await getAllProductsWithSlug()
  return {
    paths: all?.map((p) => `/product/${p.slug}`) || [],
    fallback: true,
  }
}
