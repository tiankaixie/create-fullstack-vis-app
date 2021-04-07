from flask import Flask, escape, request, json, jsonify
import networkx as nx

app = Flask(__name__)


# test route
@app.route('/')
def hello():
    """Just a test api

    Returns:
        String -- returned html
    """
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'


@app.route('/getData/', methods=['POST'])
def get_data():
    request_raw = request.get_json()
    print("get " + request_raw["dataName"] + " api is triggered")
    res = {}
    with open("data/" + request_raw["dataName"] + "_data" + ".json") as json_file:
        res = json.load(json_file)
    print(res)
    return jsonify(res)


if __name__ == "__main__":
    app.run(debug=True)