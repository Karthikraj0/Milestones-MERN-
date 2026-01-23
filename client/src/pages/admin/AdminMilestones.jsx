import { useEffect, useState } from "react";
import MilestoneTable from "../../components/milestones/MilestoneTable";
import CreateMilestoneModal from "../../components/milestones/CreateMilestoneModal";
import {
  getAdminMilestones,
  approveMilestone,
  rejectMilestone,
  createAdminMilestone,
  deleteAdminMilestone,
  editAdminMilestone
} from "../../api/milestones";

export default function AdminMilestones() {
  const [milestones, setMilestones] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);

  const load = async () => {
    const data = await getAdminMilestones();
    setMilestones(data);
  };

  useEffect(() => {
    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  const onApprove = async (id) => {
    const updated = await approveMilestone(id);
    setMilestones((prev) => prev.map((m) => (m._id === id ? updated : m)));
  };

  const onReject = async (id, reason) => {
    const updated = await rejectMilestone(id, reason);
    setMilestones((prev) => prev.map((m) => (m._id === id ? updated : m)));
  };

  const onCreate = async (payload) => {
    const created = await createAdminMilestone(payload);
    setMilestones((prev) => [created, ...prev]);
  };

  const onDelete = async (id) => {
    await deleteAdminMilestone(id);
    setMilestones((prev) => prev.filter((m) => m._id !== id));
  };

  const onAdminEdit = async (id, payload) => {
    const updated = await editAdminMilestone(id, payload);
    setMilestones((prev) => prev.map((m) => (m._id === id ? updated : m)));
  };

  return (
    <div style={{ padding: 22, maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22 }}>Admin Milestones</h2>
          <div style={{ marginTop: 6, color: "#6b7280", fontSize: 14 }}>
            Review submissions and create new milestones
          </div>
        </div>

        <button style={btnNew} onClick={() => setOpenCreate(true)}>
          + New Milestone
        </button>
      </div>

      <MilestoneTable
        milestones={milestones}
        mode="admin"
        onApprove={onApprove}
        onReject={onReject}
        onDelete={onDelete}
        onAdminEdit={onAdminEdit}
      />

      <CreateMilestoneModal open={openCreate} setOpen={setOpenCreate} onCreate={onCreate} />
    </div>
  );
}

const btnNew = {
  padding: "10px 14px",
  borderRadius: 12,
  border: "1px solid #2563eb",
  background: "#2563eb",
  color: "#fff",
  fontWeight: 900,
  cursor: "pointer"
};
