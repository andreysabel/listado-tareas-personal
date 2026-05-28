import { listTasks } from "./lib/tasks";
import TaskForm from "./ui/task-form";
import TaskItem from "./ui/task-item";

export const dynamic = "force-dynamic";

export default async function Home() {
  const tasks = await listTasks();
  const pendientes = tasks.filter((t) => t.estado === "pendiente").length;
  const completadas = tasks.length - pendientes;

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 py-12 dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-6 px-6">
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold tracking-tight">
            Listado de tareas
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {pendientes} pendiente{pendientes === 1 ? "" : "s"} ·{" "}
            {completadas} completada{completadas === 1 ? "" : "s"}
          </p>
        </header>

        <TaskForm />

        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Tareas</h2>
          {tasks.length === 0 ? (
            <p className="rounded-lg border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700">
              No hay tareas todavía. Crea la primera arriba.
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
