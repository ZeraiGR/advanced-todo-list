export const logErrorFromBoundary = (error: Error, info: React.ErrorInfo) => {
  console.log(error.message, info.componentStack);
};
