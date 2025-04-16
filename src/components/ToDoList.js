import React, { useEffect, useState } from 'react';
import ModalTask from './ModalTask';
import Card from './Card';

const generateId = () => Date.now() + Math.random().toString(36);

const ToDoList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskList, setTask] = useState([]);

    useEffect(() => {
        const list = localStorage.getItem("taskList");
        if (list) {
            setTask(JSON.parse(list));
        }
    }, []);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const saveTaskInList = (taskObj) => {
        const taskWithId = {
            ...taskObj,
            id: generateId() 
        };
        
        const newList = [...taskList, taskWithId];
        setTask(newList);
        localStorage.setItem("taskList", JSON.stringify(newList));
        setIsModalOpen(false);
    }

    const deleteTask = (id) => {
        const newList = taskList.filter(task => task.id !== id);
        setTask(newList);
        localStorage.setItem("taskList", JSON.stringify(newList));
    }

    const editTask = (updatedTask) => {
        const newList = taskList.map(task => task.id === updatedTask.id ? updatedTask : task);
        setTask(newList);
        localStorage.setItem("taskList", JSON.stringify(newList));
    }
    return (
        <>
            <div className='todoHeader'>
                <h3>To-do List</h3>
                <button onClick={openModal}>Create Task</button>
                <ModalTask isOpen={isModalOpen} onClose={closeModal} save={saveTaskInList} />
            </div>
            <div className='taskContainer'>
                {taskList.map((task) => (
                    <Card 
                        task={task} 
                        key={task.id}
                        deleteTask={deleteTask}
                        editTask = {editTask}
                    />
                ))}
            </div>
        </>
    );
};


export default ToDoList;