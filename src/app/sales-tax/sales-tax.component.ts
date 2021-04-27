import { Component } from '@angular/core';

@Component({
  selector: 'app-sales-tax',
  templateUrl: './sales-tax.component.html',
  styleUrls: ['./sales-tax.component.css']
})
export class SalesTaxComponent {

  checkoutItems: any = []
  total: any = 0;
  totalSalesTax: any = 0;
  fileContent: any = '';
  
  itemType = [
    'imported'
  ]

  exemptItems = [
    'book',
    'chocolate',
    'pills',
  ]

  parseContent() {
    this.total = 0;
    this.totalSalesTax = 0;
    const receiptItems: any = [];
    // split by lines first
    const items = this.fileContent.split('\n');
    console.log("Split content", items);

    items.forEach((i: any) => {
      console.log("item", i);
      const temp = i.split(' at');
      console.log("temp", temp);
      receiptItems.push(this.calculateTax(temp))
    });
    console.log("receiptItems", receiptItems);
    this.checkoutItems = [...receiptItems]
  }


  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = (x) => {
      self.fileContent = fileReader.result;
      console.log("file content", this.fileContent);
      this.parseContent()
    }
    if (file) {
      fileReader.readAsText(file);
    }
  }

  calculateTax(item: any) {
    console.log("caluclate item", item);
    const originalName = item[0];
    const originalPrice = Number(item[1]);
    console.log("originalName", originalName);
    console.log("originalPrice", originalPrice);
    let taxPercentage = 0;
    // check if exempt item
    const exemptMatch = this.exemptItems.filter((item) => {
      return originalName.toLowerCase().includes(item.toLowerCase());
    });
    console.log("exemptMatch", exemptMatch);
    if (exemptMatch.length == 0) {
      taxPercentage += 10;
    }
    // check if imported
    const importedMatch = this.itemType.filter((item) => {
      return originalName.toLowerCase().includes(item.toLowerCase());
    });
    console.log("importedMatch", importedMatch);

    if (importedMatch.length) {
      taxPercentage += 5;
    }
    const salesTax = (taxPercentage * originalPrice) / 100;
    console.log("salesTax", salesTax);
    // Rounded up to the nearest 0.05
    const roundedSalesTax = Math.ceil(salesTax / 0.05) * 0.05;
    console.log("roundedSalesTax", roundedSalesTax);
    const itemTotal = originalPrice + roundedSalesTax;
    console.log("itemTotal", itemTotal);
    this.totalSalesTax += roundedSalesTax;
    console.log("totalSalesTax", this.totalSalesTax);
    this.total += itemTotal;
    console.log("this.total", this.total);
    const obj = {
      name: item[0],
      price: itemTotal
    }
    console.log("obj", obj);
    return obj;
  }
}
