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
        const movie = document.createElement("div");
        movie.classList.add("movie");

        const tentang_film = document.createElement("div");
        tentang_film.classList.add("tentang_film");

        const img = document.createElement("img");
        const judul = document.createElement("p");
        const rating = document.createElement("p");
        const overview = document.createElement("p");
        const rilis = document.createElement("p");

        img.src = film.poster;
        judul.textContent = film.judul;
        rating.textContent = film.rating + "/10";
        overview.textContent = film.overview;
        rilis.textContent = "release on " + film.rilis;

        movie.appendChild(img);
        movie.appendChild(tentang_film);

        tentang_film.appendChild(judul);
        tentang_film.appendChild(rating);
        tentang_film.appendChild(overview);
        tentang_film.appendChild(rilis);

        list.appendChild(movie);
        
    });
})