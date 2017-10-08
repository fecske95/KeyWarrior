class textloader {  
    constructor() {}
    
function getRandomText(cb) {
  var wikiApi = "https://en.wikipedia.org/w/api.php?action=query&titles=Google&prop=revisions&rvprop=content&format=json&callback=?";
  $.getJSON( wikiApi, {
    format: "json"
  })
    .done(function(data) {
      if (!data || !data.query || !data.query.pages || !Object.keys(data.query.pages)[0]) {
        alert("Can't get wiki content");
      } else {
        var page = data.query.pages[Object.keys(data.query.pages)[0]];
        var content = page.revisions[0]['*'];
        cb(content);
      }
    });
}
 
loadText(function (text) {
    currentText = text;
});