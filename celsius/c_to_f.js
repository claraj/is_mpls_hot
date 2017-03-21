console.log()
console.log('       C     |     F   ')
console.log('   ---------------------')

for (var c = -20 ; c < 40 ; c+=5) {
  var f = Math.round( ( c * 9/5 ) + 32 )
  var cout = pad(c, 6)
  var fout = pad(f, 3)
  console.log('  ' + cout + '    |  ' + fout );
}

console.log()


function pad(c, len) {
  c = c.toString()
  while (c.length <= len) {
    c = ' ' + c;
  }
  return c;
}
