const isFifteen = (birthday) => {
  let valid = true;
  const rightNow = new Date();
  const yearDiff = rightNow.getFullYear() - birthday.getFullYear();
  const monthDiff = rightNow.getMonth() - birthday.getMonth();
  const dayDiff = rightNow.getDate() - birthday.getDate();
  // Checking full years
  if (yearDiff < 15) {
    valid = false;
    //If full years is 15, checking months
  } else if (yearDiff === 15) {
    if (monthDiff < 0) {
      valid = false;
      //If months are the same, checking days
    } else if (monthDiff === 0) {
      if (dayDiff < 0) {
        valid = false;
      }
    }
  }
  return valid;
};

module.exports = isFifteen;
