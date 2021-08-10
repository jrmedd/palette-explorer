import * as React from "react";
import styled from "styled-components/native";
import {View, Text, TextInput } from "react-native";

const SettingsRow = styled.Pressable(props => `
  height: 48px;
  background: white;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  border-top-width: 0.5px;
  border-top-color: #cacaca;
  border-bottom-width: 0.5px;
  border-bottom-color: #cacaca;
`);
const SettingsLabel = styled.Text(props => `
  font-size: 16px;
`);
const SettingsInput = styled.TextInput(props => `
  font-size: 16px;
`);
export const SettingsField = props => (
  <SettingsRow onPress={props.onPress} accessible={false}>
    <SettingsLabel accessible={false}>{props.label}</SettingsLabel>
    <SettingsInput accessible accessibilityLabel={props.label} keyboardType={props.keyboardType} value={props.value} onChangeText={props.onChangeText} onEndEditing={props.onEndEditing} ref={props.focusRef} />
  </SettingsRow>
);
