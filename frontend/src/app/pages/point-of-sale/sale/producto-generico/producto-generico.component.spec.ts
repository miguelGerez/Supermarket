import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGenericoComponent } from './product-generico.component';

describe('ProductGenericoComponent', () => {
  let component: ProductGenericoComponent;
  let fixture: ComponentFixture<ProductGenericoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductGenericoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGenericoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
