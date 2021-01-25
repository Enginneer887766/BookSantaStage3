import React from "react";
import db from "./config";
import firebase from "firebase";
import SantaAnimation from "../components/santaClass";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      isModalVisible: false,
      username: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      Address: "",
      mobileNumber: "",
    };
  }

  userSignUp = async (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("Password does not match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(emailId, password)
        .then(() => {
          db.collection("Users").add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            mobileNumber: this.state.mobileNumber,
            userName: this.state.username,
            Address: this.state.Address,
            emailId: this.state.emailId,
          });
          return Alert.alert("User Added Successfully", "", [
            {
              text: "ok",
              onPress: () => {
                this.setState({
                  isModalVisible: false,
                });
              },
            },
          ]);
        })

        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    }
  };
  userLogin = async (emailId, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailId, password)
      .then(
        (() => {
         // return Alert.alert("User Added Successfully");
         this.props.navigation.navigate('Donate')
        })
      )
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  showModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.modalContainer}>
          <ScrollView>
            <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
              <Text style={styles.modalTitle}>Registration</Text>
              <TextInput
                style={styles.formTextInput}
                placeholder={"First Name"}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                  });
                }}
              ></TextInput>

              <TextInput
                style={styles.formTextInput}
                placeholder={"Last Name"}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                  });
                }}
              ></TextInput>

              <TextInput
                style={styles.formTextInput}
                placeholder={"Mobile Number"}
                maxLength={10}
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.setState({
                    mobileNumber: text,
                  });
                }}
              ></TextInput>
              <TextInput
                style={styles.formTextInput}
                placeholder={"Address"}
                maxLength={25}
                multiline={true}
                onChangeText={(text) => {
                  this.setState({
                    Address: text,
                  });
                }}
              ></TextInput>

              <TextInput
                style={styles.formTextInput}
                placeholder={"User Name"}
                maxLength={15}
                onChangeText={(text) => {
                  this.setState({
                    username: text,
                  });
                }}
              ></TextInput>

              <TextInput
                style={styles.formTextInput}
                placeholder={"Email ID"}
                maxLength={45}
                keyboardType={"email-address"}
                onChangeText={(text) => {
                  this.setState({
                    emailId: text,
                  });
                }}
              ></TextInput>

              <TextInput
                style={styles.formTextInput}
                placeholder={"Enter Password"}
                maxLength={15}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    password: text,
                  });
                }}
              ></TextInput>

              <TextInput
                style={styles.formTextInput}
                placeholder={"Confirm Password"}
                maxLength={15}
                secureTextEntry={true}
                onChangeText={(text) => {
                  this.setState({
                    confirmPassword: text,
                  });
                }}
              ></TextInput>
              <View>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() => {
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    );
                  }}
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>

              <View>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    this.setState({
                      isModalVisible: false,
                    });
                  }}
                >
                  <Text style={{ color: "#ff5722" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
        
      <View style={styles.container}>
          <View>
              
              </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {this.showModal()}{" "}
        </View>

        <Text
          style={{
            fontSize: 65,
            fontWeight: "300",
            paddingBottom: 30,
            color: "#ff3d00",
          }}
        >
          Book Santa
        </Text>
        <View>
          <TextInput
            style={styles.loginBox}
            placeholder="abc@gmail.com"
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          ></TextInput>
          <TextInput
            style={styles.loginBox}
            secureTextEntry={true}
            placeholder="Enter Password"
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          ></TextInput>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.login}
              onPress={() => {
                this.userLogin(this.state.emailId, this.state.password);
              }}
            >
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.login}
              onPress={() => {
                this.setState({
                  isModalVisible: true,
                });
                this.showModal();
              }}
            >
              <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  login: {
    width: 300,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#ff9800",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    marginBottom: 30,
  },

  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: "#ff8a65",
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  buttonContainer: { flex: 1, alignItems: "center" },
  buttonText: { color: "#ffff", fontWeight: "200", fontSize: 20 },
  KeyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    justifyContent: "center",
    alignSelf: "center",
    fontSize: 30,
    color: "#ff5722",
    margin: 50,
  },
  modalContainer: {
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffff",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 80,
    marginBottom: 80,
  },
  formTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#ffab91",
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },
  registerButton: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
  },
  registerButtonText: { color: "#ff5722", fontSize: 15, fontWeight: "bold" },
  cancelButton: {
    width: 200,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});
