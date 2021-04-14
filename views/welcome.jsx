const React = require('react');

const Welcome = (props) => {
  return ( 
    <div>
      <main>
        <head>
          <nav>
            <a href="/about">About</a>
          </nav>
        </head>
      </main>
        <h1>
          {props.title}
        </h1>
    </div>
   );
}
 
module.exports = Welcome;