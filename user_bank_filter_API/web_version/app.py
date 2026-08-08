from flask import Flask, render_template, request
import requests

app = Flask(__name__)

url = "https://dummyjson.com/users"
response = requests.get(url)
data = response.json()


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/users")
def users():
    return render_template("users.html", users=data["users"])


@app.route("/search")
def search():
    username = request.args.get("username", "")

    found_user = None

    for user in data["users"]:
        if user["username"].lower() == username.lower():
            found_user = user
            break

    return render_template("search.html", user=found_user, username=username)


@app.route("/filter")
def filter_currency():
    currency = request.args.get("currency", "")

    matching_users = []

    for user in data["users"]:
        if user["bank"]["currency"].lower() == currency.lower():
            matching_users.append(user)

    return render_template(
        "filter.html",
        users=matching_users,
        currency=currency
    )


@app.route("/count")
def count_currency():
    currency = request.args.get("currency", "")

    count = 0

    for user in data["users"]:
        if user["bank"]["currency"].lower() == currency.lower():
            count += 1

    return render_template(
        "count.html",
        count=count,
        currency=currency
    )


app.run(debug=True)