import React, {Component} from 'react';
import { Button, Text, View, ScrollView } from "react-native";
import axios from "axios";
import CreateStyles from "../styles/CreateStack/CreateStyles.js";

// IMPORT InstructionsForm COMPONENT AND IngredientsForm COMPONENT
import InstructionsForm from "./CreateInstructions.js";
import IngredientsForm from "./CreateIngredient.js";

// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://2f92c577.ngrok.io";
///////////////////////////////////////////////////////////////

const Create = t.struct({
  recipeName: t.String,
  recipeDescription: t.String,
  timeToMake: t.Integer,
  diffcultyOfRecipe: t.Integer
  // ingredients will be added from another feature
  // instructions will be added from another feature
});

export default class CreateScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {form: { content: null} };
  }

  redirect(page) {
    this.props.navigation.navigate(page)
  }

  handleSubmit = () => {
    const that = this;
    const value = this._form.getValue(); // use that ref to get the form value
    // take value and add it to other forms to create on recipe form
    if(value) {
      this.setState({ form: value });
      console.log("state ==> ", this.state)
    }
  }

  _InstructionForm(form) {
    
  }

  _IngredientForm(form) {
    
  }

  // createRecipe = () => {
  //   let validate = false;
  //   // post user information to backend /login route
  //   axios.post((`${currentHostedLink}/create`), this.state)
  //   .then(function (response) {
  //     console.log("success ===> ", response.data.success);
  //     if(response.data.success) { 
  //       validate = true;
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   }).finally(function() {
  //     if(validate) {
  //       setTimeout(() => { that.redirect("List") }, 200);
  //     }
  //   });
  // }

  render() {
    

    return (
      <View style={CreateStyles.container}>
        <ScrollView style={CreateStyles.scrollContainer} >

        <View style={CreateStyles.scrollContainer}> 
          <Form 
            ref={c => this._form = c}
            type={Create}
            // options={options} 
          /> 
        </View>
          <IngredientsForm giveForm={this._IngredientForm}/>
          <InstructionsForm giveForm={this._InstructionForm}/>
        
        <View>
          <Button
            title="Submit Recipe" 
            onPress={this.handleSubmit}
          />
        </View>

          <View style={{width: "100%", height: 300}} />
        </ScrollView>

      </View>
    );
  }
}