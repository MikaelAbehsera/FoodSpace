import React, {Component} from 'react';
import { Button, Text, View, ScrollView } from "react-native";
import CreateStyles from "../styles/CreateStack/CreateStyles.js";
import PropTypes from "prop-types";

// Import tcomb form schema
import t from 'tcomb-form-native';
const Form = t.form.Form;


const instructionsForm = t.struct({
  newStep: t.String,
});

const options = {
  fields: {
    newStep: {
      error: "Please enter valid instructions"
    },
  },
}

export default class InstructionsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: []
    }
    this.number = 1;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = () => {
    const value = this._form1.getValue();
    
    if(value) {
      const step = value.newStep;      
      const num = this.number;
      console.log({ instructions: this.state.instructions.concat([{ "step": step, "number": num}]) })
      this.setState({ instructions: this.state.instructions.concat([{ "step": step, "number": num}]) })
      this.number++;
      }
  }

  render() {
    return (
      <View style={CreateStyles.instructionsView}>
        <View style={CreateStyles.instructionsForm}>
          <Form 
            ref={c => this._form1 = c}
            type={instructionsForm}
            options={options} 
          /> 
          <Button 
            title="Add Step" 
            onPress={this.handleSubmit}
          />
        </View>
        <View style={CreateStyles.instructionsList}>
          {this.state.instructions.map((step, index) => <Text key={index}> {step.number}. {step.step}</Text>)}
        </View>
      </View>
    );
  }
}

InstructionsForm.propTypes = {
  giveForm: PropTypes.func
};