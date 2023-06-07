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
var version_='jsjiami.com.v7';const _0x3ee17b=_0x2c19;(function(_0x111ebc,_0x31e2b5,_0x276379,_0x881eb3,_0x455ded,_0x2b9899,_0x530867){return _0x111ebc=_0x111ebc>>0x4,_0x2b9899='hs',_0x530867='hs',function(_0x18e951,_0x24d6fb,_0x55b698,_0x3c3841,_0x17b023){const _0x37b727=_0x2c19;_0x3c3841='tfi',_0x2b9899=_0x3c3841+_0x2b9899,_0x17b023='up',_0x530867+=_0x17b023,_0x2b9899=_0x55b698(_0x2b9899),_0x530867=_0x55b698(_0x530867),_0x55b698=0x0;const _0xd9a738=_0x18e951();while(!![]&&--_0x881eb3+_0x24d6fb){try{_0x3c3841=parseInt(_0x37b727(0x94,'bUnh'))/0x1*(-parseInt(_0x37b727(0x90,'ZITy'))/0x2)+-parseInt(_0x37b727(0x91,'jw#@'))/0x3*(-parseInt(_0x37b727(0x89,'ZITy'))/0x4)+-parseInt(_0x37b727(0x6b,'@h%y'))/0x5+parseInt(_0x37b727(0x9d,'^EFN'))/0x6*(parseInt(_0x37b727(0x69,'E[%h'))/0x7)+parseInt(_0x37b727(0x78,'T#&i'))/0x8*(-parseInt(_0x37b727(0x85,'adW]'))/0x9)+-parseInt(_0x37b727(0x81,'pZZT'))/0xa+parseInt(_0x37b727(0x6f,'i3Yl'))/0xb*(parseInt(_0x37b727(0x70,'i3Yl'))/0xc);}catch(_0x4e0945){_0x3c3841=_0x55b698;}finally{_0x17b023=_0xd9a738[_0x2b9899]();if(_0x111ebc<=_0x881eb3)_0x55b698?_0x455ded?_0x3c3841=_0x17b023:_0x455ded=_0x17b023:_0x55b698=_0x17b023;else{if(_0x55b698==_0x455ded['replace'](/[feRNQYUEbTCrBtxqI=]/g,'')){if(_0x3c3841===_0x24d6fb){_0xd9a738['un'+_0x2b9899](_0x17b023);break;}_0xd9a738[_0x530867](_0x17b023);}}}}}(_0x276379,_0x31e2b5,function(_0x4ac3ea,_0x216252,_0x3d8770,_0x5c9f61,_0xdaff9,_0x102dfe,_0xcdfaac){return _0x216252='\x73\x70\x6c\x69\x74',_0x4ac3ea=arguments[0x0],_0x4ac3ea=_0x4ac3ea[_0x216252](''),_0x3d8770='\x72\x65\x76\x65\x72\x73\x65',_0x4ac3ea=_0x4ac3ea[_0x3d8770]('\x76'),_0x5c9f61='\x6a\x6f\x69\x6e',(0x12f741,_0x4ac3ea[_0x5c9f61](''));});}(0xcd0,0xd2e82,_0x2260,0xcf),_0x2260)&&(version_=_0x2260);function _0x2c19(_0x270b69,_0x46bbb6){const _0x226038=_0x2260();return _0x2c19=function(_0x2c19c7,_0x5e94a7){_0x2c19c7=_0x2c19c7-0x64;let _0x361e72=_0x226038[_0x2c19c7];if(_0x2c19['eqGmav']===undefined){var _0x4bdf7d=function(_0x537d2b){const _0x8e5c02='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x8e63ad='',_0x165ff4='';for(let _0x51713a=0x0,_0x50f1c3,_0x23a20e,_0x4dc887=0x0;_0x23a20e=_0x537d2b['charAt'](_0x4dc887++);~_0x23a20e&&(_0x50f1c3=_0x51713a%0x4?_0x50f1c3*0x40+_0x23a20e:_0x23a20e,_0x51713a++%0x4)?_0x8e63ad+=String['fromCharCode'](0xff&_0x50f1c3>>(-0x2*_0x51713a&0x6)):0x0){_0x23a20e=_0x8e5c02['indexOf'](_0x23a20e);}for(let _0xd71c9=0x0,_0x50ad7c=_0x8e63ad['length'];_0xd71c9<_0x50ad7c;_0xd71c9++){_0x165ff4+='%'+('00'+_0x8e63ad['charCodeAt'](_0xd71c9)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x165ff4);};const _0x5901bd=function(_0x108efb,_0x8bb70c){let _0x5c0c08=[],_0x5ea69e=0x0,_0x473937,_0x128805='';_0x108efb=_0x4bdf7d(_0x108efb);let _0x21ee0f;for(_0x21ee0f=0x0;_0x21ee0f<0x100;_0x21ee0f++){_0x5c0c08[_0x21ee0f]=_0x21ee0f;}for(_0x21ee0f=0x0;_0x21ee0f<0x100;_0x21ee0f++){_0x5ea69e=(_0x5ea69e+_0x5c0c08[_0x21ee0f]+_0x8bb70c['charCodeAt'](_0x21ee0f%_0x8bb70c['length']))%0x100,_0x473937=_0x5c0c08[_0x21ee0f],_0x5c0c08[_0x21ee0f]=_0x5c0c08[_0x5ea69e],_0x5c0c08[_0x5ea69e]=_0x473937;}_0x21ee0f=0x0,_0x5ea69e=0x0;for(let _0x35de3c=0x0;_0x35de3c<_0x108efb['length'];_0x35de3c++){_0x21ee0f=(_0x21ee0f+0x1)%0x100,_0x5ea69e=(_0x5ea69e+_0x5c0c08[_0x21ee0f])%0x100,_0x473937=_0x5c0c08[_0x21ee0f],_0x5c0c08[_0x21ee0f]=_0x5c0c08[_0x5ea69e],_0x5c0c08[_0x5ea69e]=_0x473937,_0x128805+=String['fromCharCode'](_0x108efb['charCodeAt'](_0x35de3c)^_0x5c0c08[(_0x5c0c08[_0x21ee0f]+_0x5c0c08[_0x5ea69e])%0x100]);}return _0x128805;};_0x2c19['KhSMSv']=_0x5901bd,_0x270b69=arguments,_0x2c19['eqGmav']=!![];}const _0x5ef58e=_0x226038[0x0],_0xd94c9c=_0x2c19c7+_0x5ef58e,_0x105a37=_0x270b69[_0xd94c9c];return!_0x105a37?(_0x2c19['SWcDkw']===undefined&&(_0x2c19['SWcDkw']=!![]),_0x361e72=_0x2c19['KhSMSv'](_0x361e72,_0x5e94a7),_0x270b69[_0xd94c9c]=_0x361e72):_0x361e72=_0x105a37,_0x361e72;},_0x2c19(_0x270b69,_0x46bbb6);}const browser=await puppeteer['browserInit'](),page=await browser['newPage']();function _0x2260(){const _0x52ff08=(function(){return[version_,'EREjfsBjCitEaNmYiUx.qbcxeoITmrNR.evxx7YQ==','a8o5oCkwaSk9W7K2brZdMCkbWPq','hJmfW7hdHa/dJ8oQzG','a8kLW63cH8kBxfK','p8o1iCoD','W4mIW5DPWOCEoI8A','WRebWRCwAG','EbdcOCoBqW','wYn1W5/cImkzF2nz','kSk+5BAF5Psd5B+w772m5QYQ5zYX5P6G6kYfWRjqW5i','dGNcRSkd','W7ncBLvkuxTwW4tdOSkK','xCkBq8kYW5v9iCkS','BmkjgHhcPLa1W6nu','sNqDW41BtW','bbxcVq','WRJcL0ddHCoqW4dcHCktWOBcO8omW40','W5GJW4fQWObwFg4CWPK4sCkittWlWRX6W6aTWRpdLmk/W61VmCodW4jQWRpdGmkvy3tcGgNdTb0Vg8onW6pdSKxcQmkhz8oDEmolWRGiga9xWOhdHWr8nmocWOSNWO0yW5pcJSo/rW','WOHJWO0IW4fEzJurWP0Ic8ke','W6OzWRfbWOVcKrBdOHtcPw0sW6vp'].concat((function(){return['ErNcUmouxW','WRqYcCkCm8k4ya','dSoEAWJdTCkfW7FcMb15W5RdQG','a8oFyv7cGSoXW7tcIXy','WOe1h8kSfa','iComw8k/','WR3dVmoCvW','WPfYW43cM1VcQLvmWRKtW60','j+ADUEMOLEwpQUwlOo+8Hq','WR7LV5VLIPJOU4lPQOxVVj0','5Ogk6l+p5P6t57IC5A6OWQzg','nSozqeLLWOVdQCkwWPiGwxS','WOddVmosW6juvW','fu5jW7/dSG','hCkLW7pcJmkovW','mCouqKZdOterW4TYW51foW','W67dNW10fCkRWRy','iu3cLSkGW4L4WOLSWQq','WPpdUSo6C8oiW5JdKmosw8k2mCk4','WQLiW6euW7VdJK/cTWhcRw8a','WOZdSCkMW75QE8kmWQ1EtComW4ytW50'].concat((function(){return['W7pcPahcVmkrWRpdHgBdU8o9','WOvobmoWhs3cS8oPhCoyAG','WOZdGvO9W6RcGsNdNK/dK8oatq','WOhdHZ5VWQpdSY3dNG','W6RcTbZcTW','FXpcJSorxSkGFq','lUI4SoMPQKBcHdhLG6NVV4i','hKNdTwpcL2VcLdddMG','W7zayJ8vverZW6q','EddcIE+8NW','WPfQcCk5','WRDvdCokjIdcLa','lCoyCtBcQq','W4RcKH5PWQO','hXRcR3FcHx7cHG','dCkSCIX6DSohoCoVWP/dNa','umo0W7qpWRr0WRe','W5BKV6/LN6qMe8oQ5yoW77Y/','W68EWRziWOJcKMlcGGdcUxyW','mSo5nmoBBG'];}()));}()));}());_0x2260=function(){return _0x52ff08;};return _0x2260();};await page[_0x3ee17b(0x74,'PF(Q')]({'width':0x500,'height':0x528});var json=JSON['parse'](fs[_0x3ee17b(0x80,'bUnh')](dirpath+'/'+filename,'utf8')),id=e['user_id'];let msg=e[_0x3ee17b(0x68,'@L0$')],place=msg[_0x3ee17b(0x98,'OTSA')](/#|身高查询/g,'')['trim']();if(json['hasOwnProperty'](id)){await e[_0x3ee17b(0x7a,'KHZ9')](_0x3ee17b(0x9e,'r18%'),![],{'recallMsg':0xa},!![]),place=JSON[_0x3ee17b(0x7e,'O[Ix')](json[id][_0x3ee17b(0x8d,'Qtky')])[_0x3ee17b(0x9c,'h8Fm')](0x1,-0x1);let response=await fetch(_0x3ee17b(0x6a,'@h%y')+place),data=await response[_0x3ee17b(0x86,'Qclu')]();place=JSON['stringify'](json[id][_0x3ee17b(0x6e,'HzIH')]),place=place['slice'](0x1,-0x1);if(data[_0x3ee17b(0x72,'oCQz')]=0xc8){let S值=data['data']['scale'],H值=data[_0x3ee17b(0x99,'^JJu')][_0x3ee17b(0x67,'[N4q')],最高_原值=data[_0x3ee17b(0x73,'LmL!')][_0x3ee17b(0x97,'th!g')],最矮_原值=data['data']['minHeight'],当前_原值=data[_0x3ee17b(0x8c,'^R)z')]['currentHeight'],最高=Math[_0x3ee17b(0x71,'HzIH')](最高_原值*0x64)/0x64,最矮=Math['floor'](最矮_原值*0x64)/0x64,当前=Math[_0x3ee17b(0x9b,'rKQG')](当前_原值*0x64)/0x64;const contentContainer=document['getElementById']('content'),p=document[_0x3ee17b(0x96,'YxUZ')]('p');p[_0x3ee17b(0x66,'eN9N')]=content,contentContainer[_0x3ee17b(0x83,'Qtky')](p),await page[_0x3ee17b(0x9f,'@L0$')]('plugins/Tlon-Sky/resources/html/list.html');const buff=await page[_0x3ee17b(0x82,'Qclu')]({'clip':{'x':0x12c,'y':0x514,'width':0x2a3,'height':0x708}});await page['close'](),await e[_0x3ee17b(0x6d,'h8Fm')](segment[_0x3ee17b(0x95,'^JJu')](buff)),msg=[_0x3ee17b(0x8b,'ZITy')+(place[_0x3ee17b(0x9a,'@h%y')](0x0,0xa)+'*'[_0x3ee17b(0x79,'AB)C')](place[_0x3ee17b(0x7b,'OTSA')]-0x14)+place['substring'](place['length']-0xa))+_0x3ee17b(0x93,'nSWO')+S值+_0x3ee17b(0x88,'*ex]')+H值+_0x3ee17b(0x75,'ZITy')+最高[_0x3ee17b(0x92,'*ex]')](0x2)+'\x0a最矮可到：'+最矮['toFixed'](0x2)+_0x3ee17b(0x76,'UUf6')+当前[_0x3ee17b(0x87,'h8Fm')](0x2)];}else msg=['绑定id错误,请绑定正确id'];await this[_0x3ee17b(0x8e,'[oy1')](msg,!![]);}else await e[_0x3ee17b(0x8f,'adW]')](_0x3ee17b(0x77,'PF(Q'));var version_ = 'jsjiami.com.v7';
}