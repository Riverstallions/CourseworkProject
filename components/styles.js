import { StyleSheet } from "react-native"

export default StyleSheet.create({
    buttonCustom: {
        elevation: 1,
        color: "red",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    textCustom: {
        fontSize: 20,
    },
    flexbox: {
        flex: 1,
    },
    flexboxDown: {
        flex: .5,
        justifyContent: 'space-between',
        flexDirection: 'column',
    },
    flexboxAcross: {
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    textInputCustom: {
        backgroundColor: "#815481",
    }
})