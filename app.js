function* getNumbers() {
  for(let i = 0;i<10;i++) {
    yield 
  }
}

for(let n of getNumbers()) {
  console.log(n);
}
