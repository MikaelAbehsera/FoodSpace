import React, {Component} from 'react';
import { Button, Text, View, ScrollView } from "react-native";
import CreateStyles from "../styles/CreateStack/CreateStyles.js";
import PropTypes from "prop-types";

// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;


const ingredientsForm = t.struct({
  foodType: t.String,
  quantity: t.Integer,
});

const options = {
  fields: {
    foodType: {
      error: "Please enter a valid food type"
    },
    quantity: {
      error: "Please enter a valid quantity",
    },
  },
}

export default class IngredientsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      ingredients: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit = () => {
    const value = this._form2.getValue();

    if(value) {
    const foodType = value.foodType;
    const quantity = value.quantity;
    console.log(this.state)
    this.setState({ ingredients: this.state.ingredients.concat([{ "foodType": foodType, "quantity": quantity}]) })
    }
  }
  
  render() {
    return (
      <View style={CreateStyles.ingredientsView}>
        <View style={CreateStyles.ingredientsForm}>
          <Form 
            ref={c => this._form2 = c}
            type={ingredientsForm}
            options={options}
          /> 
          <Button 
            title="Add Ingredient" 
            onPress={this.handleSubmit}
          />
        </View>
        <View style={CreateStyles.ingredientsList}>
        <ScrollView >
          {this.state.ingredients.map((ingredient, index) => <Text style={{ overflow: "hidden", }} key={index} >{ingredient.foodType} === {ingredient.quantity}</Text>)}
        </ScrollView>
        </View>
      </View>
    );
  }
}

IngredientsForm.propTypes = {
  giveForm: PropTypes.func
};