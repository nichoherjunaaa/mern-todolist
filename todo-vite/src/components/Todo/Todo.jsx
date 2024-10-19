import React, { useEffect, useState } from 'react'
import './Todo.css'
import axios from 'axios';
const Todo = () => {
    const[todo, addTodo] = useState('');
    const[list, setList] = useState([])
    const [dueDate, setDate] = useState('');


    const endpoint = 'http://localhost:3004/todos';

    useEffect (() => {
            fetch(endpoint)
                .then(res => res.json())
                .then(data => setList(data))
                .catch(err => console.log(err));
    }, [])

    const addTodoList = (e) => {
        e.preventDefault();
        if(todo.trim() !== '' && dueDate.trim() !== '') {
            axios.post(endpoint, {
                todo : todo,
                dueDate : dueDate
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => setList([...list, res.data]))
            .catch(err => console.log(err))
            console.log(list);
            addTodo('');
            setDate('');
        }
    }

    const getDate = (e) => {
        setDate(e.target.value);
        console.log(dueDate);
        
    }

    const handleCheckBox = (index) => {
        const newList = [...list];
        newList[index].complete = !newList[index].complete;
        setList(newList);
        console.log(newList);
    }

const deleteTodo = async (index) => {
    const idsToDelete = list.filter(item => item.complete).map(item => item._id);
        
        // Jika ada ID yang akan dihapus, lakukan penghapusan
        if (idsToDelete.length > 0) {
            try {
                // Menggunakan Promise.all untuk menunggu semua permintaan selesai
                await Promise.all(idsToDelete.map(id => axios.delete(`${endpoint}/${id}`)));
                // Memperbarui daftar setelah penghapusan
                setList(list.filter(item => !item.complete));
                console.log("Items deleted successfully");
            } catch (err) {
                console.error("Error deleting todos:", err); // Menangani kesalahan
            }
        }
};


    return (
        <>
        <div className="container">
            <div className="header">
                <i className='fas fa-check-square'></i>
                <h1>Todo List</h1>
            </div>
            <div className="add-new">
                <div className="todo">
                    <input type="text" placeholder="Add New Todo" value={todo} onChange={(e) => addTodo(e.target.value)} />
                </div>
                <div className="deadline">
                    <input type="date" value={dueDate} onChange={getDate}/>
                </div>
                <div className="button-item">
                    <button onClick={addTodoList}>Add</button>
                    <button onClick={deleteTodo}>Delete</button>
                </div>
            </div>
            {/* <div className="filters">
                <label htmlFor="filter">Filter</label>
                <select name="" id="filter">
                    <option>All</option>
                </select>
                <label htmlFor="sort">Sort</label>
                <select name="" id="sort">
                    <option>Date</option>
                </select>
            </div> */}
            <ul className='todo-list'>
                <div className="todo-title">
                    <label htmlFor="" className='todo-input'>Todos</label>
                    <label htmlFor="" className='date-input'>Input Date</label>
                    <label htmlFor="" className='date-due'>Due Date</label>
                    <label htmlFor="" className='check'>Check</label>
                </div>
                {list.map((item, index) => (
                    <li key={item._id || index} className='todo-item'>
                            <label htmlFor="">{item.todo}</label>
                            <label htmlFor="">{new Date().toLocaleDateString()}</label>
                            <label htmlFor="">{item.dueDate}</label>
                        <input type="checkbox" name="" id="" onChange={() => handleCheckBox(index)} checked={item.complete || false} />
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default Todo