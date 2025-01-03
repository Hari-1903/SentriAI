export type ComplaintStatus = "todo" | "in_progress" | "completed" | "pending"
export type ComplaintPriority = "low" | "medium" | "high"
export type ComplaintType = "Bug" | "Feature" | "Documentation"

export interface Complaint {
  id: string
  title: string
  details: string
  type: ComplaintType
  status: ComplaintStatus
  priority: ComplaintPriority
  createdAt: string
  updatedAt: string
}
