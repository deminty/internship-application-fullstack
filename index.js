addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const urls = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
    .then((response) => response.json())

  const randomIndex = Math.round(Math.random())
  const url = urls.variants[randomIndex]
  const response = await fetch(url)
  return new HTMLRewriter()
    .on('title', new TitleHandler())
    .on('h1#title', new TitleHandler2())
    .on('p#description', new DescriptionHandler())
    .on('a#url', new URLHandler())
    .transform(response)
}

class TitleHandler {
  element(element) {
    return element.setInnerContent('My Application')
  }
}

class TitleHandler2 {
  element(element) {
    return element.prepend('My Masterpiece: ')
  }
}

class DescriptionHandler {
  element(element) {
    return element.setInnerContent('I did the thing.')
  }
}

class URLHandler {
  element(element) {
    return element
      .setInnerContent('Make your own Cloudflare Application!')
      .setAttribute('href', 'https://github.com/cloudflare-internship-2020?tab=repositories')
  }
}
