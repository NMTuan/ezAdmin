/*
 * @Author: NMTuan
 * @Email: NMTuan@qq.com
 * @Date: 2021-09-23 17:51:01
 * @LastEditTime: 2022-04-29 11:03:41
 * @LastEditors: NMTuan
 * @Description:
 * @FilePath: \ezAdmin\plugins\api.js
 */
export default ({ $axios }, inject) => {
  inject('api', {
    // get: params => $axios({ url: '/test/no', params }),
    // post: data => $axios({ url: '/test/no', method: 'post', data }),

    // 新闻列表
    getNewsList: params => $axios({ url: '/news/list', params }),

    // 用户管理
    getUserList: params => $axios({ url: '/user/list', params }),
    createUser: data => $axios({ url: '/user/create', method: 'post', data }),
    updateUser: data => $axios({ url: '/user/update', method: 'post', data }),
    removeUser: data => $axios({ url: '/user/remove', method: 'post', data }),

    getUserGroup: params => $axios({ url: '/user/group', params }),
    createGroup: data => $axios({ url: '/user/create', method: 'post', data }),
    fetchGroup: params => $axios({ url: '/user/group/fetch', params }),
    updateGroup: data => $axios({ url: '/user/update', method: 'post', data }),
    removeGroup: data => $axios({ url: '/user/remove', method: 'post', data }),

    // 表单部分
    fetchForm: params => $axios({ url: '/form/fetch', params }),
    updateForm: data => $axios({ url: '/form/update', method: 'post', data }),

    // dialog confirm
    confirm: data => $axios({ url: '/dialog/confirm', method: 'post', data }),

    // old
    // 获取产品列表
    getProductList: params => $axios({ url: '/product/list', params }),

    //
    myTable: params => $axios({ url: '/myTable', params }),

    // 管理员管理
    getAdminList: data =>
      $axios({
        url: '/user/admin-list',
        method: 'post',
        data
      }),
    fetchAdmin: data =>
      $axios({
        url: '/user/admin-view',
        method: 'post',
        data
      }),
    updateAdmin: data =>
      $axios({
        url: '/user/admin-save',
        method: 'post',
        data
      }),
    removeAdmin: data =>
      $axios({
        url: '/user/admin-del',
        method: 'post',
        data
      }),

    // 综合管理
    getLessonList: data =>
      $axios({
        url: '/lesson/index',
        method: 'post',
        data
      }),
    fetchLesson: data =>
      $axios({
        url: '/lesson/view-lesson',
        method: 'post',
        data
      }),
    updateLesson: data =>
      $axios({
        url: '/lesson/save-lesson',
        method: 'post',
        data
      }),
    removeLesson: data =>
      $axios({
        url: '/lesson/del-lesson',
        method: 'post',
        data
      }),
    getTakeList: data =>
      $axios({
        url: '/lesson/take-list',
        method: 'post',
        data
      }),
    fetchTake: data =>
      $axios({
        url: '/lesson/view-take',
        method: 'post',
        data
      }),
    updateTake: data =>
      $axios({
        url: '/lesson/save-take',
        method: 'post',
        data
      }),
    removeTake: data =>
      $axios({
        url: '/lesson/del-take',
        method: 'post',
        data
      }),
    getTimeList: data =>
      $axios({
        url: '/lesson/lesson-time-list',
        method: 'post',
        data
      }),
    fetchTime: data =>
      $axios({
        url: '/lesson/view-lesson-time',
        method: 'post',
        data
      }),
    updateTime: data =>
      $axios({
        url: '/lesson/save-lesson-time',
        method: 'post',
        data
      }),
    removeTime: data =>
      $axios({
        url: '/lesson/del-time',
        method: 'post',
        data
      }),
    getLessonStudentList: data =>
      $axios({
        url: '/lesson/take-log-list',
        method: 'post',
        data
      }),
    addLessonStudent: data =>
      $axios({
        url: '/lesson/add-take-stu',
        method: 'post',
        data
      }),
    removeLessonStudent: data =>
      $axios({
        url: '/lesson/del-take-stu',
        method: 'post',
        data
      }),
    finishTake: data =>
      $axios({
        url: '/lesson/finish-take',
        method: 'post',
        data
      }),
    getTakeLogStatList: data =>
      $axios({
        url: '/lesson/take-log-stat',
        method: 'post',
        data
      }),
    getTagStatList: data =>
      $axios({
        url: '/lesson/tag-stat',
        method: 'post',
        data
      }),
    lessonAward: data =>
      $axios({
        url: '/lesson/award',
        method: 'post',
        data
      }),
    logAward: data =>
      $axios({
        url: '/lesson/log-award',
        method: 'post',
        data
      }),

    // 教练管理
    getTeacherList: data =>
      $axios({
        url: '/teacher/index',
        method: 'post',
        data
      }),
    fetchTeacher: data =>
      $axios({
        url: '/teacher/view-teacher',
        method: 'post',
        data
      }),
    updateTeacher: data =>
      $axios({
        url: '/teacher/save-teacher',
        method: 'post',
        data
      }),
    removeTeacher: data =>
      $axios({
        url: '/teacher/del-teacher',
        method: 'post',
        data
      }),

    // 学员管理
    getStudentList: data =>
      $axios({
        url: '/student/index',
        method: 'post',
        data
      }),
    fetchStudent: data =>
      $axios({
        url: '/student/view-student',
        method: 'post',
        data
      }),
    updateStudent: data =>
      $axios({
        url: '/student/save-student',
        method: 'post',
        data
      }),
    removeStudent: data =>
      $axios({
        url: '/student/del-student',
        method: 'post',
        data
      }),
    updateStudentTime: data =>
      $axios({
        url: 'student/save-student-time',
        method: 'post',
        data
      }),

    // 试听管理
    getTryList: data =>
      $axios({
        url: '/student/try-list',
        method: 'post',
        data
      }),
    removeTry: data =>
      $axios({
        url: '/student/try-del',
        method: 'post',
        data
      }),
    userTryCode: data =>
      $axios({
        url: '/student/use-code',
        method: 'post',
        data
      }),
    viewTryCode: data =>
      $axios({
        url: '/student/try-view',
        method: 'post',
        data
      }),
    getTryVisitList: data =>
      $axios({
        url: '/student/try-visit-log',
        method: 'post',
        data
      }),
    addTryVisit: data =>
      $axios({
        url: '/student/add-try-visit',
        method: 'post',
        data
      }),
    // 获取学生课程信息
    getStudentLesson: data =>
      $axios({
        url: '/student/get-student-lesson',
        method: 'post',
        data
      }),
    // 绑定微信用户
    bindUser: data =>
      $axios({
        url: '/student/bind-user',
        method: 'post',
        data
      }),
    getWarnningList: data =>
      $axios({
        url: '/student/warnning',
        method: 'post',
        data
      }),

    // 学费管理
    getOrderList: data =>
      $axios({
        url: '/order/index',
        method: 'post',
        data
      }),
    getOrderOptions: data =>
      $axios({
        url: '/order/order-params',
        method: 'post',
        data
      }),
    createOrder: data =>
      $axios({
        url: '/order/create-order',
        method: 'post',
        data
      }),
    viewOrder: data =>
      $axios({
        url: '/order/view-order',
        method: 'post',
        data
      }),
    invalidOrder: data =>
      $axios({
        url: '/order/invalid-order',
        method: 'post',
        data
      }),

    // 志愿者管理
    getWxUserList: data =>
      $axios({
        url: '/user/wx-user-list',
        method: 'post',
        data
      }),
    viewWxUser: data =>
      $axios({
        url: '/user/wx-user-view',
        method: 'post',
        data
      }),
    updateWxUser: data =>
      $axios({
        url: '/user/save-wx-user',
        method: 'post',
        data
      }),
    removeWxUser: data =>
      $axios({
        url: '/user/del-wx-user',
        method: 'post',
        data
      }),
    approveWxUser: data =>
      $axios({
        url: '/user/approve',
        method: 'post',
        data
      }),
    fetchWxUserPoster: data =>
      $axios({
        url: '/user/poster-view',
        method: 'post',
        data
      }),

    updateTop: data =>
      $axios({
        url: '/user/change-top',
        method: 'post',
        data
      }),

    clearTop: data =>
      $axios({
        url: '/user/clear-top',
        method: 'post',
        data
      }),

    // 精彩瞬间
    getVideoList: data =>
      $axios({
        url: '/video/index',
        method: 'post',
        data
      }),
    updateVideo: data =>
      $axios({
        url: '/video/save-video',
        method: 'post',
        data
      }),
    fetchVideo: data =>
      $axios({
        url: '/video/view',
        method: 'post',
        data
      }),
    removeVideo: data =>
      $axios({
        url: '/video/del-video',
        method: 'post',
        data
      }),

    // 海报管理
    getPosterList: data =>
      $axios({
        url: '/poster/index',
        method: 'post',
        data
      }),
    updatePoster: data =>
      $axios({
        url: '/poster/save-poster',
        method: 'post',
        data
      }),
    fetchPoster: data =>
      $axios({
        url: '/poster/view',
        method: 'post',
        data
      }),
    removePoster: data =>
      $axios({
        url: '/poster/del-poster',
        method: 'post',
        data
      }),

    // 活动管理
    getActList: data =>
      $axios({
        url: '/act/index',
        method: 'post',
        data
      }),
    fetchAct: data =>
      $axios({
        url: '/act/view-act',
        method: 'post',
        data
      }),
    updateAct: data =>
      $axios({
        url: '/act/save-act',
        method: 'post',
        data
      }),
    removeAct: data =>
      $axios({
        url: '/act/del-act',
        method: 'post',
        data
      }),
    getActTimeList: data =>
      $axios({
        url: '/act/section-time-list',
        method: 'post',
        data
      }),
    updateActTime: data =>
      $axios({
        url: '/act/save-section-time',
        method: 'post',
        data
      }),
    fetchActTime: data =>
      $axios({
        url: '/act/view-section-time',
        method: 'post',
        data
      }),
    removeActTime: data =>
      $axios({
        url: '/act/del-section-time',
        method: 'post',
        data
      }),
    getActSectionList: data =>
      $axios({
        url: '/act/section-list',
        method: 'post',
        data
      }),
    updateActSection: data =>
      $axios({
        url: '/act/save-section',
        method: 'post',
        data
      }),
    fetchActSection: data =>
      $axios({
        url: '/act/view-section',
        method: 'post',
        data
      }),
    removeActSection: data =>
      $axios({
        url: '/act/del-section',
        method: 'post',
        data
      }),
    getActApplyList: data =>
      $axios({
        url: '/act/apply-list',
        method: 'post',
        data
      }),
    removeActApply: data =>
      $axios({
        url: '/act/del-apply',
        method: 'post',
        data
      }),
    // 上传
    uploadQiniu: 'https://sx-api.zssw.xyz/upload/qiniu',
    uploadQiniuVideo: 'https://sx-api.zssw.xyz/upload/qiniu-video'
    // uploadQiniu: data => $axios({ url: '/upload/qiniu', method: 'post', data })
  })
}
