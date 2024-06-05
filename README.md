# pdfjoy

small toy utility to generate arbitrary length pdfs, filled with color

## example calls:

- /10 --> 10 pages, blank
- /#f878ff/ --> 1 page, single color
- /#f878ff-#f878ff-#f878ff/ --> 1 page, 3 color gradient
- /10/#f878ff-#f878ff-#f878ff/ --> 10 pages, 3 color gradient

## notes:
- https://colorkit.co/ has a nice, actually built-out suite of tools that is similar
- first time setting up node.js & express.js on my own, from scratch. express has been pretty easy to use, although:
- express won't allow '#' in routes
- pdfkit can stream directly to the http response (as opposed to saving to the server and serving that file)
