import React, { Component } from "react";
import {
  Button,
  Text,
  View,
  ScrollView,
  Picker,
  AsyncStorage,
  Modal,
  Image
} from "react-native";
import axios from "axios";
import CreateStyles from "../styles/CreateStack/CreateStyles.js";

// Import tcomb form schema
import t from "tcomb-form-native";
const Form = t.form.Form;

///////////////// Ngrok Link ///////////////////////////////////
const currentHostedLink = "http://662c08a4.ngrok.io";
///////////////////////////////////////////////////////////////

// full page form
const Create = t.struct({
  recipeName: t.String,
  recipeDescription: t.String,
  timeToMake: t.Integer,
  difficultyOfRecipe: t.Integer,
  recipeUrl: t.maybe(t.String),
});

const createOptions = {
  fields: {
    recipeName: {
      maxLength: 60,
    },
    recipeDescription: {
      maxLength: 60,
    },
    timeToMake: {
      maxLength: 4,
    },
    difficultyOfRecipe: {
      maxLength: 4,
    },
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
      error: "Please enter a valid food type",
      maxLength: 30,
    },
    quantity: {
      error: "Please enter a valid quantity and measurement type",
      maxLength: 30,
    },
  },
};

// just the instructionsForm structure
const instructionsForm = t.struct({
  newStep: t.String,
});

const optionsInstructions = {
  fields: {
    newStep: {
      error: "Please enter valid instruction",
    },
  },
};

