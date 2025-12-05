const express = require("express");
const app = express();
const port = 9000;



let todo = [
    { id: "1", task: "HTML Practice", priority: "High" },
    { id: "2", task: "CSS Layout", priority: "Medium" },
    { id: "3", task: "Node.js Study", priority: "Low" }
];

app.set("view engine", "ejs");
app.use(express.urlencoded());

function sortByPriority(list) {
    const order = { High: 1, Medium: 2, Low: 3 };
    return list.sort((a, b) => order[a.priority] - order[b.priority]);
}


app.get("/", (req, res) => {
    const sortedTodo = sortByPriority(todo);
    res.render("to_do_list", { todo: sortedTodo });
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

    let updated = todo.map(t => {
        if (t.id == taskId) {
            return { ...req.body, id: taskId };
        }
        return t;
    });

    todo = updated;
    return res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running: http://localhost:${port}`);
});



