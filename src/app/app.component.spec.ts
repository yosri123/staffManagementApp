import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { PersonService } from './services/person.service';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from './services/core.service';
import { PersonAddEditComponent } from './components/person-add-edit/person-add-edit.component';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let personServiceMock: PersonService;
  let matDialogMock: MatDialog;
  let coreServiceMock: CoreService;

  beforeEach(() => {
    personServiceMock = jasmine.createSpyObj('PersonService', ['getPersons', 'deletePerson']);
    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    coreServiceMock = jasmine.createSpyObj('CoreService', ['openSnackBar']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: PersonService, useValue: personServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: CoreService, useValue: coreServiceMock },
      ],
    });

    appComponent = TestBed.createComponent(AppComponent).componentInstance;
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it('should call the person service getPersons() method on init', () => {
    appComponent.ngOnInit();

    expect(personServiceMock.getPersons).toHaveBeenCalled();
  });

  it('should open the add/edit person dialog when the openAddEditPersonForm() method is called', () => {
    appComponent.openAddEditPersonForm();

    expect(matDialogMock.open).toHaveBeenCalledWith(PersonAddEditComponent);
  });

  it('should call the person service deletePerson() method when the deletePerson() method is called', () => {
    appComponent.deletePerson(1);

    expect(personServiceMock.deletePerson).toHaveBeenCalledWith(1);
  });

  it('should open the edit form dialog when the openEditForm() method is called', () => {
    appComponent.openEditForm({ id: 1 });

    expect(matDialogMock.open).toHaveBeenCalledWith(PersonAddEditComponent, {
      data: { id: 1 },
    });
  });

  it('should open the confirmation dialog when the openConfirmationDialog() method is called', () => {
    appComponent.openConfirmationDialog();

    expect(appComponent.conf).toBe(true);
  });
});
