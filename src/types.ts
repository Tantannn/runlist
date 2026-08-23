/**
 * The data model. This file IS the spec — everything you build conforms to it.
 *
 * Firestore layout (all documents, no subcollections):
 *   users/{uid}/lists/{listId}
 *   users/{uid}/templates/{templateId}
 *   users/{uid}/runs/{runId}
 *
 * Items are embedded arrays rather than subcollections: one read per list
 * instead of one per task, and a checklist is never big enough to approach
 * Firestore's 1MB document limit.
 */

export type Id = string

/** ISO 8601 string. Stored as text so a document round-trips unchanged. */
export type Timestamp = string

// ---------------------------------------------------------------- todo lists

export interface Task {
  id: Id
  title: string
  done: boolean
  notes: string
  dueAt: Timestamp | null
  order: number
}

export interface TaskList {
  id: Id
  name: string
  color: string
  tasks: Task[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

// ------------------------------------------------------ repeatable checklists

export interface TemplateItem {
  id: Id
  title: string
  /** Optional second line — the "why" or a reminder. */
  hint: string
  order: number
}

/** The reusable definition. Editing this must never alter a past run. */
export interface ChecklistTemplate {
  id: Id
  name: string
  description: string
  items: TemplateItem[]
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface RunItem {
  id: Id
  title: string
  hint: string
  order: number
  done: boolean
}

/**
 * One pass through a template — today's pre-push check, yesterday's, the one
 * before that.
 *
 * Invariant: a run copies the template's items and name at creation time and
 * never reads the template again. Rename or delete a template and last week's
 * history still says what you actually ticked.
 */
export interface ChecklistRun {
  id: Id
  templateId: Id
  templateName: string
  items: RunItem[]
  startedAt: Timestamp
  completedAt: Timestamp | null
}

// ------------------------------------------------------------------- derived

export interface RunProgress {
  done: number
  total: number
  /** 0–1. Zero-item runs are complete, not divide-by-zero. */
  fraction: number
}
