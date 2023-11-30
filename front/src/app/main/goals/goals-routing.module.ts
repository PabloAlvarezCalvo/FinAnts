import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoalsHomeComponent } from './goals-home/goals-home.component';
import { GoalsNewComponent } from './goals-new/goals-new.component';
import { GoalsDetailComponent } from './goals-detail/goals-detail.component';


const routes: Routes = [
  {
  path : '',
  component: GoalsHomeComponent
},
{
  path : 'new',
  component: GoalsNewComponent
}, 

{
  path: ':GO_ID',
  component: GoalsDetailComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
