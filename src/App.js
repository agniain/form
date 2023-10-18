import React from 'react';
import FormElement from './components/FormElement';

export default class Form extends React.Component{
  render() {
    const headingStyle = {
      textAlign: 'center'
    };

    return (
      <div>
        <h2 style={headingStyle}>TUGAS FORM & VALIDATION</h2>
        <FormElement />
      </div>
    )
  }
}
