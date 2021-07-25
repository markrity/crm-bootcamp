

//not work!!!! (call from api_helpers)
export function addToLS(token) {
    localStorage.setItem("my_user", token);
}

//its ok
export function removeFromLS() {
    localStorage.removeItem("my_user")
}

export function getFromLS() {

}

