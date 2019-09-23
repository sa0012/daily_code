(function() {
  function* genDemo() {
    console.log("开始执行第 1 段");
    yield "generator 1";

    console.log("开始执行第 2 段");
    yield "generator 2";

    console.log("执行结束");
    return "generator 3";
  }

  console.log("main 0");
  let gen = genDemo(); // 此处不会打印 func 1 只有在执行 gen.next 时才会执行
  console.log(gen.next().value); // func1  generator 1
  console.log("main 1");
  console.log(gen.next().value);
  console.log("main 2");
  console.log(gen.next().value);
  console.log("main 3");
})();
