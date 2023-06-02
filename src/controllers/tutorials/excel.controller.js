const db = require("../../models");
const Tutorial = db.tutorials;

const readXlsxFile = require("read-excel-file/node");

exports.upload = async (request, res) => {
  try {
    if (request.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/uploads/" + request.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let tutorials = [];

      rows.forEach((row) => {
        let tutorial = {
          id: row[0],
          name: row[1],
          Description: row[2],
          Brand: row[3],
          Major_Use: row[4],
          Department: row[5],
        };

        tutorials.push(tutorial);
      });

      Tutorial.bulkCreate(tutorials)
        .then(() => {
          res.status(200).send({
            message:
              "Uploaded the file successfully: " + request.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + request.file.originalname,
    });
  }
};

exports.getTutorials = (request, res) => {
  Tutorial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
