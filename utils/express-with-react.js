var React = require('react');
var ReactDOMServer = require('react-dom/server');
var assign = require('object-assign');
var _escaperegexp = require('lodash.escaperegexp');

var DEFAULT_OPTIONS = {
  doctype: '<!DOCTYPE html>',
  transformViews: true,
  babel: {
    presets: [
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
    plugins: ['@babel/transform-flow-strip-types'],
  },
};

function createEngine(engineOptions) {
  var registered = false;
  var moduleDetectRegEx;

  engineOptions = assign({}, DEFAULT_OPTIONS, engineOptions || {});

  function renderFile(filename, options, cb) {
    if (!moduleDetectRegEx) {
      moduleDetectRegEx = new RegExp(
        []
          .concat(options.settings.views)
          .map(viewPath => '^' + _escaperegexp(viewPath))
          .join('|')
      );
    }

    if (engineOptions.transformViews && !registered) {
        require('@babel/register')(
          assign({only: [].concat(options.settings.views)}, engineOptions.babel)
        );
        registered = true;
    }

    try {
      var markup = engineOptions.doctype;
      var component = require(filename);
      component = component.default || component;
      markup += ReactDOMServer.renderToStaticMarkup(
        React.createElement(component, options)
      );
    } catch (e) {
      return cb(e);
    } finally {
      if (options.settings.env === 'development') {
        Object.keys(require.cache).forEach(function(module) {
          if (moduleDetectRegEx.test(require.cache[module].filename)) {
            delete require.cache[module];
          }
        });
      }
    }

    if (engineOptions.beautify) {
      // NOTE: This will screw up some things where whitespace is important, and be
      // subtly different than prod.
      markup = beautifyHTML(markup);
    }

    cb(null, markup);
  }

  return renderFile;
}

exports.createEngine = createEngine;
