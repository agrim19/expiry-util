import { StyleSheet } from "react-native";
import Colors from "../Colors";

export const styles = (isDark: boolean) => StyleSheet.create({
    listView: {
        flex: 1
    },
    distanceText: {
        textAlign: "center",
        color: isDark ? Colors.labelDarkColor : Colors.labelLightColor
    }
});
