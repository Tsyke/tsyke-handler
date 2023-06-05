const { exec } = require("child_process");
const { spawn } = require('node:child_process');

(async () => {
    console.log("INFO: Dev script is building...");
    await exec("tsc");
    
    console.log("INFO: Dev script is now build.")
    console.log("INFO: Starting script.");
    const ls = spawn('node', ["./build/main.js"]);
    console.log("TERMINAL IS NOW DISCORDJS@0.6/core OUT.")
    ls.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    ls.stderr.on('data', (data) => {
        console.error(`${data}`);
    });

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
})();