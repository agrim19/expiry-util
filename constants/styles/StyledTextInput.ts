import { StyleSheet } from "react-native";
import Colors from "../Colors";
import Layout from "../Layout";

export const styles = StyleSheet.create({
    view: {
        borderWidth: Layout.borderWidth,
        borderColor: Layout.borderColor,
        borderRadius: Layout.borderRadius
    },
    textView: {
        backgroundColor: Colors.tintColor,
        borderTopLeftRadius: Layout.borderRadius + Layout.innerBorderRadiusDifference,
        borderTopRightRadius: Layout.borderRadius + Layout.innerBorderRadiusDifference,
        borderBottomWidth: Layout.borderWidth,
        borderBottomColor: Layout.borderColor
    },
    text: {
        textAlign: "center",
        color: Colors.backgroundColor,
        letterSpacing: Layout.letterSpacing
    }
});
