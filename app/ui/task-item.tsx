"use client";

import { useState } from "react";
import type { Task } from "../lib/tasks";
import {
  deleteTaskAction,
  toggleTaskAction,
  updateTaskAction,
} from "../actions";

export default function TaskItem({ task }: { task: Task }) {
  const [editing, setEditing] = useState(false);
  const completado = task.estado === "completado";

  if (editing) {
    return (
      <li className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <form
          action={async (formData: FormData) => {
            await updateTaskAction(formData);
            setEditing(false);
          }}
          className="flex flex-col gap-3"
        >
          <input type="hidden" name="id" value={task.id} />
          <input
            name="titulo"
            defaultValue={task.titulo}
            required
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
          <textarea
            name="descripcion"
            defaultValue={task.descripcion}
            rows={2}
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
          <select
            name="estado"
            defaultValue={task.estado}
            className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded border border-zinc-300 px-3 py-1.5 text-sm dark:border-zinc-700"
            >
              Cancelar
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="flex items-start justify-between gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-1 items-start gap-3">
        <form action={toggleTaskAction}>
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="estadoActual" value={task.estado} />
          <button
            type="submit"
            aria-label={completado ? "Marcar pendiente" : "Marcar completado"}
            className={`mt-1 h-5 w-5 rounded border ${
              completado
                ? "border-green-600 bg-green-600 text-white"
                : "border-zinc-400 bg-white dark:bg-zinc-950"
            }`}
          >
            {completado ? "✓" : ""}
          </button>
        </form>
        <div className="flex-1">
          <h3
            className={`font-medium ${
              completado
                ? "text-zinc-400 line-through"
                : "text-zinc-900 dark:text-zinc-50"
            }`}
          >
            {task.titulo}
          </h3>
          {task.descripcion && (
            <p
              className={`mt-1 text-sm ${
                completado
                  ? "text-zinc-400 line-through"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {task.descripcion}
            </p>
          )}
          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs ${
              completado
                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
            }`}
          >
            {task.estado}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="rounded border border-zinc-300 px-3 py-1 text-sm hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Editar
        </button>
        <form action={deleteTaskAction}>
          <input type="hidden" name="id" value={task.id} />
          <button
            type="submit"
            className="w-full rounded border border-red-300 px-3 py-1 text-sm text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/40"
          >
            Eliminar
          </button>
        </form>
      </div>
    </li>
  );
}
