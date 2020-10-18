export default {
  success: 'success',
  error: 'error',
  setSnackBarProps: (type: string) => {
    let color = ''
    if (type === 'success')
      color = '#37C77F'
    else if (type === 'error')
      color = '#FC2D2D'

    return {
      style: {
        backgroundColor: color,
        zIndex: 10
      }
    }
  }
}