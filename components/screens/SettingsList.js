import * as React from "react";
import { Pressable, Text, View, ScrollView, TextInput } from "react-native";
import styled from "styled-components/native";
import { PalettesContext } from "../utils/PalettesContext";
import { SettingsField } from "../SettingsField";

const MainScrollingContainer = styled.ScrollView(props=>`
  flex: 1;
`)

export const SettingsList = ({navigator, route}) => {
    const numberOfColorsRef = React.useRef(null)
    const focusInput = ()=>numberOfColorsRef.current.focus();
    const [palettes, setPalettes] = React.useContext(PalettesContext);
    const [numberOfColors, setNumberOfColors] = React.useState()
    const [value, setValue] =React.useState("")
    React.useEffect(()=>setNumberOfColors(palettes.numberOfColors), [palettes])
    const updatePalettes = event => setPalettes({...palettes, numberOfColors: isNaN(parseInt(numberOfColors)) ? palettes.numberOfColors : numberOfColors})
    return (
    <MainScrollingContainer>
      <SettingsField onPress={focusInput} focusRef={numberOfColorsRef} label="Number of colours" value={numberOfColors} onChangeText={value=>setNumberOfColors(value)} onEndEditing={updatePalettes}  />
    </MainScrollingContainer>
)}