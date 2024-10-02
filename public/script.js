const addBtn = document.querySelector('.add-btn');
const closeBtn = document.querySelector('.close-btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const openModal = ()=> {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
const closeModal = ()=> {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
addBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

const tableBody = document.querySelector('.table-body');
const submitBtn = document.querySelector('.submit-btn');
const editBtn = document.querySelector('.edit-btn');

let editUser = null;


// --------------------------show data on webpage -------------------------
function renderData(){
    fetch('http://localhost:5000/api')
    .then( res => res.json())
    .then(data => {
        data.forEach( user => {
            const html = `
            <tr data-id="${user.id}">
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${user.gender}</td>
                <td> <button class="btn edit-btn">Edit</button> <button class="btn delete-btn">Delete</button> </td>
            </tr>
        `;
            tableBody.insertAdjacentHTML('beforeend', html);
        });
    });
}
renderData();


// --------------------Add new user AND update user ------------------------
submitBtn.addEventListener('click', (event)=> {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    if(editUser !== null){
        fetch(`http://localhost:5000/api/update/${editUser}`, {
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({name, email, age, gender}) //send the parameters to put method
        })
        .then( res => res.json())
        .then( data => {
            console.log(data.message); // Success message
            location.reload();
            editUser = null;
        });
    }
    else{    
        fetch('http://localhost:5000/api/add', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({name, email, age, gender})
        })
        .then( res => res.json())
        .then( data => {
            console.log(data.message); // Success message
            location.reload();
        });
    }
});

// ----------------------Delete users-----------------------------
tableBody.addEventListener('click', (event)=> {
    const click = event.target;    
    const row = click.closest('tr');
    const id = row.dataset.id;
    
    //Edit user-> open modal 
    if(click.classList.contains('edit-btn')) {
        openModal();
        editUser = id;
    }

    if(!click.classList.contains('delete-btn')) return;


    fetch(`http://localhost:5000/api/delete/${id}`, { 
        method: 'DELETE'
     })
    .then( res => res.json())
    .then( data => {
       row.remove();
       console.log(data);
    }).catch( err => console.error(err));
});