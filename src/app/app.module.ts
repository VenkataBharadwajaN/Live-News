import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { CovidComponent } from './covid/covid.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { NewssearchPipe } from './newssearch.pipe';
import { CovidsearchPipe } from './covidsearch.pipe';


import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { AboutComponent } from './about/about.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewComponent,
    CovidComponent,
    TopicPageComponent,
    PagenotfoundComponent,
    NewssearchPipe,
    CovidsearchPipe,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
