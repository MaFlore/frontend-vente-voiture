import { Component, OnInit } from '@angular/core';
import { ModeleService } from '../services/modele.service';
import { Modele } from '../models/modele';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modele',
  templateUrl: './modele.component.html',
  styleUrls: ['./modele.component.css']
})
export class ModeleComponent implements OnInit {

  voirListesModeles: boolean = true;
  voirFormulaireAjout: boolean = false;
  voirFormulaireModification: boolean = true;

  voirPageDetail: boolean = true;

  erreur: boolean = true;
  modele = this.modeleService.modele;
  modeles : Modele[] = [];
  messageErreur: string = "";

  constructor(private modeleService: ModeleService) { }

  modeleForm: any;

  ngOnInit(): void {
    this.modeleForm = new FormGroup({
      code: new FormControl(this.modele.code, [Validators.required]),
      libelle: new FormControl(this.modele.libelle, [Validators.required]),
    })
    this.listesModeles();
  }

  //Méthode de la liste de tous les modeles à partir de ModeleService
  listesModeles():void{
    this.modeleService.getAll().subscribe(response=>{
      this.modeles = response;
    })
  }

  afficherFormulaireAjouter(): void {
    this.voirListesModeles = false;
    this.voirFormulaireAjout = true;
    this.voirFormulaireModification;
    this.modele = new Modele();
  }

  get code(){
    return this.modeleForm.get('code');
  }

  get libelle(){
    return this.modeleForm.get('libelle');
  }

  //Méthode de retour sur la page de la liste des modeles
  retour(): void {
    this.voirListesModeles = true;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification = true;
    this.voirPageDetail = true;
    this.erreur = true;
  }

  //Méthode d'ajout d'un modele à partir de ModeleService
  ajouterModele(): void {
    this.modeleService.addModele(this.modele).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.modeles.push({
            id: response.id,
            code: response.code,
            libelle: response.libelle,
            voitures: []
          });
          this.retour();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de l'ajout, modele déjà existant"
          this.afficherFormulaireAjouter();
          this.modele.code = response.code;
          this.modele.libelle = response.libelle;
        }
    },
    (error) =>{
      console.log(error)
    })
  }

  //Méthode de modification d'un Modele à partir de ModeleService
  modifierModele(): void {
    this.modeleService.updateModele(this.modele).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.retour();
          this.listesModeles();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de la modification, modèle déjà existant";
          this.afficherFormulaireModifier(this.modele.id);
        }
    },
    (error) =>{
      console.log(error)
    })
  }


  //Méthode de suppression d'une Modele par la clé primaire  à partir de ModeleService
  supprimerParClePrimaire(id: number): void {
    this.modeleService.deleteById(id).subscribe(response=>{
      console.log(response);
      // for (let index = 0; index < this.medicaments.length; index++) {
      //   if (index == this.medicament.id) {
      //     this.medicaments.splice(id,1);
      //   }
      // }
      this.listesModeles();
    });
  }

  //Méthode de détail d'un Modele à partir de ModeleService
  detailModele(id: number): void {
    console.log(id)
    this.modeleService.findById(id).subscribe(response=>{
      this.modele = response;
    })
  }

  //Méthode d'affichage de la page de detail d'une Modèle
  afficherPageDetail(id: number): void {
    this.voirListesModeles = false;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification = true;
    this.voirPageDetail = false;
    this.detailModele(id);
  }

  //Méthode d'affichage de la page de modification d'un Modèle
  afficherFormulaireModifier(id: number): void {
    this.voirListesModeles = false;
    this.voirFormulaireModification = false;
    this.detailModele(id);
  }

}
