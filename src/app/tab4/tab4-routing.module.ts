import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { Tab4Page } from './tab4.page';

const routes: Routes = [
  { path: '', redirectTo: 'category/:id', pathMatch: 'full' },
  {
    path: 'category/:id',
    component: Tab4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab4PageRoutingModule {}
