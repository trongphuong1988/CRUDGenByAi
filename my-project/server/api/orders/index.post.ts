import prisma from '~/server/lib/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId, total } = body

  if (!userId || total === undefined || total === null) {
    throw createError({
      statusCode: 400,
      message: 'UserId and total are required',
    })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw createError({
      statusCode: 404,
      message: 'User not found',
    })
  }

  const order = await prisma.order.create({
    data: {
      userId,
      total,
    },
  })

  return order
})