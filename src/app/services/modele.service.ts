import { Injectable } from '@angular/core';
import { Modele } from '../models/modele';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {

  public modele: Modele = new Modele();
  url!: string;

  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  //Ajout d'une occurrence de modele;
  //url: http://localhost:9002/api/modele/ajouter
  addClient(m: Modele): Observable<Modele>{
    return this.httpClient.post<Modele>(this.url + 'modele/ajouter', m);
  }

  //Modification d'une occurrence de modele;
  //url: http://localhost:9002/api/modele/modifier
  updateClient(m: Modele): Observable<Modele>{
    return this.httpClient.put<Modele>(this.url + 'modele/modifier', m);
  }

  //Suppression d'une occurrence de modele par la clé primaire ;
  //url: http://localhost:9002/api/modele/supprimer/{id}
  deleteById(id: number){
    return this.httpClient.delete(this.url + 'modele/supprimer/' + id);
  }

  //Affichage de toutes les occurrences de modeles;
  //url: http://localhost:9002/api/modeles
  getAll(): Observable<Array<Modele>>{
    return this.httpClient.get<Array<Modele>>(this.url + 'modeles');
  }

  //Recherche d'une occurrence de modele par la clé primaire ;
  //url: http://localhost:9002/api/modele/{id}
  findById(id: number): Observable<Modele>{
    return this.httpClient.get<Modele>(this.url + 'modele/' + id);
  }

  //Affichage du nombre d'occurrences de modele.
  //url: http://localhost:9002/api/modele/count
  count(): Observable<any>{
    return this.httpClient.get<any>(this.url + 'modele/count');
  };
}
