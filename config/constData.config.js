export default {
	//app名字
	appName: '**商城',
	//首页搜索栏前的文字
	lebalText: '货源',
	//图片服务器地址
	imageServer: 'https://admin.counselor.hzrxkjgs.cn/',
	//默认图片
	defaultImg: '../../static/images/defaultImg.png',
	//小箭头图标(灰色)
	arrowIcon1: '../../static/images/arrow1.svg',
	//小箭头图标(主题色)
	arrowIcon2: '../../static/images/arrow2.svg',
	//首页搜索栏下方导航栏
	homeNavigation: [
		{
			name: '首页',
			url: '',
			selected: true
		},
		{
			name: '食品饮品',
			url: '',
			selected: false
		},
		{
			name: '时尚鞋服',
			url: '',
			selected: false
		},
		{
			name: '美妆个护',
			url: '',
			selected: false
		},
		{
			name: '家居生活',
			url: '',
			selected: false
		}
	],
	//首页图标导航
	homeIconNavigation: [
		{
			name: '区域代理',
			icon: '../../static/images/agent.png',
			url: '/pages/index/areaAgent'
		},
		{
			name: '幸运转盘',
			icon: '../../static/images/roulette.png',
			url: '/pages/index/Roulette'
		},
		{
			name: '招募计划',
			icon: '../../static/images/join_in.png',
			url: '/pages/index/conscribe'
		},
		{
			name: '营销推广',
			icon: '../../static/images/extension.png',
			url: '/pages/index/extension'
		},
		{
			name: '会员专区',
			icon: '../../static/images/vip.png',
			url: '/pages/index/vip'
		}
	],
	//分类页面配置
	lebalUp: {
		message: '线上订货会',
		icon: '../../static/images/arrow.svg'
	},
	lebalDown: {
		message: '一手产地',
		icon: '../../static/images/position.svg'
	},
	//消息页面配置
	msgHeaderConfig: [
		{
			name: '重要通知',
			icon: '../../static/images/importent_message.svg',
			url: '',
			bgColor: 'bg_color1'
		},
		{
			name: '订单通知',
			icon: '../../static/images/order_message.svg',
			url: '',
			bgColor: 'bg_color2'
		},
		{
			name: '店铺通知',
			icon: '../../static/images/shop_message.svg',
			url: '',
			bgColor: 'bg_color3'
		},
		{
			name: '商家成长',
			icon: '../../static/images/shop_grow.svg',
			url: '',
			bgColor: 'bg_color4'
		},
		{
			name: '系统通知',
			icon: '../../static/images/other_message.svg',
			url: '',
			bgColor: 'bg_color5'
		},
	],
	//我的(proflie)页面配置
	profileConfig: [
		{
			message: '我的订单',
			icon: '../../static/images/my_order.png',
			url: '/pages/profile/myOrder'
		},
		{
			message: '账户资金',
			icon: '../../static/images/account_funds.png',
			url: '',
			// url: '/pages/profile/accountFunds'
		},
		{
			message: '我的积分',
			icon: '../../static/images/my_points.png',
			url: '/pages/profile/myPoints'
		},
		{
			message: '设置',
			icon: '../../static/images/settings.png',
			url: '',
			// url: '/pages/profile/settings'
		},
		{
			message: '商家服务',
			icon: '../../static/images/shop_serve.png',
			// url: '/pages/profile/shopServe'
			url: ''
		},
		{
			message: '商家客服',
			icon: '../../static/images/shopChat.png',
			url: ''
		}
	],
	vipOptions: [
		{
			id: 0,
			title: 'VIP',
			info: '购买VIP套餐升级',
			icon: '../../static/images/vip1.png'
		},
		{
			id: 1,
			title: '伊客',
			info: '购买伊客套餐升级',
			icon: '../../static/images/vip2.png'
		}
	],
	vipInfo: [
		{
			id: 0,
			title: '权益一',
			info: '权益一说明'
		},
		{
			id: 1,
			title: '权益二',
			info: '权益二说明'
		}
	],
	sVipInfo: [
		{
			id: 0,
			title: '权益一',
			info: '权益一说明'
		},
		{
			id: 1,
			title: '权益二',
			info: '权益二说明'
		}
	]
	
}