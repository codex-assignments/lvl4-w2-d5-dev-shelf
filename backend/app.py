from flask import Flask, request
from flask_cors import CORS
from shelf_data import shelf_items
app=Flask(__name__)
CORS(app)

# set up endpoints for the api, add GET methods for readability

#get items
@app.route("/api/shelf", methods=["GET"])
def get_shelf():
    return {"items": shelf_items}, 200

#target a specific item, in case of updating that dictionary or deleting



#post items
@app.route("/api/shelf", methods=["POST"])
def add_to_shelf():
    # get_json parses into python dictionary from raw text in body, force=True ignores header mistakes
    # if the user sends empty body, body would = None or False, 500 Internal Error. With {}, it is True and will return 400 Bad Request.
    body = request.get_json(force=True) or {}

    if "title" not in body or "category" not in body: 
        return {"error": "Title and category are required fields."}, 400
    
    next_id = max([item["id"] for item in shelf_items], default=0)+1

    new_tool = {
        "id": next_id,
        "title": body["title"],
        "category": body["category"],
        "description": body.get("description", "None provided."),
        "quick_ref": body.get("quick_ref", "None provided"),
        "resources": body.get("resources",[])
    }
    
    shelf_items.append(new_tool)

    return {
        "message": "New tool added!",
        "item": new_tool
    }, 201 #created item, added to list

if __name__ == "__main__":
    app.run(debug=True, port=5000)