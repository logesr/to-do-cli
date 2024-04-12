const filterByTaskType = require('../config/constants');

class TodoList {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  showItemSummaries(limit, taskType) {
    const filteredItems = this.items.filter((item) => filterByTaskType[taskType](item.id)).splice(0, limit);
    filteredItems.forEach((item) => {
      console.log(item.summary());
    });
  }
}

module.exports = TodoList;
