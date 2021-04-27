import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTaxComponent } from './sales-tax.component';


const items = {
  "0": "1 imported box of chocolates",
  "1": " 10.00"
}

describe('SalesTaxComponent', () => {
  let component: SalesTaxComponent;
  let fixture: ComponentFixture<SalesTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesTaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate tax', () => {
    //component.calculateTax(items);
  });

});