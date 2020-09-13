// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constuctor(name, id, email, github){
        super(name, id, email);
        this.github = github;
    }
    getRole = () => "Engineer";
    getGithub = () => this.github;

}

module.exports = Engineer;