function readJSON(path, id) {
  fetch(path)
    .then((result) => result.json())
    .then((data) => addContentToId(data, id))
    .catch((error) => console.error(error));
}

function addContentToId(data, id) {
  const element = document.getElementById(id);
  let innerOut = ``;

  data.forEach((obj) => {
    innerOut += `<div class="row">
            <div class="col-3">
                <p>
                    ${obj.date} <br>
                    ${obj.time} (${obj.duration})
                </p>
            </div>
            <div class="col-6">
                <h6>
                    ${obj.title}
                </h6>
                <p>
                    ${obj.description}
                </p>
            </div>
            <div class="col">
                <br>
                ${obj.location}
            </div>
        </div>
        <div class="horizontal-line"></div>
        <br><br>`;
  });

  element.innerHTML = innerOut;
}
