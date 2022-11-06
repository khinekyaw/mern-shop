export const calculateTotalPrice = data => {
  return data
    .reduce((prev, current) => current.price * current.amount + prev, 0)
    .toFixed(2)
}

export const calculateTotalAmount = data => {
  return data.reduce((prev, current) => current.amount + prev, 0)
}

export const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
