import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/services/core.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-add-edit',
  templateUrl: './person-add-edit.component.html',
  styleUrls: ['./person-add-edit.component.scss']
})
export class PersonAddEditComponent implements OnInit {
  personForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private personService: PersonService,
    private dialogRef: MatDialogRef<PersonAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
  ) {
    this.personForm = this.fb.group({
      firstName: '',
      lastName: '',
      emailAddress: ''    
    });
  }

  ngOnInit(): void {
    this.personForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.personForm.valid) {
      if (this.data) {
        this.personService
          .updatePerson(this.data.id, this.personForm.value)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Person detail updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.personService.addPerson(this.personForm.value).subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Person added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
