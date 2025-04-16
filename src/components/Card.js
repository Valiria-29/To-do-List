import React, { useState, useEffect } from 'react';


const Card = ({ task, deleteTask, editTask }) => {
    
    const [isEditing, setIsUpdated] = useState(false);
    const [editedValues, setEditedValues] = useState({Name: task.Name, Description: task.Description});

    useEffect(() => {
        setEditedValues({
            Name: task.Name,
            Description: task.Description
        });
    }, [task]);

    const handleDelete = () => {
        deleteTask(task.id);
    }
    
    const handleEditToggle = () => {
       if (isEditing){
            editTask({
                ...task,
                Name: editedValues.Name,
                Description: editedValues.Description
            })
       }

       setIsUpdated(!isEditing);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className='taskCard'>
            {isEditing ? (
                <div className='editMode'>
                    <input
                        name='Name'
                        value={editedValues.Name}
                        onChange={handleInputChange}
                        className="editInput"
                        autoFocus 
                        maxLength={25}
                    />
                    <textarea
                        name='Description'
                        value={editedValues.Description}
                        onChange={handleInputChange}
                        className="editTextarea"
                    />
                </div>
            ) : (
                <div className='taskText'>
                    <h3>{task.Name}</h3>
                    <div>
                        <p>{task.Description}</p>
                    </div>
                </div>
            )}
            <div className='taskButton'>
                <button 
                    className={`svgButton ${isEditing ? 'save' : 'edit'}`}
                    onClick={handleEditToggle}
                />
                {!isEditing && (
                    <button 
                        className="svgButton delete" 
                        onClick={handleDelete}
                    />
                )}
            </div>
        </div>
    );
};


export default Card;