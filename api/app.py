from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route("/", methods=['POST'])
def hello():
    some_json = request.get_json()
    return jsonify({"you sent": some_json}), 201

if __name__ == '__main__':
    app.run(debug=True)

