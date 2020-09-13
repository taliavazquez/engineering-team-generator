const path = require("path");
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Manager promt Questions

const managerQuestions = [
  {
    name: "id",
    message: "Enter manager's ID:",
  },

  {
    name: "name",
    message: "Enter manager's name:",
  },

  {
    name: "email",
    message: "Enter manager's email:",
  },

  {
    name: "officeNumber",
    message: "Enter your office number:",
  },
];

// Engineer prompt questions:
const engineerQuestions = [
  {
    name: "id",
    message: "Enter engineer's ID",
  },

  {
    name: "name",
    message: "Enter engineer's name:",
  },

  {
    name: "email",
    message: "Enter engineer's email:",
  },

  {
    name: "gitHub",
    message: "Enter your Github URL:",
  },
];

// Intern prompt questions:
const internQuestions = [
  {
    name: "id",
    message: "Enter intern's ID",
  },

  {
    name: "name",
    message: "Enter intern's name:",
  },

  {
    name: "email",
    message: "Enter intern's email:",
  },

  {
    name: "school",
    message: "Enter your school:",
  },
];

// count
const questionCount = [
  {
    name: "count",
    message: "How many do you want to enter?",
  },
];

// Creates Team
async function createTeam(
  managersResponses,
  engineersResponses,
  internsResponses
) {
  const managersHTML = [];
  const engineersHTML = [];
  const internsHTML = [];

  managersResponses.forEach((manager) => {
    var managerFile = fs.readFileSync("./templates/manager.html", "utf8");
    managerFile = replacePlaceholders(managerFile, "name", manager.getName());
    managerFile = replacePlaceholders(managerFile, "email", manager.getEmail());
    managerFile = replacePlaceholders(managerFile, "role", manager.getRole());
    managerFile = replacePlaceholders(managerFile, "id", manager.getId());
    managerFile = replacePlaceholders(
      managerFile,
      "officeNumber",
      manager.getofficeNumber()
    );
    managersHTML.push(managerFile);
  });

  engineersResponses.forEach((engineer) => {
    var engineerFile = fs.readFileSync("./templates/engineer.html", "utf8");
    engineerFile = replacePlaceholders(
      engineerFile,
      "name",
      engineer.getName()
    );
    engineerFile = replacePlaceholders(
      engineerFile,
      "email",
      engineer.getEmail()
    );
    engineerFile = replacePlaceholders(
      engineerFile,
      "role",
      engineer.getRole()
    );
    engineerFile = replacePlaceholders(engineerFile, "id", engineer.getId());
    engineerFile = replacePlaceholders(
      engineerFile,
      "github",
      engineer.getGithub()
    );
    engineersHTML.push(engineerFile);
  });

  internsResponses.forEach((intern) => {
    var internFile = fs.readFileSync("./templates/intern.html", "utf8");
    internFile = replacePlaceholders(internFile, "name", intern.getName());
    internFile = replacePlaceholders(internFile, "email", intern.getEmail());
    internFile = replacePlaceholders(internFile, "role", intern.getRole());
    internFile = replacePlaceholders(internFile, "id", intern.getId());
    internFile = replacePlaceholders(internFile, "school", intern.getSchool());
    internsHTML.push(internFile);
  });

  writeHTMLFile(managersHTML, engineersHTML, internsHTML);
}

function writeHTMLFile(managersHTML, engineersHTML, internsHTML) {
  var teamFile = fs.readFileSync("./templates/main.html", "utf8");
  var teamHTML = [];

  managersHTML.forEach((element) => {
    teamHTML.push(element);
  });

  engineersHTML.forEach((element) => {
    teamHTML.push(element);
  });

  internsHTML.forEach((element) => {
    teamHTML.push(element);
  });

  teamHTML = teamHTML.join("");
  teamFile = replacePlaceholders(teamFile, "team", teamHTML);
  writeFileAsync("./output/team.html", teamFile);
  console.log("########  Your File Has Been Created!  #########");
}

function replacePlaceholders(template, placeholder, value) {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  return template.replace(pattern, value);
}

(async function () {
  // Organizes array of questions for manager, engineer and intern
  const managersArray = [];
  const engineersArray = [];
  const internsArray = [];

  console.log("********** CREATE YOUR TEAM **********");
  console.log("                            ");

  // Manager PROMPT
  console.log("====== Manager Info ======");
  var responseManager = await inquirer.prompt(managerQuestions);
  var newManager = new Manager(
    responseManager.name,
    responseManager.id,
    responseManager.email,
    responseManager.officeNumber
  );
  managersArray.push(newManager);
  console.log("                            ");

  //Count for Engineers
  console.log("====== Engineer Info ======");
  var responseCount = await inquirer.prompt(questionCount);
  console.log("                            ");

  for (let index = 0; index < parseInt(responseCount.count); index++) {
    //Engineer PROMPT
    var responseEngineer = await inquirer.prompt(engineerQuestions);
    var newEngineer = new Engineer(
      responseEngineer.name,
      responseEngineer.id,
      responseEngineer.email,
      responseEngineer.gitHub
    );
    engineersArray.push(newEngineer);
    console.log("                            ");
  }
  console.log("                            ");

  //Count fo Interns
  console.log("====== Intern Info ======");
  responseCount = await inquirer.prompt(questionCount);
  console.log("                            ");

  for (let index = 0; index < parseInt(responseCount.count); index++) {
    //Intern PROMPT
    var responseIntern = await inquirer.prompt(internQuestions);
    var newIntern = new Intern(
      responseIntern.name,
      responseIntern.id,
      responseIntern.email,
      responseIntern.school
    );
    internsArray.push(newIntern);
    console.log("                            ");
  }
  console.log("                            ");

  // Function create team using data captured
  await createTeam(managersArray, engineersArray, internsArray);
})();