// server/api/create-account is used as well

import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";

import { TextField, ErrorText } from "../components/Form";
import { Button } from "../components/Button";
import { reviewApi, saveAuthToken } from "../util/api";

const styles = StyleSheet.create({
  textBlock: {
    marginTop: 20
  },
  text: {
    fontSize: 18,
    color: "#969696",
    textAlign: "center",
    marginBottom: 2
  },
  link: {
    textDecorationLine: "underline"
  }
});

// turned into a full class
export default class CreateAccount extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPass: ""
  };
  //TODO: check this function
  handleSubmit = () => {
    reviewApi("/create-account", {
      method: "POST",
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => {
        console.log("response", response);
        return saveAuthToken(response.result.token);
      })
      .then(() => {
        this.props.navigation.navigate("Information");
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <TextField
          label="Email"
          placeholder="john.doe@example.com"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          autoCapitalize="none"
        />
        <TextField
          label="First Name"
          placeholder="John"
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
        />
        <TextField
          label="Last Name"
          placeholder="Doe"
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
        />
        {/* Need to figure out how to check entered password. */}
        <TextField
          label="Password"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          autoCapitalize="none"
        />
        <TextField
          label="Confirm Password"
          secureTextEntry
          onChangeText={confirmPass => this.setState({ confirmPass })}
          value={this.state.confirmPass}
          autoCapitalize="none"
        />
        <ErrorText text={this.state.error} />
        <Button text="Submit" onPress={() => this.handleSubmit} />

        <View style={styles.textBlock}>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("SignIn")}
          >
            <Text style={[styles.text, styles.link]}>Sign in.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
