/**
 * @name CatDownloader
 * @author Bazyli
 * @description Pobiera koty niezawodnie 🤓 `BdApi.Plugins.reload('catDownloader.plugin.js')`
 * @version 0.0.1
 */

const config = {
    info: {
        name: "CatDownloader",
        id: "CatDownloader",
        description: "Szybko pobiera koty",
        version: "0.0.1",
        author: "Bazyli",
    },
    settings: {
        filePrefix: "cats ",
        directory: "cats",
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

        function saveToFile(cats) {
            if (fs.existsSync(__dirname + "/cats/cats.json")) {
                let rawcats = fs.readFileSync(__dirname + "/cats/cats.json");
                let catsJson = JSON.parse(rawcats);
                fs.writeFileSync(
                    __dirname + "/cats/cats.json",
                    JSON.stringify(
                        { data: [...catsJson.data, ...cats] },
                        null,
                        4
                    ),
                    "utf8"
                );
            } else {
                fs.writeFileSync(
                    __dirname + "/cats/cats.json",
                    JSON.stringify({ data: [...cats] }, null, 4),
                    "utf8"
                );
            }
        }

        console.log("start");

        let cats = [];

        // pobieranie zdjec, filmow z kanalu
        document
            .querySelector('[data-list-id="chat-messages"]')
            .querySelectorAll("*")
            .forEach((el) => {
                if (el.id.includes("chat-messages")) {
                    if (el.querySelector("video")) {
                        return cats.push(el.querySelector("video").src);
                    } else {
                        el.querySelectorAll("*").forEach((el) => {
                            if (el.classList.value.includes("originalLink")) {
                                return cats.push(el.getAttribute("href"));
                            }
                        });
                    }
                }
            });

        console.log(cats);
        console.log(cats.length);

        if (fs.existsSync(__dirname + "/cats")) {
            saveToFile(cats);
        } else {
            fs.mkdirSync(__dirname + "/cats");
            saveToFile(cats);
        }
    }

    stop() {
        console.log("stop");
    }
};
