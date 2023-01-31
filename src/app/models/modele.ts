import { Voiture } from "./voiture";

export class Modele{

  id: number;
  code: string;
  libelle: string;
  voitures: Voiture[];

  constructor(){
    this.id = 0;
    this.code = '';
    this.libelle = '';
    this.voitures = [];
  }
}
