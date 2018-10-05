const pageDetailActions = {
  update(pathname) {
    return {
      type: "PAGE_DETAILS_UPDATE",
      payload: pathname
    };
  }
};

export default pageDetailActions;