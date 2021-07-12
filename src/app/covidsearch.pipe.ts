import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'covidsearch'
})
export class CovidsearchPipe implements PipeTransform {

  transform(data:any[], key: string): any[] 
  {
    if(!data || !key)
    {
      return data;
    }

    let dataMatched=data.filter((Obj)=>{
      if(Obj.state.toLowerCase().indexOf(key.toLowerCase())!==-1 )
          return Obj;
    })

    if(dataMatched.length!=0)
    {
      return dataMatched;
    }

    else
    {
      return data;
    }
    
  }

}
