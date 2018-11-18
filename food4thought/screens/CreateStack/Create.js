import React, {Component} from 'react';
import { Button, Text, View, ScrollView } from "react-native";
import axios from "axios";
import CreateStyles from "../styles/CreateStack/CreateStyles.js";



// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://2f92c577.ngrok.io";
///////////////////////////////////////////////////////////////

// full page form
const Create = t.struct({
  recipeName: t.String,
  recipeDescription: t.String,
  timeToMake: t.Integer,
  diffcultyOfRecipe: t.Integer
  // ingredients will be added from another feature
  // instructions will be added from another feature
});

// just the ingredientsForm structure
const ingredientsForm = t.struct({
  foodType: t.String,
  quantity: t.Integer,
});

const optionsIngredients = {
  fields: {
    foodType: {
      error: "Please enter a valid food type"
    },
    quantity: {
      error: "Please enter a valid quantity",
    },
  },
}

// just the instructionsForm structure
const instructionsForm = t.struct({
  newStep: t.String,
});

const optionsInstructions = {
  fields: {
    newStep: {
      error: "Please enter valid instructions"
    },
  },
}


export default class CreateScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      form: { content: null},
      ingredients: [],
      instructions: [],
   };

   this.number = 1;
   this.handleSubmitIngredients = this.handleSubmitIngredients.bind(this);
   this.handleSubmitInstructions = this.handleSubmitInstructions.bind(this);
   this.handleDetails = this.handleDetails.bind(this);
  }

  redirect(page) {
    this.props.navigation.navigate(page)
  }

  handleSubmit = () => {
    const that = this;
    const details = this._form.getValue(); 
    const instructions = this._form1.getValue(); 
    const ingredients = this._form2.getValue(); 

    const finalForm = {
      //this will be the structure sent to the backend 
    };

    if(details && instructions && ingredients) {
      //send backend full form
    }
  }

  handleDetails = () => {
    const details = this._form.getValue(); 
  
    if(details) {
      this.setState({ 
        form: details,
        instructions: this.state.instructions,
        ingredients: this.state.ingredients, 
       });
    }
  }

  handleSubmitIngredients = () => {
    const value = this._form2.getValue();

    if(value) {
    const foodType = value.foodType;
    const quantity = value.quantity;
    this.setState({
      form: this.state.form, 
      instructions: this.state.instructions,
      ingredients: this.state.ingredients.concat([{ "foodType": foodType, "quantity": quantity}]) })
    }
  }

  handleSubmitInstructions = () => {
    const value = this._form1.getValue();
    
    if(value) {
      const step = value.newStep;      
      const num = this.number;
      this.setState({ 
        form: this.state.form, 
        ingredients: this.state.ingredients, 
        instructions: this.state.instructions.concat([{ "step": step, "stepNumber": num}]) })
      this.number++;
      }
  }

  handleFinalForm = () => {
    //get full form from state, manipulate to one object, and post to backend
    console.log(this.state);
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
          <View>
            <Button
              title="Update Details" 
              onPress={this.handleDetails}
            />  
          </View>
        </View>

        <View style={CreateStyles.ingredientsView}>
          <View style={CreateStyles.ingredientsForm}>
            <Form 
              ref={c => this._form2 = c}
              type={ingredientsForm}
              options={optionsIngredients}
            /> 
            <Button 
              title="Add Ingredient" 
              onPress={this.handleSubmitIngredients}
            />
          </View>
          <View style={CreateStyles.ingredientsList}>
            <ScrollView >
              {this.state.ingredients.map((ingredient, index) => <Text style={{ overflow: "hidden", }} key={index} >{ingredient.foodType} === {ingredient.quantity}</Text>)}
            </ScrollView>
          </View>
        </View>

        <View style={CreateStyles.instructionsView}>
          <View style={CreateStyles.instructionsForm}>
            <Form 
              ref={c => this._form1 = c}
              type={instructionsForm}
              options={optionsInstructions} 
            />
            <Button 
              title="Add Step" 
              onPress={this.handleSubmitInstructions}
            />
          </View>
          <View style={CreateStyles.instructionsList}>
            {this.state.instructions.map((step, index) => <Text key={index}> {step.stepNumber}. {step.step}</Text>)}
          </View>
        </View>
        
        <View>
          <Button
            title="Submit Recipe" 
            onPress={this.handleFinalForm}
          />
        </View>

          <View style={{width: "100%", height: 300}} />
        </ScrollView>

      </View>
    );
  }
}