import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  voirListesClients: boolean = true;
  voirFormulaireAjout: boolean = false;
  voirFormulaireModification: boolean = true;

  voirPageDetail: boolean = true;

  erreur: boolean = true;
  client = this.clientService.client;
  clients : Client[] = [];
  messageErreur: string = "";

  constructor(private clientService: ClientService) { }

  clientForm: any;

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      nom: new FormControl(this.client.nom, [Validators.required]),
      prenom: new FormControl(this.client.prenom, [Validators.required]),
      telephone: new FormControl(this.client.telephone, [Validators.required]),
      username: new FormControl(this.client.username, [Validators.required]),
      password: new FormControl(this.client.password, [Validators.required]),
    })
    this.listesClients();
  }

  //Méthode de la liste de tous les clients à partir de ClientService
  listesClients():void{
    this.clientService.getAll().subscribe(response=>{
      this.clients = response;
    })
  }

  afficherFormulaireAjouter(): void {
    this.voirListesClients = false;
    this.voirFormulaireAjout = true;
    this.voirFormulaireModification;
    this.client = new Client();
  }

  get nom(){
    return this.clientForm.get('nom');
  }

  get prenom(){
    return this.clientForm.get('prenom');
  }

  get telephone(){
    return this.clientForm.get('telephone');
  }

  get username(){
    return this.clientForm.get('username');
  }

  get password(){
    return this.clientForm.get('password');
  }

  //Méthode de retour sur la page de la liste des clients
  retour(): void {
    this.voirListesClients = true;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification = true;
    this.voirPageDetail = true;
    this.erreur = true;
  }

  //Méthode d'ajout d'un client à partir de ClientService
  ajouterClient(): void {
    this.clientService.addClient(this.client).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.clients.push({
            id: response.id,
            nom: response.nom,
            prenom: response.prenom,
            telephone: response.telephone,
            username: response.username,
            password: response.password,
            ventes: [],
          });
          this.retour();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de l'ajout, client déjà existant"
          this.afficherFormulaireAjouter();
          this.client.nom = response.nom;
          this.client.prenom = response.prenom;
          this.client.telephone = response.telephone;
          this.client.username = response.username;
          this.client.password = response.password;
        }
    },
    (error) =>{
      console.log(error)
    })
  }

  //Méthode de modification d'un client à partir de ClientService
  modifierClient(): void {
    this.clientService.updateClient(this.client).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.retour();
          this.listesClients();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de la modification, client déjà existant";
          this.afficherFormulaireModifier(this.client.id);
        }
    },
    (error) =>{
      console.log(error)
    })
  }

  //Méthode de suppression d'un client par la clé primaire  à partir de ClientService
  supprimerParClePrimaire(id: number): void {
    this.clientService.deleteById(id).subscribe(response=>{
      console.log(response);
      // for (let index = 0; index < this.medicaments.length; index++) {
      //   if (index == this.medicament.id) {
      //     this.medicaments.splice(id,1);
      //   }
      // }
      this.listesClients();
    });
  }

  //Méthode de détail d'un client à partir de ClientService
  detailClient(id: number): void {
    console.log(id)
    this.clientService.findById(id).subscribe(response=>{
      this.client = response;
    })
  }

  //Méthode d'affichage de la page de detail d'un client
  afficherPageDetail(id: number): void {
    this.voirListesClients = false;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification = true;
    this.voirPageDetail = false;
    this.detailClient(id);
  }

  //Méthode d'affichage de la page de modification d'un client
  afficherFormulaireModifier(id: number): void {
    this.voirListesClients = false;
    this.voirFormulaireModification = false;
    this.detailClient(id);
  }
}
