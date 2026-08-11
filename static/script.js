const tombol = document.querySelector("#kirim")
const film = document.querySelector("#film")
const list = document.querySelector("#list")
tombol.addEventListener("click", async function(){
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
        const img = document.createElement("img")
        const judul = document.createElement("p")
        const rating = document.createElement("p")
        const overview = document.createElement("p")
        const rilis = document.createElement("p")
        img.src = film.poster
        judul.textContent = film.judul
        rating.textContent = film.rating
        overview.textContent = film.overview
        rilis.textContent = film.rilis
        list.appendChild(img)
        list.appendChild(judul)
        list.appendChild(rating)
        list.appendChild(overview)
        list.appendChild(rilis)
        
    });
})