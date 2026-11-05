import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Avis } from "../model/avis";

@Injectable({providedIn: 'root'})
export class AvisService {
  constructor(private http: HttpClient){}
  private apiUrl: string = "/avis";

  public findAll() {
    return this.http.get<Avis[]>(this.apiUrl);
  }

   public findById(avis: Avis): Observable<Avis[]> {
    return this.http.get<Avis[]>(`${this.apiUrl}/${ avis.id }`)
  }


  public save(avis: Avis): Observable<Avis> {
    if (!avis.id) {
      return this.http.post<Avis>(this.apiUrl, avis);
    } else {
      return this.http.put<Avis>(`${this.apiUrl}/${ avis.id }`, avis);
    }
  }

  public delete(avis: Avis): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ avis.id }`);
  }

}
