import http from "http";
import fs from "fs/promises";
import { indexHtml } from "./views/home/index.html.js";
import { addCat } from "./views/addCat.html.js";
import { addBreed } from "./views/addBreed.html.js";
import { siteCss } from "./content/images/styles/site.css.js";

let cats = [];
let breeds = [];

initCats();
loadBreeds();

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => (body += chunk.toString()));

    req.on("end", () => {
      const data = new URLSearchParams(body);

      if (req.url === "/cats/add-cat") {
        cats.push({
          ...Object.fromEntries(data.entries()),
        });

        updateCats();
      } else if (req.url === "/cats/add-breed") {
        const breed = data.get("breed");

        if (breed) {
          breeds.push(breed);
          updateBreeds();
        }
      }

      res.writeHead(301, {
        location: "/",
      });

      res.end();
    });

    return;
  }

  // Applying css
  if (req.url === "/styles/site.css") {
    res.writeHead(200, {
      "content-type": "text/css",
    }),
      res.write(siteCss());

    return res.end();
  }

  res.writeHead(200, {
    "content-type": "text/html",
  });

  // Custom routing
  switch (req.url) {
    case "/":
      res.write(indexHtml(cats));
      break;
    case "/cats/add-cat":
      res.write(addCat(breeds));
      break;
    case "/cats/add-breed":
      res.write(addBreed());
      break;
    default:
      res.write("Page not found");
      break;
  }

  res.end();
});

async function initCats() {
  let catsJSON = await fs.readFile("./cats.json", { encoding: "utf-8" });
  cats = JSON.parse(catsJSON);
}

async function updateCats() {
  let catsJSON = JSON.stringify(cats, null, 2);
  await fs.writeFile("./cats.json", catsJSON, { encoding: "utf-8" });
}

async function loadBreeds() {
  let breedsJSON = await fs.readFile("./breeds.json", { encoding: "utf-8" });
  breeds = JSON.parse(breedsJSON);
}

async function updateBreeds() {
  let breedsJSON = JSON.stringify(breeds, null, 2);
  await fs.writeFile("./breeds.json", breedsJSON, { encoding: "utf-8" });
}

server.listen(5000);
console.log("server listens on port: 5000");