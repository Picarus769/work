export default {
	//app名字
	appName: '**商城',
	//首页搜索栏前的文字
	lebalText: '货源',
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
			url: ''
		},
		{
			name: '幸运转盘',
			icon: '../../static/images/roulette.png',
			url: '/pages/index/Roulette'
		},
		{
			name: '招募计划',
			icon: '../../static/images/join_in.png',
			url: ''
		},
		{
			name: '营销推广',
			icon: '../../static/images/extension.png',
			url: ''
		}
	]
}