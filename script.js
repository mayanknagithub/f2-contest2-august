const students = [
    // Your initial student data here
  ];
  
  const studentListDiv = document.getElementById('studentList');
  const studentFormDiv = document.getElementById('studentForm');
  const searchInput = document.getElementById('searchInput');
  
  // Function to render student list
  function renderStudentList() {
    studentListDiv.innerHTML = '';
  
    const table = document.createElement('table');
    const headerRow = table.insertRow();
    for (const prop of ['ID', 'Name', 'Age', 'Grade', 'Degree', 'Email', 'Actions']) {
      const th = document.createElement('th');
      th.textContent = prop;
      headerRow.appendChild(th);
    }
  
    for (const student of students) {
      const row = table.insertRow();
      for (const prop of ['ID', 'name', 'age', 'grade', 'degree', 'email']) {
        const cell = row.insertCell();
        cell.textContent = student[prop];
      }
  
      const actionsCell = row.insertCell();
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => editStudent(student));
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteStudent(student));
      actionsCell.appendChild(editButton);
      actionsCell.appendChild(deleteButton);
    }
  
    studentListDiv.appendChild(table);
  }
  
  // Function to show student add/edit form
  function showStudentForm(isEditMode, student = null) {
    studentFormDiv.innerHTML = '';
  
    const form = document.createElement('form');
    form.innerHTML = `
      Name: <input type="text" id="name"><br>
      Age: <input type="number" id="age"><br>
      Grade: <input type="text" id="grade"><br>
      Degree: <input type="text" id="degree"><br>
      Email: <input type="email" id="email"><br>
      <button type="button" id="submitButton">${isEditMode ? 'Edit Student' : 'Add Student'}</button>
    `;
  
    if (isEditMode && student) {
      form.querySelector('#name').value = student.name;
      form.querySelector('#age').value = student.age;
      form.querySelector('#grade').value = student.grade;
      form.querySelector('#degree').value = student.degree;
      form.querySelector('#email').value = student.email;
    }
  
    const submitButton = form.querySelector('#submitButton');
    submitButton.addEventListener('click', () => {
      if (isEditMode && student) {
        updateStudent(student);
      } else {
        addStudent();
      }
    });
  
    studentFormDiv.appendChild(form);
    studentFormDiv.style.display = 'block';
  }
  
  // Function to add a new student
  function addStudent() {
    const newStudent = {
      ID: students.length + 1,
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
      grade: document.getElementById('grade').value,
      degree: document.getElementById('degree').value,
      email: document.getElementById('email').value,
    };
  
    students.push(newStudent);
    renderStudentList();
    clearForm();
  }
  
  // Function to edit a student
  function editStudent(student) {
    showStudentForm(true, student);
  }
  
  // Function to update a student
  function updateStudent(student) {
    student.name = document.getElementById('name').value;
    student.age = document.getElementById('age').value;
    student.grade = document.getElementById('grade').value;
    student.degree = document.getElementById('degree').value;
    student.email = document.getElementById('email').value;
  
    renderStudentList();
    clearForm();
  }
  
  // Function to delete a student
  function deleteStudent(student) {
    const index = students.indexOf(student);
    if (index !== -1) {
      students.splice(index, 1);
      renderStudentList();
    }
  }
  
  // Function to clear the form inputs
  function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('grade').value = '';
    document.getElementById('degree').value = '';
    document.getElementById('email').value = '';
    studentFormDiv.style.display = 'none';
  }
  
  // Event listener for search input
  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredStudents = students.filter(student =>
      student.name.toLowerCase().includes(searchText) ||
      student.email.toLowerCase().includes(searchText) ||
      student.degree.toLowerCase().includes(searchText)
    );
    renderStudentList(filteredStudents);
  });
  
  // Initial rendering
  renderStudentList();
  