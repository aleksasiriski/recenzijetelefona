let addButton = document.querySelector("#add-button");
addButton.addEventListener("click", GetInput);

async function GetInput() {
    const model = (document.querySelector("#model")).value;
    const manufacturer = (document.querySelector("#manufacturer")).value;
    const price = (document.querySelector("#price")).value;
    const length = (document.querySelector("#length")).value;
    const width = (document.querySelector("#width")).value;
    const height = (document.querySelector("#height")).value;
    const display = (document.querySelector("#display")).value;
    const os = (document.querySelector("#os")).value;
    const memory = (document.querySelector("#memory")).value;
    const camera = (document.querySelector("#camera")).value;
    const battery = (document.querySelector("#battery")).value;
    const youtube = (document.querySelector("#youtube")).value;
    const review = (document.querySelector("#review")).value;

    const phone = {
        model: model,
        manufacturer: manufacturer,
        price: price,
        dimensions: {
            length: length,
            width: width,
            height: height
        },
        display: display,
        os: os,
        memory: memory,
        camera: camera,
        battery: battery,
        ratings: "0",
        nratings: "0",
        youtube: youtube,
        review: review
    };

    try {
        await axios.post("api/phones", phone);
    } catch (err) {
        console.log(err);
    }

    window.location.href = "/";
}
