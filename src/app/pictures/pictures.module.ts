import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PictureComponent } from './pages/pic/picture.component';
import { SharedModule } from '../shared/shared.module';
import { PicturesRoutingModule } from './pictures-routing.module';
import { PictureCreateComponent } from './pages/pic-create/picture-create.component';
import { PictureDetailComponent } from './pages/pic-detail/picture-detail.component';
import { PictureListComponent } from './pages/pic-list/picture-list.component';

@NgModule({
  declarations: [
    PictureComponent,
    PictureCreateComponent,
    PictureDetailComponent,
    PictureListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PicturesRoutingModule
  ]
})
export class PicturesModule { }