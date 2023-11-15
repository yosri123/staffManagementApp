import { TestBed } from '@angular/core/testing';

import { PersonService } from './person.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Person } from '../models/Person';

describe('PersonService', () => {
  let service: PersonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonService]
    });
    service = TestBed.inject(PersonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get persons from the Mock Api', () => {
    const mockResponse: Person[] = [
      {
        "firstName": "Peters",
        "lastName": "Parker",
        "emailAddress": "peter.parker@example.com",
        "id": 3
      },
      {
        "firstName": "Peters",
        "lastName": "Parker",
        "emailAddress": "peter.parker@example.com",
        "id": 4
      }
    ];
  
    spyOn(service['httpClient'], 'get').and.returnValue(of(mockResponse));
      service.getPersons().subscribe(persons => {
      expect(persons).toEqual(mockResponse);
    });
  });

  it('should update a person in the Mock Api', () => {
    const id = 1;
    const mockData = {
      firstName: 'Jane',
      lastName: 'Doe',
      emailAddress: 'jane.doe@example.com',
      id : 1
    };

    spyOn(service['httpClient'], 'put').and.returnValue(of(mockData));

    service.updatePerson(id, mockData).subscribe(data => {
      expect(data).toEqual(mockData);
    });
  });

  it('should delete a person from the Mock Api', () => {
    const id = 1;

    spyOn(service['httpClient'], 'delete').and.returnValue(of());

    service.deletePerson(id).subscribe(() => {
      expect(true).toBeTruthy();
    });
  });
});
  

