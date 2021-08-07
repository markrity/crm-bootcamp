

const fetchLeads = async (event) => {
    event.preventDefault()
    console.log("Entered")
    var sortBy = document.querySelector('input[name="sortBy"]:checked').value

    try {
        console.log(sortBy)
        window.location.replace(`http://localhost:8082/admin?sortBy=${sortBy}`)
    }
    catch (err) {
    }
}