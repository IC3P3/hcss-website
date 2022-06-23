const path = '../json/events.json';

fetch(path)
    .then(result => result.json())
    .then(data => )
    .catch((error) => {
        console.error(error);
    });