setDate();
setInterval(setTime, 1000);
setTime();

function setTime(){
    let today = new Date();
    let hours = today.getHours();
    let min = today.getMinutes();

    if(hours == 0 && min == 0) setDate;

    let AmOrPM = hours <= 12 ? "AM": "PM";
    hours = hours == 0 ? 12 : hours % 12;

    document.getElementById("time").innerHTML = `${hours < 10 ? '0'+ hours: hours}:${min < 10 ? '0'+ min: min} ${AmOrPM}`
}

function setDate(){
    let today = new Date();
    document.getElementById("date").innerHTML = `${weekday(today.getDay())}, ${today.getDate()} ${monthInName(today.getMonth())}, ${today.getFullYear()}`;
}

function monthInName(month){
    let monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    return monthNames[month];
}

function weekday(day){
    let weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    return weekdays[day];
}

function registerPageOnLoad(){
    setStudentId();

    let formFields = document.getElementsByClassName("form-field");

    for (let i = 0; i < formFields.length; i++) {
        let inputField = formFields[i].children[1];
        let label = formFields[i].children[0];

        inputField.addEventListener("focusin", function () {
            label.classList.add("focus");
        });

        inputField.addEventListener("focusout", function () {
            
            if(isBlank(inputField.value)){
                formFields[i].classList.remove("filled");
                formFields[i].classList.add("error");
                inputField.value = "";
            }else{
                formFields[i].classList.remove("error");
                formFields[i].classList.add("filled");
            }

            label.classList.remove("focus");
        });
    }
}

function studentListPageOnLoad(){
    loadStudents()

    document.getElementById("main").addEventListener("click", function(){
        let modal = document.getElementById("contactModal");
    
        let lastClass = modal.classList[modal.classList.length - 1];
    
        if(lastClass != "d-none") {
            modal.classList.add("d-none");
        }
    });
}

function preventNonDigits(event){    
    event.target.value = event.target.value.replace(/\D+/, '');
}

function isBlank(value){
    let regex = new RegExp("\\W +");
    return value.length == 0 || regex.test(value);
}

function loadStudents(){
    let tBody = document.getElementById("tBodyStudentList");
    let studentList = ``;

    fetch("http://localhost:8080/student")
    .then(res => res.json())
    .then(data => {

        for (let i = 0; i < data.length; i++) {
            studentList += `<tr id="${data[i].studentId}" onclick="openContactModal(event)">
                                <td class="text-center">${i + 1}</td>
                                <td class="text-center">${data[i].studentId}</td>
                                <td>${data[i].name}</td>
                                <td class="text-center">${data[i].age}</td>
                                <td> - </td>
                                <td>
                                    <i class="fa-solid fa-pencil me-4"></i>
                                    <i class="fa-solid fa-trash-can"></i>
                                </td>
                            </tr>`
        }

        
        tBody.innerHTML = studentList;
        
    });   
    
}

function openContactModal(event){
    let tr = event.target.parentElement;
    if(tr.tagName != "TR") return;
    
    fetch(`http://localhost:8080/get-student/${tr.id}`)
    .then(res => res.json())
    .then(data => {
       document.getElementById("studentId").innerHTML = data.studentId;
       document.getElementById("name").innerHTML = data.name;
       document.getElementById("age").innerHTML = data.age;
       document.getElementById("gender").innerHTML = data.gender == "M" ? "Male": "Female";
       document.getElementById("contact").innerHTML = data.contact;
       document.getElementById("email").innerHTML = data.email;

       document.getElementById("studentPicture").src = "data:image/jpeg;base64," + data.studentPicture;
    });

    let modal = document.getElementById("contactModal");

    let lastClass = modal.classList[modal.classList.length - 1];
    if(lastClass != "d-none"){
        modal.classList.add("d-none");
    }

    setTimeout(() => {
        modal.classList.remove("d-none");
    }, 100);
}

function setStudentId(){
    fetch("http://localhost:8080/student").then(res => res.json()).then(data =>{
        let length  = data.length + 1 + "";
        document.getElementById("studentId").innerHTML = `STU${length.padStart(4, "0")}`;
    });
}


function btnRegiterOnClick(){    

    if(!isAllFieldsFilled()) return;

    if(!isImageSelected()) {
        alert("Please select a Student picture.");
        return;
    }

    let student = {
        studentId: document.getElementById("studentId").innerText,
        name: document.getElementById("txtFullName").value,
        age: document.getElementById("txtAge").valueAsNumber,
        gender: document.getElementById("dlGender").value,
        contact: document.getElementById("txtContact").value,
        email: document.getElementById("txtEmail").value,
    };

    let croppedCanvas = cropper.getCroppedCanvas();

    croppedCanvas.toBlob(function (blob) {
        
        if(blob.size > 1500000){
            alert("Image size is too large.")
            return;
        }

        let formData = new FormData();

        formData.append('file', blob, "student_image.jpg");
        formData.append("student", JSON.stringify(student));

        const requestOptions = {
            method: "POST",
            body: formData,
          };

          fetch("http://localhost:8080/add-student", requestOptions)
          .then(res => {
            if(res.ok){
                alert("Student registration successfull.");
                location.reload();
            }else{
                alert("Something went wrong! Please try again.")
            }
          })

    }, 'image/jpeg');
    
}

function isImageSelected(){
    let path = document.getElementById("studentPicture").src; 
    return path.match("User.png") == null;
}

function isAllFieldsFilled(){  
    let formFields = document.getElementsByClassName("form-field");  

    for (let i = 0; i < formFields.length; i++) {
        let inputField = formFields[i].children[1];

        if(isBlank(inputField.value)){
            alert("Please fill all required fields.")
            showError();
            return false;
        }
    }

    return true;
}

function showError(){
    let formFields = document.getElementsByClassName("form-field");

    for (let i = 0; i < formFields.length; i++) {
        let inputField = formFields[i].children[1];

        if(isBlank(inputField.value)){
            formFields[i].classList.add("error");
        }
    }
}

function changePicture(){
    document.getElementById("fileInput").click();
}

let cropper;

function openCropView(event){
    let image = document.getElementById("image");

    const file = event.target.files;
    const reader = new FileReader();

    if(file && file.length > 0){
        reader.onload = function(){
            image.src = reader.result;
            
            if(cropper) cropper.destroy();

            cropper = new Cropper(image, {
                aspectRatio: 1 / 1,
                viewMode: 3,
                dragMode: 'move',
                background: false
            });
        }

        document.getElementById("cropModal").classList.remove("d-none");
    }

    reader.readAsDataURL(file[0]);
};


function closeCropModal(){
    document.getElementById("cropModal").classList.add("d-none");
}

function setStudentPicture(){
    document.getElementById("studentPicture").src = cropper.getCroppedCanvas().toDataURL("image/png");
    closeCropModal();
}

function removeStudentPicture(){
    document.getElementById("studentPicture").src = "img/User.png";
}