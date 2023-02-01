import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEdicionComponent } from './inventory-edicion.component';

describe('InventoryEdicionComponent', () => {
  let component: InventoryEdicionComponent;
  let fixture: ComponentFixture<InventoryEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryEdicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
