#!/usr/bin/env node

"use strict"

var stdin = process.stdin,
    stdout = process.stdout,
    inputChunks = [];

let version = process.argv[2];

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    let lines = chunk.split("\n");
    lines.forEach(line => {
      inputChunks.push(line);
    });
});

function* getLines() {
  console.log("in get lines")
  let counter = 0;
    for(let line of inputChunks) {
      let noray = /(^Raymond Loman|Prepare for the next|Bump up the version)/;
      if(!noray.test(line)) {

        let re = /(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}:\d{2}\+\d{2}:\d{2})\s(.*)/;
        if(re.test(line)) {
          let [_, year, month, day, timestamp, subject] = re.exec(line);
          if(counter == 0) {
            yield "."+version+" ("+day+"-"+month+"-"+year+")\n";
            counter++;
          }
          yield "* "+subject;
          console.log(subject);
          yield '\n';
        }
      }
    }
}

stdin.on('end', function () {

  console.log("ending ... ");

  for(let line of getLines()) {
    stdout.write(line);
  }
});
