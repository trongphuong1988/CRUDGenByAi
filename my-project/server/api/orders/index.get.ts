import prisma from '~/server/lib/prisma'

export default defineEventHandler(async () => {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return orders
})