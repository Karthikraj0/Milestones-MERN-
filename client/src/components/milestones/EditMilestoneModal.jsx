import { useEffect, useState } from "react";

export default function EditMilestoneModal({ open, setOpen, milestone, onSave }) {
  const [progress, setProgress] = useState(0);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (milestone) {
      setProgress(milestone.progress);
      setDueDate(milestone.dueDate);
    }
  }, [milestone]);

  if (!open || !milestone) return null;

  const save = () => {
    onSave(milestone._id, { progress, dueDate });
    setOpen(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)" }}>
      <div style={{ background: "#fff", width: 420, margin: "120px auto", padding: 20, borderRadius: 8 }}>
        <h3>Edit Milestone</h3>
        <p>{milestone.title}</p>

        <div style={{ marginTop: 10 }}>
          <label>Progress</label>
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>

        <div style={{ marginTop: 15 }}>
          <button onClick={save} style={{ marginRight: 10 }}>
            Save
          </button>
          <button onClick={() => setOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
