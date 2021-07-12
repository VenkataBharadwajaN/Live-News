import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit,OnDestroy {

  data:any[]=[];
  key:string;
  subscription:Subscription;
  constructor(private dataService:DataService) { }

  ngOnInit(): void 
  {

    this.subscription=this.dataService.getCovidData().subscribe(
      data=>{
        this.data=data['message'];
      },
      err=>{
        console.log("Error In Getting Covid Data",err);
      }
    )

  }

  ngOnDestroy():void
  {
    this.subscription.unsubscribe();
  }

}
