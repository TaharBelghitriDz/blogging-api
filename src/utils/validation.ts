export const validateEmail = (email: string): boolean => {
  const regularExpression =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regularExpression.test(String(email).toLowerCase());
};

export const checkLikes = (like: string): boolean => {
  const likesTypeValues = ["like", "dislike", "love", "angry"];
  if (likesTypeValues.includes(like)) return true;
  return false;
};

export const checkName = (str: string) => {
  if (str.length > 30 || str.length < 5) return;
  var reg_name = /^[a-zA-Z\s]*$/;
  return reg_name.test(str);
};
