import prisma from '~/server/lib/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, price, stock } = body

  if (!name || price === undefined || price === null) {
    throw createError({
      statusCode: 400,
      message: 'Name and price are required',
    })
  }

  if (price <= 0) {
    throw createError({
      statusCode: 400,
      message: 'Price must be greater than 0',
    })
  }

  const product = await prisma.product.create({
    data: {
      name,
      price,
      stock: stock || 0,
    },
  })

  return product
})