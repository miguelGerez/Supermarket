import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionComponent } from './edition.component';

describe('EditionComponent', () => {
  let component: EditionComponent;
  let fixture: ComponentFixture<EditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
