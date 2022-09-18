/**
 * @name SingllyCater
 * @author Bazyli
 * @description Rozdzielane koty mechanicznie 🐈 `BdApi.Plugins.reload('singllyCater.plugin.js')`
 * @version 0.0.1
 */

const config = {
    info: {
        name: "SingllyCater",
        id: "SingllyCater",
        description: "Szybko rozdziela koty",
        version: "0.0.1",
        author: "Bazyli",
    },
};

module.exports = class catDownloader {
    constructor() {}
    getName() {
        return config.info.name;
    }
    getAuthor() {
        return config.info.author;
    }

    load() {}

    start() {
        const fs = require("fs");

        console.log("start");

        if (fs.existsSync(__dirname + "/cats")) {
            let rawcats = fs.readFileSync(__dirname + "/cats/cats.json");
            let catsJson = JSON.parse(rawcats);

            let uniqueCats = [...new Set(catsJson.data)];
            fs.writeFileSync(
                __dirname + "/cats/cats-output.json",
                JSON.stringify({ data: [...uniqueCats] }, null, 4),
                "utf8"
            );
        } else {
            fs.mkdirSync(__dirname + "/cats");
            console.log("plik cats.json nie istnieje");
        }
    }

    stop() {
        console.log("stop");
    }
};
