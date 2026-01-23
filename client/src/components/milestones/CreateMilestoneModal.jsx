import { useEffect, useState } from "react";

export default function CreateMilestoneModal({ open, setOpen, onCreate }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDueDate("");
      setAssignedTo("");
    }
  }, [open]);

  if (!open) return null;

  const handleCreate = async () => {
    if (!title || !dueDate || !assignedTo) return;
    await onCreate({ title, dueDate, assignedTo });
    setOpen(false);
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={{ marginTop: 0 }}>Create Milestone</h3>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={input}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={input}
        />

        <input
          placeholder="Assign to (employee id/name)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          style={input}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button style={btnSoft} onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button style={btnCreate} onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const modal = {
  width: 420,
  background: "#0b1220",
  border: "1px solid #374151",
  borderRadius: 14,
  padding: 18,
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
};

const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #374151",
  background: "transparent",
  color: "#e5e7eb",
  outline: "none",
  marginBottom: 12
};

const btnSoft = {
  padding: "9px 12px",
  borderRadius: 10,
  border: "1px solid #374151",
  background: "transparent",
  color: "#e5e7eb",
  fontWeight: 700,
  cursor: "pointer"
};

const btnCreate = {
  padding: "9px 12px",
  borderRadius: 10,
  border: "1px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer"
};
