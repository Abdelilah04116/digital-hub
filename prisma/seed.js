require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
    ...(process.env.DATABASE_URL?.startsWith("prisma")
        ? { accelerateUrl: process.env.DATABASE_URL }
        : {}),
});

async function main() {
    // 1. Categories
    const streaming = await prisma.category.upsert({
        where: { slug: "streaming" },
        update: {},
        create: { name: "Streaming", slug: "streaming" },
    });

    const vpn = await prisma.category.upsert({
        where: { slug: "vpn" },
        update: {},
        create: { name: "VPN", slug: "vpn" },
    });

    const giftCards = await prisma.category.upsert({
        where: { slug: "gift-cards" },
        update: {},
        create: { name: "Gift Cards", slug: "gift-cards" },
    });

    const professional = await prisma.category.upsert({
        where: { slug: "professional" },
        update: {},
        create: { name: "Professionnel", slug: "professional" },
    });

    // 2. Products
    const netflix = await prisma.product.upsert({
        where: { slug: "netflix-premium" },
        update: {},
        create: {
            name: "Netflix Premium",
            slug: "netflix-premium",
            description: "Accès multi-écrans en Ultra HD 4K. Regardez vos films et séries préférés en illimité.",
            categoryId: streaming.id,
            image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=600",
            featured: true,
            bestSeller: true,
        },
    });

    const nordvpn = await prisma.product.upsert({
        where: { slug: "nordvpn" },
        update: {},
        create: {
            name: "NordVPN Secure",
            slug: "nordvpn",
            description: "La meilleure protection pour votre vie privée. Sécurisez votre connexion partout.",
            categoryId: vpn.id,
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
            featured: true,
        },
    });

    const linkedinBusiness = await prisma.product.upsert({
        where: { slug: "linkedin-business" },
        update: {},
        create: {
            name: "LinkedIn Business",
            slug: "linkedin-business",
            description: "Développez votre réseau et booster vos opportunités avec LinkedIn Business.",
            categoryId: professional.id,
            image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
            featured: true,
        },
    });

    const linkedinCareer = await prisma.product.upsert({
        where: { slug: "linkedin-career" },
        update: {},
        create: {
            name: "LinkedIn Career",
            slug: "linkedin-career",
            description: "Trouvez votre prochain emploi plus rapidement avec LinkedIn Career.",
            categoryId: professional.id,
            image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
            featured: true,
        },
    });

    // 3. Plans
    await prisma.plan.createMany({
        data: [
            { productId: netflix.id, name: "1 Mois", duration: 1, price: 65, stripePriceId: "price_..." },
            { productId: netflix.id, name: "3 Mois", duration: 3, price: 180, stripePriceId: "price_..." },
            { productId: netflix.id, name: "12 Mois", duration: 12, price: 650, stripePriceId: "price_..." },
            { productId: nordvpn.id, name: "1 An", duration: 12, price: 350, stripePriceId: "price_..." },
            { productId: linkedinBusiness.id, name: "1 Mois", duration: 1, price: 450, stripePriceId: "price_..." },
            { productId: linkedinBusiness.id, name: "12 Mois", duration: 12, price: 4500, stripePriceId: "price_..." },
            { productId: linkedinCareer.id, name: "1 Mois", duration: 1, price: 350, stripePriceId: "price_..." },
            { productId: linkedinCareer.id, name: "12 Mois", duration: 12, price: 3500, stripePriceId: "price_..." },
        ],
        skipDuplicates: true,
    });

    console.log("Seed completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
