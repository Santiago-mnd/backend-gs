const weeklyRate = 0.0863833;

const getNormalRate = (weeks) => {
  return weeks * weeklyRate;
};

module.exports = getNormalRate;
