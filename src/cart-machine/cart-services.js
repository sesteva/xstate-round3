export const cartServices = {
  pay: ctx => {
    const toResolveOrNot = (resolve, reject) =>
      Math.random() < 0.5 ? resolve : reject;
    return new Promise((resolve, reject) =>
      setTimeout(toResolveOrNot(resolve, reject), 2000)
    );
  }
};
