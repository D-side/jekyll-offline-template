# jekyll-offline-template

This is a bare-bones template for a website that caches itself to be available offline.

## Quick start

0. Create a repository with this template
1. Enable GitHub Pages
2. Enable HTTPS (otherwise offline capabilities will not work unless the site is on `localhost`)
3. Add some content by editing `index.md` or otherwise (this is [Jekyll](https://jekyllrb.com/) after all)

## Rationale

This is a very quick & dirty way to build a cheatsheet that can be accessed offline. Something that updates very infrequently, so responsiveness of the update mechanism isn't a priority; and hosted on an domain of its own so that it owns all of its resources *exclusively* (as far as browser security mechanisms are concerned; copyright may or may not still apply and is an entirely different topic).

## ⚠ Dumb caching

The caching strategy used here is rather primitive and has a few weird side-effects.

### Cache exclusivity

Its service worker, when activated, will purge any caches that it has access to and don't match its version. Using the same scope of caches elsewhere may result in interference. (I am not sure whether the scope is limited to a specific origin, domain or worker URL and I didn't test)

### Changes

Once you update the page, you may not see the changes immediately because the old worker may still be serving content from cache. There's a number of ways to defeat this:

#### Option 0: graceful update

This is how the website is supposed to update when published. Probably the least convenient, but works "organically", i. e. solely through user's actions.

1. Refresh the page to install the new worker version
2. Close all tabs that are using the old worker to let it terminate
3. Reopen the website after this

#### Option 1: incognito mode

1. Close all tabs of an existing incognito session in order to purge its state
2. Open the site in a new incognito session

#### Option 2: brute force

If your browser supports service workers, it most likely allows forcibly removing them.

Firefox and Chrome expose this function through an "Unregister" button on the "Application" tab in development tools.

#### Option 3: bypass the worker (Chrome only?)

Chrome has a checkbox on the "Application" tab of DevTools that says "Bypass for network". This prevents the worker from intercepting network requests, allowing the server to provide a current version on every refresh.

I've been unable to find the respective function in Firefox, though it might exist.

## Contributing

I will honestly be amazed if you decide to contribute to this project and will try my best to respond constructively as soon as I can.

## Acknowledgements

* [MDN: Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) is a nice introduction into building Service Workers.
