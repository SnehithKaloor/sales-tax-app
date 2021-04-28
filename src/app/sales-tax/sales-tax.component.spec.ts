import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalesTaxComponent } from './sales-tax.component';
import { productMockdata, totalsMockdata, items } from './sales-tax.mock';

describe('SalesTaxComponent', () => {
  let component: SalesTaxComponent;
  let fixture: ComponentFixture<SalesTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalesTaxComponent]
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

  it('should return prepared product data', () => {
    let productData = component.prepareProductData(items);
    expect({ ...productData }).toEqual({ ...productMockdata });
  });

  it('should return total taxes and total prices data', () => {
    let totalsData = component.calculateTotals(productMockdata);
    expect({ ...totalsData }).toEqual({ ...totalsMockdata });
  });
});