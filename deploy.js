#!/usr/bin/env node
(async function() {

    const Package = require("./package.json"),
          { execSync } = require("child_process"),
          { copyFile, mkdtemp, opendir, unlink } = require("fs").promises,
          { resolve, sep } = require("path"),
          { tmpdir } = require("os"),
          rimraf = require("rimraf");

    // Check if you have at least one argument given, as commit message
    if (process.argv.length < 3) {
        throw new Error("Need to provide commit message for deployment");
    }

    // Verify that we've got files for deployment
    const entries = [];
    for await (const entry of await opendir(resolve(__dirname, "dist"))) {
        entries.push(entry.name);
    }
    if (
        !entries.filter(name => name.match(/^app-\w{10,}\.js$/)).length ||
        !entries.filter(name => name.match(/^vendor-\w{10,}\.js$/)).length ||
        !entries.filter(name => name.match(/^styles-\w{10,}\.css$/)).length ||
        !entries.filter(name => name === "index.html").length
    ) {
        throw new Error("Production build has not been generated");
    }

    // Clone the repo into temp directory, on "gh-pages" branch
    const targetDir = await mkdtemp(`${tmpdir()}${sep}`);

    try {

        const repo = Package.repositories[0].url.replace("https://github.com/", "git@github.com:");
        console.log(`Cloning repo to ${targetDir} directory...`);
        execSync(`git clone "${repo}" --branch "gh-pages" "${targetDir}"`, { stdio: "ignore" });

        console.log("Removing previous version of dice roller...");
        for await (const entry of await opendir(targetDir)) {
            if (entry.isFile()) {
                await unlink(resolve(targetDir, entry.name));
            }
        }

        console.log("Copying new version of dice roller into repo...");
        for await (const entry of await opendir(resolve(__dirname, "dist"))) {
            if (entry.isFile()) {
                await copyFile(
                    resolve(__dirname, "dist", entry.name),
                    resolve(targetDir, entry.name)
                )
            }
        }

        console.log("Submitting the changes...");
        execSync("git add .", { stdio: "ignore", cwd: targetDir });
        execSync(`git commit -m "${process.argv[2]}"`, { stdio: "ignore", cwd: targetDir });
        execSync("git push", { cwd: targetDir });

        console.warn("New version has been deployed!");

    } finally {
        rimraf.sync(targetDir);
    }

}()).catch(e => {
    console.error(e);
    process.exit(1);
});
