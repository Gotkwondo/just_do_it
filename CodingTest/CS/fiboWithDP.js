let fiboData = [0];

const fibo = (n) => {
  if (n <= 2) {
    return 1;
  }
  if (!fiboData[n]) {
    fiboData[n] = fibo(n - 1) + fibo(n - 2);
  }
  return fiboData[n];
}

const fiboBU = (n) => {
  fiboData[0] = 0;
  fiboData[1] = 1;
  for (let i = 2; i <= n; i++){
    fiboData[i] = fiboData[i - 1] + fiboData[i - 2];
  }
  return fiboData[n];
} 