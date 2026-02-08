export const categories = [
    { id: "1", name: "Streaming", slug: "streaming" },
    { id: "2", name: "IPTV", slug: "iptv" },
    { id: "3", name: "VPN", slug: "vpn" },
    { id: "4", name: "Gift Cards", slug: "gift-cards" },
    { id: "5", name: "Bundles", slug: "bundles" },
    { id: "6", name: "Professionnel", slug: "professional" },
];

export const products = [
    {
        id: "p1",
        name: "Netflix Premium",
        slug: "netflix-premium",
        categoryId: "1",
        image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=300&h=200",
        description: "Profitez de l'expérience de streaming ultime avec Netflix Premium. Accès illimité en Ultra HD 4K sur 4 écrans simultanés. Idéal pour toute la famille en Europe, au Maghreb et partout dans le monde arabe, sans aucune restriction.",
        featured: true,
        bestSeller: true,
        plans: [
            { id: "pl1", name: "1 Mois", price: 65, duration: 1 },
            { id: "pl2", name: "3 Mois", price: 180, duration: 3 },
            { id: "pl3", name: "12 Mois", price: 650, duration: 12 },
        ],
    },
    {
        id: "p2",
        name: "NordVPN Secure",
        slug: "nordvpn",
        categoryId: "3",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=300&h=200",
        description: "Sécurisez votre navigation internet partout dans le monde avec NordVPN. Accédez à vos contenus préférés en Europe (FR, BE, CH) et au Maghreb, contournez la censure et protégez vos données privées.",
        featured: true,
        plans: [
            { id: "pl4", name: "1 An", price: 350, duration: 12 },
        ],
    },
    {
        id: "p3",
        name: "Disney+ Official",
        slug: "disney-plus",
        categoryId: "1",
        image: "https://images.unsplash.com/photo-1603190287605-e6ade32fa852?auto=format&fit=crop&q=80&w=300&h=200",
        description: "Plongez dans les univers Marvel, Star Wars, Pixar et Disney avec un abonnement officiel. Qualité 4K HDR disponible en Europe, Afrique du Nord et Moyen-Orient, avec téléchargements illimités et profils sécurisés.",
        featured: false,
        plans: [
            { id: "pl5", name: "1 Mois", price: 45, duration: 1 },
            { id: "pl6", name: "12 Mois", price: 420, duration: 12 },
        ]
    },
    {
        id: "p4",
        name: "LinkedIn Business",
        slug: "linkedin-business",
        categoryId: "6",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
        description: "Propulsez votre carrière à l'international avec LinkedIn Business. Accédez à des insights exclusifs et boosts de visibilité partout en Europe, au Moyen-Orient (KSA, UAE) et en Afrique du Nord.",
        featured: true,
        plans: [
            { id: "pl7", name: "1 Mois", price: 450, duration: 1 },
            { id: "pl8", name: "12 Mois", price: 4500, duration: 12 },
        ]
    },
    {
        id: "p5",
        name: "LinkedIn Career",
        slug: "linkedin-career",
        categoryId: "6",
        image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
        description: "Optimisez votre recherche d'emploi à Paris, Dubaï ou Casablanca avec LinkedIn Premium Career. Soyez mis en avant auprès des recruteurs internationaux et accédez à LinkedIn Learning.",
        featured: true,
        plans: [
            { id: "pl9", name: "1 Mois", price: 350, duration: 1 },
            { id: "pl10", name: "12 Mois", price: 3500, duration: 12 },
        ]
    },
    {
        id: "p6",
        name: "IPTV Platinum 4K",
        slug: "iptv-platinum",
        categoryId: "2",
        image: "/images/iptv-platinum.png",
        description: "Le summum de l'IPTV stable en Europe (France, Belgique, Suisse) et au Maghreb. Plus de 15 000 chaînes mondiales et VOD 4K. Garantie sans coupure même pendant les grands événements sportifs internationaux.",
        featured: true,
        bestSeller: true,
        plans: [
            { id: "pl11", name: "3 Mois", price: 150, duration: 3 },
            { id: "pl12", name: "6 Mois", price: 250, duration: 6 },
            { id: "pl13", name: "12 Mois", price: 400, duration: 12 },
        ]
    },
    {
        id: "p7",
        name: "IPTV Gold Plus",
        slug: "iptv-gold",
        categoryId: "2",
        image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=80&w=300&h=200",
        description: "La solution IPTV au meilleur prix pour l'Europe et le monde arabe. Accès complet aux chaînes satellites, Bein Sports (MENA & FR), Canal+ et OCS. Connexion fluide compatible avec toutes les Smart TV.",
        featured: true,
        plans: [
            { id: "pl14", name: "3 Mois", price: 100, duration: 3 },
            { id: "pl15", name: "6 Mois", price: 180, duration: 6 },
            { id: "pl16", name: "12 Mois", price: 300, duration: 12 },
        ]
    }
];
