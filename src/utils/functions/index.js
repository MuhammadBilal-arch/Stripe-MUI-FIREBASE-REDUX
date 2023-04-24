

export const showToast = (message, type = TOAST_TYPE.info) => {
    switch (type) {
      case TOAST_TYPE.info:
        return toast.info(message, config);
  
      case TOAST_TYPE.success:
        return toast.success(message, config);
  
      case TOAST_TYPE.warning:
        return toast.warning(message, config);
  
      case TOAST_TYPE.error:
        return toast.error(message, config);
  
      default:
        return toast.info(message, config);
    }
  };