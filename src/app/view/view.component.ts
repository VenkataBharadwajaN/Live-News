import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit,OnDestroy {

  data;
  suggesstions;
  constructor(private activatedRoute:ActivatedRoute,private routerService:Router,private dataService:DataService) { }

  ngOnInit(): void 
  {
    
    this.activatedRoute.params.subscribe(
      params=>
      {
        // console.log("Parameters",params);
        // console.log(this.routerService.url);
        window.scrollTo(0, 0)
        let temp=this.routerService.url.split('/')
        // console.log(temp[1])
        if(temp[1]=='business')
        {
          if(this.dataService.business.length==0 || this.dataService.businessvisit==0)
          {
            this.dataService.getViewingDetails(temp[1],this.activatedRoute.snapshot.params.id).subscribe(
              data=>{
                console.log(data['message']);
                this.data=data['message'];
                console.log(this.data)
              },
              err=>{
                console.log("Error In Viewing ",err);
              }
            );
            this.dataService.businessvisit=1;
          } 
          else
          {
              this.data=this.dataService.getRequiredObject('business',this.activatedRoute.snapshot.params.id)
              console.log(this.data);
          }  
        }
        else if(temp[1]=='entertainment')
        {
          if(this.dataService.entertainment.length==0 || this.dataService.entertainmentvisit==0)
          {
            this.dataService.getViewingDetails(temp[1],this.activatedRoute.snapshot.params.id).subscribe(
              data=>{
                console.log(data['message']);
                this.data=data['message'];
                console.log(this.data)
              },
              err=>{
                console.log("Error In Viewing ",err);
              }
            );
            this.dataService.entertainmentvisit=1;
          } 
          else
          {
              this.data=this.dataService.getRequiredObject('entertainment',this.activatedRoute.snapshot.params.id)
              console.log(this.data);
          }  
        }
        else if(temp[1]=='health')
        {
          if(this.dataService.health.length==0 || this.dataService.healthvisit==0)
          {
            this.dataService.getViewingDetails(temp[1],this.activatedRoute.snapshot.params.id).subscribe(
              data=>{
                console.log(data['message']);
                this.data=data['message'];
                console.log(this.data)
              },
              err=>{
                console.log("Error In Viewing ",err);
              }
            );
            this.dataService.healthvisit=1;
          } 
          else
          {
              this.data=this.dataService.getRequiredObject('health',this.activatedRoute.snapshot.params.id)
              console.log(this.data);
          }  
        }
        else if(temp[1]=='science')
        {
          if(this.dataService.science.length==0 || this.dataService.sciencevisit==0)
          {
            this.dataService.getViewingDetails(temp[1],this.activatedRoute.snapshot.params.id).subscribe(
              data=>{
                console.log(data['message']);
                this.data=data['message'];
                // console.log(this.data)
              },
              err=>{
                console.log("Error In Viewing ",err);
              }
            );
            this.dataService.sciencevisit=1;
          } 
          else
          {
              this.data=this.dataService.getRequiredObject('science',this.activatedRoute.snapshot.params.id)
              console.log(this.data);
          }  
        }
        else if(temp[1]=='sports')
        {
          if(this.dataService.sports.length==0 || this.dataService.sportsvisit==0)
          {
            this.dataService.getViewingDetails(temp[1],this.activatedRoute.snapshot.params.id).subscribe(
              data=>{
                console.log(data['message']);
                this.data=data['message'];
                console.log(this.data)
              },
              err=>{
                console.log("Error In Viewing ",err);
              }
            );
            this.dataService.sportsvisit=1;
          } 
          else
          {
              this.data=this.dataService.getRequiredObject('sports',this.activatedRoute.snapshot.params.id)
              console.log(this.data);
          }  
        }

        else if(temp[1]=='technology')
        {
          if(this.dataService.technology.length==0 || this.dataService.technologyvisit==0)
          {
            this.dataService.getViewingDetails(temp[1],this.activatedRoute.snapshot.params.id).subscribe(
              data=>{
                console.log(data['message']);
                this.data=data['message'];
                console.log(this.data)
              },
              err=>{
                console.log("Error In Viewing ",err);
              }
            );
            this.dataService.technologyvisit=1;
          } 
          else
          {
              this.data=this.dataService.getRequiredObject('technology',this.activatedRoute.snapshot.params.id)
              console.log(this.data);
          }  
        }

        else if(temp[1]=='general')
        {
          if(this.dataService.general.length==0 || this.dataService.generalvisit==0)
          {
            this.dataService.getViewingDetails(temp[1],this.activatedRoute.snapshot.params.id).subscribe(
              data=>{
                console.log(data['message']);
                this.data=data['message'];
                console.log(this.data)
              },
              err=>{
                console.log("Error In Viewing ",err);
              }
            );
            this.dataService.generalvisit=1;
          } 
          else
          {
              this.data=this.dataService.getRequiredObject('general',this.activatedRoute.snapshot.params.id)
              console.log(this.data);
          }  
        }
        
      },

      err=>{
        console.log("Error In Viewing Data",err);
      }) 
      
    let temp=this.routerService.url.split('/')
    console.log(temp[1])
    
      this.data=this.dataService.getSuggesstionssDetails(temp[1]).subscribe(
        data=>{
          console.log(data['message']);
          this.suggesstions=data['message'];
        },
        err=>{
          console.log("Error In Suggesstions ",err);
        }
      );

  }

  ngOnDestroy()
  {
    this.dataService.businessvisit=0;
    this.dataService.healthvisit=0;
    this.dataService.entertainmentvisit=0;
    this.dataService.sciencevisit=0;
    this.dataService.sportsvisit=0;
    this.dataService.technologyvisit=0;
    this.dataService.generalvisit=0;
  }

  view(title)
  {
    let temp=this.routerService.url.split('/')
    // console.log(temp[1])
    // console.log(title);
    this.routerService.navigateByUrl(`${temp[1]}/`+title);
  }

}
