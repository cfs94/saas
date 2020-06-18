import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { PROMOTION_LIST, EXCHANGE_LIST, EXCHANGE_DETAIL } from '@service/api'
import api from '@service/ask'
import './promotionlist.scss'
export default class PromotionList extends Component {

    config = {
        navigationBarTitleText: '积分页面'
    }

    state = {
        showflag: true,
        showtip: false,
        passflag: false,
        proList: [],
        exchangeList: []
    }



    //获取初始信息和推广列表
    getPromotionInfo() {
        let params = {
            page: 1
        }
        api.api(PROMOTION_LIST, params).then(res => {
            if (res.data.state == 0) {
                let val = res.data.data
                console.log(val)
                this.setState({
                    userAvatar: val.avatarUrl,
                    userName: val.nickname,
                    userCode: val.promotion_code,
                    userSpread: val.spread,
                    proList: val.order_list
                })
            }
        })
    }


    componentDidShow() {
        this.getPromotionInfo()
    }

    //点击获取推广列表
    getProList() {
        this.setState({
            showflag: true
        })
        this.getPromotionInfo()
    }
    //点击获取兑换列表
    getExchangeList() {
        this.setState({
            showflag: false
        })
        let params = {
            page: 1
        }
        api.api(EXCHANGE_LIST, params).then(res => {
            if (res.data.state == 0) {
                let val = res.data.data
                this.setState({
                    exchangeList: val.result
                })

            }
        })
    }


    //获取兑换详情
    exchangeDetail(itemid) {
        let param = {
            id: itemid
        }
        api.api(EXCHANGE_DETAIL, param).then(res => {
            if (res.data.state == 0) {
                let val = res.data.data
                this.setState({
                    showtip: true
                })
                if (val.status == '0') {
                    this.setState({
                        passflag: false,
                        noMsg:val.msg
                    })
                }
                if (val.status == '1') {
                    this.setState({
                        passflag: true,
                        cardID:val.id_card
                    })
                }
                if (val.status == '2') {
                    this.setState({
                        passflag: false,
                        noMsg:val.msg
                    })
                }
            }
        })
    }

    //关闭提示框
    closeTip() {
        this.setState({
            showtip: false
        })
    }

    //去兑换按钮
    toCheck(){
        Taro.navigateTo({ url: '/pages/user/submitcheck/index' })
    }


    render() {


        let { userAvatar, userName, userCode, userSpread, proList, exchangeList ,cardID,noMsg} = this.state

        const porView = proList.map((item, index) => {
            return <View key={index} className='proitem'>
                <View>
                    <View className='proname'>{item.corpname}</View>
                    <View className='proprice'><span>￥</span>{Math.floor(item.order_price)}套餐</View>
                </View>
                <View>
                    <View className='porprize'>+{item.spread_prize}积分</View>
                    <View className='protime'>{item.pay_time}</View>
                </View>
            </View>
        })

        const exchangeView = exchangeList.map((item, index) => {
            return <View key={item.id} className='proitem' onClick={this.exchangeDetail.bind(this, item.id)}>
                <View>
                    <View className='proname'>{item.real_name}</View>
                    <View className='proprice'>兑换京东购物卡</View>
                </View>
                <View>
                    <View className='porprize'>-{item.exchange}积分</View>
                    <View className='protime'>{item.create_date}</View>
                </View>
            </View>
        })

        return (
            <View className='promotionmain'>
                <View className='promotiontop'>
                    <View className='topinfo'>
                        <Image src={userAvatar}></Image>
                        <Text>{userName}</Text>
                    </View>
                    <View className='toppoints'>总积分：{userSpread}</View>
                    <View className='topcode'>
                        <View className='codenum'>推广码：{userCode}</View>
                        <View className='codebtn'>去推广</View>
                    </View>

                </View>
                <View className='checkcard'>
                    <View className='cardnum'>
                        ￥<Text>800</Text>
                    </View>
                    <View className='cardname'>京东购物卡</View>
                    <View className='cardbtn' onClick={this.toCheck}>去兑换</View>
                </View>

                <View className='listmain'>
                    <View className='listtitle'>
                        <View className={showflag ? 'spanshow' : ''} onClick={this.getProList}>推广积分</View>
                        <View className={showflag ? 'leftbtn' : 'leftbtn spanshow'} onClick={this.getExchangeList}>兑换记录</View>
                    </View>

                    <View className='listwarp'>
                        {showflag ? porView : exchangeView}
                    </View>


                </View>


                {this.state.showtip ? <View className='checktip'>
                    <View className='tipbox'>

                        {this.state.passflag ? 
                        <View className='okbox'>
                            <View className='passok'>您的积分兑换京东购物卡申请已通过</View>
                            <View className='passcard'>您价值800元的京东购物卡兑换码为:</View>
                            <View className='cnum'>{cardID}</View>
                        </View> : 
                        <View className='nobox'>
                                <View className='nopass'>您的积分兑换京东购物卡审核未通过</View>
                                <View className='nomsg'>原因：{noMsg}</View>
                        </View>}

                        <Text className='passbtn' onClick={this.closeTip}>确定</Text>

                    </View>
                </View> : ''}

            </View>
        )
    }
}