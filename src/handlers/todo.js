const callApi = require('../apiCaller/apiCaller');
const { todoItemSchema } = require('../schema/todo');
const ToDoList = require('../models/TodoList');
const ToDoItem = require('../models/TodoItem');

async function listStatus(limit, taskType) {
  try {
    const toDoListResponse = await callApi('get', 'https://jsonplaceholder.typicode.com/todos');
    if (toDoListResponse.length < 1) throw new Error('No ToDo items present');
    const toDoList = new ToDoList();
    toDoListResponse.map((toDo) => {
      if (todoItemSchema.validate(toDo).error) throw new Error('ToDo List response is not valid');
      toDoList.add(new ToDoItem(toDo));
    });
    toDoList.showItemSummaries(limit, taskType);
  } catch (e) {
    console.log(e.message);
    throw new Error('Listing status failed');
  }
}

module.exports = { listStatus };
