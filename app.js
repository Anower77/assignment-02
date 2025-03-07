let users = [] 
let guideMembers = [] 


// The total members
const countMembers = () => {
    const totalMembers = guideMembers.length
    const males = guideMembers.filter(user => user.gender === "male").length
    const females = guideMembers.filter(user => user.gender === "female").length
    document.getElementById("total-members").innerText = totalMembers
    document.getElementById("total-males").innerText = males
    document.getElementById("total-females").innerText = females
}


// fetch Users
const fetchUsers = () => {
    fetch(`https://randomuser.me/api/?results=12`)
        .then(response => response.json())
        .then(data => {
            users = data.results
            const cardContainer = document.getElementById("card-container")
            cardContainer.innerHTML = ''
            users.forEach((user, index) => {
                cardContainer.innerHTML += `
                    <div class="col-md-4">
                        <div class="card">
                            <img src="${user.picture.large}" class="card-img-top" alt="${user.name.first}">
                            <div class="card-body">
                                <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
                                <p class="card-text">Email: ${user.email}</p>
                                <p class="card-text">Phone: ${user.phone}</p>
                                <p class="card-text">Location: ${user.location.city}, ${user.location.country}</p>
                                <div class="social-icons">
                                    <a href="#" class="text-primary"><i class="fab fa-facebook"></i></a>
                                    <a href="#" class="text-info"><i class="fab fa-twitter"></i></a>
                                    <a href="#" class="text-danger"><i class="fab fa-linkedin"></i></a>
                                </div>
                                <button class="btn btn-info mt-2" onclick="showDetails(${index})">Details</button>
                                <button class="btn btn-success mt-2" onclick="addToGuiders(${index})">Add to Group</button>
                            </div>
                        </div>
                    </div>
                `
            })
        })
        .catch(error => 
            console.lof("fetching users:", error)
        )
}




// add To Guiders
const addToGuiders = (index) => {
    const user = users[index]
    const isAlreadyInGuiders = guideMembers.some(guider => guider.email == user.email)
    if (isAlreadyInGuiders) return


    guideMembers.push(user)
    const guideList = document.getElementById("guide-list")
    const guiderCard = document.createElement("div")

    guiderCard.className = "guider-card"
    guiderCard.innerHTML = `
        <h5>${user.name.first} ${user.name.last}</h5>
        <p>Role: Guider</p>
        <p>${user.email}</p>
    `
    guideList.appendChild(guiderCard)
    countMembers() 
}



// show Details
const showDetails = (index) => {
    const user = users[index]
    const modalContent = document.getElementById("modal-content")
    modalContent.innerHTML = `
        <h5>${user.name.first} ${user.name.last}</h5>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Gender:</strong> ${user.gender}</p>
        <p><strong>Location:</strong> ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}</p>
        <p><strong>Phone:</strong> ${user.phone}</p>
        <p><strong>Cell:</strong> ${user.cell}</p>
        <p><strong>Nationality:</strong> ${user.nat}</p>
        <p><strong>Username:</strong> ${user.login.username}</p>
        <img src="${user.picture.large}" alt="${user.name.first}" class="img-fluid mt-3">
    `
    const modal = new bootstrap.Modal(document.getElementById('detailsModal'))
    modal.show()
}




// search Bar
const searchBar = document.getElementById("searchBar")
searchBar.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase()
    const filteredUsers = users.filter(user =>
        `${user.name.first} ${user.name.last}`.toLowerCase().includes(query)
    )
    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ''
    filteredUsers.forEach((user, index) => {
        cardContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card">
                    <img src="${user.picture.large}" class="card-img-top" alt="${user.name.first}">
                    <div class="card-body">
                        <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
                        <p class="card-text">Email: ${user.email}</p>
                        <p class="card-text">Phone: ${user.phone}</p>
                        <p class="card-text">Location: ${user.location.city}, ${user.location.country}</p>
                        <div class="social-icons">
                            <a href="#" class="text-primary"><i class="fab fa-facebook"></i></a>
                            <a href="#" class="text-info"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="text-danger"><i class="fab fa-linkedin"></i></a>
                        </div>
                        <button class="btn btn-info mt-2" onclick="showDetails(${index})">Details</button>
                        <button class="btn btn-success mt-2" onclick="addToGuiders(${index})">Add to Group</button>
                    </div>
                </div>
            </div>
        `
    })
})

fetchUsers()
