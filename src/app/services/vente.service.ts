import { Injectable } from '@angular/core';
import { Vente } from '../models/vente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  public vente: Vente = new Vente();
  url!: string;

  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  //Ajout d'une occurrence de vente;
  //url: http://localhost:9002/api/vente/ajouter
  addVente(v: Vente): Observable<Vente>{
    return this.httpClient.post<Vente>(this.url + 'vente/ajouter', v);
  }

  //Suppression d'une occurrence de vente par la clé primaire ;
  //url: http://localhost:9002/api/vente/supprimer/{id}
  deleteById(id: number){
    return this.httpClient.delete(this.url + 'vente/supprimer/' + id);
  }

  //Affichage de toutes les occurrences de ventes;
  //url: http://localhost:9002/api/ventes
  getAll(): Observable<Array<Vente>>{
    return this.httpClient.get<Array<Vente>>(this.url + 'ventes');
  }

  //Recherche d'une occurrence de vente par la clé primaire ;
  //url: http://localhost:9002/api/vente/{id}
  findById(id: number): Observable<Vente>{
    return this.httpClient.get<Vente>(this.url + 'vente/' + id);
  }

  //Affichage du nombre d'occurrences de vente.
  //url: http://localhost:9002/api/vente/count
  count(): Observable<any>{
    return this.httpClient.get<any>(this.url + 'vente/count');
  };
}
