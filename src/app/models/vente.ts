import { Client } from "./client";
import { Voiture } from "./voiture";

export class Vente{

  id: number;
  dateVente!: Date;
  montant: number;
  client: Client;
  voiture: Voiture;

  constructor(){
    this.id = 0;
    this.montant = 0;
    this.client = new Client();
    this.voiture = new Voiture();
  }
}
