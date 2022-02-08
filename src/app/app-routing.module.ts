import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguePage } from './catalogue/catalogue.page';
import { DetailsPage } from './shared/details/details.page';
import { LandingPage } from './landing/landing.page';
import { NotFoundPage } from './not-found/not-found.page';
import { TrainerPage } from './trainer/trainer.page';

const routes: Routes = [
  { path: '',           component: LandingPage    },
  { path: 'catalogue',  component: CataloguePage  },
  { path: 'trainer',    component: TrainerPage    },
  { path: 'details',    component: DetailsPage    },
  { path: '**',         component: NotFoundPage   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
