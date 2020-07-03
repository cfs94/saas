import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { BUY_MEMBER, CHECK_MEMBER ,MEMBER_PRICE} from '@service/api'
import api from '@service/ask'
import diaIcon from '../user/assets/m_z.png'
import bIcon from '../user/assets/b_m_z.png'
import topIcon from '../user/assets/top.png'
import './index.scss'

class MemberPackage extends Component {
    state = {
        showTip: false,
        payflag: false,
        sp_code:'' //默认推广码
    }


    //购买钻石
    buyDiamon() {
        let params = {
            app_id: 10095,
            sp_code: this.state.sp_code
        }
        api.api(BUY_MEMBER, params).then(res => {
            // console.log(res,'钻石')
            let that = this
            
            if (res.data.state == 1) {
                this.setState({
                    order_id: res.data.data.order_id
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
                Taro.navigateTo({ url: '/pages/first-login/first-login' })
            }
        })
    }

    //购买黑钻
    buyBlack() {
        let params = {
            app_id: 10097,
            sp_code: this.state.sp_code
        }
        api.api(BUY_MEMBER, params).then(res => {
            let that = this
            if (res.data.state == 1) {
                this.setState({
                    order_id: res.data.data.order_id
                })
                Taro.requestPayment({
                    timeStamp: res.data.data.timeStamp,
                    nonceStr: res.data.data.nonceStr,
                    package: res.data.data.package,
                    signType: res.data.data.signType,
                    paySign: res.data.data.paySign,
                    success() {
                        that.checkOrder(res.data.data.order_id)
                        // Taro.navigateTo({ url: '/pages/result-pay/result-pay?type=0' })
                    },
                    fail(res) {
                        // Taro.navigateTo({ url: `/pages/result-pay/result-pay?type=1&typeService=2&orderId=${id}` })
                    }
                })
            } else {
                Taro.showToast({ title: res.data.msg, icon: 'none' })
                Taro.navigateTo({ url: '/pages/first-login/first-login' })
            }
        })
    }


    //检查是否购买
    checkOrder(param) {
        let id = {
            order_id: param
        }
        api.api(CHECK_MEMBER, id).then(res => {

            // console.log(res,'检查')
            if (res.data.state == 1) {
                this.setState({
                    showTip: true,
                    payflag: true
                })
                return false;
            }
            if (res.data.state == 4) {
                this.setState({
                    showTip: true
                })
                let time = null
                time = setTimeout(() => {
                    this.checkOrder(this.state.order_id)
                }, 1000)
            }
        })
    }




    render() {
        let {diamonPrice,blackPrice} = this.state
        return (
            <View className='packagemain'>
                <Text className='packagename'>开通会员</Text>
                <Text className='packagetitle'>
                    马可波罗网和百度、搜狗、360、今日头条，强强联手搜索引擎，收录排名领先99%同类产品
                </Text>
                <View className='diamondmember'>
                   
                    <View className='diamondbox'>
                        <Image src={topIcon} className='topicon'></Image>
                        <View className='payicon'>
                            <Image src={diaIcon} className='iconimg'></Image>
                            <span>钻石会员</span>
                        </View>
                        <View className='paydiv'>
                            <span>￥<i>{diamonPrice}</i>/年</span>
                            <span>原价¥23990</span>
                            <span>询盘订单可提升200%</span>
                        </View>
                    </View>
                    <View className='diamonbtn' onClick={this.buyDiamon}>立即开通</View>
                </View>
                <View className='blackmember'>
                    <View className='blackbox'>

                        <View className='payicon'>
                            <Image src={bIcon}  className='iconimg'></Image>
                            <span>黑钻会员</span>
                        </View>
                        <View className='paydiv'>
                            <span>￥<i>{blackPrice}</i>/年</span>
                            <span>原价¥57990</span>
                            <span>询盘订单可提升600%</span>
                        </View>

                    </View>
                    <View className='blackbtn' onClick={this.buyBlack}>立即开通</View>
                </View>

                {this.state.showTip ? <View className='membertip'>
                    <View className='tipbox'>
                        {this.state.payflag ? <Text>恭喜您已开通马可波罗网会员服务</Text> :
                            <Text>支付中，请稍等...</Text>}
                        {this.state.payflag ? <Text className='btn' onClick={this.personInfo}>确定</Text> : ''}
                    </View>
                </View> : ''}
                
                
            
            
            </View>
        )
    }


    //买完会员获取信息
    personInfo() {
        this.setState({
            showTip: false,
            payflag: false
        })
        this.props.getInfo()
    }

    //获取套餐信息
    getPrice(){
        api.api(MEMBER_PRICE).then(res=>{
            let diamonPrice = res.data.data.app_info['10095'].price
            let blackPrice = res.data.data.app_info['10097'].price    
            let sp_code = res.data.data.sp_code
            
            this.setState({
                diamonPrice:diamonPrice,
                blackPrice:blackPrice,
                sp_code:sp_code
            })
        })
    }



    componentDidShow(){
        this.getPrice()
    }


}

export default MemberPackage