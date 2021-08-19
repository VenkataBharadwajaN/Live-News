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
  loaded=false;
  constructor(private dataService:DataService) { }

  ngOnInit(): void 
  {

    this.subscription=this.dataService.getCovidData().subscribe(
      data=>{
        
        this.data=data['message'];
        
        console.log(this.data);
        
        this.data.sort((a,b)=>(a.state > b.state) ? 1 : ((b.state > a.state) ? -1 : 0))

        console.log(this.data);
      },
      err=>{
        console.log("Error In Getting Covid Data",err);
      }
    )

    setTimeout(()=>{
      this.loaded=true;
    },1000);

  }

  ngOnDestroy():void
  {
    this.subscription.unsubscribe();
  }

}
