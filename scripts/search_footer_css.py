for f in ['public/_nuxt/shreeyog-projects.css', 'public/_nuxt/shreeyog-footer.css', 'public/_nuxt/MainFooter.8675ce94.css']:
    with open(f, 'r', encoding='utf-8') as fp:
        c = fp.read()
    print(f'=== {f} ===')
    for term in ['footer', 'page-footer', 'places', 'objects', 'operating', 'underlay']:
        count = c.count(term)
        if count > 0:
            print(f'  {term}: {count} occurrences')
