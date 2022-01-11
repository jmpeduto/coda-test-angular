import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRemoveDialogComponent } from './client-remove-dialog.component';

describe('ClientRemoveDialogComponent', () => {
  let component: ClientRemoveDialogComponent;
  let fixture: ComponentFixture<ClientRemoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRemoveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRemoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
