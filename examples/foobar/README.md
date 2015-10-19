## Simple example

This is a simple example of how to use ```cycle-vtree-switcher```.

### Usage

Just serve this directory with a web server. For example

```sh
python -m SimpleHTTPServer
```

### Structure

The entry point is ```index.js``` which gets browserified into ```bundle.js```. This example illustrates a route with no parameters, routes with a parameter, and a default route. The pages link to each other to demonstrate navigation among route handlers.
