"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Log(logString) {
    console.log("from Log decorator factory");
    return function (constructor) {
        console.log("from Log decorator ........");
        console.log("logString = ", logString);
        console.log("constructor = ", constructor);
    };
}
function WithTemplate(template, hookId) {
    console.log("from WithTemplate decorator factory");
    return function (originalconstructor) {
        return class extends originalconstructor {
            constructor(..._) {
                super();
                console.log("from WithTamplate decorator ........");
                const hookElement = document.getElementById(hookId);
                if (hookElement) {
                    hookElement.innerHTML = template;
                    hookElement.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = "Rose";
        console.log("Create a person object...");
    }
};
Person = __decorate([
    Log("LOGIN - PERSON"),
    WithTemplate("<h1>This is from WithTemplate </h1>", "apple")
], Person);
const aa = new Person();
console.log("aa = ", aa);
function Logger(target, propertyName) {
    console.log("Property decorator called . . .");
    console.log("target = ", target);
    console.log("type of target = ", typeof target);
    console.log(" propertyName = ", propertyName);
}
function Logger2(target, name, descriptor) {
    console.log("Accessor decorator is called . . . ");
    console.log("target from accessor decorator = ", target);
    console.log("type of accessor decorator target = ", typeof target);
    console.log("name from accessor decorator = ", name);
    console.log("descriptor from accessor decorator = ", descriptor);
    console.log("typeof descriptor from accessor decorator = ", typeof descriptor);
}
function Logger3(target, name, descriptor) {
    console.log("Method decorator is called . . . ");
    console.log("target from method decorator = ", target);
    console.log("type of method decorator target = ", typeof target);
    console.log("name from method decorator = ", name);
    console.log("descriptor from method decorator = ", descriptor);
}
function Logger4(target, name, position) {
    console.log("Parameter decorator is called . . . ");
    console.log("target from parameter decorator = ", target);
    console.log("type of parameter decorator target = ", typeof target);
    console.log("name from parameter decorator = ", name);
    console.log("descriptor from parameter decorator = ", position);
}
class Product {
    constructor(p) {
        this._price = p;
        this.title = "bb";
    }
    set price(v) {
        if (v > 0) {
            this._price = v;
        }
        throw new Error("");
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Logger
], Product.prototype, "title", void 0);
__decorate([
    Logger2
], Product.prototype, "price", null);
__decorate([
    Logger3,
    __param(0, Logger4)
], Product.prototype, "getPriceWithTax", null);
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjustDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustDescriptor;
}
class Printer {
    constructor() {
        this.message = "This worksss";
    }
    showMessage() {
        console.log("this.message = ", this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector("button");
button.addEventListener("click", p.showMessage);
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ["required"] });
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ["positive"] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    console.log("objValidatorConfig = ", objValidatorConfig);
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        console.log("prop = ", prop);
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case "required":
                    isValid = isValid && !!obj[prop];
                    break;
                case "positive":
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    console.log("objValidatorConfig 222= ", objValidatorConfig);
    return isValid;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm === null || courseForm === void 0 ? void 0 : courseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    console.log("price = ", price);
    console.log("title = ", title);
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        alert("Invalid input, please try again!");
        return;
    }
    console.log("createdCourse = ", createdCourse);
});
//# sourceMappingURL=app.js.map