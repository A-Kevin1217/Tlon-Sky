import plugin from '../../../lib/plugins/plugin.js';
import fetch from "node-fetch";
import fs from 'fs'

const dirpath = "plugins/Tlon-Sky/data/id"
const 使用次数文件夹 = "plugins/Tlon-Sky/data/使用次数"
let filename = 'Sky UID.json'
let 使用次数文件 = '身高查询使用次数.json'
const mkdirIfNotExist = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};

mkdirIfNotExist(dirpath);
mkdirIfNotExist(使用次数文件夹);
fs.writeFileSync(`${dirpath}/${filename}`, JSON.stringify({}), { flag: 'wx' });
fs.writeFileSync(`${使用次数文件夹}/${使用次数文件}`, JSON.stringify({}), { flag: 'wx' });

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
          reg: /^#?(身高查询|查询身高)$/,
          fnc: 'sky_sgcx'
        }
      ]
    });
  }
  async sky_bdsg(e) {
    const msg = e.msg;
    const Sky_Uid = msg.replace(/#|绑定身高id/g, "").trim();
    const data = { Sky_Uid };
    const id = e.user_id;
    const json = JSON.parse(fs.readFileSync(`${dirpath}/${filename}`, "utf8"));
    json[id] = data;
    fs.writeFileSync(`${dirpath}/${filename}`, JSON.stringify(json, null, "\t"));
    const replyMsg = json.hasOwnProperty(id) ? "重新绑定成功" : "绑定成功\n您可使用'#身高查询'查询身高";
    await this.reply(replyMsg);
  }
  
  async sky_sgcx(e) {
    var version_='jsjiami.com.v7';const _0x21eee0=_0x2d92;(function(_0x34a382,_0x32573b,_0x197715,_0x1e9f9e,_0x2de6d5,_0x4d3efc,_0x2e259a){return _0x34a382=_0x34a382>>0x5,_0x4d3efc='hs',_0x2e259a='hs',function(_0x26f40c,_0x15788e,_0xf529e8,_0x457b4c,_0x1b2dc9){const _0x2f6244=_0x2d92;_0x457b4c='tfi',_0x4d3efc=_0x457b4c+_0x4d3efc,_0x1b2dc9='up',_0x2e259a+=_0x1b2dc9,_0x4d3efc=_0xf529e8(_0x4d3efc),_0x2e259a=_0xf529e8(_0x2e259a),_0xf529e8=0x0;const _0xb4246=_0x26f40c();while(!![]&&--_0x1e9f9e+_0x15788e){try{_0x457b4c=parseInt(_0x2f6244(0x1cd,'YMHs'))/0x1*(-parseInt(_0x2f6244(0x1ce,'phMr'))/0x2)+parseInt(_0x2f6244(0x1ab,'3s6f'))/0x3+parseInt(_0x2f6244(0x1c1,'fr))'))/0x4+parseInt(_0x2f6244(0x1bd,'#UxS'))/0x5*(parseInt(_0x2f6244(0x1ac,'#UxS'))/0x6)+parseInt(_0x2f6244(0x1b4,'w]7%'))/0x7*(-parseInt(_0x2f6244(0x1c5,'aMts'))/0x8)+-parseInt(_0x2f6244(0x1a4,'IWH4'))/0x9*(-parseInt(_0x2f6244(0x1ad,'G2EG'))/0xa)+parseInt(_0x2f6244(0x1bb,'@(VT'))/0xb*(parseInt(_0x2f6244(0x1b1,'hDCN'))/0xc);}catch(_0x21853a){_0x457b4c=_0xf529e8;}finally{_0x1b2dc9=_0xb4246[_0x4d3efc]();if(_0x34a382<=_0x1e9f9e)_0xf529e8?_0x2de6d5?_0x457b4c=_0x1b2dc9:_0x2de6d5=_0x1b2dc9:_0xf529e8=_0x1b2dc9;else{if(_0xf529e8==_0x2de6d5['replace'](/[nVftklAweIdMTKGSRgBD=]/g,'')){if(_0x457b4c===_0x15788e){_0xb4246['un'+_0x4d3efc](_0x1b2dc9);break;}_0xb4246[_0x2e259a](_0x1b2dc9);}}}}}(_0x197715,_0x32573b,function(_0x4ac84a,_0x6ca0a,_0x14c964,_0x4a79ac,_0x17baa0,_0x4108ab,_0x510657){return _0x6ca0a='\x73\x70\x6c\x69\x74',_0x4ac84a=arguments[0x0],_0x4ac84a=_0x4ac84a[_0x6ca0a](''),_0x14c964='\x72\x65\x76\x65\x72\x73\x65',_0x4ac84a=_0x4ac84a[_0x14c964]('\x76'),_0x4a79ac='\x6a\x6f\x69\x6e',(0x130b74,_0x4ac84a[_0x4a79ac](''));});}(0x1880,0xb9ba2,_0x5a8c,0xc6),_0x5a8c)&&(version_=_0x5a8c);function _0x2d92(_0xb818b3,_0x41a802){const _0x5a8c8f=_0x5a8c();return _0x2d92=function(_0x2d926e,_0x1a0e65){_0x2d926e=_0x2d926e-0x1a1;let _0x1ad1b9=_0x5a8c8f[_0x2d926e];if(_0x2d92['PDIfIq']===undefined){var _0x23b1a2=function(_0x304ce2){const _0x12a7f1='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x9a091='',_0x46044c='';for(let _0xc13b91=0x0,_0x372be1,_0x58e6e5,_0x36d1f7=0x0;_0x58e6e5=_0x304ce2['charAt'](_0x36d1f7++);~_0x58e6e5&&(_0x372be1=_0xc13b91%0x4?_0x372be1*0x40+_0x58e6e5:_0x58e6e5,_0xc13b91++%0x4)?_0x9a091+=String['fromCharCode'](0xff&_0x372be1>>(-0x2*_0xc13b91&0x6)):0x0){_0x58e6e5=_0x12a7f1['indexOf'](_0x58e6e5);}for(let _0x36ee6c=0x0,_0x5a1156=_0x9a091['length'];_0x36ee6c<_0x5a1156;_0x36ee6c++){_0x46044c+='%'+('00'+_0x9a091['charCodeAt'](_0x36ee6c)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x46044c);};const _0x472d58=function(_0x309a2a,_0x5f0153){let _0x14cb09=[],_0x19622f=0x0,_0x523929,_0x3a717b='';_0x309a2a=_0x23b1a2(_0x309a2a);let _0x4c5a89;for(_0x4c5a89=0x0;_0x4c5a89<0x100;_0x4c5a89++){_0x14cb09[_0x4c5a89]=_0x4c5a89;}for(_0x4c5a89=0x0;_0x4c5a89<0x100;_0x4c5a89++){_0x19622f=(_0x19622f+_0x14cb09[_0x4c5a89]+_0x5f0153['charCodeAt'](_0x4c5a89%_0x5f0153['length']))%0x100,_0x523929=_0x14cb09[_0x4c5a89],_0x14cb09[_0x4c5a89]=_0x14cb09[_0x19622f],_0x14cb09[_0x19622f]=_0x523929;}_0x4c5a89=0x0,_0x19622f=0x0;for(let _0x3b6e55=0x0;_0x3b6e55<_0x309a2a['length'];_0x3b6e55++){_0x4c5a89=(_0x4c5a89+0x1)%0x100,_0x19622f=(_0x19622f+_0x14cb09[_0x4c5a89])%0x100,_0x523929=_0x14cb09[_0x4c5a89],_0x14cb09[_0x4c5a89]=_0x14cb09[_0x19622f],_0x14cb09[_0x19622f]=_0x523929,_0x3a717b+=String['fromCharCode'](_0x309a2a['charCodeAt'](_0x3b6e55)^_0x14cb09[(_0x14cb09[_0x4c5a89]+_0x14cb09[_0x19622f])%0x100]);}return _0x3a717b;};_0x2d92['gGUgQs']=_0x472d58,_0xb818b3=arguments,_0x2d92['PDIfIq']=!![];}const _0x4bfe74=_0x5a8c8f[0x0],_0x23b631=_0x2d926e+_0x4bfe74,_0x546f16=_0xb818b3[_0x23b631];return!_0x546f16?(_0x2d92['IynMDu']===undefined&&(_0x2d92['IynMDu']=!![]),_0x1ad1b9=_0x2d92['gGUgQs'](_0x1ad1b9,_0x1a0e65),_0xb818b3[_0x23b631]=_0x1ad1b9):_0x1ad1b9=_0x546f16,_0x1ad1b9;},_0x2d92(_0xb818b3,_0x41a802);}let userCounts=JSON[_0x21eee0(0x1bf,'icx2')](fs[_0x21eee0(0x1cc,'hDCN')](使用次数文件夹+'/'+使用次数文件,_0x21eee0(0x1c3,'$@p7')));const 用户QQ=e['user_id'],用户昵称=e['sender'][_0x21eee0(0x1ae,'3YH1')],用户群昵称=e['sender'][_0x21eee0(0x1c4,'P5q2')],使用群昵称=e['group_name'],使用群号=e[_0x21eee0(0x1a5,'fr))')],{使用次数:userCount,用户信息:userInfo}=userCounts[用户QQ]||{'使用次数':0x0,'用户信息':{}},newCount=userCount+0x1;userCounts[用户QQ]={'使用次数':newCount,'用户信息':{...userInfo,'用户QQ':用户QQ,'用户昵称':用户昵称,'用户群昵称':用户群昵称,'使用群昵称':使用群昵称,'使用群号':使用群号}},fs[_0x21eee0(0x1c0,'@(VT')](使用次数文件夹+'/'+使用次数文件,JSON['stringify'](userCounts,null,'\x09'));const json=JSON[_0x21eee0(0x1b9,'4$&[')](fs[_0x21eee0(0x1c6,'^V[g')](dirpath+'/'+filename,_0x21eee0(0x1be,'aMts'))),id=e['user_id'];if(json[_0x21eee0(0x1c8,'I*x*')](id)){const 使用次数文件=JSON[_0x21eee0(0x1ba,'S6w9')](fs[_0x21eee0(0x1a2,'rH1b')](使用次数文件夹+'/'+使用次数文件,_0x21eee0(0x1a8,'phMr'))),使用次数=使用次数文件[''+id]['使用次数'],文字=_0x21eee0(0x1c9,'I7Mw'),图片='plugins/Tlon-Sky/resource/统计及其他/官频.png',消息=[文字?文字:'',图片?segment[_0x21eee0(0x1cf,'WZ2V')](图片):''];await e['reply'](消息,![],{'recallMsg':0xa},!![]);const Sky_Uid=json[id][_0x21eee0(0x1b8,'XFZJ')],response=await fetch('https://api.t1qq.com/api/sky/sc/sg?key=uc2WiIfj8iheIVUhdtbMw7Tn6I&cx='+Sky_Uid),data=await response[_0x21eee0(0x1b3,'#UxS')]();if(data['code']===0xc8){const {scale,height,maxHeight,minHeight,currentHeight}=data['data'],最高=Math['floor'](maxHeight*0x64)/0x64,最矮=Math['floor'](minHeight*0x64)/0x64,当前=Math[_0x21eee0(0x1b2,'G2EG')](currentHeight*0x64)/0x64,Textreply=_0x21eee0(0x1a9,'3S4(')+scale+_0x21eee0(0x1aa,'%Vcn')+height+'\x0a最高是：'+最高[_0x21eee0(0x1b0,'PSH4')](0x3)+'号\x0a最矮是：'+最矮['toFixed'](0x3)+'号\x0a目前身高：'+当前[_0x21eee0(0x1b7,'$@p7')](0x3)+_0x21eee0(0x1a7,'&[0X')+使用次数,msg=[segment['at'](e[_0x21eee0(0x1af,'3s6f')]),Textreply?Textreply:''];await this[_0x21eee0(0x1cb,'rH1b')](msg);}else{if(data['code']===0xc9){const Textreply=_0x21eee0(0x1b5,'nIIK'),msg=[Textreply?Textreply:''];await this['reply'](msg);}}}else await e['reply'](_0x21eee0(0x1a3,'hDCN'));function _0x5a8c(){const _0x8e82d=(function(){return[version_,'IAtwjsMjSdiDfagmVfigge.TRcRolmgBK.vkG7nR==','WOimrg0KWR7dIG','imo8WOtcKSkWW6VdLY/cVdG','WOu3CSogW6i','mmknW4Ge','WQ7dOvZcN2OUgSktWQW','57Us5A6ZW4b46zEJ6k2HWRBOR7NPH6VML4RNUiRLR7a','mmk+WQddJ2TiWOrZW7S7','d1HxW6tdQbLZ','WPnNb8onxSkhWQa','C8kABun0','WPtcKcTnWQO','WRhdVMBdRa42W71jjmod','WPWNgaxdICktvIVcQCkw','B8olW6SouLqYdG','WQRcUSoSW7C'].concat((function(){return['odOVWO1u','W7dcUJZcQZ8OW51skCosvCoByG','qLDFWQzkW73cUCo5WP8NB0/dMW','W6RdVmk8W788WQG9WQFcM8osvwD2','dKn3WRu','iCouFSoK','W6BdU8k9W7S+W7DIWQRcK8o1tW','kmkslSoHWOvzkhebW4RdRCkW','FHDOWQL4w8k4','iSoBWPaAgCoxA8kBWOVdJg1cW7hdOa','W43dIUw2S+AvLow+L++/NEAVHUwFJUAEUUISTgZcJCofC+wUL+MIIE+/NeVdVYGMlGBcGZi','WPRdOtLfkSk9vJa','W6NdSCojANC','yCkTW5ZdHmkLW7ddLWZcPGZdJSk8','W54qWRLee2VdMmkuWQVcLX/dQCoy','W68sW5LUdaJcSG','WOlcJfjyWPq'].concat((function(){return['WOOUeHxdUYRdQ2VdN8kx','W6NdSCoyyKG2WRVdV8opoJNcKq','5Ok76lYq5P6x57MX5A25W7ddNW','WOGzWOFcPSkCWOWLW7xcLee','ebaaW7OyWPddQmor','sGyIWRVcO0uLwSkkvc9VDW','5y+cW5RKVjFNLB/MRBZML7BVVyC','WQGEW7KZ','WO/KVz3LNR5EqSkt5yoq5PQn77Y3hW','W73OUiZPQPxdHCkfWRFLGBdMMjhVVRJdPW','WR3cGaFdPYtcIXPGxmoXW6P+','A8omWPnBoZCxdCkQW70gW7K','W5jRkSkAWQpcNCoMW45efqvP','dCovW7tdUu3cQJuY','W7/dGLtcPK3dKZC'];}()));}()));}());_0x5a8c=function(){return _0x8e82d;};return _0x5a8c();};var version_ = 'jsjiami.com.v7';
}
}