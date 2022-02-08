import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPage } from './landing/landing.page';
import { CataloguePage } from './catalogue/catalogue.page';
import { TrainerPage } from './trainer/trainer.page';
import { PokemonDetailsModalComponent } from './shared/pokemon-details-modal/pokemon-details-modal.component';
import { NotFoundPage } from './not-found/not-found.page';
import { PokemonListItemComponent } from './shared/pokemon-list-item/pokemon-list-item.component';
import { PokemonListComponent } from './shared/pokemon-list/pokemon-list.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    AppComponent,
    LandingPage,
    CataloguePage,
    TrainerPage,
    PokemonDetailsModalComponent,
    NotFoundPage,
    PokemonListItemComponent,
    PokemonListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
