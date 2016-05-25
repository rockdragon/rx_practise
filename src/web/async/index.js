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
  document.querySelector('#content').value = content
}

var page = getPage('/earthquake/index.html')
page.subscribe(
  res => setContent(res.response),
  err => setContent(err)
)