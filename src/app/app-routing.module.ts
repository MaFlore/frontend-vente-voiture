import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { VenteComponent } from './vente/vente.component';
import { ModeleComponent } from './modele/modele.component';
import { MarqueComponent } from './marque/marque.component';
import { ClientComponent } from './client/client.component';
import { VoitureComponent } from './voiture/voiture.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'modeles', component: ModeleComponent },
  { path: 'marques', component: MarqueComponent },
  { path: 'voitures', component: VoitureComponent },
  { path: 'ventes', component: VenteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
