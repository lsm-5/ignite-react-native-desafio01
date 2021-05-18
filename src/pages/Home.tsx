import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(newTaskTitle === '') return;

    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    setTasks(prevState => [...prevState, newTask])
  }

  function handleMarkTaskAsDone(id: number) {
    const tasksCurrent = [...tasks];
    const index = tasksCurrent.findIndex(item => item.id === id);

    if(index !== -1){
      tasksCurrent[index].done = !tasksCurrent[index].done;
    }

    setTasks(tasksCurrent);
  }

  function handleRemoveTask(id: number) {
    setTasks(prevState => prevState.filter(item => item.id !== id))
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}