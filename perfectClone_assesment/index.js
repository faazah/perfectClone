function showDropDown1() {
    let a = document.getElementById("drop-down1");
    if(a.style.visibility === "hidden") {
        a.style.visibility = "visible";
    } else {
        a.style.visibility = "hidden";
    }
}
function showDropDown2() {
    let b = document.getElementById("drop-down2");
    if(b.style.visibility === "hidden") {
        b.style.visibility = "visible";
    } else {
        b.style.visibility = "hidden";
    }
}
let IMGUR_API_CLIENT_ID = "c6e98cda6c885dd"
let id;
let dataC = document.getElementById("data_divC");
let res_div = document.getElementById("search-res");
getData();

async function getData () {
    let res = await fetch("https://api.imgur.com/3/gallery/hot", {headers: {Authorization: `Client-ID ${IMGUR_API_CLIENT_ID}`}});
    let data = await res.json();
    displayData(data.data);
    console.log(data)
}

function displayData (data) {
    console.log(data)
    data.map((e) => {
        let data_div = document.createElement("div");
        data_div.setAttribute("id", "data_div")
        let img = document.createElement("img");
        if(e.images)
            img.src = e.images[0].link;
        else
            img.src = e.link;
        // img.src = e.images[0].link;
        img.style.height = "170px";
        img.style.width = "99%";
        let h5 = document.createElement("h5");
        h5.style.marginLeft ="6%";
        h5.textContent = e.title;
        h5.style.color = "white";
        h5.style.textOverflow = "ellipsis";
        h5.style.width = "90%";
        h5.style.height = "25%";
        let divAct = document.createElement("div");
        divAct.setAttribute("id", "divAct")
        let up = document.createElement("i");
        up.setAttribute("class", "fa fa-arrow-up");
        up.innerHTML = e.ups;
        let comment = document.createElement("i");
        comment.setAttribute("class", "fa fa-comment");
        let eye = document.createElement("i");
        eye.innerHTML = e.views > 1000 ? (`${Math.floor(e.views/1000)}K`) : e.views;
        eye.setAttribute("class", "fa fa-eye");
        divAct.append(up, comment, eye);

        data_div.append(img, h5, divAct);
        dataC.append(data_div);
    })
}
displayData();

    async function searchRes () {
        let input = document.getElementById("search-input").value;
        let res = await fetch(`https://api.imgur.com/3/gallery/search?q=${input}`, {headers: {Authorization: `Client-ID ${IMGUR_API_CLIENT_ID}`}});
        let data = await res.json();
        return (data.data);
    }

    function debounce( func, delay) {
        clearTimeout(id);
        id = setTimeout(function () {
            func ();
        }, delay)
    }

    async function displayRes() {
        let data = await searchRes();
        console.log(data)
        if(data.length > 0) {
            res_div.style.display = "block";
            data.map((e) => {
                let resChildDiv = document.createElement("div");
                resChildDiv.setAttribute("id", "resChild-div")
                let h4 = document.createElement("h4");
                h4.textContent = e.title;
                resChildDiv.append(h4)
                res_div.append(resChildDiv);
            })
        }   
    }