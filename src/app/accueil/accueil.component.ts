import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { ModeleService } from '../services/modele.service';
import { MarqueService } from '../services/marque.service';
import { VoitureService } from '../services/voiture.service';
import { VenteService } from '../services/vente.service';
import { HistoriqueService } from '../services/historique.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  nombresClients: number = 0;
  nombresModeles: number = 0;
  nombresMarques: number = 0;
  nombresVoitures: number = 0;
  nombresVentes: number = 0;
  nombresHistoriques: number = 0;

  constructor(private clientService: ClientService,
    private modeleService: ModeleService,
    private marqueService: MarqueService,
    private voitureService: VoitureService,
    private venteService: VenteService,
    private historiqueService: HistoriqueService) { }

  ngOnInit(): void {
  }

}
