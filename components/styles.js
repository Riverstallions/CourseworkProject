import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  buttonCustom: {
    elevation: 1,
    backgroundColor: '#0095ff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  textCustom: {
    fontSize: 20,
    color: 'white'
  },
  inputTextCustom: {
    fontSize: 20,
    color: 'black'
  },
  textInput: {
    backgroundColor: '#bcbbbb'
  },
  titleText: {
    fontSize: 25,
    color: 'black'
  },
  flexbox: {
    flex: 1
  },
  flexboxDown: {
    flex: 0.5,
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  flexboxDownSmall: {
    flex: 0.25,
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  flexboxAcross: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
})
