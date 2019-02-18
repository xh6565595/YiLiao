//index.js
//获取应用实例
import { MainMenus, permisionFilter } from '../../utils/permision.js';
const app = getApp()


Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    role:-1,
    meuns:[],
    panels:[
      {
        icon: 'icon-ceshishenqing',
        title: '待维修',
        badge: 0,
        roles: [],
        path: 'order1'
      },
      {
        icon: 'icon-renjijiaohu',
        title: '维修中',
        badge: 1,
        roles: [],
        path: 'order2'
      },
      {
        icon: 'icon-changjingguanli',
        title: '历史记录',
        roles: [],
        path: 'record'
      }
    ]
  },
  // 跳转
  linkTo:function(event){
    let to = event.currentTarget.dataset['to'];

    let url = ''
    switch (to) {
      case 'repairs':
        url = '../facility/subpages/repairs/repairs'
        break;
      case 'order1':
        url = './subpages/orders/orders?active=0'
        break;
      case 'order2':
        url = './subpages/orders/orders?active=1'
        break;
      case 'accessoryList':
        url = '/pages/accessory/subpages/accessoryList/accessoryList'
        break;
      case 'facilityList':
        url = '/pages/facility/subpages/facilityList/facilityList'
        break;
      case 'record':
        url = './subpages/record/record'
        break;
      default:

    }
    wx.navigateTo({
      url: url
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    let role = app.globalData.userInfo.role;
    if (!role) return
    this.setData({
      role: role
    })
    permisionFilter(role, (res) => {
      this.setData({
        role: role,
        meuns: res
      })
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onShow: function () {
    // console.log(1111)
   
  }, 
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
