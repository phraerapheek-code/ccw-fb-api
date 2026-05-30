import {prisma} from './prisma.js';

prisma.$queryRaw`show tables`.then(console.log)

//prisma.user.count().then(console.log)
