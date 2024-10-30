import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserAuxPageComponent } from './create-user-aux-page.component';

describe('CreateUserAuxPageComponent', () => {
  let component: CreateUserAuxPageComponent;
  let fixture: ComponentFixture<CreateUserAuxPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserAuxPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserAuxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
