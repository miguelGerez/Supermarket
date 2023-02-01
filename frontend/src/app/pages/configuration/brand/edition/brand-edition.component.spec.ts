import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandEdicionComponent } from './brand-edicion.component';

describe('BrandEdicionComponent', () => {
  let component: BrandEdicionComponent;
  let fixture: ComponentFixture<BrandEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrandEdicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
