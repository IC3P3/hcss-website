function testHello(){
    const eventElement = document.getElementById("event-list");

    console.log(eventElement);
    eventElement.innerHTML = '<h1>Hello World</h1>'
}