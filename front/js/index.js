loadPage()

async function loadPage() {
    try {
        let phones = await axios.get("/api/phones")
        renderCards(phones.data.phones)
        addEventListeners()
    } catch (err) {
        console.log(err)
    }
}

function addEventListeners() {
    let moreInfoBtn = [...document.querySelectorAll(".info-button")]
    moreInfoBtn.forEach((btn) =>
        btn.addEventListener("click", () => {
            window.location.href = `phone?id=${getId(btn)}`
        })
    )

    let deleteBtns = [...document.querySelectorAll(".delete-button")]
    deleteBtns.forEach((btn) =>
        btn.addEventListener("click", () => deleteData(btn))
    )
}

function renderCards(phones) {
    const cardsDiv = document.querySelector("#phone-list")
    let cards = ""
    phones.forEach((phone) => {
        cards += createCard(phone)
    })

    cardsDiv.innerHTML = cards
}

function createCard(phone) {

    let card = `
    <div class="col-sm-4 text-center" phone-id="${phone._id}">
        <img src="${phone.image}" alt="${phone.model}">
        <h2>Model: ${phone.model}</h2>
        <p>Manufacturer: ${phone.manufacturer}</p>
        <button type="button" class="btn btn-primary info-button">Read more...</button>
        <button type="button" class="btn btn-secondary delete-button">Delete</button>
        <br/><br/><br/>
    </div>
    `

    return card
}

async function deleteData(btn) {
    const id = getId(btn)
    try {
        await axios.delete(`/api/phones/${id}`)
        window.location.href = "/"
    } catch (err) {
        console.log(err)
    }
}

function getId(btn) {
    const parent = btn.parentElement
    const id = parent.getAttribute("phone-id")
    return id
}