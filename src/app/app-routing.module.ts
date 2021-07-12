import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CovidComponent } from './covid/covid.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TopicPageComponent } from './topic-page/topic-page.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path:'covid',component:CovidComponent },
  { path:'general',component:HomeComponent },
  { path:'business',component:TopicPageComponent },
  { path:'entertainment',component:TopicPageComponent },
  { path:'health',component:TopicPageComponent },
  { path:'science',component:TopicPageComponent },
  { path:'sports',component:TopicPageComponent },
  { path:'technology',component:TopicPageComponent },
  { path:'about',component:AboutComponent },
  { path:'business/:id',component:ViewComponent },
  { path:'entertainment/:id',component:ViewComponent },
  { path:'health/:id',component:ViewComponent },
  { path:'science/:id',component:ViewComponent },
  { path:'sports/:id',component:ViewComponent },
  { path:'technology/:id',component:ViewComponent },
  { path:'general/:id',component:ViewComponent },

  {path:'',component:HomeComponent,pathMatch:'full'},
  {path:'**',component:PagenotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
