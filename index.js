const path = require('path');
const fs = require('fs');
const util = require ('util')
const writeFileAsynx = util.promisify(fs.writeFile);
const inquirer = require('inquirer');

//access data path
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { rejects } = require('assert');

//manager question array
const managerQuestions = [
    {
        name: "id",
        message: "Enter manager's ID:"
    },
    {
        name: "name",
        message: "Enter your manager's name:"
    },

    {
        name: "email",
        message: "Enter manager's email:"
    },

    {
        name: "OfficeNumber",
        message: "Enter manager's email:"
    },
];
//change questions to engineer
const engineerQuestions = [
    {
        name: "id",
        message: "Enter manager's ID:"
    },
    {
        name: "name",
        message: "Enter your manager's name:"
    },

    {
        name: "email",
        message: "Enter manager's email:"
    },

    {
        name: "OfficeNumber",
        message: "Enter manager's email:"
    },
];

//intern questions array
const internQuestions = [
    {
        name: "id",
        message: "Enter Intern's ID:"
    },
    {
        name: "name",
        message: "Enter your Intern's name:"
    },

    {
        name: "email",
        message: "Enter interns email:"
    },

    {
        name: "school",
        message: "Enter your school:"
    },
];
// organizes array of questions
const managersArray = [];
const engineersArray = [];
const internsArray = [];

//Prompts questions
inquirer
    .prompt(managerQuestions, async function (response) {
        const newManager = new Manager(response.name, response.id, response.email, response.officeNumber);
        managersArray.push(newManager);
    }).then(async function (response) {
        await
            inquirer
                .prompt(engineerQuestions, async function (response) {
                    const newEngineer = new Engineer(response.name, response.id, response.email, response.github);
                    engineersArray.push(newEngineer);
                }).then(async function (response) {
                    await
                        inquirer
                            .prompt(internQuestions, async function (response) {
                                const newIntern = new Intern(response.name, response.id, response.email, response.school);
                                internsArray.push(newIntern);
                            });
                });
    });

await
generateTeam(managersArray, engineersArray, internsArray);

// this function will call input and generate the teams
async function generateTeam(managersResponse, engineersResponse, internsResponse) {
    //the following will convert input data with html that will be shown in browser
    const managersArraysHTML = [];
    const engineersArrayHTML = [];
    const internsArrayHTML = [];

    // array.forEach(element => { });
    managersResponse.forEach(element => {
        const managerFile = fs.readFileSync("./templates/manager.html", "utf8");
        managerFile = replacePlaceholders(managerFile, "name", manager.getName());
        managerFile = replacePlaceholders(managerFile, "email", manager.getEmail());
        managerFile = replacePlaceholders(managerFile, "role", manager.getRole());
        managerFile = replacePlaceholders(managerFile, "id", manager.getId());
        managerFile = replacePlaceholders(managerFile, "officeNumber", manager.getOfficeNumber());
        managersArraysHTML.push(managersFile)
    });

    engineerResponse.forEach(element => {
        const managerFile = fs.readFileSync("./templates/manager.html", "utf8");
        engineerFile = replacePlaceholders(engineerFile, "name", engineer.getName());
        engineerFile = replacePlaceholders(engineerFile, "email", engineer.getEmail());
        engineerFile = replacePlaceholders(engineerFile, "role", engineer.getRole());
        engineerFile = replacePlaceholders(engineerFile, "id", engineer.getId());
        engineerFile = replacePlaceholders(engineerFile, "officeNumber", engineer.getOfficeNumber());
        engineersArraysHTML.push(managersFile)
    });

    managersResponse.forEach(element => {
        const managerFile = fs.readFileSync("./templates/manager.html", "utf8");
        internFile = replacePlaceholders(internFile, "name", intern.getName());
        internFile = replacePlaceholders(internFile, "email", intern.getEmail());
        internFile = replacePlaceholders(internFile, "role", intern.getRole());
        internFile = replacePlaceholders(internFile, "id", intern.getId());
        internFile = replacePlaceholders(internFile, "officeNumber", mana.getOfficeNumber());
        internsArraysHTML.push(internFile)
    });
    writeHTMLFile(managersHTML, engineersHTML, internsHTML);

}

function writeHTMLFile(managersHTML, engineersHTML, internsHTML) {
    const teamFile = fs.readFileSync("./templates/main.html", "utf8");
    const teamHTML = [];

    teamHTML.push(managersHTML[0]);
    teamHTML.push(engineersHTML[0]);
    teamHTML.push(internsHTML[0]);

    teamHTML = teamHTML.join("");
    teamFile = replacePlaceHolders(teamFile, "team", teamHTML);
    fs.writeFileSync("./output/team.html", teamFile);
    console.log("Your File Has been Created")
}

function replacePlaceHolders(template, placeholder, value){
    const pattern = new RegExp("{{"+ placeholder + "}}", "gm");
    return template.replace(pattern, value);
}









