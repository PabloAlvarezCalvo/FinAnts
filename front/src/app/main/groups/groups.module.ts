import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OntimizeWebModule } from "ontimize-web-ngx";
import { GroupsRoutingModule } from "./groups-routing.module";
import { GroupsHomeComponent } from "./groups-home/groups-home.component";
import { GroupsDetailComponent } from "./groups-detail/groups-detail.component";
import { AddMemberComponent } from "./groups-detail/add-member/add-member.component";
import { GroupsNewComponent } from "./groups-new/groups-new.component";
import { MovementColumnRendererComponent } from "./groups-detail/movement-column-renderer/movement-column-renderer.component";
import { GroupDetailUserColorComponent } from "./groups-detail/group-detail-user-color/group-detail-user-color.component";

@NgModule({
  declarations: [
    GroupsHomeComponent,
    GroupsDetailComponent,
    AddMemberComponent,
    GroupsNewComponent,
    MovementColumnRendererComponent,
    GroupDetailUserColorComponent
  ],
  imports: [CommonModule, OntimizeWebModule, GroupsRoutingModule],
})
export class GroupsModule {}
