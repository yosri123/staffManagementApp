import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../models/Person';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private dbJsonUrl = 'http://localhost:3000/persons';


  constructor(private httpClient: HttpClient) { }

  getPersonsFromJson(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.dbJsonUrl);
  }

  getPersons(): Observable<Person[]> {
    return this.getPersonsFromJson();
  }

  addPerson(person: Person): Observable<Person> {
    return this.httpClient.post<Person>(this.dbJsonUrl, person);
  }
  
  updatePerson(id: number, data: any): Observable<Person> {
    return this.httpClient.put<Person>(`${this.dbJsonUrl}/${id}`, data);
  }

  deletePerson(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.dbJsonUrl}/${id}`);
  }



}
