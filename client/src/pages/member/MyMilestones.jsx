import { useEffect, useState } from "react";
import MilestoneTable from "../../components/milestones/MilestoneTable";
import { getMyMilestones, updateMilestone, submitMilestone } from "../../api/milestones";

export default function MyMilestones() {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    getMyMilestones().then(setMilestones);
    const interval = setInterval(() => {
      getMyMilestones().then(setMilestones);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const onSaveEdit = async (id, data) => {
    const updated = await updateMilestone(id, data);
    setMilestones((prev) => prev.map((m) => (m._id === id ? updated : m)));
  };

  const onSubmit = async (id) => {
    const updated = await submitMilestone(id);
    setMilestones((prev) => prev.map((m) => (m._id === id ? updated : m)));
  };

  return (
    <div style={{ padding: 22, maxWidth: 1100, margin: "0 auto" }}>
      <h2 style={{ margin: 0, fontSize: 22 }}>My Milestones</h2>
      <div style={{ marginTop: 6, color: "#6b7280", fontSize: 14 }}>
        Track your tasks and submit for admin review
      </div>

      <MilestoneTable milestones={milestones} mode="member" onSaveEdit={onSaveEdit} onSubmit={onSubmit} />
    </div>
  );
}
