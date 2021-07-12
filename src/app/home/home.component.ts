import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  key:string;
  p=1;
  generalDetails:any[]=[];

  constructor(private dataServiceObject:DataService,private routerService:Router) { }

  ngOnInit(): void 
  {

    this.dataServiceObject.getgeneralData().subscribe(
      data=>{
        this.generalDetails=data['message'];
        console.log(data);
      },
      err=>{
        console.log("Error In Getting General",err);
      }
    )

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
