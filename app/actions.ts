"use server";

import { revalidatePath } from "next/cache";
import {
  insertTask,
  updateTaskById,
  deleteTaskById,
  TaskStatus,
} from "./lib/tasks";

function parseEstado(value: FormDataEntryValue | null): TaskStatus {
  return value === "completado" ? "completado" : "pendiente";
}

export async function createTaskAction(formData: FormData): Promise<void> {
  const titulo = String(formData.get("titulo") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim();
  const estado = parseEstado(formData.get("estado"));

  if (!titulo) return;

  await insertTask({ titulo, descripcion, estado });
  revalidatePath("/");
}

export async function updateTaskAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const titulo = String(formData.get("titulo") ?? "").trim();
  const descripcion = String(formData.get("descripcion") ?? "").trim();
  const estado = parseEstado(formData.get("estado"));

  if (!id || !titulo) return;

  await updateTaskById(id, { titulo, descripcion, estado });
  revalidatePath("/");
}

export async function toggleTaskAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  const estadoActual = String(formData.get("estadoActual") ?? "");
  const nuevoEstado: TaskStatus =
    estadoActual === "completado" ? "pendiente" : "completado";

  if (!id) return;

  await updateTaskById(id, { estado: nuevoEstado });
  revalidatePath("/");
}

export async function deleteTaskAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await deleteTaskById(id);
  revalidatePath("/");
}
