#!/usr/bin/env node

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

stdin.on('end', function () {
  let counter = 0;
    inputChunks.forEach(line => {
      let noray = /(^Raymond Loman|Prepare for the next|Bump up the version)/;
      if(!noray.test(line)) {

        let re = /(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}:\d{2}\+\d{2}:\d{2})\s(.*)/;
        if(re.test(line)) {
          let [_, year, month, day, timestamp, subject] = re.exec(line);
          if(counter == 0) {
            stdout.write("."+version+" ("+day+"-"+month+"-"+year+")\n");
            counter++;
          }
          stdout.write("* "+subject);
          stdout.write('\n');
        }
      }
    });
});
