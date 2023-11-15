import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PersonService } from './services/person.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from './services/core.service';
import { PersonAddEditComponent } from './components/person-add-edit/person-add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'person-management-app';

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'emailAddress',
    'action'
  ];

  conf : boolean = false;
  dataSource!: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    public dialog: MatDialog,
    public personService: PersonService,
    public coreService: CoreService

  ) {
    
  
  }


  ngOnInit(): void {
    this.getPersonList();
  }

  openAddEditPersonForm() {
    const dialogRef = this.dialog.open(PersonAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPersonList();
        }
      },
    });
  }

  getPersonList() {
    this.personService.getPersons().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
      
  deletePerson(id: number) {
    this.personService.deletePerson(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Person deleted!', 'done');
        this.getPersonList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(PersonAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPersonList();
        }
      },
    });
  }

  openConfirmationDialog(){
    this.conf = true;
  }


}
