export type EventType = "tournament" | "event";
export type EventStatus = "validated" | "pending" | "cancelled";

export interface EventItem {
  id: number;
  title: string;
  type: EventType;
  status: EventStatus;
  game: string;
  date: string;
  players: number;
  maxPlayers: number;
  description: string;
  statusReason?: string;
}

export interface RegistrationItem {
  id: number;
  playerName: string;
  eventTitle: string;
  status: "pending" | "accepted" | "refused";
}

export interface ReportItem {
  id: number;
  title: string;
  message: string;
  status: "open" | "closed";
}

export const eventsData: EventItem[] = [
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

export const registrationsData: RegistrationItem[] = [
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

export const reportsData: ReportItem[] = [
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