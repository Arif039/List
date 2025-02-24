

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./abi.json";

const CONTRACT_ADDRESS = "0x1833Cc303Db05D7d56FE2BEa8b2eaa045c6B8264";
const CONTRACT_ABI = abi.abi;

function Todolist({ signer }) {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [contract, setContract] = useState(null);

    useEffect(() => {
        if (signer) {
            const todoContract = new ethers.Contract(
                CONTRACT_ADDRESS,
                CONTRACT_ABI,
                signer
            );
            console.log("Contract initialized: ", todoContract);
            setContract(todoContract);
        }
    }, [signer]);

    useEffect(() => {
        if (contract) {
            loadTasks();
        }
    }, [contract]);

    useEffect(() => {
        console.log("Tasks state updated:", tasks);
    }, [tasks]);

    async function loadTasks() {
        if (contract) {
            try {
                const allTasks = await contract.getTasks();
                console.log("Loaded Tasks from Contract:", allTasks); // Add detailed log
                setTasks(allTasks);
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        }
    }

    async function createTask(e) {
        e.preventDefault();
        if (contract && newTask) {
            try {
                const tx = await contract.createTask(newTask);
                await tx.wait();
                console.log("Task created:", newTask);
                setNewTask("");
                loadTasks();
            } catch (error) {
                console.error("Error creating task:", error);
            }
        }
    }

    async function toggleTask(id) {
        if (contract) {
            try {
                const tx = await contract.toggleCompleted(id);
                await tx.wait();
                console.log("Task toggled:", id);
                loadTasks();
            } catch (error) {
                console.error("Error toggling task:", error);
            }
        }
    }

    return (
        <div>
            <h2>ToDo List</h2>
            <form onSubmit={createTask}>
                <input 
                    type="text" 
                    value={newTask} 
                    onChange={(e) => setNewTask(e.target.value)} 
                    placeholder="Add new task here"
                />
                <button type="submit">Add Task</button>
            </form>
            <ul>
                {tasks.length > 0 ? tasks.map((task) => {
                    console.log("Task Structure:", task); // Log the entire task object
                    return (
                        <li key={task.id.toString()}>
                            <input 
                                type="checkbox" 
                                checked={task.completed} 
                                onChange={() => toggleTask(task.id)}
                            />
                            <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                {task.contant} 
                                
                            </span>
                        </li>
                    );
                }) : <li>No tasks available</li>}
            </ul>
        </div>
    );
}

export default Todolist;
