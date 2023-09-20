from flask import Flask
import random

app = Flask(__name__)

# Pass the required route to the decorator.


@app.route("/kyle")
def kyle():
    name = random.sample(['Kyle', 'Josh', 'Sam', 'Tyler', 'Jens', 'Nick', 'Payton'], 1)
    if name[0] == 'Payton':
        return f"{name[0]} loves hot girls!"

    return f"{name[0]} loves e-girls!"


if __name__ == "__main__":
    app.run(debug=True)
