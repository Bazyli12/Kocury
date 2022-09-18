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
            if (fs.existsSync(__dirname + "/cats/cat.json")) {
                console.log("123");
            } else {
                console.log("3");
            }

            let date = new Date();
            fs.writeFileSync(
                __dirname +
                    `/${config.settings.directory}/${
                        config.settings.filePrefix
                    }${date.getFullYear()}-${String(
                        date.getMonth() + 1
                    ).padStart(2, "0")}-${String(date.getDate()).padStart(
                        2,
                        "0"
                    )} ${String(date.getHours()).padStart(2, "0")}-${String(
                        date.getMinutes()
                    ).padStart(2, "0")}-${String(date.getSeconds()).padStart(
                        2,
                        "0"
                    )}.json`,
                JSON.stringify(cats, null, 4),
                "utf8"
            );
        }

        console.log("start");

        let cats = { data: [] };

        // pobieranie zdjec, filmow z kanalu
        document
            .querySelector('[data-list-id="chat-messages"]')
            .querySelectorAll("*")
            .forEach((el) => {
                if (el.id.includes("chat-messages")) {
                    if (el.querySelector("video")) {
                        return cats.data.push(el.querySelector("video").src);
                    } else {
                        el.querySelectorAll("*").forEach((el) => {
                            if (el.classList.value.includes("originalLink")) {
                                return cats.data.push(el.getAttribute("href"));
                            }
                        });
                    }
                }
            });

        console.log(cats.data);
        console.log(cats.data.length);

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
