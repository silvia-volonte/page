const Input = require("./example.json"), fs = require("fs");
let Output = "";

const utils = {
  /**
   * @param {String} pagename
   */
  head: function(pagename, based) {
    return `<!DOCTYPE html>
<html>
  <head>
    <title>${pagename || "Home"}${Input.shared.htmlTitle}</title>
    <base id="base" />
    <meta name="viewport" content= "width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta property="og:title" content="${Input.shared.ogTitle}">
    <meta property="og:type" content="website">
    <meta property="og:description" content="${Input.shared.ogDescription}">
    <meta property="og:url" content="/">
    <meta property="og:image" content="/media/logo.png">
    <meta property="og:image:alt" content="${Input.shared.ogimageAlt}">
    <meta property="keywords" content="covid,coronavirus,tempobenspeso,tempo ben speso,casa,tempobenspesoonline,tempo ben speso online">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="shortcut icon" href="/media/logo.png" type="image/png">
  </head>
`},
/**
 * @param {String} name 
 */
  body: function(name) {
    let elements = [], _tempEl = "";
    Input.shared.list.forEach((el) => {
      if (el.cat.indexOf(name) != -1) {elements.push(el)}
    });
    elements.forEach((el, id) => {
      elements[id] = `<li id="${el.ref}"><a href="${el.href}">${el.text}</a>${el.warn ? ` <span class="btn btn-outline-warning">${el.warn}</span>` : `` }${el.info ? ` <span class="btn btn-outline-info">${el.info}</span>` : ``}<span class="btn invisible">Se vedi questo, allora probabilmente non riescia vedere neanche il resto del sito.</span></li>`;
    });
    elements.forEach((el) => {_tempEl += el + "\n"})
    elements = _tempEl;
    return `  <body>
    <h1>${Input["#" + name]}</h1>
    <ul>
      ${elements}
    </ul>
    <footer style='position: fixed; bottom: 0'>Realizzato da <a href="https://rubenverg.com">Ruben</a> &middot; <a href="https://github.com/tempobenspesoonline">Organizzazione</a> &middot; Powered by GitHub & Netlify &middot; <a href="/fonti">Fonti</a></footer>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  </body>
</html>`
  }
}

// Root

Output += utils.head(); //head

Output += `  <body>
    <h1 class="display-1">${Input["/"].title}</h1>
    <h1 class="display-2">${Input["/"].motto}</h1>
    <h1 class="display-3">${Input["/"].description}</h1>
    <h2>Categorie:</h2>
    <ul class="w-75 w-sm-50">
      <li class="list-group-item"><a href="/museo">${Input["#museo"]}</a></li>
      <li class="list-group-item"><a href="/divertimento">${Input["#divertimento"]}</a></li>
      <li class="list-group-item"><a href="/rivista">${Input["#rivista"]}</a></li>
      <li class="list-group-item"><a href="/libro">${Input["#libro"]}</a></li>
      <li class="list-group-item"><a href="/film">${Input["#film"]}</a></li>
      <li class="list-group-item"><a href="/audio">${Input["#audio"]}</a></li>
      <li class="list-group-item"><a href="/green">${Input["#green"]}</li></a>
    </ul>
    <footer style='position: fixed; bottom: 0'>Realizzato da <a href="https://rubenverg.com">Ruben</a> &middot; <a href="https://github.com/tempobenspesoonline">Organizzazione</a> &middot; Powered by GitHub & Netlify &middot; <a href="/fonti">Fonti</a></footer>
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  </body>
</html>`; //body

fs.writeFile("index.html", Output, (err) => {
  if (err) throw err;
  console.log("home done");
});

function child(name) {
  fs.mkdir(name, (err) => {if (err) console.log("Directory exists :", name, "(", ""+err, ")")});
  fs.writeFile(name + "/index.html", utils.head(Input.shared.htmlTitles[name]) + utils.body(name), (err) => {
    if (err) throw err;
  });
  console.log(name, "done")
}

child("museo");
child("divertimento");
child("rivista");
child("libro");
child("film");
child("audio");
child("green");