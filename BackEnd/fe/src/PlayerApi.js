const baseUrl = "http://localhost:3000/api/";

let onSuccess = (response) => {
    return response.json();
};
let onError = (error) => {
    console.log(error);
};

function get(url) {
    return fetch(baseUrl + url).then(onSuccess, onError);
}
function del(url) {
    const request = new Request(baseUrl + url, {
        method: "DELETE"
    });
    return fetch(request).then(onSuccess, onError);
}
function create(deletePlayer, url) {
    const request = new Request(baseUrl + url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deletePlayer)
    });
    return fetch(request).then(onSuccess, onError);
}

export function createdeletePlayer(deletePlayer) {
    return create(deletePlayer, "deletePlayer");
}
export function getPlayers() {
    return get("deletePlayer");
}
export function deletePlayer(id) {
    return del(`deletePlayer/${id}`);
}
