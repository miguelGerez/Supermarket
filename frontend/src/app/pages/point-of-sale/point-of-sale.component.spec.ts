import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointOfSaleComponent } from './point-of-sale.component';

describe('PointOfSaleComponent', () => {
  let component: PointOfSaleComponent;
  let fixture: ComponentFixture<PointOfSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointOfSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointOfSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
