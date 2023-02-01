import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryEdicionComponent } from './category-edicion.component';

describe('CategoryEdicionComponent', () => {
  let component: CategoryEdicionComponent;
  let fixture: ComponentFixture<CategoryEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryEdicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
