import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/documents")
      .then((res) => res.json())
      .then((data) => setDocuments(data))
      .catch((err) => console.error("Failed to fetch documents", err));
  }, []);

  const createNewDocument = async () => {
    try {
      const res = await fetch("http://localhost:3001/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const newDoc = await res.json();
      // Redirect to editor page for this new document
      navigate(`/doc/${newDoc._id}`);
    } catch (err) {
      console.error("Failed to create document", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <button onClick={createNewDocument} style={{ marginBottom: "20px" }}>
        Create New Document
      </button>
      {documents.length === 0 ? (
        <p>No documents found</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li
              key={doc._id}
              style={{ cursor: "pointer", marginBottom: "10px", color: "blue" }}
              onClick={() => navigate(`/doc/${doc._id}`)}
            >
              {doc._id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
