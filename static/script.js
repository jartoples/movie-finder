const tombol = document.querySelector("#send")
const film = document.querySelector("#film")
const list = document.querySelector("#list")
tombol.addEventListener("click", async function(){
    console.log("TOMBOL DIKLIK");
    let response = await fetch("/film",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            film:film.value
        })
        
    })
    let data = await response.json()
    list.innerHTML = ""
    data.forEach(film => {
        const tombol2 = document.createElement("button")
        tombol2.textContent = "see more"
        tombol2.setAttribute("data-id",film.id)
        const movie = document.createElement("div");
        movie.classList.add("movie");

        const tentang_film = document.createElement("div");
        tentang_film.classList.add("tentang_film", "nonactive");

        const img = document.createElement("img");
        const judul = document.createElement("p");
        const rating = document.createElement("p");
        const overview = document.createElement("p");
        const rilis = document.createElement("p");

        img.src = film.poster;
        judul.textContent = film.judul;
        rating.textContent = film.rating + "/10";
        overview.textContent = film.overview;
        rilis.textContent = "released on " + film.rilis;

        movie.appendChild(img);
        movie.appendChild(tentang_film);
        movie.appendChild(tombol2)

        tentang_film.appendChild(judul);
        tentang_film.appendChild(rating);
        tentang_film.appendChild(overview);
        tentang_film.appendChild(rilis);

        list.appendChild(movie);
        tombol2.addEventListener("click", async function() {
            tombol2.remove()
            const tutup = document.createElement("button")
            movie.appendChild(tutup)
            tutup.setAttribute("data-id",film.id)
            tutup.textContent = "close"
            tutup.addEventListener("click", async function () {
                if (tentang_film.classList.contains("tentang_film")) {
                    tentang_film.classList.add("nonactive")
                    movie.appendChild(tombol2)
                    tutup.remove()
                }
                else {
                    alert("you must open the movie info first")
                }
            })
            tentang_film.classList.remove("nonactive")
        })
        
    });
})