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
    print("get " + request_raw["name"] + " api is triggered")
    G = nx.karate_club_graph()
    nodes = []
    for node in G.nodes():
        nodes.append({"node_id": node})
    edges = []
    for edge in G.edges():
        edges.append({"source": edge[0], "source_id": edge[0], "target": edge[1], "target_id": edge[1]})
        edges.append({"source": edge[1], "source_id": edge[1], "target": edge[0], "target_id": edge[0]})
    res = {
        "name": request_raw["name"],
        "nodes": nodes,
        "edges": edges
    }
    return jsonify(res)


if __name__ == "__main__":
    app.run(debug=True)