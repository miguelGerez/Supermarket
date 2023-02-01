import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BardCodeSinProductComponent } from './bard-code-sin-producto.component';

describe('BardCodeSinProductComponent', () => {
  let component: BardCodeSinProductComponent;
  let fixture: ComponentFixture<BardCodeSinProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BardCodeSinProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BardCodeSinProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
