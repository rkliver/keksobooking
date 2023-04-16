const getRandomInt = (min,max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min < 0 || max < 0){
    return -1;
  }
  if (max < min){
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getRandonFloat = (min, max, decimals) => {
  if (min < 0 || max < 0){
    return -1;
  }
  if (max < min){
    [min, max] = [max, min];
  }
  return (Math.random() * (max - min) + min).toFixed(decimals);
};
