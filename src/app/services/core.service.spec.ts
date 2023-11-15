import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CoreService } from './core.service';

describe('CoreService', () => {
  let service: CoreService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [CoreService],
    });

    service = TestBed.inject(CoreService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open a snackbar with the given message and action', () => {
    const openSpy = spyOn(snackBar, 'open');

    const message = 'Test Message';
    const action = 'Test Action';

    service.openSnackBar(message, action);

    expect(openSpy).toHaveBeenCalledWith(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  });

  it('should open a snackbar with default action if not provided', () => {
    const openSpy = spyOn(snackBar, 'open');

    const message = 'Test Message';

    service.openSnackBar(message);

    expect(openSpy).toHaveBeenCalledWith(message, 'ok', {
      duration: 1000,
      verticalPosition: 'top',
    });
  });
});
