export const storage = (key, selectedStorage) => {
  return {
    getItem: (name) => {
      const str = selectedStorage.getItem(name);
      if (!str) return null;
      const { state } = JSON.parse(str);
      return {
        state: {
          ...state,
          [key]: new Map(state[key]),
        },
      }
    },
    setItem: (name, newValue) => {
      const keyValueIterator = newValue?.state[key] && newValue?.state[key]?.entries()
      const keyValueArray = !keyValueIterator ? [] : Array.from(keyValueIterator)
      const str = JSON.stringify({
        state: {
          ...newValue.state,
          [key]: keyValueArray,
        },
      })
      selectedStorage.setItem(name, str)
    },
    removeItem: (name) => selectedStorage.removeItem(name),
  }
}
