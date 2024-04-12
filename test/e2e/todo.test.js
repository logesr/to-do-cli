const { listStatus } = require('../../src/handlers/todo');

describe('todo', () => {
  describe('listStatus', () => {
    let originalConsoleLog;

    beforeAll(() => {
      originalConsoleLog = console.log;
      console.log = jest.fn();
    });

    afterAll(() => {
      console.log = originalConsoleLog;
    });

    it('should print the summaries based on limit and task type', async () => {
      await listStatus(2, 'even');
      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenNthCalledWith(1, '2 quis ut nam facilis et officia qui is not completed');
      expect(console.log).toHaveBeenNthCalledWith(2, '4 et porro tempora is completed');
    });
  });
});
