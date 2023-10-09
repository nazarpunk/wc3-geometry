document.querySelectorAll('a').forEach(a => {
    a.target = '_blank';
    const href = a.getAttribute('href');
    if (href.startsWith('#')) a.setAttribute('href', `/wc3-geometry${href}`)
})
