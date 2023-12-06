const allDeptContainer = document.getElementById("allDepts")

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
      console.error("There was a problem with the fetch operation:", error);
    });
};

// module.exports = {
//   getAllDepts,
// };
