// Simple indicators implemented in pure JS

export function calcSMA(arr = [], period = 20) {
  if (!arr || arr.length < period) return null;
  const slice = arr.slice(-period);
  const sum = slice.reduce((s, v) => s + v, 0);
  return sum / period;
}

// RSI implementation: returns latest RSI value
export function calcRSI(prices = [], periods = 14) {
  if (!prices || prices.length < periods + 1) return 50;
  let gains = 0, losses = 0;
  for (let i = prices.length - periods; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }
  const avgGain = gains / periods;
  const avgLoss = losses / periods;
  if (avgLoss === 0) return 100;
  const rs = avgGain / avgLoss;
  const rsi = 100 - (100 / (1 + rs));
  return rsi;
}
