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
var version_='jsjiami.com.v7';const _0x4fbd9d=_0xd294;(function(_0x23c3a5,_0x24afcd,_0x4f85ab,_0x51d124,_0x6aa804,_0x1f602d,_0x30a6e2){return _0x23c3a5=_0x23c3a5>>0x1,_0x1f602d='hs',_0x30a6e2='hs',function(_0x225ff5,_0x436e2f,_0x4727db,_0x8efa5f,_0x3bbc06){const _0x5c4c47=_0xd294;_0x8efa5f='tfi',_0x1f602d=_0x8efa5f+_0x1f602d,_0x3bbc06='up',_0x30a6e2+=_0x3bbc06,_0x1f602d=_0x4727db(_0x1f602d),_0x30a6e2=_0x4727db(_0x30a6e2),_0x4727db=0x0;const _0x22c704=_0x225ff5();while(!![]&&--_0x51d124+_0x436e2f){try{_0x8efa5f=parseInt(_0x5c4c47(0xab,'&rlh'))/0x1+parseInt(_0x5c4c47(0x9b,'E@RA'))/0x2*(-parseInt(_0x5c4c47(0xbd,'dAbq'))/0x3)+-parseInt(_0x5c4c47(0x96,'$BIR'))/0x4*(parseInt(_0x5c4c47(0xc5,'!K6r'))/0x5)+-parseInt(_0x5c4c47(0xb1,'$BIR'))/0x6*(parseInt(_0x5c4c47(0xba,'2puT'))/0x7)+parseInt(_0x5c4c47(0xc2,'RAK3'))/0x8+-parseInt(_0x5c4c47(0x98,'nT8L'))/0x9*(-parseInt(_0x5c4c47(0xa2,'2puT'))/0xa)+parseInt(_0x5c4c47(0xa0,'1Wgs'))/0xb*(parseInt(_0x5c4c47(0x9a,')[U^'))/0xc);}catch(_0xa86f54){_0x8efa5f=_0x4727db;}finally{_0x3bbc06=_0x22c704[_0x1f602d]();if(_0x23c3a5<=_0x51d124)_0x4727db?_0x6aa804?_0x8efa5f=_0x3bbc06:_0x6aa804=_0x3bbc06:_0x4727db=_0x3bbc06;else{if(_0x4727db==_0x6aa804['replace'](/[yTDnGfPLrqSdOIWUgkVw=]/g,'')){if(_0x8efa5f===_0x436e2f){_0x22c704['un'+_0x1f602d](_0x3bbc06);break;}_0x22c704[_0x30a6e2](_0x3bbc06);}}}}}(_0x4f85ab,_0x24afcd,function(_0x3e9b11,_0x27e767,_0x26cdea,_0x5d39ea,_0x98369e,_0x1f66e4,_0x217a23){return _0x27e767='\x73\x70\x6c\x69\x74',_0x3e9b11=arguments[0x0],_0x3e9b11=_0x3e9b11[_0x27e767](''),_0x26cdea='\x72\x65\x76\x65\x72\x73\x65',_0x3e9b11=_0x3e9b11[_0x26cdea]('\x76'),_0x5d39ea='\x6a\x6f\x69\x6e',(0x12f6ae,_0x3e9b11[_0x5d39ea](''));});}(0x18c,0x4b594,_0x58a1,0xc8),_0x58a1)&&(version_=_0x58a1);function _0x58a1(){const _0x3c84a7=(function(){return[version_,'SPjyDIsVjgifaLdmPiGn.wPcqkromP.UOv7WGTId==','W6edW64b','W5v3WPtcIca','W4ddNx3dUSkBhavA','W59BWPeqWO8','y8kJWOXHW50WW6ddRuFdTCok','W5FcRmkJkW','W6xcJ25llxyLW6zHW70','WRTugbCNW6CnBCo7yhRcTa','WOJcKfe5yJvaegO','WRJLVyRLIkhOU6lPQP3VVya','W5BdMCkllG','W4FcOSkriZTkzW','W4K2bCo1eXO3B37dSq','WQhOUBtPQBTqWRGh5yca772w','cWxdM2FcRmkSeCoeW5PI','WQhKVOZLNkHqWQmh5yca772w','WP4eW45eW5G1nSo5j8kvdW','W4hdMH/cImoRssryFmkdWQVcRq'].concat((function(){return['WO3cKfO+Cdj3cNhcMmorbSkHWQO','W4T1mWG','WQ9JW4ddHaC','W558aI4XmG','57Ui5A2+W6xcNoMuQ+IVOuFOROhNUO/LRldMRPNNOy/cVSkJ','WRBdU3ShvhibW452bCoZ','C1uT','WPZcLK3dTW','WP4fW4TlWQuXdmoln8k3','mx17uIf5ta','caddMgldISkUoCowW4fiWOS','W4hdMr/cG8ktlZ9HvCkU','WPJdS8knWRicW6jgsHFdSa','FGrnAmkMW405qmk3','fColWOhdRZVcNqddKCo7','jmkmWOL0DSoFgG','W7xdUmok77YO','iSkgWR9XDW','WQVcJ25/CGma','W6VcQXuJsmogWOLgqCodWQLR'].concat((function(){return['aaZdMMhcQmkkgSopW5fx','W4hcOSkKt8kt','mmoUWPFcPmk6Bq','WQ/cRbKgw8o6WOq','imoYW4S4WPu','W4VdLSo+WQVdQhJdJaZdLatdLG','WQldKmkrC8oLaq','uZ0SgCkQWRBdLCoy','WP/dTSklWRHdWRmews7dQSktWQbe','uSklW4xcVMFdJLhdO8o0yxX2W6a','kSoPvfCdWOSglHpcS8kQCSkZiCkImeRdHc4tdmkhWPhcMWNdUCocW6H5lmkKyCoeW6jVW5n9W4/dUCoocMBcLrpdN8k5g2tcPIpcVftcHJdcUColbmoHu8kscmokW5NcHKxdKrZcNZK','WP4IC1OahXRdNJKtdq','cg4up8kfWQm','W55pW7ZdIw3cNSoJWPjMWPTth8kG','WPbOgmojWPLLWPxcJfldSW','qv/dKgjH','emoHmWlcNa','WOmtEYa1','WQtdH8kiEW'];}()));}()));}());_0x58a1=function(){return _0x3c84a7;};return _0x58a1();};function _0xd294(_0x530bfc,_0x1660fe){const _0x58a130=_0x58a1();return _0xd294=function(_0xd294b5,_0x1d3de6){_0xd294b5=_0xd294b5-0x92;let _0x54df82=_0x58a130[_0xd294b5];if(_0xd294['dZiZeo']===undefined){var _0x394b91=function(_0x26ad4f){const _0x4481ea='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x69006a='',_0x4d259='';for(let _0x90fa32=0x0,_0x45f398,_0x24ec28,_0x5c5354=0x0;_0x24ec28=_0x26ad4f['charAt'](_0x5c5354++);~_0x24ec28&&(_0x45f398=_0x90fa32%0x4?_0x45f398*0x40+_0x24ec28:_0x24ec28,_0x90fa32++%0x4)?_0x69006a+=String['fromCharCode'](0xff&_0x45f398>>(-0x2*_0x90fa32&0x6)):0x0){_0x24ec28=_0x4481ea['indexOf'](_0x24ec28);}for(let _0x2cc395=0x0,_0x3d7d0e=_0x69006a['length'];_0x2cc395<_0x3d7d0e;_0x2cc395++){_0x4d259+='%'+('00'+_0x69006a['charCodeAt'](_0x2cc395)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x4d259);};const _0x23bb2e=function(_0x5a5fd2,_0x510f4f){let _0x26fa74=[],_0x5fae33=0x0,_0x230466,_0x519bb1='';_0x5a5fd2=_0x394b91(_0x5a5fd2);let _0x1260d5;for(_0x1260d5=0x0;_0x1260d5<0x100;_0x1260d5++){_0x26fa74[_0x1260d5]=_0x1260d5;}for(_0x1260d5=0x0;_0x1260d5<0x100;_0x1260d5++){_0x5fae33=(_0x5fae33+_0x26fa74[_0x1260d5]+_0x510f4f['charCodeAt'](_0x1260d5%_0x510f4f['length']))%0x100,_0x230466=_0x26fa74[_0x1260d5],_0x26fa74[_0x1260d5]=_0x26fa74[_0x5fae33],_0x26fa74[_0x5fae33]=_0x230466;}_0x1260d5=0x0,_0x5fae33=0x0;for(let _0x1ad018=0x0;_0x1ad018<_0x5a5fd2['length'];_0x1ad018++){_0x1260d5=(_0x1260d5+0x1)%0x100,_0x5fae33=(_0x5fae33+_0x26fa74[_0x1260d5])%0x100,_0x230466=_0x26fa74[_0x1260d5],_0x26fa74[_0x1260d5]=_0x26fa74[_0x5fae33],_0x26fa74[_0x5fae33]=_0x230466,_0x519bb1+=String['fromCharCode'](_0x5a5fd2['charCodeAt'](_0x1ad018)^_0x26fa74[(_0x26fa74[_0x1260d5]+_0x26fa74[_0x5fae33])%0x100]);}return _0x519bb1;};_0xd294['DHgejj']=_0x23bb2e,_0x530bfc=arguments,_0xd294['dZiZeo']=!![];}const _0x2f3398=_0x58a130[0x0],_0x42ea0b=_0xd294b5+_0x2f3398,_0x509472=_0x530bfc[_0x42ea0b];return!_0x509472?(_0xd294['NqMZvE']===undefined&&(_0xd294['NqMZvE']=!![]),_0x54df82=_0xd294['DHgejj'](_0x54df82,_0x1d3de6),_0x530bfc[_0x42ea0b]=_0x54df82):_0x54df82=_0x509472,_0x54df82;},_0xd294(_0x530bfc,_0x1660fe);}var json=JSON[_0x4fbd9d(0xa8,'8D%j')](fs[_0x4fbd9d(0xb9,'dAbq')](dirpath+'/'+filename,_0x4fbd9d(0xad,'ny2V'))),id=e['user_id'];let msg=e[_0x4fbd9d(0xac,'Ymc0')],place=msg[_0x4fbd9d(0xb8,'Sk[x')](/#|身高查询/g,'')[_0x4fbd9d(0x93,'gZ8O')]();if(json[_0x4fbd9d(0xa6,'^f4Y')](id)){await e[_0x4fbd9d(0xb7,'kXv&')]('id已收录，正在查询...',![],{'recallMsg':0xa},!![]),place=JSON[_0x4fbd9d(0xb4,'sxJG')](json[id]['Sky_Uid'])[_0x4fbd9d(0x97,'$DB1')](0x1,-0x1);let response=await fetch(_0x4fbd9d(0xc4,'(#ec')+place),data=await response[_0x4fbd9d(0x94,'BzCA')]();place=JSON['stringify'](json[id][_0x4fbd9d(0xaf,'gV&P')]),place=place[_0x4fbd9d(0xbb,'NKEL')](0x1,-0x1);if(data['code']=0xc8){let S值=data['data'][_0x4fbd9d(0x92,'@#Yr')],H值=data[_0x4fbd9d(0x99,'zr^v')][_0x4fbd9d(0xc6,'rr4)')],最高_原值=data[_0x4fbd9d(0x9e,'uL5z')][_0x4fbd9d(0x9c,'^f4Y')],最矮_原值=data[_0x4fbd9d(0xa7,'!K6r')][_0x4fbd9d(0xb3,'6G(z')],当前_原值=data['data'][_0x4fbd9d(0xc7,'RUaN')],最高=Math['floor'](最高_原值*0x64)/0x64,最矮=Math[_0x4fbd9d(0xca,'JcUU')](最矮_原值*0x64)/0x64,当前=Math[_0x4fbd9d(0x95,'yRcu')](当前_原值*0x64)/0x64;msg=[_0x4fbd9d(0xb6,'dkEh')+(place['substring'](0x0,0xa)+'*'[_0x4fbd9d(0xc0,'gZ8O')](place[_0x4fbd9d(0xbc,'ajVJ')]-0x14)+place['substring'](place[_0x4fbd9d(0xa9,'XN[U')]-0xa))+_0x4fbd9d(0xa3,'PTR*')+S值+_0x4fbd9d(0xa1,'PTR*')+H值+'\x0a最高可到：'+最高['toFixed'](0x2)+'\x0a最矮可到：'+最矮[_0x4fbd9d(0x9f,'zr^v')](0x2)+_0x4fbd9d(0x9d,'XN[U')+当前[_0x4fbd9d(0xb5,'kXv&')](0x2)];}else msg=[_0x4fbd9d(0xaa,'4KCT')];await this[_0x4fbd9d(0xbe,'nT8L')](msg,!![]);}else await e[_0x4fbd9d(0xc9,'P2MW')]('您还未绑定id');var version_ = 'jsjiami.com.v7';  }
}