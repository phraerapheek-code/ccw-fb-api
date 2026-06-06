import { prisma } from '../lib/prisma.js'

export const getUserBy = async (column, value) => {
 return await prisma.user.findFirst({
       where: { [column]: value }
  })
}

export const createUser = async (userData) => {
 return await prisma.user.create({data: userData})
}
