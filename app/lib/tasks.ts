import { ObjectId, Collection } from "mongodb";
import { getDb } from "./mongodb";

export type TaskStatus = "pendiente" | "completado";

export interface TaskDoc {
  _id: ObjectId;
  titulo: string;
  descripcion: string;
  estado: TaskStatus;
  creadoEn: Date;
}

export interface Task {
  id: string;
  titulo: string;
  descripcion: string;
  estado: TaskStatus;
  creadoEn: string;
}

async function tasksCollection(): Promise<Collection<TaskDoc>> {
  const db = await getDb();
  return db.collection<TaskDoc>("tareas");
}

function serialize(doc: TaskDoc): Task {
  return {
    id: doc._id.toHexString(),
    titulo: doc.titulo,
    descripcion: doc.descripcion,
    estado: doc.estado,
    creadoEn: doc.creadoEn.toISOString(),
  };
}

export async function listTasks(): Promise<Task[]> {
  const col = await tasksCollection();
  const docs = await col.find({}).sort({ creadoEn: -1 }).toArray();
  return docs.map(serialize);
}

export async function insertTask(input: {
  titulo: string;
  descripcion: string;
  estado: TaskStatus;
}): Promise<void> {
  const col = await tasksCollection();
  await col.insertOne({
    _id: new ObjectId(),
    titulo: input.titulo,
    descripcion: input.descripcion,
    estado: input.estado,
    creadoEn: new Date(),
  });
}

export async function updateTaskById(
  id: string,
  patch: Partial<Pick<TaskDoc, "titulo" | "descripcion" | "estado">>,
): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await tasksCollection();
  await col.updateOne({ _id: new ObjectId(id) }, { $set: patch });
}

export async function deleteTaskById(id: string): Promise<void> {
  if (!ObjectId.isValid(id)) return;
  const col = await tasksCollection();
  await col.deleteOne({ _id: new ObjectId(id) });
}
