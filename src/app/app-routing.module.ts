import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CataloguePage } from './catalogue/catalogue.page';
import { LandingPage } from './landing/landing.page';
import { NotFoundPage } from './not-found/not-found.page';
import { TrainerPage } from './trainer/trainer.page';
import { LoggedInGuard } from './guard/logged-in.guard';

const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'catalogue', component: CataloguePage, canActivate: [LoggedInGuard] },
  { path: 'trainer', component: TrainerPage, canActivate: [LoggedInGuard] },
  { path: '**', component: NotFoundPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
