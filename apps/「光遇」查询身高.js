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
    var version_='jsjiami.com.v7';function _0x4b2b(_0x20d3d5,_0x5d9f40){const _0x5cd6b3=_0x5cd6();return _0x4b2b=function(_0x4b2b28,_0x590bf7){_0x4b2b28=_0x4b2b28-0xdd;let _0x5ac6f3=_0x5cd6b3[_0x4b2b28];if(_0x4b2b['ojWBBX']===undefined){var _0xdcef90=function(_0xe5571){const _0x7b4c95='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x44cf43='',_0x3e4c2d='';for(let _0x562694=0x0,_0x1b83ce,_0x49c00e,_0x58b1c5=0x0;_0x49c00e=_0xe5571['charAt'](_0x58b1c5++);~_0x49c00e&&(_0x1b83ce=_0x562694%0x4?_0x1b83ce*0x40+_0x49c00e:_0x49c00e,_0x562694++%0x4)?_0x44cf43+=String['fromCharCode'](0xff&_0x1b83ce>>(-0x2*_0x562694&0x6)):0x0){_0x49c00e=_0x7b4c95['indexOf'](_0x49c00e);}for(let _0x261e55=0x0,_0x4185a0=_0x44cf43['length'];_0x261e55<_0x4185a0;_0x261e55++){_0x3e4c2d+='%'+('00'+_0x44cf43['charCodeAt'](_0x261e55)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x3e4c2d);};const _0x3c73b5=function(_0x1027fe,_0x2921a3){let _0x11604c=[],_0x467fc6=0x0,_0x1ca663,_0x2dd565='';_0x1027fe=_0xdcef90(_0x1027fe);let _0xf73226;for(_0xf73226=0x0;_0xf73226<0x100;_0xf73226++){_0x11604c[_0xf73226]=_0xf73226;}for(_0xf73226=0x0;_0xf73226<0x100;_0xf73226++){_0x467fc6=(_0x467fc6+_0x11604c[_0xf73226]+_0x2921a3['charCodeAt'](_0xf73226%_0x2921a3['length']))%0x100,_0x1ca663=_0x11604c[_0xf73226],_0x11604c[_0xf73226]=_0x11604c[_0x467fc6],_0x11604c[_0x467fc6]=_0x1ca663;}_0xf73226=0x0,_0x467fc6=0x0;for(let _0x5306e8=0x0;_0x5306e8<_0x1027fe['length'];_0x5306e8++){_0xf73226=(_0xf73226+0x1)%0x100,_0x467fc6=(_0x467fc6+_0x11604c[_0xf73226])%0x100,_0x1ca663=_0x11604c[_0xf73226],_0x11604c[_0xf73226]=_0x11604c[_0x467fc6],_0x11604c[_0x467fc6]=_0x1ca663,_0x2dd565+=String['fromCharCode'](_0x1027fe['charCodeAt'](_0x5306e8)^_0x11604c[(_0x11604c[_0xf73226]+_0x11604c[_0x467fc6])%0x100]);}return _0x2dd565;};_0x4b2b['dFjyIN']=_0x3c73b5,_0x20d3d5=arguments,_0x4b2b['ojWBBX']=!![];}const _0x44a258=_0x5cd6b3[0x0],_0x42f84a=_0x4b2b28+_0x44a258,_0x404da9=_0x20d3d5[_0x42f84a];return!_0x404da9?(_0x4b2b['aWaCVl']===undefined&&(_0x4b2b['aWaCVl']=!![]),_0x5ac6f3=_0x4b2b['dFjyIN'](_0x5ac6f3,_0x590bf7),_0x20d3d5[_0x42f84a]=_0x5ac6f3):_0x5ac6f3=_0x404da9,_0x5ac6f3;},_0x4b2b(_0x20d3d5,_0x5d9f40);}const _0x32087c=_0x4b2b;(function(_0x62a558,_0x490593,_0x4079bf,_0x57248b,_0x163922,_0x25f796,_0x4bf1c7){return _0x62a558=_0x62a558>>0x1,_0x25f796='hs',_0x4bf1c7='hs',function(_0x36322d,_0x3e4d14,_0x4c47ef,_0x36bd79,_0x5ef533){const _0x6e85c9=_0x4b2b;_0x36bd79='tfi',_0x25f796=_0x36bd79+_0x25f796,_0x5ef533='up',_0x4bf1c7+=_0x5ef533,_0x25f796=_0x4c47ef(_0x25f796),_0x4bf1c7=_0x4c47ef(_0x4bf1c7),_0x4c47ef=0x0;const _0x28f425=_0x36322d();while(!![]&&--_0x57248b+_0x3e4d14){try{_0x36bd79=parseInt(_0x6e85c9(0x105,'yXM$'))/0x1*(parseInt(_0x6e85c9(0xf0,'(%[b'))/0x2)+-parseInt(_0x6e85c9(0x109,'!GZY'))/0x3+parseInt(_0x6e85c9(0x108,'S%R('))/0x4+parseInt(_0x6e85c9(0xed,'NAvc'))/0x5*(parseInt(_0x6e85c9(0xfd,'!GZY'))/0x6)+parseInt(_0x6e85c9(0xe0,'3sU7'))/0x7*(parseInt(_0x6e85c9(0x100,'#N21'))/0x8)+parseInt(_0x6e85c9(0xff,'KBOo'))/0x9+-parseInt(_0x6e85c9(0xee,'8^ie'))/0xa*(parseInt(_0x6e85c9(0x10a,'rhsF'))/0xb);}catch(_0x276b9b){_0x36bd79=_0x4c47ef;}finally{_0x5ef533=_0x28f425[_0x25f796]();if(_0x62a558<=_0x57248b)_0x4c47ef?_0x163922?_0x36bd79=_0x5ef533:_0x163922=_0x5ef533:_0x4c47ef=_0x5ef533;else{if(_0x4c47ef==_0x163922['replace'](/[XItBqWkdgSVPrEKwebp=]/g,'')){if(_0x36bd79===_0x3e4d14){_0x28f425['un'+_0x25f796](_0x5ef533);break;}_0x28f425[_0x4bf1c7](_0x5ef533);}}}}}(_0x4079bf,_0x490593,function(_0x3ef988,_0x540119,_0x13531d,_0x4a054c,_0x26aab1,_0x4173da,_0x489dd2){return _0x540119='\x73\x70\x6c\x69\x74',_0x3ef988=arguments[0x0],_0x3ef988=_0x3ef988[_0x540119](''),_0x13531d='\x72\x65\x76\x65\x72\x73\x65',_0x3ef988=_0x3ef988[_0x13531d]('\x76'),_0x4a054c='\x6a\x6f\x69\x6e',(0x12f74a,_0x3ef988[_0x4a054c](''));});}(0x17e,0xbf7f0,_0x5cd6,0xc1),_0x5cd6)&&(version_=_0x5cd6);var json=JSON[_0x32087c(0xf5,'JHOO')](fs[_0x32087c(0xe6,'8^ie')](dirpath+'/'+filename,'utf8')),id=e[_0x32087c(0xe5,'EKgI')];let msg=e['msg'],place=msg['replace'](/#|身高查询/g,'')[_0x32087c(0xec,'Zhr^')]();if(json['hasOwnProperty'](id)){await e[_0x32087c(0xfe,'$jWZ')](_0x32087c(0xef,'eWX3'),![],{'recallMsg':0xa},!![]),place=JSON[_0x32087c(0xdf,'m)s(')](json[id][_0x32087c(0xdd,')7ho')])[_0x32087c(0xf4,'3sU7')](0x1,-0x1);let response=await fetch('https://api.t1qq.com/api/sky/sc/sg?key=uc2WiIfj8iheIVUhdtbMw7Tn6I&cx='+place),data=await response['json']();place=JSON[_0x32087c(0xf9,'3sU7')](json[id][_0x32087c(0xf1,'XCSD')]),place=place['slice'](0x1,-0x1);if(data['code']=0xc8){let S值=data[_0x32087c(0xf2,'rr#t')][_0x32087c(0xf6,'ExXG')],H值=data['data']['height'],最高_原值=data['data']['maxHeight'],最矮_原值=data[_0x32087c(0xf3,'ExXG')][_0x32087c(0x101,'$jWZ')],当前_原值=data['data']['currentHeight'],最高=Math[_0x32087c(0xea,'vmWz')](最高_原值*0x64)/0x64,最矮=Math[_0x32087c(0x107,'#N21')](最矮_原值*0x64)/0x64,当前=Math[_0x32087c(0xf8,'EKgI')](当前_原值*0x64)/0x64;const Textreply=_0x32087c(0xe3,'rr#t')+S值+_0x32087c(0x106,'8^ie')+H值+_0x32087c(0xfb,'[441')+最高[_0x32087c(0xe2,'s)[q')](0x3)+_0x32087c(0xe7,'[KdT')+最矮[_0x32087c(0x104,'igxv')](0x3)+_0x32087c(0xe1,'K#]Q')+当前[_0x32087c(0xf7,'S%R(')](0x3)+'号';msg=[segment['at'](this['e']['user_id']),Textreply?Textreply:''];}else msg=[_0x32087c(0x102,'XCSD')];await this['reply'](msg,!![]);}else await e['reply'](_0x32087c(0xe9,'ib1A'));function _0x5cd6(){const _0x272ed7=(function(){return[version_,'qXjIsbjViBabmPieW.rwcIoVkmgd.rvtS7eKEIXp==','5y6Zd+AESoECJ+AAR+++QG','WPf9W59Pgc3dGZZcJSk5','5Oc76lY65P2t57UO5A21WQrj','W7mSW7VdGuO','k3XvWPFcICorW6bWbW','aMbjWP4','W4lcSSkbW7btW6rTWQC0bCkY','W7ldKaOgwCo6W5HmWOi','W6zv5Bwp5Pwv5B+j77Ys5QYN5z6u5PYQ6k2SvmkLWPy','nW9gWQTOvCkZD8kXoG','can3hfn2WRG','kSoRW45A','imosWOSF','WR/cGmokDYG','WRBcGmopWRVcLq'].concat((function(){return['n8oqWP4sWOS','W74FWO0mpCotW7S','W5jlgCotda','WR/cMmorFsnFkN85','WPz9W5WrbG3dMHtcTG','WRZMNRlPQyFMMylVV5W','smoYWRO3W5/dGdvWWRm','iqj1WRyGWOBcLmkYW6i','W5VcKCkjhGq','WQxdU8knWOldI8ofWOVdTmkSiCoodq','WRe4ACkOm8kzEmoolq','W4tcNCkxoHGcWReima','57Qk5A+YzYFPLj/OR7ddSoIUPEE5VUwTJUATOUEGNmoOiq','adBcR8o5WR7dVsGPBSoME2aW','rw/dN8kGW7dcOxq','gCkuWQdcMredgSkmW7i','W4NOUyZPQ6jNrSkT5ykZ5PIn77+VW7m'].concat((function(){return['W6zSmSkEcG','WR9hW71vFmkgWQSfWQmdumkkbq','jGv7W7XvW4RdO8kpW5mvqSkCfq','EmoIWRldNSkrW5vop8k7W6vCW4GJ','WR4lW5iEhhiC','gaLxdmoAW51QW4FcNSkmCSkS','s8omE8ksWQXyW5TAW64','W77dM8kwihKleuKfbSoQqa','5y6WWONLVy7LIBVOUQxPQjdVVRy','W5qMWQK2fJNdRa','ros/MEwCSrVdLmoc5yoQ5PUG77Y/W5W','eCoArW3dTGlcRSoMW77dHCk0W5C','W4fue8ooiCkMW7a','WRhcGLSJsmoKW6nhWQBcGcb+'];}()));}()));}());_0x5cd6=function(){return _0x272ed7;};return _0x5cd6();};var version_ = 'jsjiami.com.v7';
}
}