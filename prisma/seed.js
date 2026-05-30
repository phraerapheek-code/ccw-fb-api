import { prisma } from "../src/lib/prisma.js";
import bcrypt from 'bcryptjs'

const hashedPassword = bcrypt.hashSync('123456', 8)

const userData = [
 { firstName: 'Andy', lastName: 'Codecamp', password: hashedPassword, email: 'andy@ggg.mail',
     profileImage: 'https://www.svgrepo.com/show/420364/avatar-male-man.svg' }, 
 { firstName: 'Bobby', lastName: 'Codecamp', password: hashedPassword, email: 'bobby@ggg.mail',
     profileImage: 'https://www.svgrepo.com/show/420319/actor-chaplin-comedy.svg'},
 { firstName: 'Candy', lastName: 'Codecamp', password: hashedPassword, mobile: '1111111111',
     profileImage: 'https://www.svgrepo.com/show/420327/avatar-child-girl.svg'},
 { firstName: 'Danny', lastName: 'Codecamp', password: hashedPassword, mobile: '2222222222',
     profileImage: 'https://www.svgrepo.com/show/420314/builder-helmet-worker.svg'},
]

async function main() {
    // console.log('Start clean table...');
    // await prisma.$executeRaw`TRUNCATE TABLE User`
    console.log('Start seeding...');
    const createdUsers = await prisma.user.createMany({
        data : userData,
        skipDuplicates: true,
    });
    console.log(`Created ${createdUsers.count} users.`);
}

main().then(async () => {
   await prisma.$disconnect();
 }).catch(async (e) => {
   console.error(e);
   await prisma.$disconnect();
   process.exit(1);
 });
