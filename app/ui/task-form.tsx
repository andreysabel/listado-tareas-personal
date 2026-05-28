"use client";

import { useRef } from "react";
import { createTaskAction } from "../actions";

export default function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData: FormData) => {
        await createTaskAction(formData);
        formRef.current?.reset();
      }}
      className="flex flex-col gap-3 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h2 className="text-lg font-semibold">Nueva tarea</h2>
      <input
        name="titulo"
        placeholder="Título"
        required
        className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
      />
      <textarea
        name="descripcion"
        placeholder="Descripción"
        rows={2}
        className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
      />
      <select
        name="estado"
        defaultValue="pendiente"
        className="rounded border border-zinc-300 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
      >
        <option value="pendiente">Pendiente</option>
        <option value="completado">Completado</option>
      </select>
      <button
        type="submit"
        className="rounded bg-zinc-900 px-3 py-2 font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
      >
        Añadir tarea
      </button>
    </form>
  );
}
