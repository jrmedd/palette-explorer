import * as React from "react";
import { View, Text } from "react-native";
import * as WebBrowser from 'expo-web-browser';
import styled from "styled-components/native";

const Heading = styled.Text(props=>`
    font-size: 24px;
    font-weight: 700;
`)

const ParagraphText = styled.Text(props=>`
    font-size: 16px;
    margin-top: 16px;
`)

const Link = styled.Text(props=>`
    text-decoration: underline;
`)

const Section = styled.View(props=>`
    padding: 16px;
`)

const openLink = url => {
    WebBrowser.openBrowserAsync(url, 
        {
            readerMode:false,
            dismissButtonStyle: 'close'
        }
    );
}


export const About = ({ navigation, route }) => {
    return(
        <View>
            <Section>
                <Heading accessibilityRole="header">Overview</Heading>
                <ParagraphText>
                    This app was just a way of me wrapping my head around <Link onPress={()=>openLink('https://reactnative.dev')}>React Native</Link>.
                </ParagraphText>
                <ParagraphText>
                    I'm using an API wrapper I created for an earlier project – <Link onPress={()=>openLink('https://collision.digital')}>Collision</Link> – to fetch popular palettes from <Link onPress={()=>openLink('https://lospec.com')}>Lospec</Link>, the restrictive art site.
                </ParagraphText>
            </Section>
            <Section>
                <Heading accessibilityRole="header">Usage</Heading>
                <ParagraphText>
                    Each day, the top 10 most-downloaded palettes will be fetched from Lospec and displayed under the "palettes" section.</ParagraphText> 
                <ParagraphText>
                    Pressing and holding on one of these palettes will bring up a list of the colours, and a means of sharing them.
                </ParagraphText>
                <ParagraphText>
                    You can adjust the palette sizes – i.e. the number of colours in a palette – via the "settings" section.
                </ParagraphText>
            </Section>
        </View>
    )
}