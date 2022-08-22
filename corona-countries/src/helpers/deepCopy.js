const deepCopy = obj => {
    switch (obj.constructor) {
      case Object:
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, deepCopy(value)]))
        break;
      case Array:
        return obj.map(value => deepCopy(value))
        break;

      default:
        return obj
        break;
    }
  }

  export default deepCopy