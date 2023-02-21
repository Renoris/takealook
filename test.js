//
// function getResponse(response) {
//     return response.json();
// }
// function getJsonResponse(response) {
//     console.log(response);
// }
//
//
//
// fetch('http://localhost:8080/api/test').then(getResponse).then(getJsonResponse);
//
async function aa() {
    console.log(1);
    async function getFetch() {
        console.log(2);
        const response = await fetch('http://localhost:8080/api/test');
        console.log(3);
        const result = await response.json();
        console.log(4);
        console.log(result);
    }

    await getFetch();

    console.log(5);
}
aa();

console.log(6);