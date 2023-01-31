import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public client: Client = new Client();
  url!: string;

  constructor(private httpClient: HttpClient) {
    const APIEndpoint = environment.APIEndpoint;
    this.url = APIEndpoint + 'api/';
  }

  //Ajout d'une occurrence de client;
  //url: http://localhost:9002/api/client/ajouter
  addClient(c: Client): Observable<Client>{
    return this.httpClient.post<Client>(this.url + 'client/ajouter', c);
  }

  //Modification d'une occurrence de client;
  //url: http://localhost:9002/api/client/modifier
  updateClient(c: Client): Observable<Client>{
    return this.httpClient.put<Client>(this.url + 'client/modifier', c);
  }

  //Suppression d'une occurrence de client par la clé primaire ;
  //url: http://localhost:9002/api/client/supprimer/{id}
  deleteById(id: number){
    return this.httpClient.delete(this.url + 'client/supprimer/' + id);
  }

  //Affichage de toutes les occurrences de clients;
  //url: http://localhost:9002/api/clients
  getAll(): Observable<Array<Client>>{
    return this.httpClient.get<Array<Client>>(this.url + 'clients');
  }

  //Recherche d'une occurrence de client par la clé primaire ;
  //url: http://localhost:9002/api/client/{id}
  findById(id: number): Observable<Client>{
    return this.httpClient.get<Client>(this.url + 'client/' + id);
  }

  //Affichage du nombre d'occurrences de client.
  //url: http://localhost:9002/api/client/count
  count(): Observable<any>{
    return this.httpClient.get<any>(this.url + 'client/count');
  };

}
