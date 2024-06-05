import express from "express";
import { makePDF } from "./generate-pdfs.js";
import pdfkit from "pdfkit";

const PORT = 8080;
const app = express();

// express json middleware parses the body as json
// app.use(express.json());

// app.get("/tshirt", (req, res) => {
//   res.status(200).send({
//     tshirt: "👕",
//     size: "medium",
//   });
// });

// app.post("/tshirt/:id", (req, res) => {
//   const { id } = req.params;
//   const { logo } = req.body;

//   // do something here, like save it to a database!

//   res.send({ tshirt: `👕 with your ${logo} and ID of ${id}` });
// });

// examples
// http://www.pdfjoy.com/#f878ff/                       1 page, single color
// http://www.pdfjoy.com/#f878ff-#f878ff-#f878ff/       1 page, 3 colors
// http://www.pdfjoy.com/10                             10 pages, blank
// http://www.pdfjoy.com/10/#f878ff-#f878ff-#f878ff/    10 pages, 3 colors (gradient)

// future maybe - http://www.pdfjoy.com/10/#f878ff/#f878ff/#f878ff/    10 pages, 3 colors (stepped)

app.get("/:first/:additional?", (req, res) => {
  const firstParam = req.params.first;
  const additionalParams = req.params.additional;
  let colors = [];
  let numPages = 1;

  const doc = new pdfkit({ autoFirstPage: false });
  doc.pipe(res);
  doc.info.Title = "pdfjoy ✨";

  if (firstParam.length !== 6 && !firstParam.includes("-")) {
    numPages = parseInt(firstParam);
    if (additionalParams !== undefined && additionalParams !== null) {
      colors = additionalParams.split("-");
    }
  } else {
    colors = firstParam.split("-");
  }

  makePDF(doc, numPages, colors);

  doc.end();
});

app.get("/", (req, res) => {
  res.send("~ welcome to pdfjoy ~");
});

app.listen(PORT, () =>
  console.log(`hey, i'm pdfjoy~ ✨ \nrunning at: http://localhost:${PORT}`)
);
