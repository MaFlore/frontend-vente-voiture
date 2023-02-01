import { Component, OnInit } from '@angular/core';
import { MarqueService } from '../services/marque.service';
import { Marque } from '../models/marque';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.css']
})
export class MarqueComponent implements OnInit {

  voirListesMarques: boolean = true;
  voirFormulaireAjout: boolean = false;
  voirFormulaireModification: boolean = true;

  voirPageDetail: boolean = true;

  erreur: boolean = true;
  marque = this.marqueService.marque;
  marques : Marque[] = [];
  messageErreur: string = "";

  constructor(private marqueService: MarqueService) { }

  marqueForm: any;

  ngOnInit(): void {
    this.marqueForm = new FormGroup({
      code: new FormControl(this.marque.code, [Validators.required]),
      libelle: new FormControl(this.marque.libelle, [Validators.required]),
    })
    this.listesMarques();
  }

  //Méthode de la liste de tous les marques à partir de MarqueService
  listesMarques():void{
    this.marqueService.getAll().subscribe(response=>{
      this.marques = response;
    })
  }

  afficherFormulaireAjouter(): void {
    this.voirListesMarques = false;
    this.voirFormulaireAjout = true;
    this.voirFormulaireModification;
    this.marque = new Marque();
  }

  get code(){
    return this.marqueForm.get('code');
  }

  get libelle(){
    return this.marqueForm.get('libelle');
  }

  //Méthode de retour sur la page de la liste des marques
  retour(): void {
    this.voirListesMarques = true;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification = true;
    this.voirPageDetail = true;
    this.erreur = true;
  }

  //Méthode d'ajout d'un marque à partir de MarqueService
  ajouterMarque(): void {
    this.marqueService.addMarque(this.marque).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.marques.push({
            id: response.id,
            code: response.code,
            libelle: response.libelle,
            voitures: []
          });
          this.retour();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de l'ajout, marque déjà existante"
          this.afficherFormulaireAjouter();
          this.marque.code = response.code;
          this.marque.libelle = response.libelle;
        }
    },
    (error) =>{
      console.log(error)
    })
  }

  //Méthode de modification d'une marque à partir de MarqueService
  modifierMarque(): void {
    this.marqueService.updateMarque(this.marque).subscribe(
      (response) =>{
        console.log(response);
        if(response.id > 0) {
          this.retour();
          this.listesMarques();
        }
        else{
          this.erreur = false;
          this.messageErreur = "Erreur lors de la modification, marque déjà existante";
          this.afficherFormulaireModifier(this.marque.id);
        }
    },
    (error) =>{
      console.log(error)
    })
  }


  //Méthode de suppression d'une Marque par la clé primaire  à partir de MarqueService
  supprimerParClePrimaire(id: number): void {
    this.marqueService.deleteById(id).subscribe(response=>{
      console.log(response);
      // for (let index = 0; index < this.medicaments.length; index++) {
      //   if (index == this.medicament.id) {
      //     this.medicaments.splice(id,1);
      //   }
      // }
      this.listesMarques();
    });
  }

  //Méthode de détail d'une Marque à partir de MarqueService
  detailMarque(id: number): void {
    console.log(id)
    this.marqueService.findById(id).subscribe(response=>{
      this.marque = response;
    })
  }

  //Méthode d'affichage de la page de detail d'une Marque
  afficherPageDetail(id: number): void {
    this.voirListesMarques = false;
    this.voirFormulaireAjout = false;
    this.voirFormulaireModification = true;
    this.voirPageDetail = false;
    this.detailMarque(id);
  }

  //Méthode d'affichage de la page de modification d'une marque
  afficherFormulaireModifier(id: number): void {
    this.voirListesMarques = false;
    this.voirFormulaireModification = false;
    this.detailMarque(id);
  }
}
