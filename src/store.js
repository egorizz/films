export const addRate = (movieId, value) => {
  localStorage.setItem(String(movieId), value)
}
export const getRate = (movieId) => {
  return parseFloat(localStorage.getItem(String(movieId))) ?? 0
}
