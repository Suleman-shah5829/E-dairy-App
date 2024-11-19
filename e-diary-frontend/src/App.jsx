import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ title: "", content: "" });
  const [editingEntry, setEditingEntry] = useState(null);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("http://localhost:5000/entries");
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const addEntry = async () => {
    try {
      await axios.post("http://localhost:5000/entries", newEntry);
      fetchEntries();
      setNewEntry({ title: "", content: "" });
    } catch (error) {
      console.error("Error adding entry", error);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/entries/${id}`);
      fetchEntries();
    } catch (error) {
      console.error("Error deleting entry", error);
    }
  };

  const updateEntry = async (id, updatedEntry) => {
    try {
      await axios.put(`http://localhost:5000/entries/${id}`, updatedEntry);
      fetchEntries();
      setEditingEntry(null);
    } catch (error) {
      console.error("Error updating entry", error);
    }
  };

  return (
    <div className="app">
      <h1>Personal E-Diary</h1>
      <div className="entry-form">
        <input
          type="text"
          placeholder="Title"
          value={newEntry.title}
          onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={newEntry.content}
          onChange={(e) =>
            setNewEntry({ ...newEntry, content: e.target.value })
          }
          required
        />
        <button onClick={addEntry}>Add Entry</button>
      </div>
      <div className="entry-list">
        {entries.map((entry) => (
          <div className="entry" key={entry.id}>
            {editingEntry && editingEntry.id === entry.id ? (
              <div>
                <input
                  type="text"
                  value={editingEntry.title}
                  onChange={(e) =>
                    setEditingEntry({ ...editingEntry, title: e.target.value })
                  }
                />
                <textarea
                  value={editingEntry.content}
                  onChange={(e) =>
                    setEditingEntry({
                      ...editingEntry,
                      content: e.target.value,
                    })
                  }
                />
                <button onClick={() => updateEntry(entry.id, editingEntry)}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.content}</p>
                <button onClick={() => deleteEntry(entry.id)}>Delete</button>
                <button onClick={() => setEditingEntry(entry)}>Update</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
//old app jsx code is follwing i replaced the follwing code by the above code:
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";

// const App = () => {
//   const [entries, setEntries] = useState([]);
//   const [newEntry, setNewEntry] = useState({ title: "", content: "" });

//   useEffect(() => {
//     fetchEntries();
//   }, []);

//   const fetchEntries = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/entries");
//       setEntries(response.data);
//     } catch (error) {
//       console.error("Error fetching entries:", error);
//     }
//   };

//   const addEntry = async () => {
//     try {
//       await axios.post("http://localhost:5000/entries", newEntry);
//       setNewEntry({ title: "", content: "" });
//       fetchEntries();
//     } catch (error) {
//       console.error("Error adding entry:", error);
//     }
//   };

//   const deleteEntry = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/entries/${id}`);
//       fetchEntries();
//     } catch (error) {
//       console.error("Error deleting entry:", error);
//     }
//   };

//   const updateEntry = async (id, updatedEntry) => {
//     try {
//       await axios.put(`http://localhost:5000/entries/${id}`, updatedEntry);
//       fetchEntries();
//     } catch (error) {
//       console.error("Error updating entry:", error);
//     }
//   };

//   return (
//     <div className="app">
//       <h1>Personal E-Diary</h1>

//       <div className="entry-form">
//         <input
//           type="text"
//           placeholder="Title"
//           value={newEntry.title}
//           onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
//           required
//         />
//         <textarea
//           placeholder="Content"
//           value={newEntry.content}
//           onChange={(e) =>
//             setNewEntry({ ...newEntry, content: e.target.value })
//           }
//           required
//         ></textarea>
//         <button onClick={addEntry}>Add Entry</button>
//       </div>

//       <div className="entry-list">
//         {entries.map((entry) => (
//           <div className="entry" key={entry.id}>
//             <h3>{entry.title}</h3>
//             <p>{entry.content}</p>
//             <button onClick={() => deleteEntry(entry.id)}>Delete</button>
//             <button
//               onClick={() =>
//                 updateEntry(entry.id, {
//                   title: "Updated Title",
//                   content: "Updated Content",
//                 })
//               }
//             >
//               Update
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default App;
