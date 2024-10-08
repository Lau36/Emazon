import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TexttareaComponent } from './textarea.component';

describe('TexttareaComponent', () => {
  let component: TexttareaComponent;
  let fixture: ComponentFixture<TexttareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TexttareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TexttareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
