import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent implements OnInit {

  topicDetails:any[]=[];
  key:string;
  p=1;
  constructor(private activatedRoute:ActivatedRoute,private router:Router,private dataServiceObject:DataService) { }

  ngOnInit(): void 
  {
    // console.log(this.router.url);
    this.dataServiceObject.getTopicDetails(this.router.url).subscribe(
      res=>{
        console.log(res['message']);
        this.topicDetails=res['message'];
        // console.log(this.router.url);
        if(this.router.url=='/business')
        {
          this.dataServiceObject.business=this.topicDetails
          console.log("Updated Details Of Business",this.topicDetails);
          // console.log("Updated Details Of Business",this.dataServiceObject.business);

        }
        else if(this.router.url=='/entertainment')
        {
          this.dataServiceObject.entertainment=this.topicDetails
          console.log("Updated Details Of Entertainment",this.topicDetails);
          // console.log("Updated Details Of Entertainment",this.dataServiceObject.entertainment);

        }
        else if(this.router.url=='/health')
        {
          this.dataServiceObject.health=this.topicDetails
          console.log("Updated Details Of Health",this.topicDetails);
          // console.log("Updated Details Of Health",this.dataServiceObject.health);

        }
        else if(this.router.url=='/science')
        {
          this.dataServiceObject.science=this.topicDetails
          console.log("Updated Details Of Science",this.topicDetails);
          // console.log("Updated Details Of Science",this.dataServiceObject.science);

        }
        else if(this.router.url=='/sports')
        {
          this.dataServiceObject.sports=this.topicDetails
          console.log("Updated Details Of Sports",this.topicDetails);
          // console.log("Updated Details Of Sports",this.dataServiceObject.sports);

        }
        else if(this.router.url=='/technology')
        {
          this.dataServiceObject.technology=this.topicDetails
          console.log("Updated Details Of Technology",this.topicDetails);
          // console.log("Updated Details Of Technology",this.dataServiceObject.technology);

        }
      },
      err=>{
        console.log("Error In Getting Business Details",err);
      }
    )  
  }
  
  cardSelected(id)
  {
    // console.log(this.router.url);
    this.router.navigateByUrl(`/${this.router.url}/${id}`);
  }

  selected(id)
  {
    // console.log(id);
    // console.log(`/${this.router.url}/${id}`);
    this.router.navigateByUrl(`/${this.router.url}/${id}`);
  }

  // cardSelected(id)
  // {
  //   console.log(this.routerService.url,id);
  //   console.log(`/${this.routerService.url}/${id}`);
  //   this.routerService.navigateByUrl(`/general/${id}`);
  // }

}
