import { Component, OnInit } from '@angular/core';
import { ModeleService } from '../services/modele.service';
import { MarqueService } from '../services/marque.service';
import { VoitureService } from '../services/voiture.service';
import { Voiture } from '../models/voiture';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Marque } from '../models/marque';
import { Modele } from '../models/modele';

@Component({
  selector: 'app-voiture',
  templateUrl: './voiture.component.html',
  styleUrls: ['./voiture.component.css']
})
export class VoitureComponent implements OnInit {

  voirListesVoitures: boolean = true;
  voirFormulaireAjout: boolean = false;
  voirFormulaireModification: boolean = true;

  voirPageDetail: boolean = true;

  erreur: boolean = true;
  voiture = this.voitureService.voiture;
  marques : Marque[] = [];
  modeles : Modele[] = [];
  voitures : Voiture[] = [];
  messageErreur: string = "";

  constructor(private modeleService: ModeleService,
    private marqueService: MarqueService,
    private voitureService: VoitureService) { }

  voitureForm: any;

  ngOnInit(): void {
    this.voitureForm = new FormGroup({
      numeroIdentifiant: new FormControl(this.voiture.numeroIdentifiant, [Validators.required]),
      numeroSerie: new FormControl(this.voiture.numeroSerie, [Validators.required]),
      dateAchat: new FormControl(this.voiture.dateAchat, [Validators.required]),
      couleur: new FormControl(this.voiture.couleur, [Validators.required]),
      marque: new FormControl('', [Validators.required]),
      modele: new FormControl('', [Validators.required]),
    })
    this.listesVoitures();
    this.listesMarques();
    this.listesModeles()
  }

  //Méthode de la liste de toutes les marques à partir de VoitureService
  listesMarques():void{
    this.marqueService.getAll().subscribe(response=>{
      this.marques = response;
    })
  }

  //Méthode de la liste de tous les modèles à partir de VoitureService
  listesModeles():void{
    this.modeleService.getAll().subscribe(response=>{
      this.modeles = response;
    })
  }
  //Méthode de la liste de toutes les voitures à partir de VoitureService
  listesVoitures():void{
    this.voitureService.getAll().subscribe(response=>{
      this.voitures = response;
    })
  }

  afficherFormulaireAjouter(): void {
    this.voirListesVoitures = false;
    this.voirFormulaireAjout = true;
    this.voirFormulaireModification;
    this.voiture = new Voiture();
  }

  get numeroIdentifiant(){
    return this.voitureForm.get('numeroIdentifiant');
  }

  get numeroSerie(){
    return this.voitureForm.get('numeroSerie');
  }

  get dateAchat(){
    return this.voitureForm.get('dateAchat');
  }

  get couleur(){
    return this.voitureForm.get('couleur');
  }

  get marque(){
    return this.voitureForm.get('marque');
  }

  get modele(){
    return this.voitureForm.get('modele');
  }

  //Méthode de retour sur la page de la liste des voitures
  retour(): void {
    this.voirListesVoitures = true;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification = true;
    this.voirPageDetail = true;
    this.erreur = true;
  }

  //Méthode d'ajout d'une voiture à partir de VoitureService
  ajouterVoiture(): void {
    this.voitureService.addVoiture(this.voiture).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.voitures.push({
            id: response.id,
            numeroIdentifiant: response.numeroIdentifiant,
            numeroSerie: response.numeroSerie,
            dateAchat: response.dateAchat,
            couleur: response.couleur,
            statut: response.statut,
            marque: response.marque,
            modele: response.modele
          });
          this.retour();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de l'ajout, voiture déjà existante"
          this.afficherFormulaireAjouter();
          this.voiture.numeroIdentifiant = response.numeroIdentifiant;
          this.voiture.numeroSerie = response.numeroSerie;
          this.voiture.dateAchat = response.dateAchat;
          this.voiture.couleur = response.couleur;
          this.voiture.marque = response.marque;
          this.voiture.modele = response.modele
        }
    },
    (error) =>{
      console.log(error)
    })
  }

  //Méthode de modification d'une voiture à partir de VoitureService
  modifierVoiture(): void {
    this.modeleService.updateModele(this.modele).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.retour();
          this.listesVoitures();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de la modification, voiture déjà existante";
          this.afficherFormulaireModifier(this.modele.id);
        }
    },
    (error) =>{
      console.log(error)
    })
  }


  //Méthode de suppression d'une Voiture par la clé primaire  à partir de VoitureService
  supprimerParClePrimaire(id: number): void {
    this.voitureService.deleteById(id).subscribe(response=>{
      console.log(response);
      // for (let index = 0; index < this.medicaments.length; index++) {
      //   if (index == this.medicament.id) {
      //     this.medicaments.splice(id,1);
      //   }
      // }
      this.listesVoitures();
    });
  }

  //Méthode de détail d'une Voiture à partir de VoitureService
  detailVoiture(id: number): void {
    console.log(id)
    this.voitureService.findById(id).subscribe(response=>{
      this.voiture = response;
    })
  }

  //Méthode d'affichage de la page de detail d'une Voiture
  afficherPageDetail(id: number): void {
    this.voirListesVoitures = false;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification = true;
    this.voirPageDetail = false;
    this.detailVoiture(id);
  }

  //Méthode d'affichage de la page de modification d'une Voiture
  afficherFormulaireModifier(id: number): void {
    this.voirListesVoitures = false;
    this.voirFormulaireModification = false;
    this.detailVoiture(id);
  }
}
