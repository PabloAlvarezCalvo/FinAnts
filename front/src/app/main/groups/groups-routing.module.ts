import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsHomeComponent } from './groups-home/groups-home.component';
import { GroupsDetailComponent } from './groups-detail/groups-detail.component';
import { GroupsNewComponent } from './groups-new/groups-new.component';
import { AddMemberComponent } from './groups-detail/add-member/add-member.component';


const routes: Routes = [
  {
    path: '',
    component: GroupsHomeComponent
  },
  {
    path: "new",
    component: GroupsNewComponent
  },
  {
    path: ':GR_ID',
    component: GroupsDetailComponent
  },
  {
    path: ':GR_ID/new',
    component: AddMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
