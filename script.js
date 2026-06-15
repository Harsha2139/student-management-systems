window.onload = function () {
    loadStudents();
};

let studentId = 1001;

function updateCount() {
    document.getElementById("count").innerText =
        document.getElementById("studentList").children.length;
}

function addStudent() {

    let name =
        document.getElementById("name").value.trim();

    if (name === "") {
        alert("Please Enter Student Name");
        return;
    }

    let date =
        new Date().toLocaleString();

    let li =
        document.createElement("li");

    li.innerHTML =
        "ID: " + studentId +
        " | Name: " + name +
        " | Added: " + date +
        " <button onclick='editStudent(this)'>Edit</button>" +
        " <button onclick='deleteStudent(this)'>Delete</button>";

    document.getElementById("studentList")
        .appendChild(li);

    studentId++;

    document.getElementById("name").value = "";

    saveStudents();
    updateCount();
}

function deleteStudent(btn) {

    btn.parentElement.remove();

    saveStudents();
    updateCount();
}

function editStudent(btn) {

    let li = btn.parentElement;

    let newName =
        prompt("Enter New Name");

    if (newName && newName.trim() !== "") {

        let text = li.innerText;

        let id =
            text.split("|")[0];

        let added =
            text.split("|")[2];

        li.innerHTML =
            id +
            " | Name: " + newName +
            " |" + added +
            " <button onclick='editStudent(this)'>Edit</button>" +
            " <button onclick='deleteStudent(this)'>Delete</button>";

        saveStudents();
    }
}

function searchStudent() {

    let input =
        document.getElementById("search")
        .value
        .toLowerCase();

    let students =
        document.getElementById("studentList")
        .getElementsByTagName("li");

    for (let i = 0; i < students.length; i++) {

        let text =
            students[i].innerText.toLowerCase();

        if (text.includes(input)) {
            students[i].style.display = "";
        } else {
            students[i].style.display = "none";
        }
    }
}

function clearAll() {

    if (confirm("Delete All Students?")) {

        document.getElementById("studentList")
            .innerHTML = "";

        localStorage.removeItem("students");

        updateCount();
    }
}

function saveStudents() {

    let data = [];

    let students =
        document.getElementById("studentList")
        .getElementsByTagName("li");

    for (let i = 0; i < students.length; i++) {

        data.push(
            students[i].innerHTML
        );
    }

    localStorage.setItem(
        "students",
        JSON.stringify(data)
    );
}

function loadStudents() {

    let data =
        JSON.parse(
            localStorage.getItem("students")
        ) || [];

    for (let i = 0; i < data.length; i++) {

        let li =
            document.createElement("li");

        li.innerHTML =
            data[i];

        document.getElementById("studentList")
            .appendChild(li);
    }

    updateCount();
}