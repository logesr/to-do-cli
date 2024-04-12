const filterByTaskType = {
  odd: (value) => value % 2 !== 0,
  even: (value) => value % 2 === 0,
  all: (value) => value,
};

module.exports = filterByTaskType;
