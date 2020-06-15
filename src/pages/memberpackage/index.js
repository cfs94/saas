import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { BUY_MEMBER ,CHECK_MEMBER } from '@service/api'
import api from '@service/ask'

import './index.scss'

class MemberPackage extends Component {
    state = {
        showTip:false,
        payflag:false
    }


    //购买钻石
    buyDiamon() {
        let params = {
            app_id: 10095,
            sp_code: ''
        }
        api.api(BUY_MEMBER, params).then(res => {
            // console.log(res,'钻石')
            let that  = this
            if (res.data.state == 1) {
                this.setState({
                    order_id:res.data.data.order_id
                })
                Taro.requestPayment({
                    timeStamp: res.data.data.timeStamp,
                    nonceStr: res.data.data.nonceStr,
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    paySign: res.data.data.paySign,
                    success(val) {
                    

                            that.checkOrder(res.data.data.order_id)
                      
                 
                        // Taro.navigateTo({ url: '/pages/result-pay/result-pay?type=0' })
                    },
                    fail(res) {
                        // Taro.navigateTo({ url: `/pages/result-pay/result-pay?type=1&typeService=2&orderId=${id}` })
                    }
                })
            } else {
                Taro.showToast({ title: res.data.msg, icon: 'none' })
            }
        })
    }

    //购买黑钻
    buyBlack() {
        let params = {
            app_id: 10097,
            sp_code: ''
        }
        api.api(BUY_MEMBER, params).then(res => {
            if (res.data.state == 1) {
                Taro.requestPayment({
                    timeStamp: res.data.data.timeStamp,
                    nonceStr: res.data.data.nonceStr,
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    paySign: res.data.data.paySign,
                    success(res) {
                        Taro.navigateTo({ url: '/pages/result-pay/result-pay?type=0' })
                    },
                    fail(res) {
                        // Taro.navigateTo({ url: `/pages/result-pay/result-pay?type=1&typeService=2&orderId=${id}` })
                    }
                })
            } else {
                Taro.showToast({ title: res.data.msg, icon: 'none' })
            }
        })
    }


    //检查是否购买
    checkOrder(param){
        let id ={
            order_id:param
        }
        api.api(CHECK_MEMBER,id).then(res=>{

            // console.log(res,'检查')
            if(res.data.state == 1){
                this.setState({
                    payflag:true
                })
                return false;
            }
            if(res.data.state == 4){
                this.setState({
                    showTip:true
                })
                let time = null
                time= setTimeout(()=>{
                    this.checkOrder(this.state.order_id)
                },1000)
            }
        })
    }




    render() {
        return (
            <View className='packagemain'>
                <Text className='packagename'>开通会员</Text>
                <Text className='packagetitle'>
                    马可波罗网和百度、搜狗 360强强联手搜索引擎 收录排名领先99%同类产品
                </Text>
                <View className='diamondmember'>
                    <View className='diamondbox'>
                        <span>￥999/年</span>
                        <span>原价¥23990</span>
                        <span>询盘订单可提升300%</span>
                    </View>
                    <View className='diamonbtn' onClick={this.buyDiamon}>立即开通</View>
                </View>
                <View className='blackmember'>
                    <View className='blackbox'>
                        <span>2199/年</span>
                        <span>原价¥57990</span>
                        <span>询盘订单可提升300%</span>
                    </View>
                    <View className='blackbtn' onClick={this.buyBlack}>立即开通</View>
                </View>

                {this.state.showTip ? <View className='membertip'>
                    <View className='tipbox'>
                        {this.state.payflag?<Text>恭喜您已开通马可波罗网会员服务</Text>:
                        <Text>支付中，请稍等...</Text>}
                        {this.state.payflag?<Text className='btn' onClick={this.personInfo}>确定</Text>:''}
                    </View>
                </View>:''}
            </View>
        )
    }


    personInfo(){
        this.setState({
            showTip:false,
            payflag:false
        })
        this.props.getInfo()
    }



}

export default MemberPackage