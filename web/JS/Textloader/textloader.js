"use strict";
window.KeyWarrior = window.KeyWarrior || {};

class TextLoader {
  constructor() {}

  getRandomText(cb) {
    var wikiApi = "https://en.wikipedia.org/w/api.php?action=query&titles=Geoffrey_Lewis_(actor)&prop=revisions&rvprop=content&format=json&callback=?";
    $.getJSON(wikiApi, {
        format: "json"
      })
      .done(function (data) {
        if (!data || !data.query || !data.query.pages || !Object.keys(data.query.pages)[0]) {
          alert("Can't get wiki content");
        } else {
          var page = data.query.pages[Object.keys(data.query.pages)[0]];

          var content = page.revisions[0]['*'];

          var rawText = txtwiki.parseWikitext(content);
          rawText = rawText.replace(/<{1}[^<>]{1,}>{1}/g," ")

          console.log(rawText);

          cb(rawText);
        }
      });
  }
}

window.KeyWarrior.TextLoader = TextLoader;