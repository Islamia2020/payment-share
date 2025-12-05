export const response = (success: boolean, message: string, data: any = null) => ({
  success,
  message,
  data,
});