import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tools, setTools] = useState([]);

  // creat form
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quickRef, setQuickRef] = useState("");
  const [resourceLabel, setResourceLabel] = useState("");
  const [resourceUrl, setResourceUrl] = useState("");
  const [addedResources, setAddedResources] = useState([]);

  // edit cards
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editQuickRef, setEditQuickRef] = useState("");

  const API_URL = "http://127.0.0.1:5000/api/shelf";

  const fetchShelf = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTools(data.items))
      .catch((err) => console.error("Error fetching shelf data:", err));
  };

  useEffect(() => {
    fetchShelf();
  }, []);

  // multiple resources need to be added in a list/array
  const handleAddResourceToArray = (e) => {
    e.preventDefault();
    if (!resourceLabel || !resourceUrl) return;
    setAddedResources([
      ...addedResources,
      { label: resourceLabel, url: resourceUrl },
    ]);
    setResourceLabel("");
    setResourceUrl("");
  };

  // post, create new card for a tool
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPayload = {
      title,
      category,
      description,
      quick_ref: quickRef, 
      resources: addedResources,
    };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPayload),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setTitle("");
        setCategory("");
        setDescription("");
        setQuickRef("");
        setAddedResources([]);
        fetchShelf();
      })
      .catch((err) => console.error(err));
  };

  // delete
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => fetchShelf())
      .catch((err) => console.error(err));
  };

  // 
  const startEditing = (tool) => {
    setEditingId(tool.id);
    setEditTitle(tool.title);
    setEditCategory(tool.category);
    setEditDescription(tool.description);
    setEditQuickRef(tool.quick_ref);
  };

  // update
  const handleUpdate = (id, existingResources) => {
    const updatedPayload = {
      title: editTitle,
      category: editCategory,
      description: editDescription,
      quick_ref: editQuickRef, 
      resources: existingResources,
    };

    fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPayload),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        setEditingId(null);
        fetchShelf();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="shelf-container">
      <h1 className="main-title">Dev Shelf Manager</h1>

      <div className="dashboard-layout">
        {/* left column: add new tool form */}
        <form onSubmit={handleSubmit} className="tool-form">
          <h3>Create New Tool Card</h3>

          <div className="form-group">
            <input
              type="text"
              placeholder="Name (e.g., Tailwind)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Category (e.g., UI Utility)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <textarea
            placeholder="Briefly describe what this tool does..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
          />
          <input
            type="text"
            placeholder="Quick Ref Snippet (e.g., className='flex')"
            value={quickRef}
            onChange={(e) => setQuickRef(e.target.value)}
          />

          <div style={{ borderTop: "1px solid #e1e1e1", paddingTop: "10px" }}>
            <h4>Add Documentation Links (one or multiple)</h4>
            <div className="resource-input-row">
              <input
                type="text"
                placeholder="Label (e.g., Docs)"
                value={resourceLabel}
                onChange={(e) => setResourceLabel(e.target.value)}
              />
              <input
                type="url"
                placeholder="https://..."
                value={resourceUrl}
                onChange={(e) => setResourceUrl(e.target.value)}
              />
              <button
                type="button"
                onClick={handleAddResourceToArray}
                className="btn-add-resource"
              >
                + Add
              </button>
            </div>

            <ul
              style={{
                fontSize: "12px",
                color: "#666",
                marginTop: "8px",
                paddingLeft: "20px",
              }}
            >
              {addedResources.map((res, idx) => (
                <li key={idx}>
                  {res.label}: {res.url}
                </li>
              ))}
            </ul>
          </div>

          <button type="submit" className="btn-submit">
            Save Tool to Shelf
          </button>
        </form>

        {/* right column: shelf grid */}
        <div className="grid-layout">
          <h2>Your Dev Shelf ({tools.length})</h2>

          {tools.map((tool) => (
            <div key={tool.id} className="tool-card">
              {editingId === tool.id ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div className="form-group">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <input
                      type="text"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                    />
                  </div>
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows="2"
                  />
                  <input
                    type="text"
                    value={editQuickRef}
                    onChange={(e) => setEditQuickRef(e.target.value)}
                  />

                  <div className="card-actions">
                    <button
                      onClick={() => handleUpdate(tool.id, tool.resources)}
                      className="btn-submit"
                      style={{ padding: "6px 12px" }}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn-edit"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="card-header">
                    <h3 style={{ margin: 0 }}>{tool.title}</h3>
                    <span className="category-tag">{tool.category}</span>
                  </div>

                  <p
                    style={{
                      color: "#555",
                      fontSize: "14px",
                      lineHeight: "1.4",
                    }}
                  >
                    {tool.description}
                  </p>

                  {tool.quick_ref && tool.quick_ref !== "N/A" && (
                    <div>
                      <small style={{ fontWeight: "bold", color: "#666" }}>
                        ⚡ Quick Reference:
                      </small>
                      <div className="code-box">{tool.quick_ref}</div>
                    </div>
                  )}

                  {tool.resources && tool.resources.length > 0 && (
                    <div className="resource-links">
                      {tool.resources.map((link, idx) => (
                        <a
                          key={idx}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="resource-link"
                        >
                          🔗 {link.label}
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="card-actions">
                    <button
                      onClick={() => startEditing(tool)}
                      className="btn-edit"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tool.id)}
                      className="btn-delete"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
