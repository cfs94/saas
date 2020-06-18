import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { PERSON_INFO, LOGOUT } from '@service/api'
import api from '@service/ask'
import { set as setGlobalData, get as getGlobalData } from '@utils/global_data.js'
import phoneImg from './assets/phone.png'
import companyImg from './assets/company.png'
import arrowImg from '@assets/arrow.png'
import setImg from './assets/n_set.png'
import orderImg from './assets/mylist.png'
import aboutImg from './assets/n_about.png'
import logoutImg from './assets/n_logout.png'
import kefuImg from './assets/chat.png'
import getM from '@assets/getm.png'
import dIcon from '@assets/diamonicon.png'
import diaIcon from '@assets/diamon_icon.png'
import bIcon from './assets/bIcon.png'
import b_Icon from './assets/b_Icon.png'
import no_m from './assets/no_m.png'
import n_points from './assets/n_points.png'
import './user.scss'
import MemberPackage from '../memberpackage'
let Session = require('@utils/first-login/session')

class User extends Component {
	config = {
		navigationBarTitleText: '用户中心'
	}
	state = {
		page: 1,
		memberflag: false
	}

	toMyPoints(){
		Taro.navigateTo({ url: '/pages/user/promotionlist' })
	}

	jumpAboutUs() {
		Taro.navigateTo({ url: '/pages/user/about-us' })
	}
	jumpAccount() {
		Taro.navigateTo({ url: '/pages/account/account' })
	}
	jumpPerData() {
		Taro.navigateTo({ url: '/pages/account/per-data' })
	}
	jumpOrder() {
		Taro.navigateTo({ url: '/pages/order/order' })
	}
	getPersonInfo() {
		api.api(PERSON_INFO).then(res => {
			if (res.data.state == 1) {
				setGlobalData('info', res.data.data.info)
				setGlobalData('avatarUrl', res.data.data.avatarUrl)
				// console.log(res.data)
				//判断是否是会员
				if (res.data.data.info.app_name) {
					this.setState({
						memberflag: true
					})
				}
				this.setState({
					info: res.data.data.info,
					avatarUrl: res.data.data.avatarUrl,
					memberType: res.data.data.info.app_name,
					endTime: res.data.data.info.service_end
				})
			}
		})
	}
	logout() {
		Taro.showModal({
			title: '温馨提示',
			content: '您确认要退出登录吗',
			success: function (res) {
				if (res.confirm) {
					api.api(LOGOUT).then(res => {
						if (res.data.state == 1) {
							Taro.showToast({ title: '退出登录成功', icon: 'none' })
							// Session.clear()
							setTimeout(() => {
								Taro.navigateTo({ url: '/pages/login/login' })
							}, 500)
						} else {
							Taro.showToast({ title: res.data.msg, icon: 'none' })
						}
					})
				} else if (res.cancel) {

				}
			}
		})

	}

	toBuyMember() {
		Taro.navigateTo({ url: '/pages/user/promotionlist' })
	}

	componentDidShow() {
		this.getPersonInfo()
	}
	onShareAppMessage(obj) { }
	render() {
		const { info, avatarUrl, memberType, endTime } = this.state
		return (
			<View className='user'>
				<View className='user-top' onClick={this.jumpPerData}>
					<View className='user-avatar'>
						<Image className='avatar-img' src={avatarUrl} />
					</View>
					<View className='user-con'>
						<View className='info-wrap'>
							{/* <Image className='img' src={companyImg} /> */}
							{/* <Text className='text'>{info.corpname}</Text> */}
							<Text className='text'>{info.username}</Text>
						</View>
						<View className='info-wrap wrap2'>
							{/* <Image className='img img-phone' src={phoneImg} /> */}
							{/* <Text className='text'>{info.username}</Text> */}
							<Text className='text'>{info.corpname}</Text>
						</View>
					</View>
					<View>
						<Image src={arrowImg} className='arrow-img' />
					</View>
				</View>

				{this.state.memberflag ? <View className={memberType == '钻石会员' ? "package-warp" : 'black-warp'}>
					<View className='member-info'>
						<View className='member-t'>
							<Text className='member-type'>{memberType}</Text>
							<Image className='member-icon' src={memberType == '钻石会员' ? dIcon : bIcon}></Image>
						</View>
						<View className='end-time'>
							<Text>到期时间：</Text>
							<Text>{endTime}</Text>
						</View>
					</View>
					<View className='look-over'>
						查看权益
					</View>
					<Image src={memberType == '钻石会员' ? diaIcon : b_Icon} className='dia-icon'></Image>
				</View> :
					<View className='nomember-warp'>
						<View className='no-info'>
							<span>您还不是会员</span>
							<span>会员享百度等搜索引擎优先收录排名</span>
						</View>
						<View className='to-m'>
							成为会员
					</View>
						<Image src={no_m} className='no-icon'></Image>
					</View>}


				<Image className='get-member' src={getM} onClick={this.toBuyMember}></Image>

				<View className='item-wrap'>
					<View className='item' onClick={this.toMyPoints}>
						<Image className='imgs' src={n_points} />
						<Text className='title'>我的积分</Text>
						<Image className='img' src={arrowImg} />
					</View>
					<View className='item' onClick={this.jumpAccount}>
						<Image className='imgs' src={setImg} />
						<Text className='title'>帐号管理</Text>
						<Image className='img' src={arrowImg} />
					</View>
					<View className='item' onClick={this.jumpOrder}>
						<Image className='imgs' src={orderImg} />
						<Text className='title'>我的订单</Text>
						<Image className='img' src={arrowImg} />
					</View>
					<View className='item' onClick={this.jumpAboutUs}>
						<Image className='imgs' src={aboutImg} />
						<Text className='title'>关于我们</Text>
						<Image className='img' src={arrowImg} />
					</View>
					<Button open-type='contact' className='item contact'>
						<Image className='imgs' src={kefuImg} />
						<Text className='title'>在线客服</Text>
						<Image className='img' src={arrowImg} />
					</Button>
					<View className='item' onClick={this.logout}>
						<Image className='imgs' src={logoutImg} />
						<Text className='title'>退出登录</Text>
						<Image className='img' src={arrowImg} />
					</View>
				</View>

				<MemberPackage getInfo={this.getPersonInfo.bind(this)} />
				<View className='get-btn' onClick={this.toBuyMember}>立即享受会员特权</View>
			</View>
		)
	}
}
export default User