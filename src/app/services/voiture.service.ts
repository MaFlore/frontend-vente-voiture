import { Injectable } from '@angular/core';
import { Voiture } from '../models/voiture';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  public voiture: Voiture = new Voiture();
  url!: string;

  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  //Ajout d'une occurrence de voiture;
  //url: http://localhost:9002/api/voiture/ajouter
  addVoiture(v: Voiture): Observable<Voiture>{
    return this.httpClient.post<Voiture>(this.url + 'voiture/ajouter', v);
  }

  //Modification d'une occurrence de voiture;
  //url: http://localhost:9002/api/voiture/modifier
  updateVoiture(c: Voiture): Observable<Voiture>{
    return this.httpClient.put<Voiture>(this.url + 'voiture/modifier', c);
  }

  //Suppression d'une occurrence de voiture par la clé primaire ;
  //url: http://localhost:9002/api/voiture/supprimer/{id}
  deleteById(id: number){
    return this.httpClient.delete(this.url + 'voiture/supprimer/' + id);
  }

  //Affichage de toutes les occurrences de voitures;
  //url: http://localhost:9002/api/voitures
  getAll(): Observable<Array<Voiture>>{
    return this.httpClient.get<Array<Voiture>>(this.url + 'voitures');
  }

  //Recherche d'une occurrence de voiture par la clé primaire ;
  //url: http://localhost:9002/api/voiture/{id}
  findById(id: number): Observable<Voiture>{
    return this.httpClient.get<Voiture>(this.url + 'voiture/' + id);
  }

  //Affichage du nombre d'occurrences de voiture.
  //url: http://localhost:9002/api/voiture/count
  count(): Observable<any>{
    return this.httpClient.get<any>(this.url + 'voiture/count');
  };
}
