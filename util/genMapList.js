const maps = require('./maps.json').maps;
const R = require('ramda');
const fs = require('fs');



const getter = (val, idx) => {
  return {
    id: idx,
    text: val
  };
}
const mapIndexed = R.addIndex(R.map);
const list = mapIndexed(getter, maps);


console.log(list);

fs.writeFileSync('./formattedMapList.json', JSON.stringify(list));
