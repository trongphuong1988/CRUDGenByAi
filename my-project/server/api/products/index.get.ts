import prisma from '~/server/lib/prisma'

export default defineEventHandler(async () => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return products
})