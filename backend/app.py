from flask import Flask, request
from flask_cors import CORS
from shelf_data import shelf_items
app=Flask(__name__)
CORS(app)

# set up endpoints for the api

#get items
@app.route("/api/shelf", methods=["GET"])
def get_shelf():
    return {"items": shelf_items}, 200

#target a specific item, in case of updating that dictionary or deleting:

#delete
@app.route("/api/shelf/<int:item_id>", methods=["DELETE"])
def delete_from_shelf(item_id):
    global shelf_items #to modify the global variable
    
    # does item exist
    target_item = next((item for item in shelf_items if item["id"] == item_id), None)
    if not target_item:
        return {"error": f"Tool with ID {item_id} not found."}, 404

    # filter out the item, shelf_items = all items but the target item
    shelf_items = [item for item in shelf_items if item["id"] != item_id]
    
    return {"message": f"'{target_item['title']}' removed from shelf."}, 200

# update with put
@app.route("/api/shelf/<int:item_id>", methods=["PUT"])
def update_shelf_item(item_id):
    body=request.get_json(force=True) or {}
    target_item=next((item for item in shelf_items if item["id"] == item_id), None)
    if not target_item: 
        return {"error": f"Tool with ID {item_id} not found."}, 404
    #overwrite with provided values in body and if nothing is provided in the field, use old values
    target_item["title"] = body.get("title", target_item["title"])
    target_item["category"] = body.get("category", target_item["category"])
    target_item["description"] = body.get("description", target_item["description"])
    target_item["quick_ref"] = body.get("quick_ref", target_item["quick_ref"])
    target_item["resources"] = body.get("resources", target_item["resources"])

    return {
        "message": f"'{target_item['title']}' updated successfully!",
        "item": target_item
    }, 200

#post new tool
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