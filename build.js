const glob         = require('glob')
const Metalsmith   = require('metalsmith')
const layouts      = require('metalsmith-layouts')
const assets       = require('metalsmith-assets')
const markdown     = require('metalsmith-markdown')
const dataMarkdown = require('metalsmith-data-markdown')
const contentful   = require('contentful-metalsmith')
const debug        = require('metalsmith-debug');

const handlebars = require('handlebars')

// add custom helpers to handlebars
// https://github.com/superwolff/metalsmith-layouts/issues/63
//
// using the global handlebars instance
glob.sync('helpers/*.js').forEach((fileName) => {
  const helper = fileName.split('/').pop().replace('.js', '')

  handlebars.registerHelper(
    helper,
    require(`./${fileName}`)
  )
})

Metalsmith(__dirname)
  .source('src')
  .destination('build')
  .use(debug())
  .use(contentful({
    space_id: process.env.CTFL_SPACE_ID,
    access_token: process.env.CTFL_ACCESS_TOKEN
  }))
  .use(layouts({
    engine: 'handlebars',
    partials: 'partials'
  }))
  .use(assets({
    source: 'assets/',
    destination: 'assets/'
  }))
  //.use(markdown())
  //.use(dataMarkdown({
  //  removeAttributeAfterwards: true
  //}))
  .build(function(err) {
    if (err) { throw err; }
    console.log('Successfully build metalsmith')
  });
