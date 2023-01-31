export class Personne{

  id: number;
  nom: string;
  prenom: string;
  telephone: string;
  username: string;
  password: string;

  public constructor() {
    this.id = 0;
    this.nom = '';
    this.prenom = '';
    this.telephone = '';
    this.username = '';
    this.password = '';
  }
}
