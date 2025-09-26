class VendingMachine {
  constructor() {
    this.denoms = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
    this.products = [
      {
        id: 1,
        name: "Water",
        price: 20,
      },
    ];
    this.selectedProduct = null;
    this.balance = 0;
  }
  restock(product) {
    const isOccupied = this.products.find((item) => item.id === product.id);
    if (isOccupied) {
      return {
        ok: false,
        message: "Given slot is busy, please choose another slot",
      };
    }
    this.products.push(product);
    return {
      ok: true,
      message: "Product has been added",
    };
  }
  selectProduct(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      return {
        ok: false,
        message: "Unknown product",
      };
    }

    this.selectedProduct = product;
    return {
      ok: true,
      message: "Please insert the coins",
    };
  }
  insertBills(bill) {
    if (!Number.isInteger(bill) || bill <= 0) {
      return {
        ok: false,
        message: "Unknown bill",
      };
    }
    this.balance += bill;

    if (this.selectedProduct.price > this.balance) {
      const dueAmount = this.selectedProduct.price - this.balance;
      return {
        ok: true,
        message: `Insert more ${dueAmount}`,
      };
    }

    return this.dispense(this.selectedProduct);
  }

  dispense(product) {
    this.products = this.products.filter((item) => item.id !== product.id);
    const notesToReturn = this.returnChange();

    this.balance = 0;
    this.selectedProduct = null;
    return {
      ok: true,
      message: `Product has been dispensed, Please collect your change: ${notesToReturn.join(
        ","
      )}`,
    };
  }
  returnChange() {
    const coins = [];
    let remainingBalance = this.balance - this.selectedProduct.price;
    for (const note of this.denoms) {
      while (remainingBalance >= note) {
        coins.push(note);
        remainingBalance -= note;
      }
    }
    return coins;
  }
}

const vm = new VendingMachine();

vm.restock({
  id: 5,
  name: "Chocolate",
  price: 80,
});

const selectedProduct = vm.selectProduct(5);
if (!selectedProduct.ok) {
  throw Error(selectedProduct.message);
}

const msg = vm.insertBills(100);
console.log(msg);
