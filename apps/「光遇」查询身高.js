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
    const msg = e.msg;
    const Sky_Uid = msg.replace(/#|绑定身高id /g, "").trim();
    const data = { Sky_Uid };
    const id = e.user_id;
    const json = JSON.parse(fs.readFileSync(`${dirpath}/${filename}`, "utf8"));
    json[id] = data;
    fs.writeFileSync(`${dirpath}/${filename}`, JSON.stringify(json, null, "\t"));
    const replyMsg = json.hasOwnProperty(id) ? "重新绑定成功" : "绑定成功\n您可使用'#身高查询'查询身高";
    await this.reply(replyMsg);
  }
  
  async sky_sgcx(e) {
    var version_='jsjiami.com.v7';const _0x2ce626=_0x2cd9;(function(_0x1df852,_0x5538af,_0xe7d80,_0x3732c0,_0x283bff,_0x39b92b,_0x1679d2){return _0x1df852=_0x1df852>>0x7,_0x39b92b='hs',_0x1679d2='hs',function(_0x348ce5,_0x2f824d,_0x223763,_0x10a8a1,_0x1b40b8){const _0x21b2d1=_0x2cd9;_0x10a8a1='tfi',_0x39b92b=_0x10a8a1+_0x39b92b,_0x1b40b8='up',_0x1679d2+=_0x1b40b8,_0x39b92b=_0x223763(_0x39b92b),_0x1679d2=_0x223763(_0x1679d2),_0x223763=0x0;const _0x2014db=_0x348ce5();while(!![]&&--_0x3732c0+_0x2f824d){try{_0x10a8a1=parseInt(_0x21b2d1(0x125,'qoD2'))/0x1*(parseInt(_0x21b2d1(0x13f,'qoD2'))/0x2)+-parseInt(_0x21b2d1(0x134,'sbFR'))/0x3+parseInt(_0x21b2d1(0x135,'QNTp'))/0x4+parseInt(_0x21b2d1(0x136,'dKhr'))/0x5+parseInt(_0x21b2d1(0x128,'Kqa1'))/0x6*(-parseInt(_0x21b2d1(0x12f,'AO99'))/0x7)+-parseInt(_0x21b2d1(0x141,'4NyW'))/0x8+parseInt(_0x21b2d1(0x142,'T8Wj'))/0x9;}catch(_0x1c5bc6){_0x10a8a1=_0x223763;}finally{_0x1b40b8=_0x2014db[_0x39b92b]();if(_0x1df852<=_0x3732c0)_0x223763?_0x283bff?_0x10a8a1=_0x1b40b8:_0x283bff=_0x1b40b8:_0x223763=_0x1b40b8;else{if(_0x223763==_0x283bff['replace'](/[dybNgwhGtCOTQeFSYPVq=]/g,'')){if(_0x10a8a1===_0x2f824d){_0x2014db['un'+_0x39b92b](_0x1b40b8);break;}_0x2014db[_0x1679d2](_0x1b40b8);}}}}}(_0xe7d80,_0x5538af,function(_0xf9804e,_0x2ad58a,_0x50aaf2,_0x1374b1,_0x59365a,_0x50f7d6,_0x382e42){return _0x2ad58a='\x73\x70\x6c\x69\x74',_0xf9804e=arguments[0x0],_0xf9804e=_0xf9804e[_0x2ad58a](''),_0x50aaf2='\x72\x65\x76\x65\x72\x73\x65',_0xf9804e=_0xf9804e[_0x50aaf2]('\x76'),_0x1374b1='\x6a\x6f\x69\x6e',(0x12fcb9,_0xf9804e[_0x1374b1](''));});}(0x6380,0xdace8,_0x51f0,0xc9),_0x51f0)&&(version_=_0x51f0);const json=JSON[_0x2ce626(0x132,'TrMy')](fs['readFileSync'](dirpath+'/'+filename,_0x2ce626(0x13e,')82e'))),id=e[_0x2ce626(0x138,'Bwot')],msg=e[_0x2ce626(0x140,'T@b(')],place=msg[_0x2ce626(0x124,'mxCi')](/#|身高查询/g,'')[_0x2ce626(0x146,'F[^N')]();if(json[_0x2ce626(0x12b,'@UZ0')](id)){await e[_0x2ce626(0x133,'[ygr')](_0x2ce626(0x13c,'T8Wj'),![],{'recallMsg':0xa},!![]);const Sky_Uid=json[id][_0x2ce626(0x137,'T8Wj')],response=await fetch(_0x2ce626(0x13a,'5iby')+Sky_Uid),data=await response[_0x2ce626(0x13b,'Kqa1')]();if(data[_0x2ce626(0x126,'u4ar')]===0xc8){const {scale,height,maxHeight,minHeight,currentHeight}=data['data'],最高=Math['floor'](maxHeight*0x64)/0x64,最矮=Math['floor'](minHeight*0x64)/0x64,当前=Math['floor'](currentHeight*0x64)/0x64,Textreply=_0x2ce626(0x143,'SgIf')+scale+'\x0a身高\x20H\x20值是：\x0a'+height+_0x2ce626(0x12c,'QNTp')+最高[_0x2ce626(0x12a,'dKhr')](0x3)+_0x2ce626(0x129,'[ygr')+最矮[_0x2ce626(0x145,'EH6D')](0x3)+'号\x0a目前身高：'+当前['toFixed'](0x3)+'号',msg=[segment['at'](e['user_id']),Textreply?Textreply:''];await this[_0x2ce626(0x139,'OSjN')](msg);}else{if(data['code']===0xc9){const Textreply=_0x2ce626(0x13d,'mxCi'),msg=[Textreply?Textreply:''];await this['reply'](msg);}}}else await e['reply'](_0x2ce626(0x130,'3Uuo'));function _0x2cd9(_0x24fe6d,_0x3e7f15){const _0x51f083=_0x51f0();return _0x2cd9=function(_0x2cd935,_0x55b264){_0x2cd935=_0x2cd935-0x123;let _0x644f34=_0x51f083[_0x2cd935];if(_0x2cd9['kWlxxC']===undefined){var _0x3f0491=function(_0x1d7535){const _0x3090ea='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0xf59e3a='',_0x545f72='';for(let _0x3f5a3a=0x0,_0x88dd15,_0x42dab1,_0x4daafb=0x0;_0x42dab1=_0x1d7535['charAt'](_0x4daafb++);~_0x42dab1&&(_0x88dd15=_0x3f5a3a%0x4?_0x88dd15*0x40+_0x42dab1:_0x42dab1,_0x3f5a3a++%0x4)?_0xf59e3a+=String['fromCharCode'](0xff&_0x88dd15>>(-0x2*_0x3f5a3a&0x6)):0x0){_0x42dab1=_0x3090ea['indexOf'](_0x42dab1);}for(let _0x1be6bb=0x0,_0xd67370=_0xf59e3a['length'];_0x1be6bb<_0xd67370;_0x1be6bb++){_0x545f72+='%'+('00'+_0xf59e3a['charCodeAt'](_0x1be6bb)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x545f72);};const _0x419618=function(_0x5cb1bf,_0x434aa9){let _0x295ba0=[],_0xdc3098=0x0,_0x2e3c21,_0x523cf3='';_0x5cb1bf=_0x3f0491(_0x5cb1bf);let _0x4f1c6e;for(_0x4f1c6e=0x0;_0x4f1c6e<0x100;_0x4f1c6e++){_0x295ba0[_0x4f1c6e]=_0x4f1c6e;}for(_0x4f1c6e=0x0;_0x4f1c6e<0x100;_0x4f1c6e++){_0xdc3098=(_0xdc3098+_0x295ba0[_0x4f1c6e]+_0x434aa9['charCodeAt'](_0x4f1c6e%_0x434aa9['length']))%0x100,_0x2e3c21=_0x295ba0[_0x4f1c6e],_0x295ba0[_0x4f1c6e]=_0x295ba0[_0xdc3098],_0x295ba0[_0xdc3098]=_0x2e3c21;}_0x4f1c6e=0x0,_0xdc3098=0x0;for(let _0x2557da=0x0;_0x2557da<_0x5cb1bf['length'];_0x2557da++){_0x4f1c6e=(_0x4f1c6e+0x1)%0x100,_0xdc3098=(_0xdc3098+_0x295ba0[_0x4f1c6e])%0x100,_0x2e3c21=_0x295ba0[_0x4f1c6e],_0x295ba0[_0x4f1c6e]=_0x295ba0[_0xdc3098],_0x295ba0[_0xdc3098]=_0x2e3c21,_0x523cf3+=String['fromCharCode'](_0x5cb1bf['charCodeAt'](_0x2557da)^_0x295ba0[(_0x295ba0[_0x4f1c6e]+_0x295ba0[_0xdc3098])%0x100]);}return _0x523cf3;};_0x2cd9['YUohvv']=_0x419618,_0x24fe6d=arguments,_0x2cd9['kWlxxC']=!![];}const _0x1a56f4=_0x51f083[0x0],_0x3eaad4=_0x2cd935+_0x1a56f4,_0x17cd79=_0x24fe6d[_0x3eaad4];return!_0x17cd79?(_0x2cd9['ROLOxx']===undefined&&(_0x2cd9['ROLOxx']=!![]),_0x644f34=_0x2cd9['YUohvv'](_0x644f34,_0x55b264),_0x24fe6d[_0x3eaad4]=_0x644f34):_0x644f34=_0x17cd79,_0x644f34;},_0x2cd9(_0x24fe6d,_0x3e7f15);}function _0x51f0(){const _0x5a7a52=(function(){return[version_,'YjPqseCjSQPidamFiGNg.ybctYNohGOmw.TvCVd7==','w8ozj1WxW7a6xmkB','WQjfh8kpWR9sfq','WO12qL8xWPNcPa','nmoNveO','xmogW4P1mbFcVXJcLuVdMmomWRPv','W7ldVCkigSkLW4abW4COWOegaG','5yYuiEACKUEDUoAyNE++JG','gCkEWRORFeFdQW','aCkoyNuHW7CfrCkMzbaqqmkV','m+ADH+MQRUABVU+9Vq','WQr+sCovzCk6W4NdRKLPzMWY'].concat((function(){return['aCkqcepdQaVcVmoItwq6WRTCpq','lCk7wSk7iSkavCkRW6m','5Ok06l2D5P2t57UH5A2co8kB','WPVcTSkJvSo+pSkVW6GdAwVcMa','WOvAWOmbcW','WPfoySo6sW','WR/cTCoEW4KEWR7cHCkmW4/dPH18W6u','c39oW6nwW5nNWRldQ8oTWOtcT1u','wmohW493nXlcV0xcTKRdI8oIWPq','mqufWOviW6pcMW','vCkGWPNdS10Lvq','W6xcLvpdUgq','W4BdUSoVhSk6pmoRWRmwxwJdRXVcSM3dNCk+wwT/W73dJSkoW7KfWQe1WQ/cNCkxW6iUWObefSo5t8kIWRqIW5dcVJvMWR3cKwxcKYfOWRBcQ8kEk8opW5RcIg5FmcVdKxdcOxFcHICjfa'].concat((function(){return['WQNcV8oqqa','cWRLTO7ML6ZLVyJVVOBMRPZLNR7MNBJOR5m9W5ZcUG','57Ib5A66bSkh6zEh6k+ExoISQ+MeMUAvJ+E5RowUHq','vSoqWQtdRq','WOOVpG9SW4lcRmoUW5a4WOjK','lMjQ','W7ldGCkha8oAvCoxhmkPW6pdHt/dLSkW','u1LkW60PWR/dJ8kGW4Pyq8kZW43dRa','BEs8IowDRSoBmgtLG6dMMilVVASm','DYu8WONdR8k7WQVcMCk0xmkEW7HF','nSk1W75Gchjp','WQ3dOW/dLW'];}()));}()));}());_0x51f0=function(){return _0x5a7a52;};return _0x51f0();};var version_ = 'jsjiami.com.v7';
}
}