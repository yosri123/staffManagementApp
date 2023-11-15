import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonAddEditComponent } from './person-add-edit.component';
import { PersonService } from '../../services/person.service';
import { CoreService } from '../../services/core.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('PersonAddEditComponent', () => {
  let component: PersonAddEditComponent;
  let fixture: ComponentFixture<PersonAddEditComponent>;
  let personServiceSpy: jasmine.SpyObj<PersonService>;
  let coreServiceSpy: jasmine.SpyObj<CoreService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<PersonAddEditComponent>>;

  beforeEach(async () => {
    personServiceSpy = jasmine.createSpyObj('PersonService', ['updatePerson', 'addPerson']);
    coreServiceSpy = jasmine.createSpyObj('CoreService', ['openSnackBar']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [PersonAddEditComponent],
      providers: [
        { provide: PersonService, useValue: personServiceSpy },
        { provide: CoreService, useValue: coreServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        FormBuilder,
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update a person when the form is submitted', () => {
    component.personForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com',
    });

    component.onFormSubmit();

    expect(personServiceSpy.updatePerson).toHaveBeenCalledOnceWith(1, {
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john.doe@example.com',
    });

    expect(coreServiceSpy.openSnackBar).toHaveBeenCalledOnceWith('Person detail updated!');
    expect(dialogRefSpy.close).toHaveBeenCalledOnceWith(true);
  });

  it('should add a person when the form is submitted', () => {
    component.personForm.patchValue({
      firstName: 'Jane',
      lastName: 'Doe',
      emailAddress: 'jane.doe@example.com',
    });

    component.data = null;

    component.onFormSubmit();

    expect(personServiceSpy.addPerson).toHaveBeenCalledOnceWith({
      firstName: 'Jane',
      lastName: 'Doe',
      emailAddress: 'jane.doe@example.com',
      id:1
    });

    expect(coreServiceSpy.openSnackBar).toHaveBeenCalledOnceWith('Person added successfully');
    expect(dialogRefSpy.close).toHaveBeenCalledOnceWith(true);
  });
});
