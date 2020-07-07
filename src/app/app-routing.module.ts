import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post/post.component';
import { EstateFormComponent } from './estate-form/estate-form.component';
import { AuthGuard } from './auth.guard';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'flat', component: EstateFormComponent, canActivate: [AuthGuard] },
  { path: 'login', component: AuthComponent },
  { path: '', pathMatch: 'full', component: PostComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
