// Mock data for now — replace with API data later
export const barChartData = [
  { name: "Form", value: 100 },
  { name: "Guidelines", value: 40 },
  { name: "Work Instructions", value: 85 },
  { name: "Procedure Manual", value: 20 },
];

export const pieChartData = [
  { name: "Form", value: 30, color: "#3B82F6" },
  { name: "Guidelines", value: 25, color: "#EC4899" },
  { name: "Work Instructions", value: 20, color: "#EAB308" },
  { name: "Procedure Manual", value: 25, color: "#22C55E" },
];

export const statCards = [
  {
    id: "audit-nonconformances",
    label: "Request for action",
    value: 5,
    sub: "Audit non-conformances",
    tone: "danger",
  },
  {
    id: "pending-doc-control",
    label: "Pending document control requests",
    value: 1,
    sub: "Awaiting document control approval",
    tone: "warning",
  },
  {
    id: "request-action-1",
    label: "Request for action",
    value: 121,
    sub: "",
    tone: "accent",
  },
  {
    id: "request-action-2",
    label: "Request for action",
    value: 121,
    sub: "",
    tone: "success",
  },
];