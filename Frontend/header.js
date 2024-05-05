const template = document.createElement('template');
template.innerHTML = `
<header>

<div class="header-top">
  <h2 class="head-logo">Library Management</h2>
  <ul class="head-list">
    <a href="/Frontend/index.html"> <li class="list-ele">Home</li></a>
    <a href="/Frontend/books.html"> <li class="list-ele">Books</li></a>
    <a href="/Frontend/management.html"> <li class="list-ele">Management </li></a>
    <a href="/Frontend/addmanagement.html"> <li class="list-ele">Add management</li></a>
    <a href="/Frontend/about.html"> <li class="list-ele">About</li></a>
  </ul>
</div>
</header>
`
document.body.appendChild(template.content);