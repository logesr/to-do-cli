const TodoList = require('../../../src/models/TodoList');
const TodoItem = require('../../../src/models/TodoItem');

describe('TodoList', () => {
  let todoList;

  let originalConsoleLog;
  const todoItem1 = new TodoItem({
    userId: 123, id: 1, title: 'Task 1', completed: true,
  });
  const todoItem2 = new TodoItem({
    userId: 234, id: 2, title: 'Task 2', completed: false,
  });
  const todoItem3 = new TodoItem({
    userId: 456, id: 3, title: 'Task 3', completed: true,
  });

  beforeEach(() => {
    todoList = new TodoList();
    originalConsoleLog = console.log;
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = originalConsoleLog;
  });

  describe('add', () => {
    it('should add a new item to the list', () => {
      todoList.add(todoItem1);
      expect(todoList.items.length).toBe(1);
      expect(todoList.items[0]).toBe(todoItem1);
    });
  });

  describe('showItemSummaries', () => {
    it('should log item summaries for task type all and given limit', () => {
      todoList.add(todoItem1);
      todoList.add(todoItem2);
      todoList.add(todoItem3);

      todoList.showItemSummaries(2, 'all');

      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenNthCalledWith(1, '1 Task 1 is completed');
      expect(console.log).toHaveBeenNthCalledWith(2, '2 Task 2 is not completed');
    });
    it('should log item summaries for task type odd and given limit', () => {
      todoList.add(todoItem1);
      todoList.add(todoItem2);
      todoList.add(todoItem3);

      todoList.showItemSummaries(2, 'odd');

      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenNthCalledWith(1, '1 Task 1 is completed');
      expect(console.log).toHaveBeenNthCalledWith(2, '3 Task 3 is completed');
    });

    it('should log item summaries for task type even and given limit', () => {
      todoList.add(todoItem1);
      todoList.add(todoItem2);
      todoList.add(todoItem3);

      todoList.showItemSummaries(2, 'even');

      expect(console.log).toHaveBeenCalledTimes(1);
      expect(console.log).toHaveBeenNthCalledWith(1, '2 Task 2 is not completed');
    });
  });
});
