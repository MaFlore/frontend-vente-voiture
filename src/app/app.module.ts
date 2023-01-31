import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './templates/navigation/navigation.component';
import { ContenuComponent } from './templates/contenu/contenu.component';
import { MenuComponent } from './templates/menu/menu.component';
import { AccueilComponent } from './accueil/accueil.component';
import { VenteComponent } from './vente/vente.component';
import { ClientComponent } from './client/client.component';
import { ModeleComponent } from './modele/modele.component';
import { MarqueComponent } from './marque/marque.component';
import { VoitureComponent } from './voiture/voiture.component';
import { HistoriqueComponent } from './historique/historique.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ContenuComponent,
    MenuComponent,
    AccueilComponent,
    VenteComponent,
    ClientComponent,
    ModeleComponent,
    MarqueComponent,
    VoitureComponent,
    HistoriqueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
