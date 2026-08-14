import requests
from flask import Flask, render_template, request, redirect, session,jsonify

from api import api_key

app = Flask(__name__,template_folder=".")

@app.route("/")
def home():
    return render_template("dashboard.html")
@app.route("/film",methods = ["POST"])
def film():
    response_web = request.json
    film = response_web["film"]
    url = "https://api.themoviedb.org/3/search/movie"
    params = {
    "api_key": api_key,
    "query": film,
    "language": "en-US"
}

    response = requests.get(url, params=params)
    data = response.json()
    print(data["results"])
    hasil = []
    for id, film_data in enumerate(data["results"]):
        hasil.append({
        "poster": f"https://image.tmdb.org/t/p/w154{film_data['poster_path']}",
        "judul": film_data["title"],
        "rating": film_data["vote_average"],
        "overview": film_data["overview"],
        "rilis": film_data["release_date"],
        "id":film_data["id"]
    })

    return jsonify(hasil)
    
app.run(debug =True)