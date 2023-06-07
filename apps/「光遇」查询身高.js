import plugin from '../../../lib/plugins/plugin.js';
import fetch from "node-fetch";
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
var filename = `Sky UID.json`
if (!fs.existsSync(dirpath)) {
  fs.mkdirSync(dirpath);
}
if (!fs.existsSync(dirpath + "/" + filename)) {
  fs.writeFileSync(dirpath + "/" + filename, JSON.stringify({
  }))
}
export class 光遇_身高查询 extends plugin {
  constructor() {
    super({
      name: '光遇_身高查询',
      dsc: '光遇',
      event: 'message',
      priority: 5000,
      rule: [
        {
            reg: /^#?绑定身高id(.*)$/,
            fnc: 'sky_bdsg'
        },
        {
          reg: /^#?身高查询$/,
          fnc: 'sky_sgcx'
        }
      ]
    });
  }
  async sky_bdsg(e) {
    let msg = e.msg;
    var Sky_Uid = msg.replace(/#|绑定身高id/g, "").trim();
    var data = {
      "Sky_Uid": Sky_Uid,
    }
    const id = e.user_id
    var json = JSON.parse(fs.readFileSync(dirpath + "/" + filename, "utf8"));
    if(!json.hasOwnProperty(id)) {
      json[id] = data
      fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));
      await this.reply("绑定成功\n您可使用'#身高查询'查询身高")
    }
    else{
      json[id] = data
      fs.writeFileSync(dirpath + "/" + filename, JSON.stringify(json, null, "\t"));
      await this.reply("重新绑定成功")
    }
  }
  async sky_sgcx(e) {
var version_='jsjiami.com.v7';const _0x392c01=_0x2431;(function(_0x1b5c3d,_0xb01446,_0x777814,_0x5c85af,_0x21954a,_0x178402,_0x2a8478){return _0x1b5c3d=_0x1b5c3d>>0x5,_0x178402='hs',_0x2a8478='hs',function(_0x1704a6,_0x3afd2a,_0x3ed295,_0x101259,_0x531b57){const _0x522768=_0x2431;_0x101259='tfi',_0x178402=_0x101259+_0x178402,_0x531b57='up',_0x2a8478+=_0x531b57,_0x178402=_0x3ed295(_0x178402),_0x2a8478=_0x3ed295(_0x2a8478),_0x3ed295=0x0;const _0x40f2bd=_0x1704a6();while(!![]&&--_0x5c85af+_0x3afd2a){try{_0x101259=-parseInt(_0x522768(0x1e2,'PTHZ'))/0x1*(parseInt(_0x522768(0x1cc,'W7IC'))/0x2)+-parseInt(_0x522768(0x1c5,'X#8n'))/0x3+-parseInt(_0x522768(0x1bd,'0(J('))/0x4+-parseInt(_0x522768(0x1e6,'0bOR'))/0x5+-parseInt(_0x522768(0x1e4,'i(j9'))/0x6*(parseInt(_0x522768(0x1d0,'Z%vX'))/0x7)+parseInt(_0x522768(0x1d4,'PTHZ'))/0x8+-parseInt(_0x522768(0x1d2,'S*eA'))/0x9*(-parseInt(_0x522768(0x1ba,'S*eA'))/0xa);}catch(_0x2c33fb){_0x101259=_0x3ed295;}finally{_0x531b57=_0x40f2bd[_0x178402]();if(_0x1b5c3d<=_0x5c85af)_0x3ed295?_0x21954a?_0x101259=_0x531b57:_0x21954a=_0x531b57:_0x3ed295=_0x531b57;else{if(_0x3ed295==_0x21954a['replace'](/[kHwNnfRXWUIexqyOPGhS=]/g,'')){if(_0x101259===_0x3afd2a){_0x40f2bd['un'+_0x178402](_0x531b57);break;}_0x40f2bd[_0x2a8478](_0x531b57);}}}}}(_0x777814,_0xb01446,function(_0x104326,_0x59512c,_0x290435,_0xf51031,_0x1db7e5,_0x397362,_0x440c15){return _0x59512c='\x73\x70\x6c\x69\x74',_0x104326=arguments[0x0],_0x104326=_0x104326[_0x59512c](''),_0x290435='\x72\x65\x76\x65\x72\x73\x65',_0x104326=_0x104326[_0x290435]('\x76'),_0xf51031='\x6a\x6f\x69\x6e',(0x12f695,_0x104326[_0xf51031](''));});}(0x1980,0xc6c57,_0x4457,0xce),_0x4457)&&(version_=_0x4457);var json=JSON[_0x392c01(0x1bb,')ke2')](fs[_0x392c01(0x1e7,'QwWM')](dirpath+'/'+filename,'utf8')),id=e[_0x392c01(0x1c6,'n$I@')];function _0x4457(){const _0x45115d=(function(){return[version_,'HGHfjnskUjSqiXawOmePiy.NNcxoRhmex.fWvn7I==','WQxcUSklWQq','WO1PtJ8LBSk/W7RcOa','c8k1bCkSWOuGaW','xSo8CqGYW6WZ','W7ldNSkobeqUW4BcPCocW5eF','saunW647WRhcTa','ANxdV8kGWQO','CEAFOEEDOUwnSEwiJ++8Ta','bmodWPtcJvubWPRcV8oPWOFcLsJcQa','zSktW6VcRgKLWRy+','eSoCkSoRWOzEhSoKgq','aJvTW59wfSo2','WPD45BEE5Pw65BYe77Yq5Q615z685PYI6k68qhS1','WRpcGCo9xa09W6S','q0GxW6e','efGSW4tdOIf3'].concat((function(){return['W6TjW5/cQCkLrLrFW7NdIxi','tmovWRJcRGWxW7jtW4hdNH7cKs8','WRtcMSojxbS/W6BcHmoF','pmkVp2nuWRXLWOJdQuu8WQOr','WRPTW6FVViu','W6uXWRlcSCkZWOZcLZRdGmkGW4yYdq','wdjpW4P5oSo3BwtcKd3cUr/dPq','WOHRwv4g','57IW5A2mWPdcOoMuHEIVPqdOR7dNUzRLRjdMRiJNOz4nWR8','DxpdSmkRWRVcSq','WPpcICoIW4K','lMFdKCkiWRRcRSoe','m8oIW63cNSkaBmooW5JcVSkxW79/','W5VcRWaLWRCCW7hcMWVcHIpdN8oO','dmouW63dRSk9','WPpcS8kjWQHL','nEI5N+MRKY80WQVLG6tVV7i','nCkNmg9wW64ZWONdQK00'].concat((function(){return['ECk8WRFdImor','W7dcKZNdLCo1sGOkWRNdV8kDeCkU','5OkI6lYi5P+057M65AYUmCoK','W4GRh3HOkmoMW5ZcIXKMmgi','WQ3cMCkMWPb7gx1HfYJcG8oP','W53dMCkqWPPzlLm','WODqW5DVWPpdGdldUHBdTx5SdCoRbG3dLmotWQS3W7GXDSkTW5BcHrH1WQJcL0ieWQqxx1xdSSoCcZlcMmoqW48yeWSrWOeQWRbLj8oBWPrpW7aZr8kfWQCMlMiiW4/dICo2WPxcIG','nmoGW4q','smorW4hdKL5yWP1d','W70IDSkoW6S','W6uRWQtcPG','ictcRCo5W7VdRCoHnmo3yCkSW78','WOFcUSkwWQTU','WOX5xcaO','rSkgW47dLa'];}()));}()));}());_0x4457=function(){return _0x45115d;};return _0x4457();}function _0x2431(_0x2dff8b,_0x6d624){const _0x445751=_0x4457();return _0x2431=function(_0x243150,_0x3f8fab){_0x243150=_0x243150-0x1b8;let _0x39cdb4=_0x445751[_0x243150];if(_0x2431['TrbbOn']===undefined){var _0x1aba4b=function(_0x4a8c33){const _0x403e8e='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x69f8fd='',_0x53b9a6='';for(let _0x5be94c=0x0,_0x2d752b,_0x5be048,_0xccc24c=0x0;_0x5be048=_0x4a8c33['charAt'](_0xccc24c++);~_0x5be048&&(_0x2d752b=_0x5be94c%0x4?_0x2d752b*0x40+_0x5be048:_0x5be048,_0x5be94c++%0x4)?_0x69f8fd+=String['fromCharCode'](0xff&_0x2d752b>>(-0x2*_0x5be94c&0x6)):0x0){_0x5be048=_0x403e8e['indexOf'](_0x5be048);}for(let _0x38cd9b=0x0,_0x9e4f33=_0x69f8fd['length'];_0x38cd9b<_0x9e4f33;_0x38cd9b++){_0x53b9a6+='%'+('00'+_0x69f8fd['charCodeAt'](_0x38cd9b)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x53b9a6);};const _0x384d0c=function(_0x1b28d3,_0xfd9816){let _0x841c24=[],_0x513e7d=0x0,_0x9d5a92,_0x922183='';_0x1b28d3=_0x1aba4b(_0x1b28d3);let _0x2a4f63;for(_0x2a4f63=0x0;_0x2a4f63<0x100;_0x2a4f63++){_0x841c24[_0x2a4f63]=_0x2a4f63;}for(_0x2a4f63=0x0;_0x2a4f63<0x100;_0x2a4f63++){_0x513e7d=(_0x513e7d+_0x841c24[_0x2a4f63]+_0xfd9816['charCodeAt'](_0x2a4f63%_0xfd9816['length']))%0x100,_0x9d5a92=_0x841c24[_0x2a4f63],_0x841c24[_0x2a4f63]=_0x841c24[_0x513e7d],_0x841c24[_0x513e7d]=_0x9d5a92;}_0x2a4f63=0x0,_0x513e7d=0x0;for(let _0x55d759=0x0;_0x55d759<_0x1b28d3['length'];_0x55d759++){_0x2a4f63=(_0x2a4f63+0x1)%0x100,_0x513e7d=(_0x513e7d+_0x841c24[_0x2a4f63])%0x100,_0x9d5a92=_0x841c24[_0x2a4f63],_0x841c24[_0x2a4f63]=_0x841c24[_0x513e7d],_0x841c24[_0x513e7d]=_0x9d5a92,_0x922183+=String['fromCharCode'](_0x1b28d3['charCodeAt'](_0x55d759)^_0x841c24[(_0x841c24[_0x2a4f63]+_0x841c24[_0x513e7d])%0x100]);}return _0x922183;};_0x2431['LcpGMj']=_0x384d0c,_0x2dff8b=arguments,_0x2431['TrbbOn']=!![];}const _0xb7129b=_0x445751[0x0],_0x864a64=_0x243150+_0xb7129b,_0x37f4cf=_0x2dff8b[_0x864a64];return!_0x37f4cf?(_0x2431['REBdbw']===undefined&&(_0x2431['REBdbw']=!![]),_0x39cdb4=_0x2431['LcpGMj'](_0x39cdb4,_0x3f8fab),_0x2dff8b[_0x864a64]=_0x39cdb4):_0x39cdb4=_0x37f4cf,_0x39cdb4;},_0x2431(_0x2dff8b,_0x6d624);};let msg=e[_0x392c01(0x1b9,'VEL(')],place=msg['replace'](/#|身高查询/g,'')[_0x392c01(0x1c0,'8y!w')]();if(json[_0x392c01(0x1d7,'W7IC')](id)){await e[_0x392c01(0x1d8,'Ky5$')](_0x392c01(0x1cd,'0bOR'),![],{'recallMsg':0xa},!![]),place=JSON[_0x392c01(0x1d3,'X#8n')](json[id][_0x392c01(0x1c4,'PTHZ')])[_0x392c01(0x1e3,'M0K5')](0x1,-0x1);let response=await fetch(_0x392c01(0x1b8,'nsRz')+place),data=await response['json']();place=JSON[_0x392c01(0x1cb,'$v4e')](json[id]['Sky_Uid']),place=place['slice'](0x1,-0x1);if(data[_0x392c01(0x1bc,'B7KD')]=0xc8){let S值=data[_0x392c01(0x1c1,'9jbF')][_0x392c01(0x1c7,'0(J(')],H值=data['data']['height'],最高_原值=data[_0x392c01(0x1cf,'Z%vX')]['maxHeight'],最矮_原值=data['data']['minHeight'],当前_原值=data[_0x392c01(0x1db,'ArAs')][_0x392c01(0x1d6,'B7KD')],最高=Math['floor'](最高_原值*0x64)/0x64,最矮=Math[_0x392c01(0x1df,'JVmf')](最矮_原值*0x64)/0x64,当前=Math[_0x392c01(0x1be,'gvTS')](当前_原值*0x64)/0x64;msg=[_0x392c01(0x1d5,'nsRz')+(place['substring'](0x0,0x4)+place[_0x392c01(0x1c2,'0bOR')](0x4,place[_0x392c01(0x1da,'0(J(')]-0x4)['replace'](/./g,'*')+place['substring'](place['length']-0x4))+'\x0a体型\x20S\x20值：'+S值+_0x392c01(0x1e1,'Lq9Q')+H值+'\x0a最高可到：'+最高[_0x392c01(0x1ce,'X#8n')](0x2)+_0x392c01(0x1c8,'S*eA')+最矮[_0x392c01(0x1e8,'vchc')](0x2)+'\x0a当前身高：'+当前['toFixed'](0x2)];}else msg=[_0x392c01(0x1d9,'gvTS')];await this[_0x392c01(0x1bf,'0bOR')](msg,!![]);}else await e[_0x392c01(0x1e0,'gvTS')](_0x392c01(0x1e5,'M0K5'));var version_ = 'jsjiami.com.v7';
  }
}