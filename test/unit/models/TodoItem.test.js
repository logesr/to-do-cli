const TodoItem = require('../../../src/models/TodoItem');

describe('TodoItem', () => {
  describe('constructor', () => {
    it('should initialize properties correctly', () => {
      const item = {
        userId: 123,
        id: 1,
        title: 'Test Todo',
        completed: false,
      };

      const todoItem = new TodoItem(item);

      expect(todoItem.userId).toBe(item.userId);
      expect(todoItem.id).toBe(item.id);
      expect(todoItem.title).toBe(item.title);
      expect(todoItem.completed).toBe(item.completed);
    });
  });

  describe('summary', () => {
    it('should return correct summary for completed item', () => {
      const item = {
        userId: 1,
        id: 123,
        title: 'Test Todo',
        completed: true,
      };

      const todoItem = new TodoItem(item);
      const summary = todoItem.summary();

      expect(summary).toBe('123 Test Todo is completed');
    });

    it('should return correct summary for not completed item', () => {
      const item = {
        userId: 1,
        id: 123,
        title: 'Test Todo',
        completed: false,
      };

      const todoItem = new TodoItem(item);
      const summary = todoItem.summary();

      expect(summary).toBe('123 Test Todo is not completed');
    });
  });
});
