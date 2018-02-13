# Reportilizer
A really crappy interface for drawing boxes on a page, adding custom HTML/CSS to those boxes, mergin that custom HTML with JSON data using a templating language, and generating a PDF.  

It uses React for the basic structure and runs it inside of an Electron wrapper so that it can have access to the filesystem to store the generated PDF files. Electron may not be needed in the future if you can offload the PDF generation to a remote server.

You can store your JSON data in `/src/lib/fixture_data.js` and export a variable `fixture_data`. This will be customizable in the future.

The key components used to make this work are:

- `wkhtmltopdf` which takes a string of HTML and generates a PDF from it
- `juice` from Automattic which takes CSS and inlines it into a given blob of HTML to localize the styles
- `doT.js` is the javascript templating language used because it creates self executing functions that accept the data source at run time so the templates can be written and stored for later use
- And obviously react and electron.

# Development 
- `npm run start` to start the react dev server
- `npm run electron` to start the electron app

# Production
No idea, haven't gotten that far.

# TODOS
- So many to count
