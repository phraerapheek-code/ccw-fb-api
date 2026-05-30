import { prisma } from '../lib/prisma.js'

export default async function(signal) {
 console.log(`\nReceived ${signal}, shutting down...`);
 try {
   await prisma.$disconnect();
   console.log('Prisma disconnected.');
 } catch (err) {
   console.error('Error during disconnection:', err);
 } finally {  process.exit(0); }
}
