import { Component } from '@angular/core';

interface ProductData {
  name?: string;
  price?: number;
  quantity?: number;
  isImported?: boolean;
  isExempted?: boolean;
  salesTax?: number;
  priceWithTax?: number;
}

interface Totals {
  totalSalesTax?: number;
  totalPrice?: number;
}

const itemType = [
  'imported'
]

const exemptItems = [
  'book',
  'chocolate',
  'pills',
]

@Component({
  selector: 'app-sales-tax',
  templateUrl: './sales-tax.component.html',
  styleUrls: ['./sales-tax.component.css']
})
export class SalesTaxComponent {

  fileContent: any = '';
  productDataList: ProductData[] = [];
  totals: Totals;

  // On file upload
  public onFileUpload(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = (x) => {
      self.fileContent = fileReader.result;
      const items = this.fileContent.split('\n');
      this.productDataList = this.prepareProductData(items);
      this.totals = this.calculateTotals(this.productDataList);
    }
    if (file) {
      fileReader.readAsText(file);
    }
  }

  // Prepare Product list
  prepareProductData(items: string[]): ProductData[] {
    let productDataList: ProductData[] = [];
    items.forEach((item: string) => {
      let productData: ProductData = {};
      productData.price = Number(item.split(' at')[1]);
      productData.name = item.split(' at')[0];
      productData.quantity = Number(item.split(' ')[0]);
      productData.isImported = itemType.filter((item: string) => productData.name.toLowerCase().includes(item.toLowerCase())).length > 0;
      productData.isExempted = exemptItems.filter((item: string) => productData.name.toLowerCase().includes(item.toLowerCase())).length > 0;
      this.calculateTax(productData);
      productDataList.push(productData);
    });
    return productDataList;
  }

  // Calculate taxes based on prepared product data
  calculateTax(productData): void {
    let taxPercentage: number = 0;
    if (productData.isImported) {
      taxPercentage += 5;
    }
    if (!productData.isExempted) {
      taxPercentage += 10;
    }
    const tax = (taxPercentage * productData.price) / 100;
    productData.salesTax = Math.ceil(tax / 0.05) * 0.05;
    productData.priceWithTax = (productData.price + productData.salesTax) * productData.quantity;
  }

  // Calculate total taxes and total prices for product list
  calculateTotals(productDataList: ProductData[]): Totals {
    let totals: Totals = { totalSalesTax: 0, totalPrice: 0 };
    productDataList.forEach((productData: ProductData) => {
      totals.totalPrice += productData.priceWithTax;
      totals.totalSalesTax += productData.salesTax * productData.quantity;
    })
    return totals;
  }
}
