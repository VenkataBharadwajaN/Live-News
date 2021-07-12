import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.css']
})
export class CovidComponent implements OnInit {

  data:any[]=[];
  key:string;
  
  constructor(private dataService:DataService) { }

  ngOnInit(): void 
  {

    this.dataService.getCovidData().subscribe(
      data=>{
        this.data=data['message'];
      },
      err=>{
        console.log("Error In Getting Covid Data",err);
      }
    )

  }

}
