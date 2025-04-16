import React from 'react';
import Modal from 'react-modal';
import { useState, useEffect } from 'react';

const ModalTask = ({ isOpen, onClose, save }) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({
        task: false,
        description: false
    });

    useEffect(() => {
        if (!isOpen) {
            setTaskName('');
            setDescription('');
            setErrors({ task: false, description: false });
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "task") {
            setTaskName(value);
            // Сбрасываем ошибку при вводе
            if (value.trim() !== '') {
                setErrors(prev => ({...prev, task: false}));
            }
        } else {
            setDescription(value);
            if (value.trim() !== '') {
                setErrors(prev => ({...prev, description: false}));
            }
        }
    }

    const handleSave = () => {
        const newErrors = {
            task: taskName.trim() === '',
            description: description.trim() === ''
        };
        
        setErrors(newErrors);
        
        if (newErrors.task || newErrors.description) {
            return;
        }
        
        let newTask = {
            Name: taskName,
            Description: description
        };
        
        save(newTask);
        
        // Очищаем поля после сохранения
        setTaskName('');
        setDescription('');
        setErrors({ task: false, description: false });
    }

    const isSubmitDisabled = taskName.trim() === '' || description.trim() === '';

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles} ariaHideApp={false}>
            <h2>Create new task</h2>
            <form className='taskForm'>
                <input 
                    type="text" 
                    placeholder="Task title" 
                    name='task' 
                    value={taskName} 
                    onChange={handleChange}
                    autoFocus
                    maxLength={25}
                />
                
                <textarea 
                    rows={7} 
                    placeholder='Task description' 
                    name='description' 
                    value={description} 
                    onChange={handleChange}
                    style={{ border: errors.description ? '2px solid red' : '1px solid #ccc', marginTop: '10px' }}
                ></textarea>
            </form>
            <button 
                className='submit' 
                onClick={handleSave}
                disabled={isSubmitDisabled}
                style={{ 
                    opacity: isSubmitDisabled ? 0.5 : 1,
                    cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
                    marginTop: '10px'
                }}
            >
                Submit
            </button>
            <button className='close' onClick={onClose} >Close</button>
        </Modal>
    );
};

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
}

export default ModalTask;