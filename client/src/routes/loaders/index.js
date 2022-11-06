import productService from '../../services/products'

export const productLoader = async ({ params }) => {
  try {
    const res = await productService.get(params.productId)
    return res
  } catch (err) {
    throw new Response(err.response.data.error, {
      status: err.response.status,
      statusText: err.response.statusText,
    })
  }
}
