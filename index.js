const express = require( "express" );
const bodyParser = require ( "body-parser" );
const app = express();

app.use(bodyParser.json());
const port = 3000;
const student_data = {
    "1": {"name": "Vaishnavi", "dept": "ECE"},
    "2": {"name": "Jahnvai", "dept": "CSE"}
};

app.get("/student/tmp", (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Method:", req.method);
    res.send(JSON.stringify(student_data));
});

app.get("/student", (req, res) => {
    console.log("Headers:", req.headers);
    console.log("Method:", req.method);
    var students = require("./data")
    res.send(JSON.stringify(students));
});

app.post("/student/tmp", (req, res) => {
    console.log("Headers:", req.headers);
    console.log('Method:', req.method);
    console.log("Body:", req.body);
    student_data[req.body.id] = {"name": req.body.name, "dept": req.body.dept};

    res.status(201);
    res.send();
});

app.post("/student", (req, res) => {
    console.log("Headers:", req.headers);
    console.log('Method:', req.method);
    console.log("Body:", req.body);
    const fs = require("fs");
    var students = require("./data")
    students[req.body.id] = {"name": req.body.name, "dept": req.body.dept};
    fs.writeFile("data.json", JSON.stringify(students), err => {
        if (err) throw err;
        console.log("Done writing");
    });

    res.status(201);
    res.send();
});

app.delete("/student/tmp", (req, res) => {
    console.log("Headers:", req.headers);
    console.log('Method:', req.method);
    console.log("Body:", req.body);
    delete student_data[req.body.id];
    res.status(200)
    res.send();
});


app.delete("/student", (req, res) => {
    console.log("Headers:", req.headers);
    console.log('Method:', req.method);
    console.log("Body:", req.body);
    const fs = require("fs");
    var students = require("./data");
    delete students[req.body.id];
    console.log(students);
    fs.writeFile("data.json", JSON.stringify(students), err => {
        if (err) throw err;
        console.log("Done deleting");
    });

    res.status(200)
    res.send();
});

app.listen( port, () => console.log( `server started` ))