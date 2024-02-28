import { render } from '../components/index.js';
import { leaderboard } from '../utils/Leaderboard.js';
import { GD } from '../utils/db.js';

export class 娱乐_光遇排行榜 extends plugin {
  constructor() {
    super({
      name: '[Tlon-Sky]娱乐:光遇排行榜',
      dsc: '娱乐光遇排行榜',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: /^(#|\/)?(蜡烛|赌博|抢蜡|签到)排行$/,
          fnc: 'Ranking'
        }
      ]
    });
  }

  async Ranking(e) {
    leaderboard();
    const MATCH = e.msg.match(/^(#|\/)?(蜡烛|赌博|抢蜡|签到)排行$/);
    const LEADERBOARD_TYPE = MATCH[2];

    let LEADERBOARD_FILE_A, LEADERBOARD_FILE_B, TITLE_A, TITLE_B;
    if (LEADERBOARD_TYPE === '蜡烛') {
      LEADERBOARD_FILE_A = 'plugins/Tlon-Sky/data/排行榜/白蜡.json';
      LEADERBOARD_FILE_B = 'plugins/Tlon-Sky/data/排行榜/季蜡.json';
      TITLE_A = '白蜡排行';
      TITLE_B = '季蜡排行';
    } else if (LEADERBOARD_TYPE === '赌博') {
      LEADERBOARD_FILE_A = 'plugins/Tlon-Sky/data/排行榜/赚取.json';
      LEADERBOARD_FILE_B = 'plugins/Tlon-Sky/data/排行榜/亏损.json';
      TITLE_A = '赚取排行';
      TITLE_B = '亏损排行';
    } else if (LEADERBOARD_TYPE === '抢蜡') {
      LEADERBOARD_FILE_A = 'plugins/Tlon-Sky/data/排行榜/抢蜡烛次数.json';
      LEADERBOARD_FILE_B = 'plugins/Tlon-Sky/data/排行榜/被抢次数.json';
      TITLE_A = '抢蜡排行';
      TITLE_B = '被抢排行';
    } else if (LEADERBOARD_TYPE === '签到') {
      LEADERBOARD_FILE_A = 'plugins/Tlon-Sky/data/排行榜/累计签到天数.json';
      LEADERBOARD_FILE_B = 'plugins/Tlon-Sky/data/排行榜/连续签到天数.json';
      TITLE_A = '累签排行';
      TITLE_B = '连签排行';
    }

    const LEADERBOARD_DATA_A = GD(LEADERBOARD_FILE_A);
    const LEADERBOARD_DATA_B = GD(LEADERBOARD_FILE_B);

    const Top_nickname_A = LEADERBOARD_DATA_A.slice(0, 10).map(item => item.nickname);
    const Top_nickname_B = LEADERBOARD_DATA_B.slice(0, 10).map(item => item.nickname);

    const Top_A = LEADERBOARD_DATA_A.slice(0, 10).map(item => item.level);
    const Top_B = LEADERBOARD_DATA_B.slice(0, 10).map(item => item.level);

    const Top_ID_A = [];
    for (let i = 0; i < 10; i++) {
      Top_ID_A[i] = `https://q.qlogo.cn/g?b=qq&nk=${LEADERBOARD_DATA_A[i].Head_shot}&s=640`;
    }
    const Top_ID_B = [];
    for (let i = 0; i < 10; i++) {
      Top_ID_B[i] = `https://q.qlogo.cn/g?b=qq&nk=${LEADERBOARD_DATA_B[i].Head_shot}&s=640`;
    }

    let html = {
      Title1: TITLE_A, Title2: TITLE_B,
      NicknameTop1: Top_nickname_A[0], NicknameTop2: Top_nickname_A[1],
      NicknameTop3: Top_nickname_A[2], NicknameTop4: Top_nickname_A[3],
      NicknameTop5: Top_nickname_A[4], NicknameTop6: Top_nickname_A[5],
      NicknameTop7: Top_nickname_A[6], NicknameTop8: Top_nickname_A[7],
      NicknameTop9: Top_nickname_A[8], NicknameTop10: Top_nickname_A[9],
      _NicknameTop1: Top_nickname_B[0], _NicknameTop2: Top_nickname_B[1],
      _NicknameTop3: Top_nickname_B[2], _NicknameTop4: Top_nickname_B[3],
      _NicknameTop5: Top_nickname_B[4], _NicknameTop6: Top_nickname_B[5],
      _NicknameTop7: Top_nickname_B[6], _NicknameTop8: Top_nickname_B[7],
      _NicknameTop9: Top_nickname_B[8], _NicknameTop10: Top_nickname_B[9],
      NumberTop1: Top_A[0], NumberTop2: Top_A[1],
      NumberTop3: Top_A[2], NumberTop4: Top_A[3],
      NumberTop5: Top_A[4], NumberTop6: Top_A[5],
      NumberTop7: Top_A[6], NumberTop8: Top_A[7],
      NumberTop9: Top_A[8], NumberTop10: Top_A[9],
      _NumberTop1: Top_B[0], _NumberTop2: Top_B[1],
      _NumberTop3: Top_B[2], _NumberTop4: Top_B[3],
      _NumberTop5: Top_B[4], _NumberTop6: Top_B[5],
      _NumberTop7: Top_B[6], _NumberTop8: Top_B[7],
      _NumberTop9: Top_B[8], _NumberTop10: Top_B[9],
      AvatarTop1: Top_ID_A[0], AvatarTop2: Top_ID_A[1],
      AvatarTop3: Top_ID_A[2], AvatarTop4: Top_ID_A[3],
      AvatarTop5: Top_ID_A[4], AvatarTop6: Top_ID_A[5],
      AvatarTop7: Top_ID_A[6], AvatarTop8: Top_ID_A[7],
      AvatarTop9: Top_ID_A[8], AvatarTop10: Top_ID_A[9],
      _AvatarTop1: Top_ID_B[0], _AvatarTop2: Top_ID_B[1],
      _AvatarTop3: Top_ID_B[2], _AvatarTop4: Top_ID_B[3],
      _AvatarTop5: Top_ID_B[4], _AvatarTop6: Top_ID_B[5],
      _AvatarTop7: Top_ID_B[6], _AvatarTop8: Top_ID_B[7],
      _AvatarTop9: Top_ID_B[8], _AvatarTop10: Top_ID_B[9]
    }

    await render('admin/Leaderboard', { ...html }, { e, scale: 1.4 });
  }
}