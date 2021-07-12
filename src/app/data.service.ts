import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  business:any[]=[];
  entertainment:any[]=[];
  health:any[]=[];
  science:any[]=[];
  sports:any[]=[];
  technology:any[]=[];
  general:any[]=[];

  businessvisit=0;
  entertainmentvisit=0;
  healthvisit=0;
  sciencevisit=0;
  sportsvisit=0;
  technologyvisit=0;
  generalvisit=0;

  constructor(private httpClient:HttpClient) { }

  getCovidData():Observable<any>
  {
    return this.httpClient.get('/covid/getcovidData');
  }

  getgeneralData():Observable<any>
  {
    return this.httpClient.get('/general/getgeneralArticles');
  }

  getTopicDetails(type):Observable<any>
  {
    type=type.substring(1);
    // console.log(typeof type);
    // console.log(`/${type}/get${type}Articles`);
    return this.httpClient.get(`/${type}/get${type}Articles`);
  }

  getViewingDetails(title,id):Observable<any>
  {
    return this.httpClient.get(`/${title}/`+id);
  }

  getRequiredObject(title,id)
  {
    if(title=='business')
    {
      let data=this.business.filter(Obj=>{
        return Obj._id==id
      })
      return data[0];
    }
    else if(title=='entertainment')
    {
      let data=this.entertainment.filter(Obj=>{
        return Obj._id==id
      })
      return data[0];
    }
    else if(title=='health')
    {
      let data=this.health.filter(Obj=>{
        return Obj._id==id
      })
      return data[0];
    }
    else if(title=='science')
    {
      let data=this.science.filter(Obj=>{
        return Obj._id==id
      })
      return data[0];
    }
    else if(title=='sports')
    {
      let data=this.sports.filter(Obj=>{
        return Obj._id==id
      })
      return data[0];
    }
    else if(title=='technology')
    {
      let data=this.technology.filter(Obj=>{
        return Obj._id==id
      })
      return data[0];
    }
  }

  getSuggesstionssDetails(type):Observable<any>
  {
    // type=type.substring(1);
    // console.log(typeof type);
    return this.httpClient.get(`/${type}/getFew${type}Articles`);
  }

}
