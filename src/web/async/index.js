function getPage(url) {
  var subject;
  return Rx.Observable.create(function (observer) {
    if (!subject) {
      subject = new Rx.AsyncSubject();
      Rx.DOM.get(url).subscribe(subject);
    }
    return subject.subscribe(observer);
  });
}

function setContent(content) {
  document.querySelector('#content').innerHTML = content
}

var page = getPage('/earthquake/index.html')
page.subscribe(
  res => setContent(encodeURIComponent(res.response)),
  err => setContent(err)
)