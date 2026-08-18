import requests
from flask import Flask, render_template, request, redirect, session,jsonify

from api import api_key

app = Flask(__name__,template_folder=".")

@app.route("/")
def home():
    return render_template("landing_page.html")

@app.route("/movie/<movie_id>")
def info_film(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}"
    params = {
        "api_key":api_key,
        "language": "en-US"
    }
    response = requests.get(url,params=params)
    data = response.json()
    print(data)
    return render_template("movie_detail.html",data = data)
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
    for film_data in data["results"]:
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