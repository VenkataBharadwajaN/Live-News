import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  key:string;
  p=1;
  generalDetails:any[]=[];
  subscription:Subscription;
  loaded=false;
  constructor(private dataServiceObject:DataService,private routerService:Router) { }

  ngOnInit(): void 
  {

    this.subscription=this.dataServiceObject.getgeneralData().subscribe(
      data=>{
        this.generalDetails=data['message'];
        console.log(data);
      },
      err=>{
        console.log("Error In Getting General",err);
      }
    )

    setTimeout(()=>{
      this.loaded=true;
    },100);

  }

  ngOnDestroy():void
  {
    this.subscription.unsubscribe();
  }

  selected(id)
  {
    console.log(id);
    console.log(`/general/${id}`);
    this.routerService.navigateByUrl(`/general/${id}`);
  }

  cardSelected(id)
  {
    console.log(this.routerService.url,id);
    console.log(`/${this.routerService.url}/${id}`);
    this.routerService.navigateByUrl(`/general/${id}`);
  }


}
