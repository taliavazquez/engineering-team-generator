// code to define and export the Manager class
const Employee = require("./Employee");

class Manager extends Employee {
    constuctor(name, id, email, officeNumber){
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole = () => "Manager";
    getofficeNumber = () => this.officeNumber;

}

module.exports = Manager;
