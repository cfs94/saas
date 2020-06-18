import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { EXCHANGE_INFO, CHECK_CODE ,EXCHANGE_SUBMIT} from '@service/api'
import api from '@service/ask'
import './index.scss'

export default class SubmitCheck extends Component {

    config = {
        navigationBarTitleText: '提交信息'
    }

    state = {}

    //获取兑换信息
    getExchangeInfo() {
        api.api(EXCHANGE_INFO).then(res => {
            if (res.data.state == 0) {
                let val = res.data.data
                console.log(val)
                this.setState({
                    infoName: val.real_name,
                    infoCard: val.id_card,
                    infoPhone: val.mobile,
                    companyName: val.corpname,
                    companyNum: val.corpnum,
                    companyImg: val.cert_corp
                })
            }
        })
    }


    //提交按钮
    checkSubmit(){
        let params = {
            code:this.state.pCode,
            real_name:this.state.infoName,
            id_card:this.state.infoCard,
        }
        api.api(EXCHANGE_SUBMIT,params).then(res=>{
            
        })
    }

    //获取验证码
    phoneCode(){
        api.api(CHECK_CODE).then(res=>{

        })
    }


    componentDidShow() {
        this.getExchangeInfo()
    }


    render() {
        let { infoName, infoCard, infoPhone, companyName, companyNum, companyImg } = this.state

        return (<View className='submitmain'>
            <View className='personinfo'>
                <View className='persontitle'>个人信息</View>
                <View className='personitem'>
                    <Text>真实姓名</Text>
                    <span>{infoName}</span>
                </View>
                <View className='personitem'>
                    <Text>二代身份证</Text>
                    <span>{infoCard}</span>
                </View>
                <View className='personitem'>
                    <Text>手机号</Text>
                    <span>{infoPhone}</span>
                    <Text className='getcode' onClick={this.phoneCode}>获取验证码</Text>
                </View>
                <View className='personitem'>
                    <Text>验证码</Text>
                    <input></input>
                </View>
            </View>

            <View className='companyinfo'>
                <View className='comtitle'>公司信息</View>
                <View className='comitem'>
                    <Text>公司名称</Text>
                    <span>{companyName}</span>
                </View>
                <View className='comitem'>
                    <Text>组织机构代码</Text>
                    <span>{companyNum}</span>
                </View>
                <View className='imgitem'>
                    <Text>营业执照</Text>
                    <Image className='comimg' src={companyImg}></Image>
                </View>
            </View>

            <View className='subtn' onClick={this.checkSubmit}>
                提交
            </View>

        </View>)
    }
} 