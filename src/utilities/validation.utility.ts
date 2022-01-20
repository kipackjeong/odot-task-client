export const isEmpty = (data: any) => {
  if (typeof data === "string") {
    data = data.trim();
    if (data) {
      return true;
    }
    return false;
  }
};
