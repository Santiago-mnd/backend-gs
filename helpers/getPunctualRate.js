const weeklyRate = 0.07469166;

const getPunctualRate = (weeks) => {
  return weeks * weeklyRate;
};

module.exports = getPunctualRate;
