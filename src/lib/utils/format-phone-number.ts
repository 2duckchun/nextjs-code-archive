export const formatPhoneNumber = (value: string) => {
  if (value.length === 11) {
    return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  } else if (value.length === 10) {
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  } else {
    return value
  }
}
