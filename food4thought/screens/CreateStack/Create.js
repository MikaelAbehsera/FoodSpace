import React, {Component} from 'react';
import { Button, Text, View, ScrollView, Picker, AsyncStorage } from "react-native";
import axios from "axios";
import CreateStyles from "../styles/CreateStack/CreateStyles.js";

import CameraRollPicker from 'react-native-camera-roll-picker';




// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://424fb32d.ngrok.io";
///////////////////////////////////////////////////////////////

// full page form
const Create = t.struct({
  recipeName: t.String,
  recipeDescription: t.String,
  timeToMake: t.Integer,
  difficultyOfRecipe: t.Integer,
});


const createOptions = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

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
      category: "Greasy",
      avatarSource: null,
      file: null,
      recipeIMG: null
   };

   this.number = 1;
   this.handleSubmitIngredients = this.handleSubmitIngredients.bind(this);
   this.handleSubmitInstructions = this.handleSubmitInstructions.bind(this);
   this.handleDetails = this.handleDetails.bind(this);
  }

  static navigationOptions = {
    title: 'Create Recipe',
  };
  redirect(page) {
    this.props.navigation.navigate(page)
  }

  updateUser = (category) => {
    this.setState({ 
      category: category,
      instructions: this.state.instructions,
      ingredients: this.state.ingredients, 
      form: this.state.form
     })
  }

  handleDetails = () => {
    const details = this._form.getValue(); 
  
    axios.post((`${currentHostedLink}/upload`), this.state.file)
    .then(response => {
      // handle your response;
        if(details) {
          this.setState({ 
            form: details,
            category: this.state.category,
            instructions: this.state.instructions,
            ingredients: this.state.ingredients, 
            recipeIMG: response.recipeIMG
           });
        }
    }).catch(error => {
      // handle your error
    });

  }

  handleSubmitIngredients = () => {
    const value = this._form2.getValue();

    if(value) {
    const foodType = value.foodType;
    const quantity = value.quantity;
    this.setState({
      form: this.state.form, 
      instructions: this.state.instructions,
      category: this.state.category,
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
        category: this.state.category,
        instructions: this.state.instructions.concat([{ "step": step, "stepNumber": num}]) })
      this.number++;
      }
  }


  handleFinalForm = () => {
    const that = this;
    //get full form from state, manipulate to one object, and post to backend
    const fullForm = this.state;
    console.log(fullForm)
    console.log("===========================================================")
    
    AsyncStorage.getItem("sessionToken").then(
      (value) => {
        if(value) {
          fullForm["sessionToken"] = value;
        }
        console.log("session token (create page) ===> ", sessionToken);
      }
      ).then(() => {
        let validate = false;
        // post user information to backend /login route
        axios.post((`${currentHostedLink}/create`), fullForm)
        .then(function (response) {
          console.log("full form submit success ===> ", response.data.success);
          if(response.data.success) { 
            validate = true;
          }
        })
        .catch(function (error) {
          console.log(error);
        }).finally(function() { 
          console.log("VAIDATE ==> ", validate)
          if(validate) {
            that.props.screenProps.changePage("Search");
          }
        });
      });
    }
    
  selectedImage = () => {
    this.setState({file: images[0]});
  }


  render() {
    
    return (
      <View style={CreateStyles.container}>
        <View style={{width: "100%", height: 25, backgroundColor: "black"}} />
        <ScrollView style={CreateStyles.scrollContainer} >
        <View style={{width: "100%", height: 50}} />

        <View style={CreateStyles.scrollContainer}> 
            <View style={CreateStyles.catSelectorTextView}>
              <Text style={CreateStyles.catSelectorText} >Category Type</Text>
            </View>
            <View style={CreateStyles.catSelectorView}>
              <Picker selectedValue={this.state.category} onValueChange={this.updateUser} style={CreateStyles.catSelector}>
                <Picker.Item label="Greasy" value="Greasy" />
                <Picker.Item label="Health Nut" value="Health nut" />
                <Picker.Item label="Munchies" value="Munchies" />
              </Picker>
            </View>
          <Form 
            ref={c => this._form = c}
            type={Create}
            // options={CreateOptions} 
          />
          <View>
            <View>
              {/* PHOTO STUFF HERE

              give user acess to gallery
              user picks a picture
                => handleFileUpload
              show  picture on page for approval
                approval/submit button
                submit leads to post /upload 
                which returns a url link to be added to all details as "recipeIMG"
              
                NEED PHONE PERMISSION
              */}
              <CameraRollPicker
                callback={this.selectedImage.bind(this)} />





            </View>
            <View style={CreateStyles.detailSubmitButton} >
              <Button
                title="Update Details" 
                onPress={this.handleDetails}
              />  
            </View>
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
            color="#8EA604"
          />
        </View>

          <View style={{width: "100%", height: 300}} />
        </ScrollView>
        {this.props.screenProps.Nav}
      </View>
    );
  }
}