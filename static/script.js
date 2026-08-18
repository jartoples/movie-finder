const tombol = document.querySelector("#tombol_send")
const film = document.querySelector("#input")
const list = document.querySelector("#list")
tombol.addEventListener("click", async function() {
    console.log("tombol di klik")
    let response = await fetch("/film", {
        method: "POST",
        headers: {
            "content-type":"application/json"
        },
        body:JSON.stringify ({
            film:film.value
        })
    })
    let data = await response.json()
    list.innerHTML = ""
    data.forEach(film => {
        const img = document.createElement("img");
        const judul = document.createElement("p");;
        judul.classList.add("judul")
        img.classList.add("poster")

        img.src = film.poster;
        judul.textContent = film.judul;

        const movie = document.createElement("div")
        movie.classList.add("movie")
        list.appendChild(movie)
        movie.appendChild(img)
        movie.appendChild(judul)
        movie.addEventListener("click", async function() {
            window.location.href = `/movie/${film.id}`
        })
    })
})