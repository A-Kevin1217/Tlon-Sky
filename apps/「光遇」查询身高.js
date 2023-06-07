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
    var version_='jsjiami.com.v7';function _0x2b5d(_0x2c823b,_0x2e41ec){const _0x3536cd=_0x3536();return _0x2b5d=function(_0x2b5da6,_0x11a3af){_0x2b5da6=_0x2b5da6-0x177;let _0x3c7a61=_0x3536cd[_0x2b5da6];if(_0x2b5d['nfKoky']===undefined){var _0x560ede=function(_0x4ef440){const _0x263f9e='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x200126='',_0x9b3baa='';for(let _0x18f60a=0x0,_0x23a48e,_0x109bb2,_0x223358=0x0;_0x109bb2=_0x4ef440['charAt'](_0x223358++);~_0x109bb2&&(_0x23a48e=_0x18f60a%0x4?_0x23a48e*0x40+_0x109bb2:_0x109bb2,_0x18f60a++%0x4)?_0x200126+=String['fromCharCode'](0xff&_0x23a48e>>(-0x2*_0x18f60a&0x6)):0x0){_0x109bb2=_0x263f9e['indexOf'](_0x109bb2);}for(let _0x578eb2=0x0,_0x4bc29b=_0x200126['length'];_0x578eb2<_0x4bc29b;_0x578eb2++){_0x9b3baa+='%'+('00'+_0x200126['charCodeAt'](_0x578eb2)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x9b3baa);};const _0x30b71b=function(_0x4a10dc,_0x1fd6c7){let _0x71520b=[],_0x546dea=0x0,_0x1ce713,_0x2d6f6f='';_0x4a10dc=_0x560ede(_0x4a10dc);let _0x317395;for(_0x317395=0x0;_0x317395<0x100;_0x317395++){_0x71520b[_0x317395]=_0x317395;}for(_0x317395=0x0;_0x317395<0x100;_0x317395++){_0x546dea=(_0x546dea+_0x71520b[_0x317395]+_0x1fd6c7['charCodeAt'](_0x317395%_0x1fd6c7['length']))%0x100,_0x1ce713=_0x71520b[_0x317395],_0x71520b[_0x317395]=_0x71520b[_0x546dea],_0x71520b[_0x546dea]=_0x1ce713;}_0x317395=0x0,_0x546dea=0x0;for(let _0x59d1fd=0x0;_0x59d1fd<_0x4a10dc['length'];_0x59d1fd++){_0x317395=(_0x317395+0x1)%0x100,_0x546dea=(_0x546dea+_0x71520b[_0x317395])%0x100,_0x1ce713=_0x71520b[_0x317395],_0x71520b[_0x317395]=_0x71520b[_0x546dea],_0x71520b[_0x546dea]=_0x1ce713,_0x2d6f6f+=String['fromCharCode'](_0x4a10dc['charCodeAt'](_0x59d1fd)^_0x71520b[(_0x71520b[_0x317395]+_0x71520b[_0x546dea])%0x100]);}return _0x2d6f6f;};_0x2b5d['BYpWsu']=_0x30b71b,_0x2c823b=arguments,_0x2b5d['nfKoky']=!![];}const _0x4c84ca=_0x3536cd[0x0],_0xeaa65a=_0x2b5da6+_0x4c84ca,_0x333bd0=_0x2c823b[_0xeaa65a];return!_0x333bd0?(_0x2b5d['YNUHqB']===undefined&&(_0x2b5d['YNUHqB']=!![]),_0x3c7a61=_0x2b5d['BYpWsu'](_0x3c7a61,_0x11a3af),_0x2c823b[_0xeaa65a]=_0x3c7a61):_0x3c7a61=_0x333bd0,_0x3c7a61;},_0x2b5d(_0x2c823b,_0x2e41ec);}function _0x3536(){const _0x3bc4f5=(function(){return[version_,'IjWUlslBjifJaKtmQiM.fctogmS.qvJQ7BPJKFSP==','cudcLWOQmSopWO3cQblcHSoegW','o0BcRwRdOf9uW44','W7e1W6fqug0dlG','W4xdLtS','WQixnMO4W7FcOW','wKFdKCo5WR5HfG','W6voh3X9WOhcMmoEeKJcGCod','AqhcVNpdJhHcW6xcHr8Stbu','sSkZW5FdQG','WRhcR1zL','W7y8WRGmeZvzjMxdGNRcLCos','aoI7N+MOLchdOtBLGiRVVRC','W7XaW4PRW7aHW6q','yComWPZcGNjmgw3cN8kUtSokaq','WP1qFgqrW6j3ka','WP0bW6rHWPC','WOrlW4RdS8ot','gu3dSCoCWQ5afG'].concat((function(){return['W48xWPxcPCkeWONcGxXYW414WPK','WPddHEw0VEAuUUw8Ro+8NEATI+wEPUACQ+IUKSkEAvm','W4FdHJhdLSkgjSoKj8oyW4/cNCkFW4GPu0ldHCooWQ9ikmo7raSvxYtcLZH1WPHpWPFdRCkVW5hdUCopnSoxkhhcQCo2h8kze8kNW7qrCSk2FmkOF1HCsSoIW51MWPveWP7dSCk/WP/dSCoj','FHT+WPW8','m0xdTtFcMczeW7xcRXSYvq','WOvcW5pdVmop','W6hdJJnnqCo1qq','5OcG6l6H5P6o57UC5A+fwLi','AqiXW4JdKhZcMbW','vGBdGr1PW4mbidP5WRH6','v8oAWQOwaq','WRNcRmkArSkUkhZdKmkm','WP9xt2G/W45uka','gGXfWPv5W6q','l0eMW4z7gmk/W4aOlZxcHq','aGzTWPT1W6NdHq','WRRdIGvad8olsI0pW4ddUfu','lKukW4i','FhBdJMxcUmoTWOmKWPi','WPOBdK7dI1JdLmkolq'].concat((function(){return['W6RcM0a6sSkDxHuxW4ldKf3dIW8','WRpcJCkRcCknzCkpkb50fCkLW6S','WO0pgfW','W7NdOCozhSo2FcBdUmkVWOJcNcD4','W4NcTmk6WR/dKCkbWPZcSG','WRpMN5dPQQFLJQVLIytVVPe','W4dcLCoMW5RcKCkdWO8nWRy','W6NcVJ7dI8oy','W6FdUHuXe8k4BNJdQmoqWOdcGSoL','W7WXWR9yWRa','hxbMfSoKWPhdRW','W4zeEqbCWQ3cT8oNW6FdLMJdUq','nSonW44yzGHZc23cUmoDxW','WPngW5FdSq','W65dW6nTW7O','W4ddGdP+DCo/qa','umolWRXc'];}()));}()));}());_0x3536=function(){return _0x3bc4f5;};return _0x3536();};const _0x1a183e=_0x2b5d;(function(_0xbc9341,_0x3392e8,_0x1ec5e6,_0xa1c8a7,_0x1c6282,_0x460ca6,_0x5e7f90){return _0xbc9341=_0xbc9341>>0x5,_0x460ca6='hs',_0x5e7f90='hs',function(_0xf69d72,_0x18a882,_0x4cb6d3,_0x4fc97f,_0x2da3d7){const _0x5cb945=_0x2b5d;_0x4fc97f='tfi',_0x460ca6=_0x4fc97f+_0x460ca6,_0x2da3d7='up',_0x5e7f90+=_0x2da3d7,_0x460ca6=_0x4cb6d3(_0x460ca6),_0x5e7f90=_0x4cb6d3(_0x5e7f90),_0x4cb6d3=0x0;const _0x1103bc=_0xf69d72();while(!![]&&--_0xa1c8a7+_0x18a882){try{_0x4fc97f=parseInt(_0x5cb945(0x19c,'wNCK'))/0x1+-parseInt(_0x5cb945(0x187,'O%@e'))/0x2+parseInt(_0x5cb945(0x186,'ar*R'))/0x3*(parseInt(_0x5cb945(0x1a3,'xPL5'))/0x4)+parseInt(_0x5cb945(0x197,'2Ef7'))/0x5*(parseInt(_0x5cb945(0x182,'2Ef7'))/0x6)+parseInt(_0x5cb945(0x18f,'rep8'))/0x7*(parseInt(_0x5cb945(0x18e,'nb8b'))/0x8)+-parseInt(_0x5cb945(0x178,'cEH3'))/0x9+parseInt(_0x5cb945(0x183,'TSK*'))/0xa*(-parseInt(_0x5cb945(0x18b,'TSK*'))/0xb);}catch(_0x49cbe8){_0x4fc97f=_0x4cb6d3;}finally{_0x2da3d7=_0x1103bc[_0x460ca6]();if(_0xbc9341<=_0xa1c8a7)_0x4cb6d3?_0x1c6282?_0x4fc97f=_0x2da3d7:_0x1c6282=_0x2da3d7:_0x4cb6d3=_0x2da3d7;else{if(_0x4cb6d3==_0x1c6282['replace'](/[KQgUfJSWlqMFPBIt=]/g,'')){if(_0x4fc97f===_0x18a882){_0x1103bc['un'+_0x460ca6](_0x2da3d7);break;}_0x1103bc[_0x5e7f90](_0x2da3d7);}}}}}(_0x1ec5e6,_0x3392e8,function(_0x219858,_0x4c3f9e,_0x360682,_0x44f1f3,_0x1ea0a3,_0x5dd535,_0x441e62){return _0x4c3f9e='\x73\x70\x6c\x69\x74',_0x219858=arguments[0x0],_0x219858=_0x219858[_0x4c3f9e](''),_0x360682='\x72\x65\x76\x65\x72\x73\x65',_0x219858=_0x219858[_0x360682]('\x76'),_0x44f1f3='\x6a\x6f\x69\x6e',(0x12f742,_0x219858[_0x44f1f3](''));});}(0x17e0,0x91ef9,_0x3536,0xc1),_0x3536)&&(version_=_0x3536);var json=JSON[_0x1a183e(0x190,'Y0dR')](fs['readFileSync'](dirpath+'/'+filename,_0x1a183e(0x180,'53#O'))),id=e[_0x1a183e(0x192,'ar*R')];let msg=e[_0x1a183e(0x184,'aF7F')],place=msg[_0x1a183e(0x17f,'stYn')](/#|身高查询/g,'')[_0x1a183e(0x1a4,']V0O')]();if(json[_0x1a183e(0x1a7,'xPL5')](id)){await e[_0x1a183e(0x19d,'53#O')](_0x1a183e(0x194,'kb!n'),![],{'recallMsg':0xa},!![]),place=JSON[_0x1a183e(0x19e,'&9G4')](json[id][_0x1a183e(0x199,'stYn')])[_0x1a183e(0x191,'qlND')](0x1,-0x1);let response=await fetch(_0x1a183e(0x195,'O^TS')+place),data=await response['json']();place=JSON['stringify'](json[id][_0x1a183e(0x185,'0)Ar')]),place=place[_0x1a183e(0x177,')pHk')](0x1,-0x1);if(data['code']=0xc8){let S值=data[_0x1a183e(0x17d,'qlND')][_0x1a183e(0x179,'8^od')],H值=data[_0x1a183e(0x18a,'cEH3')]['height'],最高_原值=data['data'][_0x1a183e(0x1ad,'$FEp')],最矮_原值=data[_0x1a183e(0x189,'IsR*')]['minHeight'],当前_原值=data[_0x1a183e(0x1a9,'B@dB')][_0x1a183e(0x188,'2Ef7')],最高=Math[_0x1a183e(0x196,'O4Vr')](最高_原值*0x64)/0x64,最矮=Math['floor'](最矮_原值*0x64)/0x64,当前=Math[_0x1a183e(0x17e,'7Zcr')](当前_原值*0x64)/0x64;msg=['UID：'+(place[_0x1a183e(0x1a5,'x3G9')](0x0,0xa)+'*'['repeat'](place[_0x1a183e(0x1a0,'lWfV')]-0x14)+place[_0x1a183e(0x1a6,'B@dB')](place['length']-0xa))+'\x0a体型\x20S\x20值：'+S值+_0x1a183e(0x18c,'2Ef7')+H值+_0x1a183e(0x1ac,'aTQz')+最高[_0x1a183e(0x18d,'7Zcr')](0x2)+'\x0a最矮可到：'+最矮[_0x1a183e(0x17a,'M2!$')](0x2)+'\x0a当前身高：'+当前[_0x1a183e(0x1a2,'lWfV')](0x2)];}else msg=['绑定id错误,请绑定正确id'];await this[_0x1a183e(0x198,'qlND')](msg,!![]);}else await e['reply'](_0x1a183e(0x19a,'BP!@'));var version_ = 'jsjiami.com.v7';
}
}