const fs = require("fs/promises")

const { exit } = require("process");
const path = require("path");
const readline = require("readline");
const { exec } = require("child_process");
const mvcFileContent  = require("./fileContents")
let {initializeReadline, rl} = require("./readlineInterface")
// initializer functions
rl = initializeReadline()
module.exports =  initializers = {
    initDbConnection: async function(projectDirPath) {
        await fs.appendFile(`${projectDirPath}/db.js`, mvcFileContent.dbFileContent);
        console.log("✅ Database Config file created successfully.\n");
    },
    
    initMainAppFile: async function(projectDirPath) {
        
        let routePrefix = await new Promise((resolve) => {
            rl.question("👉Enter the route prefix (Eg - /sample) 💁‍♂️ : ", (answer) => {
                resolve(answer);
            });
        });
        if (routePrefix == '' || routePrefix == null) {
            routePrefix = "/"
        }
        await fs.appendFile(`${projectDirPath}/app.js`, mvcFileContent.appFileContent(routePrefix));
        console.log("✅ App.js file created successfully.\n");
        
    },
    initEnv: async function(projectDirPath) {
        

        const PORT = await new Promise((resolve) => {
            rl.question("👉Enter the Port [Default-4000] 💁‍♂️ : ", (answer) => {
                resolve(answer);
            });
        });
        const CONNECTION_STRING = await new Promise((resolve) => {
            rl.question("👉Enter the Connection String 💁‍♂️ : ", (answer) => {
                resolve(answer);
            });
        });


        await fs.appendFile(
            `${projectDirPath}/.env`,
            mvcFileContent.envFileContent(PORT, CONNECTION_STRING)
        );

        console.log("✅ Env file created successfully.\n");
        
    },

    initGitIgnore: async function(projectDirPath) {
        await fs.appendFile(`${projectDirPath}/.gitignore`, mvcFileContent.gitIgnoreFileContent);
        console.log("✅ Git Ignore file created successfully.\n");
    },

    initPackageFile: async function(projectDirPath) {
        await fs.appendFile(`${ projectDirPath }/package.json`, mvcFileContent.packageJsonFileContent);
        console.log("✅ Package.json file created successfully.\n");
    },

    initConstants: async function(projectDirPath) {
        console.log("Constansts Logger "+ __dirname)
        const contsantsDir = path.join(projectDirPath , `constants`);
        await fs.mkdir(contsantsDir, { recursive: true });
        console.log("✅ Constants folder created successfully.");
        await fs.writeFile(
            path.join(contsantsDir, "Message.js"),
            mvcFileContent.messageFileContent
        );
        console.log("✅ Messages file created successfully.\n");
    },

    initMVC: async function(projectDirPath) {
        const modelsDir = path.join(projectDirPath, "models");
        await fs.mkdir(modelsDir, { recursive: true });
        console.log("✅ Models folder created successfully.");

        const controllersDir = path.join(projectDirPath, "controllers");
        await fs.mkdir(controllersDir, { recursive: true });
        console.log("✅ Controllers folder created successfully.");

        await fs.writeFile(`${projectDirPath}/router.js`, mvcFileContent.routerFileContent);
        console.log("✅ Router file created successfully.\n");
    },
    initHelpers: async function(projectDirPath) {
        const helperDir = path.join(projectDirPath, "helper");
        await fs.mkdir(helperDir, { recursive: true });
        console.log("✅ Helper folder created successfully.\n");
        await fs.writeFile(
            path.join(helperDir, "JsonResponse.js"),
            mvcFileContent.JsonResponseFileContent
        );
        console.log("✅ JsonResponse file created successfully.");
        await fs.writeFile(
            path.join(helperDir, "JWTAuthHelper.js"),
            mvcFileContent.JWTAuthHelperFileContent
        );
        console.log("✅ JWTAuthHelper file created successfully.");

        await fs.writeFile(
            path.join(helperDir, "TryCatch.js"),
 mvcFileContent.tryCatchFileContent);
        console.log("✅ TryCatch file created successfully.\n");
    },
};