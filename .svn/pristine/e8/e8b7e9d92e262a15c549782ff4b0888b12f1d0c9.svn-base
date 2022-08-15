function init() {
  $api.setStorage('url', 'http://nep.nepviewer.com/pv_monitor/appservice/');


}
function initLang(callBack){
  // $api.setStorage('lang','zh');
  lang = $api.getStorage('lang');
  // alert(lang);
  if(!lang)
  {
    lang = checkLang();
  }
  // alert(lang);
  // lang = "zh";
  loadScript(lang,function(ret,err){
    callBack(ret, err);
  });

}
function checkLang()
{

    lang = navigator.language.toLowerCase();
    // alert(lang);
    switch (lang) {
      case "zh-cn":
        return "zh";
        break;
      case "en":
        return "en";
        break;
      case "ja-jp":
        return "ja";
        break;
      case "es-xl":
        return "es";
        break;
      default:
        return "en";
        break;
    }
}

function loadScript(name,callBack) {

    // alert(name);
    var localDir = api.wgtRootDir + '/language/';
    api.readFile({
      path: localDir + name + '.json'
    }, function(ret, err) {
      // alert(JSON.stringify(ret))
      if (ret.status) {
        localization = JSON.parse(ret.data);
        // console.log(localization)
        // alert(localization.registe);
        $api.setStorage("localization", localization);
        callBack(ret, err);
        // alert(JSON.stringify(localization));
      } else {
        loadScript("en",function(ret,err){
          callBack(ret, err);
        });
        // alert(err.msg);
      }
    });
}

function loadJson() {
  var localDir = api.wgtRootDir + '/res/';
  api.readFile({
    path: localDir + 'lang.json'
  }, function(ret, err) {
    if (ret.status) {
      alert(ret.data);
      // $api.setStorage(name, ret.data);
    } else {
      alert(err.msg);
    }
  });

}
function openWin(name, pageparam) {
  var htmlDir = 'widget://html/';
  // alert(JSON.stringify(pageparam));
  api.openWin({
    name: '' + name + '_win',
    url: htmlDir + name + '_win.html',
    pageParam: pageparam
  });
}

function openFrame(name,bounces, x, y, w, h, pageparam) {
  // alert('widget://html/'+name+'_frm.html')  ;
  api.openFrame({
    name: '' + name + '_frm',
    url: 'widget://html/' + name + '_frm.html',
    bounces: bounces,
    rect: {
      x: x,
      y: y,
      w: w,
      h: h
    },
    pageParam: pageparam
  })

}


//ajax请求
function ajaxRequest(url, params, callBack) {

  var datas=params;
  datas["token"]= $api.getStorage('token');
  // alert(JSON.stringify(url))
  // alert(JSON.stringify(datas))
  api.ajax({
    url: url,
    method: 'post',
    cache: false,
    timeout: 30,
    dataType: 'json',
    data: {
      values: datas
    }
  }, function(ret, err) {
    // alert(JSON.stringify(ret))
    if (ret) {
      callBack(ret, err);
    } else {
      api.alert({
        msg: ('network error')
      });
      alert(JSON.stringify(err));
    }
  });
}


function ajaxUpload(url,datas,callBack){
  // alert(JSON.stringify(datas))
   api.ajax({
        url:url,
        method:"post",
        data: datas,
        cache: false,
        timeout: 30,
        dataType:'json',
        returnAll:false,
    },function(ret,err){
      // alert(JSON.stringify(err));
      callBack(ret,err);
    })
}


function setTitle(text)
{
  $api.text($api.dom('.aui-title'), unescape(text));
}

function showPopup(location){
    popup.init({
        frameBounces:true,//当前页面是否弹动，（主要针对安卓端）
        location:location,//位置，top(默认：顶部中间),top-left top-right,bottom,bottom-left,bottom-right
        buttons:[{
            image:'../image/share/clear.png',
            text:'切换账号',
            value:'clear'//可选
        }],
    },function(ret){
        if(ret){

            if(ret.buttonValue=="clear")
            {
                $api.clearStorage();
                // api.clearCache(function(ret, err) {

                // });
                init();
                window.location.reload();

            }

        }
    })
}

function closeWin() {
    api.closeWin({
    });
}



function pullRefresh(){

    api.setCustomRefreshHeaderInfo({
        bgColor : '#f0f0f0',
        image : {
            pull : [
                'widget://image/refresh/pull.png',
                'widget://image/refresh/pull_end_image_frame_01.png',
                'widget://image/refresh/pull_end_image_frame_02.png',
                'widget://image/refresh/pull_end_image_frame_03.png',
                'widget://image/refresh/pull_end_image_frame_04.png',
                'widget://image/refresh/pull_end_image_frame_05.png'
            ],
            load : [
                'widget://image/refresh/refreshing_image_frame_01.png',
                'widget://image/refresh/refreshing_image_frame_02.png',
                'widget://image/refresh/refreshing_image_frame_03.png',
                'widget://image/refresh/refreshing_image_frame_04.png',
                'widget://image/refresh/refreshing_image_frame_05.png',
                'widget://image/refresh/refreshing_image_frame_06.png'
            ]
        }
    }, function() {
        $api.val($api.byId('page'), 1);
        loadData(function(data){
            // alert(JSON.stringify(data));
            api.refreshHeaderLoadDone()
        });
        // api.refreshHeaderLoadDone() ;

    });
}


function encrypt()
{
  var signature = api.require('signature');
  signature.aes({
      data: api.getStorage('token'),
      key: 'NEPVIEW'
  }, function(ret, err) {
      if (ret.status) {
          alert(JSON.stringify(ret));
      } else {
          alert(JSON.stringify(err));
      }
  });
}