export default class CreateScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      form: {
        content: null,
      },
      ingredients: [],
      instructions: [],
      category: "Greasy",
      modalDetailsVisible: false,
      modalIngredientsVisible: false,
      modalInstructionsVisible: false,
      modalFinalVisible: false,
    };

    this.number = 1;
    this.handleSubmitIngredients = this.handleSubmitIngredients.bind(this);
    this.handleSubmitInstructions = this.handleSubmitInstructions.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
  }

  static navigationOptions = {
    title: "Create Recipe",
  };
  redirect(page) {
    this.props.navigation.navigate(page);
  }

  updateUser = category => {
    this.setState({
      category: category,
      instructions: this.state.instructions,
      ingredients: this.state.ingredients,
      form: this.state.form,
      recipeImg: this.state.recipeImg,
      modalDetailsVisible: this.state.modalDetailsVisible,
      modalIngredientsVisible: this.state.modalIngredientsVisible,
      modalInstructionsVisible: this.state.modalInstructionsVisible,
    });
  };

  handleDetails = () => {
    const details = this._form.getValue();
    console.log("DETAILS, DETAILS, DETAILS ===>", details)
    if (details) {
      const state = false;
      this.setState({
        form: details,
        category: this.state.category,
        instructions: this.state.instructions,
        ingredients: this.state.ingredients,
        modalDetailsVisible: this.state.modalDetailsVisible,
        modalIngredientsVisible: this.state.modalIngredientsVisible,
        modalInstructionsVisible: this.state.modalInstructionsVisible,
      }, ()=> { 
        console.log("CHANGIN PAGE CHANGIN PAGE ");
        this.showStep2(true)
      });
    }
  };

  handleSubmitIngredients = () => {
    const value = this._form2.getValue();

    if (value) {
      const foodType = value.foodType;
      const quantity = value.quantity;
      this.setState({
        form: this.state.form,
        instructions: this.state.instructions,
        category: this.state.category,
        ingredients: this.state.ingredients.concat([
          {
            foodType: foodType,
            quantity: quantity,
          },
        ]),
        modalDetailsVisible: this.state.modalDetailsVisible,
        modalIngredientsVisible: this.state.modalIngredientsVisible,
        modalInstructionsVisible: this.state.modalInstructionsVisible,
      });
    }
  };

  handleSubmitInstructions = () => {
    const value = this._form1.getValue();

    if (value) {
      const step = value.newStep;
      const num = this.number;
      this.setState({
        form: this.state.form,
        ingredients: this.state.ingredients,
        category: this.state.category,
        instructions: this.state.instructions.concat([
          {
            step: step,
            stepNumber: num,
          },
        ]),
        modalDetailsVisible: this.state.modalDetailsVisible,
        modalIngredientsVisible: this.state.modalIngredientsVisible,
        modalInstructionsVisible: this.state.modalInstructionsVisible,
      });
      this.number++;
    }
  };

  handleFinalForm = () => {
    const that = this;
    //get full form from state, manipulate to one object, and post to backend
    const fullForm = this.state;
    console.log("===========================================================");
    let sessionToken;
    AsyncStorage.getItem("sessionToken")
    .then(value => {
      if (value) {
        sessionToken = value;
        fullForm["sessionToken"] = value;
      }
      console.log("session token (create page) ===> ", sessionToken);
    })
    .then(() => {
      console.log("FULL FORM FULL FORM FULL FORM", fullForm);
        let validate = false;
        // post user information to backend /login route
        axios
          .post(`${currentHostedLink}/create`, fullForm)
          .then(function(response) {
            console.log(
              "full form submit success ===> ",
              response.data.success,
            );
            if (response.data.success) {
              validate = true;
            }
          })
          .catch(function(error) {
            console.log(error);
          })
          .finally(function() {
            console.log("VAIDATE ==> ", validate);
            if (validate) {
              that.props.screenProps.changePage("Search");
            }
          });
      });
  };

  showStep1 = (visible) => {
    this.setState({
      form: this.state.form,
      ingredients: this.state.ingredients,
      category: this.state.category,
      instructions: this.state.instructions,
      modalDetailsVisible: visible,
      modalIngredientsVisible: false,
      modalInstructionsVisible: false,
      modalFinalVisible: false,
    });
  }

  showStep2 = (visible) => {
    this.setState({
      form: this.state.form,
      ingredients: this.state.ingredients,
      category: this.state.category,
      instructions: this.state.instructions,
      modalDetailsVisible: false,
      modalIngredientsVisible: visible,
      modalInstructionsVisible: false,
      modalFinalVisible: false,
    });
  }

  showStep3 = (visible) => {
    this.setState({
      form: this.state.form,
      ingredients: this.state.ingredients,
      category: this.state.category,
      instructions: this.state.instructions,
      modalDetailsVisible: false,
      modalIngredientsVisible: false,
      modalInstructionsVisible: visible,
      modalFinalVisible: false,
    });
  }

  showStep4 = (visible) => {
    this.setState({
      form: this.state.form,
      ingredients: this.state.ingredients,
      category: this.state.category,
      instructions: this.state.instructions,
      modalDetailsVisible: false,
      modalIngredientsVisible: false,
      modalInstructionsVisible: false,
      modalFinalVisible: visible,
    });
  }

  render() {
    return (
      <View style={CreateStyles.container}>
        <View style={{ position: "absolute", width: "90%",height: "100%",backgroundColor: "rgba(248, 82, 96, 1)",zIndex: -10, borderLeftWidth: 0.7, borderRightWidth: 0.7,}} />
        <View
          style={{
            width: "100%",
            height: 25,
            backgroundColor: "black",
          }}
        />
        <ScrollView style={CreateStyles.scrollContainer}>
          <View
            style={{
              width: "100%",
              height: 50,
            }}
          />
          <View style={{width: "90%", alignSelf: "center",}} >
            <Text style={{fontSize: 50, fontWeight: "600", alignSelf: "center"}} >Create A Recipe</Text>
            <Image source={require("../materials/rat.png")} style={{}} />
            <Button title="Start" onPress={()=>this.showStep1(true)} />
          </View>

          {/* <View style={CreateStyles.scrollContainer}> */}
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalDetailsVisible}
          onRequestClose={() => {console.log("CLOSED MODAL DETAILS")}}>
          <View style={{alignSelf: "center", width: "90%",height: "100%",backgroundColor: "rgba(248, 82, 96, 1)",zIndex: -10, borderLeftWidth: 0.7, borderRightWidth: 0.7,}} >
            <View style={CreateStyles.catSelectorTextView}>
              <Text style={CreateStyles.catSelectorText}> Category Type </Text>
            </View>
            <View style={CreateStyles.catSelectorView}>
              <Picker
                selectedValue={this.state.category}
                onValueChange={this.updateUser}
                style={CreateStyles.catSelector}
              >
                <Picker.Item label="Greasy" value="Greasy" />
                <Picker.Item label="Health Nut" value="Health nut" />
                <Picker.Item label="Munchies" value="Munchies" />
              </Picker>
            </View>
            <Form
              ref={c => (this._form = c)}
              type={Create}
              options={createOptions}
            />
            <View>
              <View />
              <View style={CreateStyles.detailSubmitButton}>
                <Button title="Update Details" onPress={this.handleDetails} />
              </View>
            </View>
            </View>
            </Modal>
          {/* </View> */}


          <Modal

          animationType="slide"
          transparent={false}
          visible={this.state.modalIngredientsVisible}
          onRequestClose={() => {console.log("CLOSED MODAL INGREDIENTS")}}>
          <View style={{alignSelf: "center", width: "90%",height: "100%",backgroundColor: "rgba(248, 82, 96, 1)",zIndex: -10, borderLeftWidth: 0.7, borderRightWidth: 0.7,}} >
          <View style={CreateStyles.ingredientsView}>
            <View style={CreateStyles.ingredientsForm}>
              <Form
                ref={c => (this._form2 = c)}
                type={ingredientsForm}
                options={optionsIngredients}
              />
              <Button
                title="Add Ingredient"
                onPress={this.handleSubmitIngredients}
              />
            </View>
            <View style={CreateStyles.ingredientsList}>
              <ScrollView>
                {this.state.ingredients.map((ingredient, index) => (
                  <Text
                    style={{
                      marginLeft: 15,
                      overflow: "hidden",
                    }}
                    key={index}
                  >
                    {ingredient.foodType} x {ingredient.quantity}
                  </Text>
                ))}
              </ScrollView>
            </View>
          </View>
          <Button
              title="Instructions Form"
              onPress={()=>this.showStep3(true)}
              color="black"
            />
          </View>
          </Modal>


          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalInstructionsVisible}
          onRequestClose={() => {console.log("CLOSED MODAL INSTRUCTIONS")}}>
          <View style={{alignSelf: "center", width: "90%",height: "100%",backgroundColor: "rgba(248, 82, 96, 1)",zIndex: -10, borderLeftWidth: 0.7, borderRightWidth: 0.7,}} >
          <View style={CreateStyles.instructionsView}>
            <View style={CreateStyles.instructionsForm}>
              <Form
                ref={c => (this._form1 = c)}
                type={instructionsForm}
                options={optionsInstructions}
              />
              <Button
                title="Add Step"
                onPress={this.handleSubmitInstructions}
              />
            </View>
            <View style={CreateStyles.instructionsList}>
              {this.state.instructions.map((step, index) => (
                <Text key={index}>
                  {step.stepNumber}. {step.step}
                </Text>
              ))}
            </View>
          </View>
          <View>
            <Button
              title="Submit Page"
              onPress={()=>this.showStep4(true)}
              color="black"
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 300,
            }}
          />
            </View>
          </Modal>

          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalFinalVisible}
          onRequestClose={() => {console.log("CLOSED MODAL Final")}}>
          <View style={{alignSelf: "center", width: "90%",height: "100%",backgroundColor: "rgba(248, 82, 96, 1)",zIndex: -10, borderLeftWidth: 0.7, borderRightWidth: 0.7,}} >
            <Button
                title="Submit Recipe"
                onPress={this.handleFinalForm}
                color="#8EA604"
              />
          </View>
          </Modal>


        </ScrollView>
        {this.props.screenProps.Nav}
      </View>
    );
  }
}
