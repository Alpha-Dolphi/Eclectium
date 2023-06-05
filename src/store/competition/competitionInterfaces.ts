export interface Competition {
  id: number;
  name: string;
  startingDate: string;
  participants: number;
  registrationEndDate: string;
  description: string;
  price: number;
  currencySymbol: "$" | "₽";
  IsParticipating: boolean;
  added: boolean;
}
