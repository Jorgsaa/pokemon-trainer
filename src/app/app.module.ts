import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPage } from './landing/landing.page';
import { CataloguePage } from './catalogue/catalogue.page';
import { TrainerPage } from './trainer/trainer.page';
import { DetailsPage } from './details/details.page';
import { NotFoundPage } from './not-found/not-found.page';
import { PokemonListItemComponent } from './shared/pokemon-list-item/pokemon-list-item.component';
import { PokemonListComponent } from './shared/pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    CataloguePage,
    TrainerPage,
    DetailsPage,
    NotFoundPage,
    PokemonListItemComponent,
    PokemonListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
