import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";

import { TextField, ErrorText } from "../components/Form";
import { Button } from "../components/Button";
import { reviewApi, saveAuthToken } from "../util/api";

const styles = StyleSheet.create({
  shape: {
    backgroundColor: "#eb4034", //UPGRADE: Prettier UI - nicer red
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontWeight: "500",
    fontSize: 20,
    color: "#fff"
  },
  textBlock: {
    marginTop: 20
  },
  smallText: {
    fontSize: 18,
    color: "#969696",
    textAlign: "center",
    marginBottom: 2
  },
  link: {
    textDecorationLine: "underline"
  }
});

export default class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
    isVisible: false
  };

  handleSubmit = () => {
    this.setState({ error: "" });
    reviewApi("/sign-in", {
      method: "POST",
      body: JSON.stringify({
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

  // UPGRADE: Delete existing account
  handleDelete = () => {
    this.setState({ error: "" });
    reviewApi("/delete-account", {
      method: "POST",
      body: JSON.stringify({
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
          label="Password"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          autoCapitalize="none"
        />
        <ErrorText text={this.state.error} />
        <Button text="Submit" onPress={this.handleSubmit} />
        {/* UPGRADE: Delete Account */}
        <View style={styles.textBlock}>
          <Text style={styles.smallText}>Want to delete an account?</Text>
          <Text style={styles.smallText}>
            Type above and then delete below.
          </Text>
        </View>
        <Button text="Delete Account" onPress={() => this.handleDelete} />
      </ScrollView>
    );
  }
}
