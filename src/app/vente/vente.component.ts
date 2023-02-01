import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { VoitureService } from '../services/voiture.service';
import { VenteService } from '../services/vente.service';
import { Vente } from '../models/vente';
import { Client } from '../models/client';
import { Voiture } from '../models/voiture';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vente',
  templateUrl: './vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {

  voirListesVentes: boolean = true;
  voirFormulaireAjout: boolean = false;
  voirFormulaireModification: boolean = true;

  voirPageDetail: boolean = true;

  erreur: boolean = true;
  vente = this.venteService.vente;
  clients : Client[] = [];
  voitures : Voiture[] = [];
  ventes : Vente[] = [];
  messageErreur: string = "";

  constructor(private clientService: ClientService,
    private voitureService: VoitureService,
    private venteService: VenteService) { }

  venteForm: any;

  ngOnInit(): void {
    this.venteForm = new FormGroup({
      dateVente: new FormControl(this.vente.dateVente, [Validators.required]),
      montant: new FormControl(this.vente.montant, [Validators.required]),
      client: new FormControl('', [Validators.required]),
      voiture: new FormControl('', [Validators.required]),
    })
    this.listesVentes();
    this.listesClients();
    this.listesVoitures()
  }

  //Méthode de la liste de toutes les ventes à partir de VenteService
  listesVentes():void{
    this.venteService.getAll().subscribe(response=>{
      this.ventes = response;
    })
  }

  //Méthode de la liste de tous les ventes à partir de VenteService
  listesClients():void{
    this.clientService.getAll().subscribe(response=>{
      this.clients = response;
    })
  }
  //Méthode de la liste de toutes les ventes à partir de VenteService
  listesVoitures():void{
    this.voitureService.getAllByStatut().subscribe(response=>{
      this.voitures = response;
    })
  }

  afficherFormulaireAjouter(): void {
    this.voirListesVentes = false;
    this.voirFormulaireAjout = true;
    this.voirFormulaireModification;
    this.vente = new Vente();
  }

  get dateVente(){
    return this.venteForm.get('dateVente');
  }

  get montant(){
    return this.venteForm.get('montant');
  }

  get client(){
    return this.venteForm.get('client');
  }

  get voiture(){
    return this.venteForm.get('voiture');
  }

  //Méthode de retour sur la page de la liste des ventes
  retour(): void {
    this.voirListesVentes = true;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification = true;
    this.voirPageDetail = true;
    this.erreur = true;
  }

  //Méthode d'ajout d'une vente à partir de VenteService
  ajouterVente(): void {
    this.venteService.addVente(this.vente).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.ventes.push({
            id: response.id,
            dateVente: response.dateVente,
            montant: response.montant,
            client: response.client,
            voiture: response.voiture
          });
          this.retour();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de l'ajout, vente déjà existante"
          this.afficherFormulaireAjouter();
          this.vente.dateVente = response.dateVente;
          this.vente.montant = response.montant;
          this.vente.client = response.client;
          this.vente.voiture = response.voiture
        }
    },
    (error) =>{
      console.log(error)
    })
  }

}
