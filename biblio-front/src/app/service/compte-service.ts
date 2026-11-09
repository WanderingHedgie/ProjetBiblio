import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Compte } from '../model/compte';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CompteService {

    private http = inject(HttpClient);
    private url = '/compte';

      findAll(): Observable<Compte[]> {
        return this.http.get<Compte[]>(this.url);
      }
    
      // Sans id : on a création (POST). Avec id : on a modification (PUT)
      save(compte: Compte): Observable<Compte> {
        if (compte.id) {
          return this.http.put<Compte>(`${this.url}/${compte.id}`, compte);
        }
        return this.http.post<Compte>(this.url, compte);
      }
}
