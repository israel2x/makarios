import React from 'react';

const EmailTemplate = ({ buttonUrl }) => (
  React.createElement("div", {
    style: {
      padding: '20px',
      backgroundColor: 'white',
      display: 'grid',
      justifyItems: 'center'
    }
  },
    React.createElement("span", {
      style: { textAlign: 'center' }
    }, "Haz click aqui para cambiar de contrase\xF1a \uD83D\uDC47\uD83C\uDFFB"),
    React.createElement("a", {
      href: buttonUrl,
      style: { margin: '10px auto' }
    },
      React.createElement("button", {
        style: {
          padding: '10px 20px',
          backgroundColor: '#125688',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}, "Cambiar contrase\xF1a")
    )
  )
);

export default EmailTemplate;