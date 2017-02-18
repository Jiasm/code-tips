/**
 * fix scrollview can not scroll inside scrollview on android (react-native version: 0.41)
 * if you have any problem.
 * please contact me: jiashunming@outlook.com
 */

import React, {Component} from 'react'
import {
  View,
  Text,
  Platform,
  PanResponder,
  Dimensions,
  ScrollView
} from 'react-native'
const isAndroid = Platform.OS === 'android'
const ScrollableTabView = isAndroid ? ScrollableTabViewAndroid : ScrollableTabViewIOS

const windowHeight = Dimensions.get('window').height

export default class Demo extends Component {

  // disable scroll for outer scrollview
  lockWrapScroll () {
    this._wrap.setNativeProps({
      scrollEnabled: false
    })
  }

  // enable scroll for outer scrollview
  unlockWrapScroll () {
    this._wrap.setNativeProps({
      scrollEnabled: true
    })
  }

  componentWillMount () {
    this.wrapPan = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => (console.log('wrap start responder')),
      onStartShouldSetPanResponderCapture: (evt, gestureState) => (console.log('wrap start responder capture')),
      onMoveShouldSetPanResponder: (evt, gestureState) => (console.log('wrap move responder')),
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => (console.log('wrap move responder capture')),
      onPanResponderGrant: (evt, gestureState) => { },
      onPanResponderMove: (evt, gestureState) => { },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => { },
      onPanResponderTerminate: (evt, gestureState) => { },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // only android
        return false
      }
    })
    this.itemPan = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => (console.log('item start responder'), true),
      onStartShouldSetPanResponderCapture: (evt, gestureState) => (console.log('item start responder capture')),
      onMoveShouldSetPanResponder: (evt, gestureState) => (console.log('item move responder')),
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => (console.log('item move responder capture')),
      onPanResponderGrant: (evt, gestureState) => {
        console.log('let start items move')
        this.lockWrapScroll()
      },
      onPanResponderMove: (evt, gestureState) => { },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('items move out')
        this.unlockWrapScroll()
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log('others responder')
        this.unlockWrapScroll()
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // only android
        return false
      }
    })
  }

  render () {
    return <View style={{height: windowHeight}}
      {...(isAndroid ? this.wrapPan.panHandlers : {})}
      >
      <ScrollView style={{flex: 1}} ref={(ref) => this._wrap = ref}>
        <View>
          <ScrollView style={{height: 200}}>
            {
              new Array(20).fill(1).map((_, item) => {
                return <View key={'k' + item}
                  {...(isAndroid ? this.itemPan.panHandlers : {})}
                  >
                  <Text>inside scrollview {item + 1}</Text>
                </View>
              })
            }
          </ScrollView>
        </View>
        {
          new Array(666).fill(1).map((_, item) => {
            return <View key={item}>
              <Text>{item + 1}</Text>
            </View>
          })
        }
      </ScrollView>
    </View>
  }
}
