class TodoItem {
  constructor(item) {
    this.userId = item.userId;
    this.id = item.id;
    this.title = item.title;
    this.completed = item.completed;
  }

  summary() {
    return `${this.id} ${this.title} is ${this._getCompletionStatus()}`;
  }

  _getCompletionStatus() {
    return this.completed ? 'completed' : 'not completed';
  }
}

module.exports = TodoItem;
