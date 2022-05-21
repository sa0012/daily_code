function selfAsync (genFn) {
  return new Promise((resolve, reject) => {
    const gen = genFn();

    function step (nextFn) {
      let next;

      try {
        next = nextFn();
      } catch (err) {
        reject(err);
      }

      if (next.done) {
        resolve(next.value);
      }

      Promise.resolve(next.value)
        .then(v => {
          step(() => gen.next(v));
        }, e => {
          step(() => gen.throw(e));
        })
    }

    step(() => gen.next(undefined));
  })
}