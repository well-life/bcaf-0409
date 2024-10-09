import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PictureComponent } from './pages/pic/picture.component';
import { GuardService } from '../core/services/guard';
import { PictureDetailComponent } from './pages/pic-detail/picture-detail.component';
import { PictureCreateComponent } from './pages/pic-create/picture-create.component';


const routes: Routes = [
    //Index PAGE
    {
      path: 'picture',
      component : PictureComponent,
      canActivate: [GuardService]
    },
    //CREATE PAGE
    {
      path: 'picture/create',
      component : PictureCreateComponent,
      canActivate: [GuardService]
    },
    //DETAIL PAGE
    {
      path: 'picture/detail/:id',
      component : PictureDetailComponent,
      canActivate: [GuardService]
    }
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PicturesRoutingModule { }