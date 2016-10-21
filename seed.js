const cheerio= require('cheerio');
const axios= require('axios');
console.log('hello');
axios.get('http://fit4maui.com/water/pu/bottled_ph.html').then(function(response) {
    //console.log(response.data);
    var $ = cheerio.load(response.data)
    //console.log($('table')[1].text());
    var table1= $($('table')[1])
    //console.log(table1);
    table1.find('tr').each(function(index, row) {
      console.log();
    })
  })
