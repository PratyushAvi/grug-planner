let json;

document.addEventListener('DOMContentLoaded', function () {
    setup();
});

function setup() {
    fetch(
        '../assets/text/filekey.json',
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        }
    )
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            json = jsondata;
            main(jsondata);
        });
}

function main(json) {
    let text_select = document.getElementById('lecture-select');

    for (var key of Object.keys(json)) {
        let option = document.createElement('option');
        option.value = key;
        option.text = key;
        text_select.appendChild(option);
    }

    update();
}

function update() {
    let text_select = document.getElementById('lecture-select');
    let text_head = document.getElementById('text-head');
    let text_body = document.getElementById('text-body');
    let text_deets = document.getElementById('text-details');

    text_head.innerHTML = text_select.value;
    text_deets.innerText = "";

    if (json[text_select.value]["author"] != "null") {
        text_deets.innerText += json[text_select.value]["author"];
        if (json[text_select.value]["date"] != "null")
            text_deets.innerText += ' | ' + json[text_select.value]["date"];
    }
    else if (json[text_select.value]["date"] != "null") {
        text_deets.innerText += json[text_select.value]["date"];
    }
    else {
        text_deets.innerText += "¯\\_(ツ)_/¯";
    }


    fetch(
        json[text_select.value]["path"] + json[text_select.value]["filename"], 
        {
            method: 'GET',
            headers: {
                accept: 'application/json',
            },
        })
        .then(response => {
            return response.text();
        })
        .then(t => {
            let text = t;
            text.replace("\n", "<br>");
            text_body.innerText = text;
        });
}