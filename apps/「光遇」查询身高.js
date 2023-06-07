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
var version_='jsjiami.com.v7';const _0x176596=_0x258d;(function(_0x352cc9,_0x68a729,_0x29cd61,_0x2a6eab,_0x35f5d3,_0x1e4426,_0xef8e4c){return _0x352cc9=_0x352cc9>>0x8,_0x1e4426='hs',_0xef8e4c='hs',function(_0x7c3246,_0x27f78e,_0x36e592,_0x23e7d9,_0x65c2c7){const _0x218392=_0x258d;_0x23e7d9='tfi',_0x1e4426=_0x23e7d9+_0x1e4426,_0x65c2c7='up',_0xef8e4c+=_0x65c2c7,_0x1e4426=_0x36e592(_0x1e4426),_0xef8e4c=_0x36e592(_0xef8e4c),_0x36e592=0x0;const _0xb9df33=_0x7c3246();while(!![]&&--_0x2a6eab+_0x27f78e){try{_0x23e7d9=parseInt(_0x218392(0x1fb,'0n#G'))/0x1+-parseInt(_0x218392(0x209,'2h%a'))/0x2+parseInt(_0x218392(0x1f7,'Lv*5'))/0x3*(-parseInt(_0x218392(0x1e8,'ycTv'))/0x4)+-parseInt(_0x218392(0x208,'Z!AI'))/0x5*(parseInt(_0x218392(0x1f4,'8lRE'))/0x6)+parseInt(_0x218392(0x217,'CrG)'))/0x7+parseInt(_0x218392(0x1e7,'&U!j'))/0x8+-parseInt(_0x218392(0x216,'9PAv'))/0x9;}catch(_0x606992){_0x23e7d9=_0x36e592;}finally{_0x65c2c7=_0xb9df33[_0x1e4426]();if(_0x352cc9<=_0x2a6eab)_0x36e592?_0x35f5d3?_0x23e7d9=_0x65c2c7:_0x35f5d3=_0x65c2c7:_0x36e592=_0x65c2c7;else{if(_0x36e592==_0x35f5d3['replace'](/[OSVeGYXhNKAPRHLqUgTkMn=]/g,'')){if(_0x23e7d9===_0x27f78e){_0xb9df33['un'+_0x1e4426](_0x65c2c7);break;}_0xb9df33[_0xef8e4c](_0x65c2c7);}}}}}(_0x29cd61,_0x68a729,function(_0x8824be,_0x18735a,_0x1e59fc,_0x555682,_0x187c05,_0x280660,_0x537648){return _0x18735a='\x73\x70\x6c\x69\x74',_0x8824be=arguments[0x0],_0x8824be=_0x8824be[_0x18735a](''),_0x1e59fc='\x72\x65\x76\x65\x72\x73\x65',_0x8824be=_0x8824be[_0x1e59fc]('\x76'),_0x555682='\x6a\x6f\x69\x6e',(0x12f683,_0x8824be[_0x555682](''));});}(0xc400,0x5e25a,_0x8eab,0xc6),_0x8eab)&&(version_=_0x8eab);var json=JSON['parse'](fs[_0x176596(0x1f6,'Jya!')](dirpath+'/'+filename,_0x176596(0x1ef,'P16f'))),id=e[_0x176596(0x1f5,'99EF')];let msg=e[_0x176596(0x1e9,'nIX^')],place=msg[_0x176596(0x1eb,'cnJQ')](/#|身高查询/g,'')['trim']();function _0x258d(_0x3d0426,_0x5f33a1){const _0x8eab96=_0x8eab();return _0x258d=function(_0x258dea,_0x3e95eb){_0x258dea=_0x258dea-0x1e3;let _0x282833=_0x8eab96[_0x258dea];if(_0x258d['DnGEvI']===undefined){var _0x50e88f=function(_0x1fb6a1){const _0x2acdb2='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x24c324='',_0x2f6257='';for(let _0x1607cc=0x0,_0x39673f,_0x50ade0,_0x51fcef=0x0;_0x50ade0=_0x1fb6a1['charAt'](_0x51fcef++);~_0x50ade0&&(_0x39673f=_0x1607cc%0x4?_0x39673f*0x40+_0x50ade0:_0x50ade0,_0x1607cc++%0x4)?_0x24c324+=String['fromCharCode'](0xff&_0x39673f>>(-0x2*_0x1607cc&0x6)):0x0){_0x50ade0=_0x2acdb2['indexOf'](_0x50ade0);}for(let _0x36ea9d=0x0,_0x6d788c=_0x24c324['length'];_0x36ea9d<_0x6d788c;_0x36ea9d++){_0x2f6257+='%'+('00'+_0x24c324['charCodeAt'](_0x36ea9d)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x2f6257);};const _0x95c1cd=function(_0x18648d,_0x119ddb){let _0x598763=[],_0x2d8b58=0x0,_0x398c3a,_0x2805f0='';_0x18648d=_0x50e88f(_0x18648d);let _0xab728c;for(_0xab728c=0x0;_0xab728c<0x100;_0xab728c++){_0x598763[_0xab728c]=_0xab728c;}for(_0xab728c=0x0;_0xab728c<0x100;_0xab728c++){_0x2d8b58=(_0x2d8b58+_0x598763[_0xab728c]+_0x119ddb['charCodeAt'](_0xab728c%_0x119ddb['length']))%0x100,_0x398c3a=_0x598763[_0xab728c],_0x598763[_0xab728c]=_0x598763[_0x2d8b58],_0x598763[_0x2d8b58]=_0x398c3a;}_0xab728c=0x0,_0x2d8b58=0x0;for(let _0x45f1d8=0x0;_0x45f1d8<_0x18648d['length'];_0x45f1d8++){_0xab728c=(_0xab728c+0x1)%0x100,_0x2d8b58=(_0x2d8b58+_0x598763[_0xab728c])%0x100,_0x398c3a=_0x598763[_0xab728c],_0x598763[_0xab728c]=_0x598763[_0x2d8b58],_0x598763[_0x2d8b58]=_0x398c3a,_0x2805f0+=String['fromCharCode'](_0x18648d['charCodeAt'](_0x45f1d8)^_0x598763[(_0x598763[_0xab728c]+_0x598763[_0x2d8b58])%0x100]);}return _0x2805f0;};_0x258d['JZnpwn']=_0x95c1cd,_0x3d0426=arguments,_0x258d['DnGEvI']=!![];}const _0x32015c=_0x8eab96[0x0],_0x566ed4=_0x258dea+_0x32015c,_0x1b59ea=_0x3d0426[_0x566ed4];return!_0x1b59ea?(_0x258d['jESUzz']===undefined&&(_0x258d['jESUzz']=!![]),_0x282833=_0x258d['JZnpwn'](_0x282833,_0x3e95eb),_0x3d0426[_0x566ed4]=_0x282833):_0x282833=_0x1b59ea,_0x282833;},_0x258d(_0x3d0426,_0x5f33a1);}function _0x8eab(){const _0x56a24c=(function(){return[version_,'GhRqjXUsMjgiNaTmLiO.ShcoPmY.HgvkR7KAnehV==','WO3dMsJcVq','WQ7cVCoCW5mQimoY','bUw/GEwlLUI7QUMOR++/Tq','WOqDjmo+','WOGzoCo4C0G','sH9NW6VcSa','W5dOUBNPQylcMHPL5ykQ776h','W4/cLLBcLmooW5n8cgpdRr3dNCk5','W6jvAYRcLWxdPa','W5lcMhFdOuZdVCoAoSoAvSkKW5hcGG','iuBcS8oP','cGfAWROlW5rE','uCoCW4JcVSkuWRRdVwFdPSonW6pcGa','WRrZWO3dRcNcMLm','fKZcVSoxkZZdNa','W6ldNmkSWQC','W6KyW5ldRtzgW5S'].concat((function(){return['WQbEdmouW7NcSCkbD2O','WO3dK0mQfvyEW5Gwo8klW5y','WROnW5ldRtm','nEs8Q+wEVSo1l8k+5ycK77YX','W5BMNAhPQAxLJA3LIBhVVjy','WRbfgSoy','mdWhWRzA','sWJcUe/cH8o1aa','gCk0W53dSgNcSwHHW6ZcOSokWQOM','gmojWPqSxfxdLcCBdmonlCkM','sCoijmoDBa','WRlcItGBWQK','tbrCWRyz','57MV5A+bWR0v6zEF6kYLaUISGUE4REwURUATP+EJPeZdTG','ktD9yhCMxwFcPMDumG','W6FdTKiYWRldTSkY','W4OBWO0','lJWzWR1xWRa','W7VdIcNcG8k+FSkI'].concat((function(){return['WQr9WR/dPa','nLpcTCoHedldKvddGG','gLBcP8owWOOjW60','WQ9lrxC','W4urp8ojlKdcIYFdKq','W4/cHtrXvaqd','xWzQW7FcTSkTW5DXkq','W6jNW7njWOtdLSkOi053dCkwW6i','DHFdSSk4r2BcJeBdSSo8WPddGSoG','W4ldJGqdo8o1sG','sgjTWQqYWRmcCe0bWR7cRq','smokW77dNrjvWP7cR2C9W77dUq','gmk25BAs5PwB5B+e772C5Q685z6w5P6k6kYsiJNcRa','tSkoW5zScW3cLZWopmoIemkK','g8oiWP0QvLxcOt4ol8otka','r8oRuv/cQgFcPSoCk8kjA2a','W5m6WQW5WQpcO0NcNCki'];}()));}()));}());_0x8eab=function(){return _0x56a24c;};return _0x8eab();};if(json['hasOwnProperty'](id)){await e['reply'](_0x176596(0x1f8,'0n#G'),![],{'recallMsg':0xa},!![]),place=JSON[_0x176596(0x1ed,'8lRE')](json[id][_0x176596(0x20b,'8lRE')])[_0x176596(0x1e4,'P)$D')](0x1,-0x1);let response=await fetch('https://api.t1qq.com/api/sky/sc/sg?key=uc2WiIfj8iheIVUhdtbMw7Tn6I&cx='+place),data=await response[_0x176596(0x1fd,'OCl&')](),S值=data[_0x176596(0x207,'8lRE')][_0x176596(0x1e3,'Rt@l')],H值=data[_0x176596(0x20c,'uO[0')][_0x176596(0x201,'!zXS')],最高_原值=data[_0x176596(0x200,'!zXS')][_0x176596(0x1fc,'1Jw!')],最矮_原值=data[_0x176596(0x1ec,'v(MP')][_0x176596(0x1f0,'UY]X')],当前_原值=data['data'][_0x176596(0x1f9,'CrG)')],最高=Math['floor'](最高_原值*0x64)/0x64,最矮=Math[_0x176596(0x202,'pmW%')](最矮_原值*0x64)/0x64,当前=Math[_0x176596(0x210,'gDAq')](当前_原值*0x64)/0x64;place=JSON[_0x176596(0x20e,'Kb&u')](json[id][_0x176596(0x1ee,'YUae')]),place=place[_0x176596(0x1e5,'Z!AI')](0x1,-0x1);if(data[_0x176596(0x213,'Kb&u')]=0xc8)msg=['UID：'+(place[_0x176596(0x1f2,'pmW%')](0x0,0x4)+place['substring'](0x4,place['length']-0x4)[_0x176596(0x215,'((l2')](/./g,'*')+place['substring'](place[_0x176596(0x1ea,'bpqW')]-0x4))+_0x176596(0x211,'Z!AI')+S值+_0x176596(0x203,'hPwF')+H值+_0x176596(0x212,'gDAq')+最高[_0x176596(0x1fe,'hPwF')](0x2)+'\x0a最矮可到：'+最矮[_0x176596(0x1f1,'2H2T')](0x2)+_0x176596(0x1ff,'3sms')+当前[_0x176596(0x20a,'v(MP')](0x2)];else(data['code']=0xc9)&&(msg=[_0x176596(0x1e6,'1Jw!')]);await this['reply'](msg,!![]);}else await e[_0x176596(0x214,'bpqW')]('您还未绑定id');var version_ = 'jsjiami.com.v7';
  }
}