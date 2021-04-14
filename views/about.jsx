const React = require('react');

const About = (props) => {
  return ( 
    <div>
      <main>
        <head>
          <nav>
            <a href="/">Welcome</a>
          </nav>
        </head>
      </main>
        <h1>
          {props.title}
        </h1>
    </div>
   );
}
 
module.exports = About;