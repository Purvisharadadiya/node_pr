const express = require("express");
const app = express();
const port = 9000;

let todo = [
    { id: "1", task: "HTML Practice", priority: "High", category: "Study", dueDate: "2025-12-10" },
    { id: "2", task: "CSS Design", priority: "Medium", category: "Study", dueDate: "2025-12-15" },
    { id: "3", task: "Node.js Study", priority: "Low", category: "Development", dueDate: "2025-12-20" }
];

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.render("to_do_list", { todo });
});

app.post("/add-task", (req, res) => {
    todo.push(req.body);
    return res.redirect("/");
});

app.get("/delete-task/:id", (req, res) => {
    let id = req.params.id;
    todo = todo.filter(t => t.id != id);
    return res.redirect("/");
});

app.get("/edit-task/:id", (req, res) => {
    let record = todo.find(t => t.id == req.params.id);
    return res.render("edit", { task: record });
});

app.post("/update-task", (req, res) => {
    const { taskId } = req.query;

    todo = todo.map(t => {
        if (t.id == taskId) {
            return { ...req.body, id: taskId };
        }
        return t;
    });
    return res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});
