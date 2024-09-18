const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
	log: ['query'], // voir les requêtes dans les logs pour débug
});
module.exports = { prisma };