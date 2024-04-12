const { listStatus } = require('../../../src/handlers/todo');
const callApi = require('../../../src/apiCaller/apiCaller');
const ToDoList = require('../../../src/models/TodoList');
const ToDoItem = require('../../../src/models/TodoItem');

jest.mock('../../../src/apiCaller/apiCaller');
jest.mock('../../../src/models/ToDoList');
jest.mock('../../../src/models/ToDoItem');

describe('listStatus', () => {
  let originalConsoleLog;

  beforeAll(() => {
    originalConsoleLog = console.log;
    console.log = jest.fn();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error when the call api is failed', async () => {
    callApi.mockRejectedValue(new Error('Error in api call'));
    try {
      await listStatus(5, 'all');
    } catch (err) {
      expect(console.log).toBeCalledWith('Error in api call');
      expect(err.message).toBe('Listing status failed');
    }
  });

  it('should throw an error when the todo list is empty', async () => {
    const mockToDoListResponse = [];

    callApi.mockResolvedValue(mockToDoListResponse);
    try {
      await listStatus(5, 'all');
    } catch (err) {
      expect(console.log).toBeCalledWith('No ToDo items present');
      expect(err.message).toBe('Listing status failed');
    }
  });

  it('should throw an error when the todo schema does not match', async () => {
    const mockToDoListResponse = [
      { id: 1, title: 'Task 1', completed: true },
      { id: 2, title: 'Task 2', completed: false },
    ];

    callApi.mockResolvedValue(mockToDoListResponse);
    try {
      await listStatus(5, 'all');
    } catch (err) {
      expect(console.log).toBeCalledWith('ToDo List response is not valid');
      expect(err.message).toBe('Listing status failed');
    }
  });

  it('should process to print the summaries of todo items properly', async () => {
    const mockToDoListResponse = [
      {
        userId: 100, id: 1, title: 'Task 1', completed: true,
      },
      {
        userId: 200, id: 2, title: 'Task 2', completed: false,
      },
    ];

    callApi.mockResolvedValue(mockToDoListResponse);

    const mockToDoListInstance = {
      add: jest.fn(),
      showItemSummaries: jest.fn(),
    };
    ToDoList.mockImplementation(() => mockToDoListInstance);

    const mockToDoItemInstance = {};
    ToDoItem.mockImplementation(() => mockToDoItemInstance);

    await listStatus(2, 'all');

    expect(callApi).toHaveBeenCalledWith('get', 'https://jsonplaceholder.typicode.com/todos');
    expect(mockToDoListInstance.add).toHaveBeenCalledTimes(2);
    expect(mockToDoListInstance.showItemSummaries).toHaveBeenCalledWith(2, 'all');
  });
});
