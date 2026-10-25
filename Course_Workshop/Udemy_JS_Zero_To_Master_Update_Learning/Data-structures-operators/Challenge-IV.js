function cc(strList) {
  for (const [i, item] of strList.entries()) {
    let [firstStr, secondStr] = item.trim().toLowerCase().split('_');
    let finalStr = `${firstStr}${secondStr.replace(
      secondStr[0],
      secondStr[0].toUpperCase(),
    )}`;
    console.log(`${finalStr.padEnd(20, ' ')}${'✅'.repeat(i + 1)}`);
  }
}

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
document.querySelector('button').addEventListener('click', function () {
  const input = document.querySelector('textarea').value;
  const rows = input.split('\n');
  console.log(rows);

  cc(rows);
});
