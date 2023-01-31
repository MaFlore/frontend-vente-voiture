import { Injectable } from '@angular/core';
import { Marque } from '../models/marque';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  public marque: Marque = new Marque();
  url!: string;

  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  //Ajout d'une occurrence de marque;
  //url: http://localhost:9002/api/marque/ajouter
  addClient(m: Marque): Observable<Marque>{
    return this.httpClient.post<Marque>(this.url + 'marque/ajouter', m);
  }

  //Modification d'une occurrence de marque;
  //url: http://localhost:9002/api/marque/modifier
  updateClient(m: Marque): Observable<Marque>{
    return this.httpClient.put<Marque>(this.url + 'marque/modifier', m);
  }

  //Suppression d'une occurrence de marque par la clé primaire ;
  //url: http://localhost:9002/api/marque/supprimer/{id}
  deleteById(id: number){
    return this.httpClient.delete(this.url + 'marque/supprimer/' + id);
  }

  //Affichage de toutes les occurrences de marques;
  //url: http://localhost:9002/api/marques
  getAll(): Observable<Array<Marque>>{
    return this.httpClient.get<Array<Marque>>(this.url + 'marques');
  }

  //Recherche d'une occurrence de marque par la clé primaire ;
  //url: http://localhost:9002/api/marque/{id}
  findById(id: number): Observable<Marque>{
    return this.httpClient.get<Marque>(this.url + 'marque/' + id);
  }

  //Affichage du nombre d'occurrences de marque.
  //url: http://localhost:9002/api/marque/count
  count(): Observable<any>{
    return this.httpClient.get<any>(this.url + 'marque/count');
  };
}
