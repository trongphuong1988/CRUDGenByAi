import prisma from '~/server/lib/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email } = body

  if (!name || !email) {
    throw createError({
      statusCode: 400,
      message: 'Name and email are required',
    })
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw createError({
      statusCode: 409,
      message: 'Email already exists',
    })
  }

  const user = await prisma.user.create({
    data: { name, email },
  })

  return user
})