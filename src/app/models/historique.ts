export class Historique{

  id: number;
  description: string;
  dateHistorique!: Date;

  constructor(){
    this.id = 0;
    this.description = '';
  }
}
