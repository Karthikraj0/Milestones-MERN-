import { useEffect, useState } from "react";

export default function AdminEditMilestoneModal({ open, setOpen, milestone, onSave }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    if (open && milestone) {
      setTitle(milestone.title || "");
      setDueDate(milestone.dueDate || "");
      setAssignedTo(milestone.assignedTo || "");
    }
  }, [open, milestone]);

  if (!open) return null;

  const save = async () => {
    await onSave(milestone._id, {
      title,
      dueDate,
      assignedTo
    });
    setOpen(false);
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3 style={{ marginTop: 0, color: "#e5e7eb" }}>Edit Milestone</h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={input}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={input}
        />

        <input
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Assigned To"
          style={input}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button style={btnSoft} onClick={() => setOpen(false)}>
            Cancel
          </button>
          <button style={btnSave} onClick={save}>
            Save
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
  padding: 18
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

const btnSave = {
  padding: "9px 12px",
  borderRadius: 10,
  border: "1px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer"
};
