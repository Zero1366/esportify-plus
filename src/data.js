export const demoUsers = [
    {
        username: "admin",
        password: "admin123",
        role: "admin"
    },
    {
        username: "organizer",
        password: "orga123",
        role: "organizer"
    },
    {
        username: "player",
        password: "player123",
        role: "player"
    }
];
export const eventsData = [
    {
        id: 1,
        title: "Valorant Night Clash",
        type: "tournament",
        status: "validated",
        game: "Valorant",
        date: "2026-06-12",
        players: 12,
        maxPlayers: 16,
        description: "Match joué · Résultat : Nova Squad 13 - 11 Red Pulse.",
        statusReason: "Replay disponible pour consulter la finale."
    },
    {
        id: 2,
        title: "Rocket League Cup",
        type: "tournament",
        status: "pending",
        game: "Rocket League",
        date: "2026-06-18",
        players: 0,
        maxPlayers: 8,
        description: "Compétition prévue, mais inscriptions non ouvertes.",
        statusReason: "Autorisation en attente de confirmation."
    },
    {
        id: 3,
        title: "Smash Arena",
        type: "event",
        status: "cancelled",
        game: "Super Smash Bros",
        date: "2026-06-25",
        players: 0,
        maxPlayers: 32,
        description: "Événement annulé.",
        statusReason: "Autorisation non accordée par Nintendo."
    }
];
export const registrationsData = [
    {
        id: 1,
        playerName: "NovaPlayer",
        eventTitle: "Valorant Night Clash",
        status: "accepted"
    },
    {
        id: 2,
        playerName: "RedStrike",
        eventTitle: "Valorant Night Clash",
        status: "accepted"
    }
];
export const reportsData = [
    {
        id: 1,
        title: "Pseudo incorrect",
        message: "Un joueur utilise un pseudo non conforme.",
        status: "open"
    },
    {
        id: 2,
        title: "Problème d'inscription",
        message: "Une inscription semble bloquée sur un événement.",
        status: "open"
    }
];
