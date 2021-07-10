// packages needed for the application
const fs = require ("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const inquirer = require("inquirer");



// validates user input
function validateInput(value) {
    if (value != "") {
        return true;
    } else {
        return "Please don't leave the entry field blank.";
    }
}
// questions wrapped in a prompt to be called later 

// an array in which the user will input information to later be converted to a readme
const questions = [
    // title of project
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
        validate: validateInput,
    },
    // project description
    {
        type: "input",
        name: "description",
        message: "Please provide a project description:",
        validate: validateInput,
    },

    // installation
    {
        type: "input",
        name: "installation",
        message: "Please provide a brief description on how to install your software, if applicable:",
        validate: validateInput,
    },

    // usage
    {
        type: "input",
        name: "usage",
        message: "Please explain how your software might be used:",
        validate: validateInput,
    },

    // licenses
    {
        type: "list",
        name: "license",
        message: "Please select a license for this project:",
        choices: [
            "GNU AGPLv3",
            "GNU GPLv3",
            "GNU LGPLv3",
            "Apache 2.0",
            "Boost Software 1.0",
            "MIT",
            "Mozilla",
        ],
        validate: validateInput,
    },

    // contributing 
    {
        type: "input",
        name: "contributing",
        message: "Please explain how other users might contribute to this project:",
        validate: validateInput,
    },

    // tests
    {
        type: "input",
        name: "tests",
        message: "Please explain desired test cases, if applicable:",
        validate: validateInput,
    },

    // other questions 
    {
        type: "input",
        name: "userName",
        message: "Please input your github username:",
        validate: validateInput,
    },

    {
        type: "input",
        name: "userEmail",
        message: "Please input your email address:",
        validate: function (value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true;
            } else {
                return "Not a valid email address. Please enter a valid email address.";
            }
        },
    },
];


// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, generateMarkdown(data), function (err) {
        if (err) {
            return console.log(err);
        }
    });
}


// function that lists available licenses
function listLicense(value) {
    if (value === "GNU AGPLv3") {
        return "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)";
    } else if (value === "GNU GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "GNU LGPLv3") {
        return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
    } else if (value === "Apache 2.0") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else if (value === "Boost Software 1.0") {
        return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
    } else if (value === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    }
}

//function to initialize application

function init() {
    inquirer.prompt(questions).then((data) => {
        console.log(JSON.stringify(data, null, " "));
        data.listLicense = listLicense(data.license);
        writeToFile("README.md", data);
        console.log('README successfully generated');
    });
}
//calls above function
init();
