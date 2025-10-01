import "reflect-metadata";
// function Log(target: any, key: string, desc: PropertyDescriptor) {
//   const originalMethod = desc.value;
//   desc.value = function (...args: unknown[]) {
//     console.log(`The ${key} has been called`);
//     return originalMethod.apply(this, args);
//   };
// }

function Role(...outerArgs: unknown[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const originalMethod = desc.value;
    desc.value = function (...args: unknown[]) {
      if (!outerArgs.includes(args[0].user.role)) {
        console.log("Not allowed");
        return;
      }
      return originalMethod.apply(this, args);
    };
  };
}

class ProductController {
  @Role("admin","manager")
  create(req) {
    // console.log("Create method called");
    //db call
    console.log("Product has been created");
  }

  @Role("manager")
  update(req) {
    // console.log("Update method called!");
    // db call
    console.log("Product has been updated. ");
  }
}

const product = new ProductController();
const req = {
  user: {
    role: "manager",
  },
};
product.update(req);
