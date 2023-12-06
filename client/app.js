const allDeptContainer = document.getElementById("allDepts");
const insertContainer = document.getElementById("insertContainer")

//Select all Depts
const getAllDepts = () => {
  fetch("http://localhost:3001/dept")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const result = data.result;

      let html = "";
      result.forEach(function (element) {
        html += `<div class="dept"><p>Dept Id: ${element.DeptId}</p><p>Dept Name: ${element.DeptName}</p><p>Phone: ${element.Phone}</p><p>Location: ${element.Location}</p></div>`;
      });

      if(result.length >= 0) {
        allDeptContainer.innerHTML = html;
      } else {
        allDeptContainer.innerHTML = "No depts found"
      }
    })
    .catch((error) => {
      console.log("There was a problem with the fetch operation:", error);
    });
};

//Select department by id
document.getElementById('getDeptByIdForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const serializedData = Object.fromEntries(formData);

  const deptId = serializedData.DeptId; 

  fetch(`http://localhost:3001/dept/${deptId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json", // Change content type to JSON
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    getByIdContainer.innerHTML = `<div class="dept"><p>Dept Id: ${data[0].DeptId}</p><p>Dept Name: ${data[0].DeptName}</p><p>Phone: ${data[0].Phone}</p><p>Location: ${data[0].Location}</p></div>`
  })
  .catch(error => {
    console.log('Error:', error);
    getByIdContainer.innerHTML = "Select by id didn't work"
  });
});

//Insert Dept
document.getElementById('insertForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const serializedData = Object.fromEntries(formData);

  fetch('http://localhost:3001/dept', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json", // Change content type to JSON
    },
    body: JSON.stringify(serializedData), 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    insertContainer.innerHTML = "Insert worked"
  })
  .catch(error => {
    console.log('Error:', error);
    insertContainer.innerHTML = "Insert did not work"
  });
});

//Update Dept
document.getElementById('updateForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const serializedData = Object.fromEntries(formData);

  const deptId = serializedData.DeptId; 

  fetch(`http://localhost:3001/dept/${deptId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(serializedData), 
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    updateContainer.innerHTML = "Update worked"; 
  })
  .catch(error => {
    console.log('Error:', error);
    updateContainer.innerHTML = "Update did not work"; 
  });
});

//Delete department by id
document.getElementById('deleteForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  const serializedData = Object.fromEntries(formData);

  const deptId = serializedData.DeptId; 

  fetch(`http://localhost:3001/dept/${deptId}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json", // Change content type to JSON
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    deleteContainer.innerHTML = `Delete by id worked!`
  })
  .catch(error => {
    console.log('Error:', error);
    deleteContainer.innerHTML = "Delete by id didn't work"
  });
});


