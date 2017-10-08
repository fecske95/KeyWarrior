window.KeyWarrior = window.KeyWarrior || {};

class TextLoader {    
    constructor() {}
    
<<<<<<< HEAD
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
=======
/*
    GetRandomText() {
        document.getElementById('file') = function() {
            
            var file = this.files[0];
            
            var reader = new FileReader();
            reader.onload = function(progressEvent) {
                
                var lines = this.result.split('\n');
                var randomline = Math.floor((Math.random()*(lines.length - 1)) + 1);
                for (var line = 0; line < lines.length; line++) {
                    if (line === randomline) {
                        currentText = lines[line];
                    }
                }
            };
            reader.readAsText(file);
        };
    }
*/
    GetRandomText() {
        var rawfile = new XMLHttpRequest();
        var allText;
        rawfile.open("GET","Texts/Tesztszoveg.txt",false);
        rawfile.onreadystatechange = function() 
        {
            if (rawfile.readyState === 4)
                {
                    if (rawfile.status === 200 || rawfile.status == 0)
                        {
                            allText = rawfile.responseText;          
                        }
                }
        }
        rawfile.send(null);
        return allText;
    }
}

window.KeyWarrior.TextLoader = TextLoader;
>>>>>>> 56819571f3283c759e3519dbd420e8034aca2896
