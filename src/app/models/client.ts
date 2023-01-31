import { Personne } from "./Personne";
import { Vente } from "./vente";

export class Client extends Personne{

  ventes: Vente[];

  constructor(){
    super();
    this.ventes = [];
  }

}
