import { Injectable } from '@angular/core';
import { Historique } from '../models/historique';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoriqueService {

  public historique: Historique = new Historique();
  url!: string;

  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  //Suppression d'une occurrence de historique par la clé primaire ;
  //url: http://localhost:9002/api/historique/supprimer/{id}
  deleteById(id: number){
    return this.httpClient.delete(this.url + 'historique/supprimer/' + id);
  }

  //Affichage de toutes les occurrences de historiques;
  //url: http://localhost:9002/api/historiques
  getAll(): Observable<Array<Historique>>{
    return this.httpClient.get<Array<Historique>>(this.url + 'historiques');
  }

  //Recherche d'une occurrence de historique par la clé primaire ;
  //url: http://localhost:9002/api/historique/{id}
  findById(id: number): Observable<Historique>{
    return this.httpClient.get<Historique>(this.url + 'historique/' + id);
  }

  //Affichage du nombre d'occurrences de historique.
  //url: http://localhost:9002/api/historique/count
  count(): Observable<any>{
    return this.httpClient.get<any>(this.url + 'historique/count');
  };

}
