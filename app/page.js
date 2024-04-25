'use client'

import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function TaskScheduler() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskCycle, setTaskCycle] = useState("");
  const [taskSubject, setTaskSubject] = useState("");
  const [taskContent, setTaskContent] = useState("");
  const [taskPhase, setTaskPhase] = useState("");
  const [taskPriority, setTaskPriority] = useState("");
  const [taskStep, setTaskStep] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const handleCycleChange = (e) => {
    setTaskCycle(e.target.value);
  };

  const handleSubjectChange = (e) => {
    setTaskSubject(e.target.value);
  };

  const handleContentChange = (e) => {
    setTaskContent(e.target.value);
  };

  const handleTaskPhaseChange = (e) => {
    setTaskPhase(e.target.value);
  };

  const handleTaskPriorityChange = (e) => {
    setTaskPriority(e.target.value);
  };

  const handleTaskStepChange = (e) => {
    setTaskStep(e.target.value);
  };

  const handleTaskStatusChange = (e) => {
    setTaskStatus(e.target.value);
  };

  const handleTaskDeadlineChange = (e) => {
    setTaskDeadline(e.target.value);
  };

  const addTask = () => {
    if (taskDeadline === "") {
      alert("Please enter a task and select a valid deadline.");
      return;
    }

    const selectedDate = new Date(taskDeadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      alert("Please select a future date for the deadline.");
      return;
    }

    const newTask = {
      id: tasks.length + 1,
      cycle: taskCycle,
      subject: taskSubject,
      content: taskContent,
      phase: taskPhase,
      priority: taskPriority,
      step: taskStep,
      status: taskStatus,
      deadline: taskDeadline,
      done: false,
    };

    setTasks([...tasks, newTask]);

    setTaskCycle("")
    setTaskSubject("")
    setTaskContent("")
    setTaskPhase("");
    setTaskPriority("");
    setTaskStep("")
    setTaskStatus("")
    setTaskDeadline("");
  };

  const handleEditTask = (id) => {
    const taskToEdit = tasks.find((t) => t.id === id);;
    setTaskPriority(taskToEdit.priority);
    setTaskDeadline(taskToEdit.deadline);
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
  };

  const markDone = (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, done: true } : t
    );
    setTasks(updatedTasks);

    const completedTask = tasks.find((t) => t.id === id);
    if (completedTask) {
      setCompletedTasks([...completedTasks, completedTask]);
    }
  };

  const filteredTasks = tasks
    .filter((t) => !t.done)
    .filter((t) =>
      t.content.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .filter((t) => (filterPriority ? t.priority === filterPriority : true));

  return (
    <div className={styles.App}>
      <Head>
        <title></title>
      </Head>
      <header className={styles.taskHeader}>
        <h1>Gerenciador</h1>
      </header>
      <main>
        <div className={styles.taskForm}>
          <select
            className={styles.taskPrioritySelect}
            value={taskCycle}
            onChange={handleCycleChange}
          >
            <option value="" disabled hidden>Selecione o ciclo</option>
            <option value="Ciclo 1">Ciclo 1</option>
            <option value="Ciclo 2">Ciclo 2</option>
            <option value="Ciclo 3">Ciclo 3</option>
          </select>
        </div>
        <div className={styles.taskForm}>
          <select
            className={styles.taskPrioritySelect}
            value={taskSubject}
            onChange={handleSubjectChange}
          >
            <option value="" disabled hidden>Selecione a disciplina</option>
            <option value="Português">Português</option>
            <option value="Inglês">Inglês</option>
            <option value="Banco de Dados">Banco de Dados</option>
          </select>
          <select
            className={styles.taskPrioritySelect}
            value={taskContent}
            onChange={handleContentChange}
          >
            <option value="" disabled hidden>Selecione o conteúdo</option>
            <option value="Gramática">Gramática</option>
            <option value="Compreensão de Texto">Compreensão de Texto</option>
            <option value="Redação">Redação</option>
          </select>
          <select
            className={styles.taskPrioritySelect}
            value={taskContent}
            onChange={handleTaskPhaseChange}
          >
            <option value="" disabled hidden>Selecione a fase</option>
            <option value="Fase 1">Fase 1</option>
          </select>
        </div>
        <div className={styles.taskForm}>
          <select
            className={styles.taskPrioritySelect}
            value={taskPriority}
            onChange={handleTaskPriorityChange}
          >
            <option value="" disabled hidden>Selecione a prioridade</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
          <select
            className={styles.taskPrioritySelect}
            value={taskStep}
            onChange={handleTaskStepChange}
          >
            <option value="" disabled hidden>Selecione a etapa</option>
            <option value="Planejando">Planejando</option>
            <option value="Executando">Executando</option>
            <option value="Revisão">Revisão</option>
          </select>
          <select
            className={styles.taskPrioritySelect}
            value={taskStatus}
            onChange={handleTaskStatusChange}
          >
            <option value="" disabled hidden>Selecione o status</option>
            <option value="Pendente">Pendente</option>
            <option value="Em Progresso">Em Progresso</option>
          </select>
        </div>
        <div className={styles.taskForm}>
          <input
            type="date"
            className={styles.taskDeadlineInput}
            value={taskDeadline}
            onChange={handleTaskDeadlineChange}
          />
          <button className={styles.addTaskButton} onClick={addTask}>
            Adicionar
          </button>
        </div>
        <div className={styles.searchFilter}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Procurar conteúdo"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <select
            className={styles.filterPrioritySelect}
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">Todas as prioridades</option>
            <option value="Top">Alta</option>
            <option value="Middle">Média</option>
            <option value="Low">Baixa</option>
          </select>
        </div>
        <h2 className={styles.heading}>Conteúdos </h2>
        <div className={styles.taskList}>
          <table className={styles.taskTable}>
            <thead>
              <tr>
                <th>Ciclo</th>
                <th>Disciplina</th>
                <th>Conteúdo</th>
                <th>Fase</th>
                <th>Prioridade</th>
                <th>Etapa</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.cycle}</td>
                  <td>{t.subject}</td>
                  <td>{t.content}</td>
                  <td>{t.task}</td>
                  <td>{t.priority}</td>
                  <td>{t.step}</td>
                  <td>{t.status}</td>
                  <td>{t.deadline}</td>
                  <td>
                    {!t.done && (
                      <div className={styles.actions}>
                        <button
                          className={
                            styles.markDoneButton
                          }
                          onClick={() =>
                            markDone(t.id)
                          }
                        >
                          Finalizar
                        </button>
                        <button
                          className={
                            styles.editTaskButton
                          }
                          onClick={() =>
                            handleEditTask(t.id)
                          }
                        >
                          Editar
                        </button>
                        <button
                          className={
                            styles.deleteTaskButton
                          }
                          onClick={() =>
                            handleDeleteTask(t.id)
                          }
                        >
                          Deletar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.completedTaskList}>
          <h2 className={styles.completedHeading}>Conteúdos Finalizados</h2>
          <table className={styles.completedTable}>
            <thead>
              <tr>
                <th>Conteúdo</th>
                <th>Prioridade</th>
                <th>Deadline</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((ct) => (
                <tr key={ct.id}>
                  <td>{ct.content}</td>
                  <td>{ct.priority}</td>
                  <td>{ct.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
