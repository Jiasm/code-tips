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

  lockWrapScroll () {
    this._wrap.setNativeProps({
      scrollEnabled: false
    })
  }

  unlockWrapScroll () {
    this._wrap.setNativeProps({
      scrollEnabled: true
    })
  }

  componentWillMount () {
    this.wrapPan = PanResponder.create({
      // ask to be responder
      onStartShouldSetPanResponder: (evt, gestureState) => (console.log('wrap start responder')),
      onStartShouldSetPanResponderCapture: (evt, gestureState) => (console.log('wrap start responder capture')),
      onMoveShouldSetPanResponder: (evt, gestureState) => (console.log('wrap move responder')),
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => (console.log('wrap move responder capture')),

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y}0 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // console.log('block native responder', this.touchLocation.y)
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        console.log('wrap block')
        // this.props.lockedTabSlid()
        return false
      }
    })
    this.itemPan = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => (console.log('item start responder'), true),
      onStartShouldSetPanResponderCapture: (evt, gestureState) => (console.log('item start responder capture')),
      onMoveShouldSetPanResponder: (evt, gestureState) => (console.log('item move responder')),
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => (console.log('item move responder capture')),

      onPanResponderGrant: (evt, gestureState) => {
        console.log('let start items move')
        this.lockWrapScroll()
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y}0 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log('items move out')
        this.unlockWrapScroll()
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log('others responder')
        this.unlockWrapScroll()
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
        // 建议在这里做与onPanResponderRelease同样的处理，除非你明确知道这个事件会在哪里终结。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // console.log('block native responder', this.touchLocation.y)
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        console.log('item block')
        // this.props.lockedTabSlid()
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
