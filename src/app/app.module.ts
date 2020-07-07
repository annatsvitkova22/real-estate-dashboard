import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { PostComponent } from './post/post.component';
import { EstateFormComponent } from './estate-form/estate-form.component';
import { estateReducer } from './redux/estates.reducer';
import { idEstateReducer } from './redux/id.reducer';
import { PostService } from './post/post.service';
import { AuthInterceptor } from './app.interceptor';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth.guard';
import { authReducer } from './redux/auth.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    PostComponent,
    EstateFormComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({estatePage: estateReducer, idCounterPage: idEstateReducer, authPage: authReducer})
  ],
  providers: [
    PostService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
