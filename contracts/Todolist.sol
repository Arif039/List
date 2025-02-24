// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Todolist {

    struct Task {
        uint id;
        string contant;
        bool completed;
    }

    mapping (address => Task []) private userTasks;

    function createTask (string memory _content) public {
        uint userId = userTasks[msg.sender].length;

        userTasks[msg.sender].push(Task(userId, _content, false));
    }

    function toggleCompleted(uint _id) public {
        require(_id < userTasks[msg.sender].length, "Task does not exist");

        userTasks[msg.sender][_id].completed = !userTasks[msg.sender][_id].completed;
    }

    function getTasks () public view returns (Task [] memory) {
        return userTasks[msg.sender];
    }
}
