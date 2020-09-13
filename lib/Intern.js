// code to define and export the Intern class. 
const Employee = require("./Employee");

class Intern extends Employee {
    constuctor(name, id, email, school){
        super(name, id, email);
        this.school = school;
    }
    getRole = () => "Intern";
    getSchool = () => this.school;

}

module.exports = Intern;
