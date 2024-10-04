const enrollmentForm = document.getElementById('enrollmentForm');
let id = 0;

enrollmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted");

    const uliNumber = document.getElementById("uliNumber").value.trim();
    const entryDate = document.getElementById("entryDate").value.trim();
    const fullName = document.getElementById("fullName").value.trim();
    const completeAddress = document.getElementById("completeAddress").value.trim();
    const gender = document.getElementById("gender").value.trim();
    const civilStatus = document.querySelector('input[name="civilStatus"]:checked') ? document.querySelector('input[name="civilStatus"]:checked').value : null;
    const employmentStatus = document.querySelector('input[name="employmentStatus"]:checked') ? document.querySelector('input[name="employmentStatus"]:checked').value : null;
    const birthDate = document.getElementById("birthDate").value.trim();
    const placeOfBirth = document.getElementById("placeOfBirth").value.trim();
    const educationalAttainment = document.getElementById("educationalAttainment").value.trim();
    const guardian = document.getElementById("guardian").value.trim();
    const classification = document.getElementById("classification").value.trim();
    const disability = document.getElementById("disability").value.trim();
    const causesOfDisability = document.querySelector('input[name="causesOfDisability"]:checked') ? document.querySelector('input[name="causesOfDisability"]:checked').value : null;
    const ncaeStatus = document.querySelector('input[name="ncaeStatus"]:checked') ? document.querySelector('input[name="ncaeStatus"]:checked').value : null;

    const studentData = {
        id: ++id,
        uliNumber,
        entryDate,
        fullName,
        completeAddress,
        gender,
        civilStatus,
        employmentStatus,
        birthDate,
        placeOfBirth,
        educationalAttainment,
        guardian,
        classification,
        disability,
        causesOfDisability,
        ncaeStatus
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(studentData);
    localStorage.setItem('students', JSON.stringify(students));

    alert("Enrolled Successfully");
    console.log(students);
});
