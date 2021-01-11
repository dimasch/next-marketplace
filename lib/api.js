async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getPreviewBySlug(slug) {
  const data = await fetchAPI(
    `
  query ProductBySlug($where: JSON) {
    products(where: $where) {
      slug
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )
  return data?.products[0]
}

export async function getAllProductsWithSlug() {
  const data = fetchAPI(`
    {
      products {
        slug
      }
    }
  `)
  return data?.allProducts
}

export async function getProductsForHome(preview) {
  const data = await fetchAPI(
    `
    query Product($where: JSON){
      products(sort: "published_at:desc", limit: 10, where: $where) {
        title
        description
        slug
        image {
          url
        }
        vendor {
          title
          description
        }
      }
    }
  `,
    {
      variables: {
        where: {
          ...(preview ? {} : { status: 'enabled' }),
        },
      },
    }
  )
  return data?.products
}

export async function getProductAndMore(slug, preview) {
  const data = await fetchAPI(
    `
  query ProductBySlug($where: JSON, $where_ne: JSON) {
    products(where: $where) {
      title
      description
      slug
      ogImage: image {
        url
      }
      vendor {
        title
        description
      }
    }

    moreProducts: products(sort: "published_at:desc", limit: 2, where: $where_ne) {
      title
      description
      slug
      image {
        url
      }
      vendor {
        title
        description
      }
    }
  }
  `,
    {
      preview,
      variables: {
        where: {
          slug,
          ...(preview ? {} : { status: 'published' }),
        },
        where_ne: {
          ...(preview ? {} : { status: 'published' }),
          slug_ne: slug,
        },
      },
    }
  )
  return data
}
