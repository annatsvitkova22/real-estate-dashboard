import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
  { path: 'flat', component: CardComponent },
  { path: '', pathMatch: 'full', component: PostComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
