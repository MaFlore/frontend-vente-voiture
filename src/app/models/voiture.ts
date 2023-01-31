import { Marque } from "./marque";
import { Modele } from "./modele";

export class Voiture{

  id: number;
  numeroIdentifiant: string;
  numeroSerie: string;
  dateAchat!: Date;
  couleur: string;
  statut!: Boolean;
  marque: Marque;
  modele: Modele;

  constructor(){
    this.id = 0;
    this.numeroIdentifiant = '';
    this.numeroSerie = '';
    this.couleur = '';
    this.marque = new Marque();
    this.modele = new Modele();
  }
}
