import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livre } from '../model/livre';

@Injectable({ providedIn: 'root' })
export class LivreService {
    
    private http = inject(HttpClient);
    private url = '/livre';
    
    public findAll(): Observable<Livre[]> {
        return this.http.get<Livre[]>(this.url);
    }
    
    public findById(livre: Livre): Observable<Livre> {
        return this.http.get<Livre>(`${this.url}/${ livre.id }`)
    }
    
    public save(livre: Livre): Observable<Livre> {
        if (livre.id) {
            return this.http.put<Livre>(`${this.url}/${livre.id}`, livre);
        }
        return this.http.post<Livre>(this.url, livre);
    }
    
    public remove(livre: Livre): Observable<void> {
        return this.http.delete<void>(`${this.url}/${livre.id}`);
    }
}
