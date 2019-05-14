import Taro, { Component } from '@tarojs/taro'
import { View,Text,Image,ScrollView } from '@tarojs/components'
import { NavPurchase } from '@components/nav-purchase'
import { OrderItem } from '@components/order-item'
import { TongJiNav } from '@components/tongji-nav'
import { CgtPurchaseList } from './cgt-purchase-list'
import { ORDER_LIST, BAIDU_CONSUME } from '@service/api'
import api from '@service/ask'
import './index.scss'

export default class Cgt extends Component {
  state = {
    navList:[{
      name:'充值记录',
      id:1
    },{
      name:'效果统计',
      id:2
    },{
      name:'购买记录',
      id:3
    }],
    showWho:0,
    showDay:0,
    page:1,
    pageT:1,
    orderList:[],
    cgtList:[]
  }
  onShowWho(val) {
    this.setState({showWho:val})
  }
  onChooseDay(val) {
    this.setState({showDay:val})
  }
  getOrderList () {
    let data = {
      page:this.state.page,
      aid:10078
    }
    api.api(ORDER_LIST,data).then(res => {
      if (res.data.state == 0) {
        if (res.data.data.result) {
          if (res.data.data.length !== 0) {
            Taro.hideLoading()
            let orderArray = this.state.orderList
            this.setState({orderList:orderArray.concat(res.data.data.result)})
          } 
        } else {
          Taro.showToast({title:'没有更多了',icon:'none'})
        }
      }
    })
  }
  getCgtTongji () {
    let data = {
      stat_type:this.state.showDay,
      page:this.state.pageT
    }
    api.api(BAIDU_CONSUME,data).then(res => {
      let list = this.state.cgtList
      if (res.data.state == 1) {
        if (res.data.data.list.result.length !== 0) {
          this.setState({cgtList:list.concat(res.data.data.list.result)})
        } else {
          Taro.showToast({title:'没有更多了',icon:'none'})
        }
      }
    })
  }
  componentDidShow () {
    this.getOrderList()
    this.getCgtTongji()
  }
  onScrollToLower () {
    Taro.showLoading({title:'正在加载'})
    this.setState({
      page:this.state.page + 1
    },() => {
      this.getOrderList()
    })
  }
  render () {
    const { navList, showWho, orderList,cgtList } = this.state
    let height = Taro.getSystemInfoSync().windowHeight - 59
    return (
      <View className='cgt-wrap'>
        <NavPurchase
          list={navList}
          onShowWho={this.onShowWho}
        />
        {
          showWho === 0 
          ? <CgtPurchaseList />
          : ''
        }
        {
          showWho === 1
          ? <View className='tongji-wrap'>
              <TongJiNav
                onChooseDay={this.onChooseDay}
              />
              <ScrollView
                scrollY
              >
              {
                cgtList.map((cgt,i) => {
                  return <View className='con' key={i}>
                          <Text className='con-item f'>{cgt.hit_num}</Text>
                          <Text className='con-item s'>{cgt.consume}</Text>
                          <Text className='con-item t'>{cgt.per_hit_price}</Text>
                          <Text className='con-item fo'>{cgt.sdate}</Text>
                        </View>
                })
              }
              </ScrollView>
            </View>
          : ''
        }
        {
          showWho === 2 
          ? <ScrollView 
              className='order-box'
              scrollY
              style={{height:`${height}px`}}
              onScrollToLower={this.onScrollToLower}
            >
              <OrderItem
                list={orderList}
                aid='10078'
              />
            </ScrollView>
          : ''
        }
      </View>
    )
  }
} 