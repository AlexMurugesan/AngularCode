import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course, Trainer } from './courses/cmanage/interfaces_req';
import { TrainerAllocation } from './courses/view/RequiredClasses';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
 

  private _url='http://10.4.14.129:8080/'
  displayAndAddCourses=this._url+'course';
  displayAndAddTrainer=this._url+'trainer';
  addSessionURL=this._url+'trainerAllocation';
  viewSessionsUrl=this._url+'trainerAllocation';
//  sessionCourses=this._url;
  sessionTrainers=this._url+'trainer/course/';
  deleteRow=this.viewSessionsUrl+'/delete/'

  constructor(private http: HttpClient) {
    }
    
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };  
    
  getDetails()
  {
    return this.http.get(this.displayAndAddCourses);
  }

  sendDetails(Course : any)
  {
    return this.http.post(this.displayAndAddCourses,Course,this.httpOptions);
  }

  getTrainers():Observable<Trainer[]>
  {
    return this.http.get<Trainer[]>(this.displayAndAddTrainer);
  }


  sendTrainers(Trainer : Trainer)
  {
    return this.http.post(this.displayAndAddTrainer,Trainer,this.httpOptions);
  }

  public getCourses():Observable<Course[]>
  {
    return this.http.get<Course[]>(this.displayAndAddCourses);
  }

  getList()
  {
    return this.http.get(this.displayAndAddCourses);
  }
  getTrainerList(cid:number):Observable<Trainer[]>
  {
    
    return this.http.get<Trainer[]>(this.sessionTrainers+cid);
    // console.log(this.sessionTrainers+cid);
  }
  getTrainerAllocation()
  {
    return this.http.get<TrainerAllocation[]>('/assets/Data/trainerAllocation.json');
  }

  addSession(trainerAllocation:any[]) {
    console.log(trainerAllocation);
    return this.http.post(this.addSessionURL,trainerAllocation,this.httpOptions)
  }
  viewSessions():Observable<TrainerAllocation[]>
  {
    return this.http.get<TrainerAllocation[]>(this.viewSessionsUrl);
  }

  getObject(tid:number)
  {
    console.log("I am alex");
     return this.http.delete(this.deleteRow+tid,this.httpOptions);
  }
}
