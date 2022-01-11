import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientActionsDialogComponent } from './client-actions-dialog.component';

describe('ClientActionsDialogComponent', () => {
  let component: ClientActionsDialogComponent;
  let fixture: ComponentFixture<ClientActionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientActionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientActionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
