from flask import Flask, escape, request, json, jsonify

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


@app.route('/test/', methods=['POST'])
def test():
    print("test api is triggered")
    request_raw = request.get_json()
    res = {
        "who": request_raw["who"]
    }
    return jsonify(res)


@app.route('/getData/', methods=['POST'])
def test():

    request_raw = request.get_json()
    print("get" + request_raw["name"] + "api is triggered")
    res = {
        "name": request_raw["name"]
    }
    return jsonify(res)


if __name__ == "__main__":
    app.run(debug=True)