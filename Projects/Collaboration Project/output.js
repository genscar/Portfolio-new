let studentIdToDelete = null;
const showModal = (id) => {
    studentIdToDelete = id; 
    document.getElementById('deleteModal').classList.remove('hidden');
};
const closeModal = () => {
    document.getElementById('deleteModal').classList.add('hidden');
};
document.getElementById('confirmDelete').addEventListener('click', () => {
    if (studentIdToDelete) {
        deleteRow(studentIdToDelete);
        closeModal();
    }
});
const deleteRow = (id) => {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.id !== id);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
};
const displayStudents = () => {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const container = document.getElementById('studentContainer');
    container.innerHTML = '';

    students.forEach((student) => {
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card border p-4 my-2 rounded overflow-x-hidden lg:mx-0 w-full md:w-[80vw] lg:w-[45vw] border border-1 border-black';

        const title = document.createElement('h3');
        title.innerHTML = `<h3 class="mb-3 font-bold text-[2rem]">Student Name: <span class="font-normal">${student.fullName}</span><br> Birthday:<span class="font-normal">${student.birthDate} </span></h3>`;

        const toggleButton = document.createElement('button');
        toggleButton.innerText = 'Show Details';
        toggleButton.className = 'toggle-btn bg-blue-500 text-white p-2 rounded text-2xl mb-2';
        
        toggleButton.onclick = () => {
            const details = studentCard.querySelector('.student-details');
            const isHidden = details.classList.toggle('hidden');
            toggleButton.innerText = isHidden ? 'Show Details' : 'Hide Details';

            const saveButton = studentCard.querySelector('.save-btn');
            const deleteButton = studentCard.querySelector('.delete-btn');
            saveButton.classList.toggle('hidden', isHidden);
            deleteButton.classList.toggle('hidden', isHidden); 
        };

        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'student-details hidden grid grid-cols-2 gap-4 mt-2 mb-5';

        const fields = [
            { label: 'Full Name', value: student.fullName, type: 'text' },
            { label: 'ULI Number', value: student.uliNumber, type: 'number' },
            { label: 'Entry Date', value: student.entryDate, type: 'date' },
            { label: 'Complete Address', value: student.completeAddress, type: 'text' },
            { label: 'Place of Birth', value: student.placeOfBirth, type: 'text' },
            { label: 'Birth Date', value: student.birthDate, type: 'date' },
            { label: 'Gender', value: student.gender, type: 'select', options: ['Male', 'Female'] },
            { label: 'Guardian', value: student.guardian, type: 'text' },
            { label: 'Educational Attainment', value: student.educationalAttainment, type: 'select', options: ['Pre-School', 'Elementary Undergraduate', 'Elementary Graduate', 'Highschool Undergraduate', 'Highschool Graduate', 'College Undergraduate', 'College Graduate or higher'] },
            { label: 'Classification', value: student.classification, type: 'select', options: ['Students', 'Out-of-School Youth', 'Solo Parent', 'Senior citizens'] }
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = `${field.label}:`;
           label.className="text-2xl"
            let input;

            if (field.type === 'select') {
                input = document.createElement('select');
                field.options.forEach(option => {
                    const opt = document.createElement('option');
                    opt.value = option;
                    opt.textContent = option;
                    if (option === field.value) opt.selected = true;
                    input.appendChild(opt);
                });
            } else {
                input = document.createElement('input');
                input.type = field.type;
                input.value = field.value;
                input.className = 'editable-input text-2xl';
            }

            detailsContainer.appendChild(label);
            detailsContainer.appendChild(input);
        });

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.className = 'save-btn bg-green-500 text-white p-2 rounded mt-2 hidden text-2xl'; 
        saveButton.onclick = () => {
            const updatedStudent = {
                id: student.id,
                fullName: detailsContainer.querySelector('input[type="text"]').value,
                uliNumber: detailsContainer.querySelectorAll('input[type="number"]')[0].value,
                entryDate: detailsContainer.querySelectorAll('input[type="date"]')[0].value,
                completeAddress: detailsContainer.querySelectorAll('input[type="text"]')[1].value,
                placeOfBirth: detailsContainer.querySelectorAll('input[type="text"]')[2].value,
                birthDate: detailsContainer.querySelectorAll('input[type="date"]')[1].value,
                gender: detailsContainer.querySelector('select').value,
                guardian: detailsContainer.querySelectorAll('input[type="text"]')[3].value,
                educationalAttainment: detailsContainer.querySelectorAll('select')[1].value,
                classification: detailsContainer.querySelectorAll('select')[2].value
            };
            editRow(student.id, updatedStudent);
        };

      
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn bg-red-500 text-white p-2 rounded mt-2 hidden ml-5 text-2xl'; 
        deleteButton.onclick = () => showModal(student.id);

        studentCard.appendChild(title);
        studentCard.appendChild(toggleButton);
        studentCard.appendChild(detailsContainer);
        studentCard.appendChild(saveButton);
        studentCard.appendChild(deleteButton);
        container.appendChild(studentCard);
    });
};

const editRow = (id, updatedStudent) => {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    const studentIndex = students.findIndex(student => student.id === id);
    if (studentIndex !== -1) {
        students[studentIndex] = updatedStudent;
        
        localStorage.setItem('students', JSON.stringify(students));
        alert(`Student ${updatedStudent.fullName} has been updated.`);
        
        displayStudents();
    }
};

document.addEventListener('DOMContentLoaded', displayStudents);
