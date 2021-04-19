GetData();

async function GetData() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    let phone;
    try {
        phone = await axios.get(`/api/phone?id=${id}`);
        console.log(phone);
        RenderInfo(phone.data.phone);
        AddEventListeners(phone.data.phone);
    } catch (err) {
        console.log(err);
        window.location.href = "/";
    }
}

function AddEventListeners(phone) {
    const submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", () => GetInput(phone))

    const likeBtns = [...document.querySelectorAll("#like-button")];
    likeBtns.forEach((btn) =>
        btn.addEventListener("click", () => likeComment(btn,phone))
    );

    const dislikeBtns = [...document.querySelectorAll("#dislike-button")];
    dislikeBtns.forEach((btn) =>
        btn.addEventListener("click", () => dislikeComment(btn,phone))
    );

    const commentBtns = [...document.querySelectorAll("#comment-button")];
    commentBtns.forEach((btn) =>
        btn.addEventListener("click", () => addComment(btn,phone))
    );
}

async function updatePhone(phone) {
    try {
        phone.updatedAt = new Date();
        await axios.post("api/phonesUpdate", phone);
    } catch (err) {
        console.log(err);
    }

    window.location.href = window.location.href;
};

async function GetInput(phone) {
    const ratingValue = $('input[name="radios"]:checked').val();
    const comment = (document.querySelector("#comment")).value;

    phone.ratings = String(Number(phone.ratings) + Number(ratingValue));
    phone.nratings = String(Number(phone.nratings) + 1);

    if ( comment != "" ) {
        const user = await axios.get('/api/getUsername');
        const username = user.data.username;
        const experience = {
            name: username,
            content: comment,
            likes: "0",
            dislikes: "0"
        };
        phone.experiences.push(experience);
    }

    updatePhone(phone);
}

function getIndex(btn) {
    const parent = btn.parentElement;
    const index = parent.getAttribute("comment-id");
    return index;
};

async function likeComment(btn,phone) {
    const index = getIndex(btn);
    try {
        let i = 0;
        phone.experiences.forEach((experience) => {
            if( i == index ) {
                experience.likes = String(Number(experience.likes)+1);
                updatePhone(phone);
                return;
            }
            i++;
        });
    } catch (err) {
        console.log(err);
        window.location.href = "/";
    }
};

async function dislikeComment(btn,phone) {
    const index = getIndex(btn);
    try {
        let i = 0;
        phone.experiences.forEach((experience) => {
            if( i == index ) {
                experience.dislikes = String(Number(experience.dislikes)+1);
                updatePhone(phone);
                return;
            }
            i++;
        });
    } catch (err) {
        console.log(err);
        window.location.href = "/";
    }
};

async function addComment(btn,phone) {
    const index = getIndex(btn);
    const user = await axios.get('/api/getUsername');
    const username = user.data.username;
    try {
        let i = 0;
        phone.experiences.forEach((experience) => {
            if( i == index ) {
                const comment = (document.querySelector(`#comment${index}`)).value;

                const newComment = {
                    name: username,
                    content: comment
                }
                experience.comments.push(newComment);
                updatePhone(phone);
                return;
            }
            i++;
        });
    } catch (err) {
        console.log(err);
        window.location.href = "/";
    }
};

function showCommentForm(id) {
    var x = document.getElementById(id);
    $(x).toggle();
};

function RenderInfo(phone) {
    const model = document.querySelector("#model");
    model.innerHTML = `<h1>${phone.model}</h1>`;

    const image = document.querySelector("#image");
    image.innerHTML = `<img src="${phone.image}" class="img-fluid">`;

    const review = document.querySelector("#review");
    review.innerHTML = `<p>${phone.review}</p>`;

    const dimensions = document.querySelector("#dimensions");
    dimensions.innerHTML = `<th><h3>Dimensions:</h3></th><th><p>${phone.dimensions.length} x ${phone.dimensions.width} x ${phone.dimensions.height}</p></th>`;

    const display = document.querySelector("#display");
    display.innerHTML = `<th><h3>Display:</h3></th><th><p>${phone.display}</p></th>`;

    const os = document.querySelector("#os");
    os.innerHTML = `<th><h3>OS:</h3></th><th><p>${phone.os}</p></th>`;

    const memory = document.querySelector("#memory");
    memory.innerHTML = `<th><h3>Memory:</h3></th><th><p>${phone.memory}</p></th>`;

    const camera = document.querySelector("#camera");
    camera.innerHTML = `<th><h3>Camera:</h3></th><th><p>${phone.camera}</p></th>`;

    const battery = document.querySelector("#battery");
    battery.innerHTML = `<th><h3>Battery:</h3></th><th><p>${phone.battery}</p></th>`;

    const rating = document.querySelector("#rating");
    if( phone.nratings == "0" ) {
        rating.innerHTML = `<th><h3>Rating:</h3></th><th><p>No ratings yet...</p></th>`;
    }
    else {
        const ratingR = Number(phone.ratings) / Number(phone.nratings)
        const ratingS = String(ratingR)
        rating.innerHTML = `<th><h3>Rating:</h3></th><th><p>${ratingS}</p></th>`;
    }

    const youtube = document.querySelector("#youtube");
    youtube.innerHTML = `<iframe src="${phone.youtube}"></iframe>`;

    const experiences = document.querySelector("#experiences");
    let experiencesHtml = ""
    let index = 0
    phone.experiences.forEach((experience) => {
        experiencesHtml += `
        <div comment-id="${index}" class="col-sm-4">
            <h3>${experience.name}</h3>
            <p>${experience.content}</p>
            <p>Likes: ${experience.likes}</p>
            <p>Dislikes: ${experience.dislikes}</p>
            <button id="like-button" type="button" class="btn btn-success">LIKE</button>
            <button id="dislike-button" type="button" class="btn btn-danger">DISLIKE</button>
            <button onclick="showCommentForm('toggle${index}')" type="button" class="btn btn-info">COMMENT</button>
            <br/><br/>
            <div comment-id="${index}" id="toggle${index}" class="DisplayNone">
                <label for="comment${index}">Comment:</label>
                <textarea class="form-control" id="comment${index}" rows="3" placeholder="Write your comment here..."></textarea>
                <br/>
                <button id="comment-button" class="btn btn-primary" type="button">Submit</button>
            </div>
            <br/>
        </div>`;
        index++;
    });
    experiences.innerHTML = experiencesHtml;
}