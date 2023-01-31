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

  listesClients():void{
    this.clientService.getAll().subscribe(response=>{
      this.clients = response;
    })
  }

}
