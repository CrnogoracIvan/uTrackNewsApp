import { INewsResponse } from './types.ts';

export const MOCK_CREDENTIALS = {
  USER_NAME: 'ivan',
  PASSWORD: 'ivan',
};

export const NEWS_DATA_MOCK: INewsResponse = {
  meta: {
    found: 53756388,
    returned: 10,
    limit: 10,
    page: 1,
  },
  data: [
    {
      uuid: '1c88b408-14af-4807-9f5e-24141b80b0a5',
      title: 'iOS 26: Use Live Translation in Messages',
      description:
        "In iOS 26, seamless multilingual conversations in Messages are just a few taps away, thanks to Apple's new Live Translation feature. When...",
      keywords: 'Messages',
      snippet:
        "In iOS 26, seamless multilingual conversations in Messages are just a few taps away, thanks to Apple's new Live Translation feature. When chatting with friends ...",
      url: 'https://www.macrumors.com/how-to/ios-live-translation-in-messages/',
      image_url:
        'https://images.macrumors.com/t/lH1h5qR16ihiaywpFC574rpB7L8=/1920x/article-new/2025/09/messages-translate-ios.jpg',
      language: 'en',
      published_at: '2025-09-24T11:55:24.000000Z',
      source: 'macrumors.com',
      categories: ['tech'],
      relevance_score: null,
    },
    {
      uuid: '06fc4ef0-c2ab-4cf7-9207-c89dbcb79481',
      title: 'New Islamiat, Pakistan Studies, Urdu O-Level Syllabus 2025',
      description:
        'Pakistan updates O-Level Islamiat, Pakistan Studies, and Urdu syllabus for 2025, focusing on critical thinking, culture, and modern learning methods.',
      keywords: '',
      snippet:
        'Pakistan has introduced newly updated syllabi for Islamiat, Pakistan Studies, and Urdu at the O-Level stage, aiming to modernize learning while strengthening st...',
      url: 'https://www.techjuice.pk/new-islamiat-pakistan-studies-urdu-o-level-syllabus-2025/',
      image_url:
        'https://www.techjuice.pk/wp-content/uploads/2025/09/punjab-online-textbooks-now-free-for-all-students-techjuice-190979-092215.jpg',
      language: 'en',
      published_at: '2025-09-24T11:55:16.000000Z',
      source: 'techjuice.pk',
      categories: ['tech'],
      relevance_score: null,
    },
    {
      uuid: '5d7dd841-4c02-4f11-9fec-1004a56918e3',
      title:
        'Latency spikes with 2xx responses from requests not reaching my app',
      description:
        'Hello, I’ve recently migrated my Slack bot app to DigitalOcean App Platform and I’m seeing confusing CDN ingress latency spikes that I can’t explain. **Pr...',
      keywords: '',
      snippet:
        'Hello,\n\nI’ve recently migrated my Slack bot app to DigitalOcean App Platform and I’m seeing confusing CDN ingress latency spikes that I can’t explain.\n\nPr...',
      url: 'https://www.digitalocean.com/community/questions/latency-spikes-with-2xx-responses-from-requests-not-reaching-my-app',
      image_url:
        'https://www.digitalocean.com/_next/static/media/social-share-default.e8530e9e.jpeg',
      language: 'en',
      published_at: '2025-09-24T11:52:23.000000Z',
      source: 'digitalocean.com',
      categories: ['tech'],
      relevance_score: null,
    },
    {
      uuid: '31c59e29-9a94-47d0-9b14-2ac1a61c3204',
      title: "HBO Max. Série de terror baseada em 'It' recebeu novo trailer",
      description:
        'A estreia de ‘It: Welcome to Derry’ está marcada para o dia 27 de outubro e servirá sobretudo para expandir o livro da autoria de Stephen King que, nos ú...',
      keywords: '',
      snippet:
        'Os subscritores da HBO Max já podem marcar no calendário o dia 27 de outubro, uma vez que será neste dia que estreará ‘It: Welcome to Derry’ - uma nova ...',
      url: 'https://www.noticiasaominuto.com/tech/2858846/hbo-max-serie-de-terror-baseada-em-it-recebeu-novo-trailer#utm_source=rss-tech&utm_medium=rss&utm_campaign=rssfeed',
      image_url:
        'https://media-manager.noticiasaominuto.com/960/naom_68d3ff89f12e0.webp?crop_params=eyJsYW5kc2NhcGUiOnsiY3JvcFdpZHRoIjoxMjI3LCJjcm9wSGVpZ2h0Ijo2OTAsImNyb3BYIjoxOTksImNyb3BZIjoyMTZ9LCJwb3J0cmFpdCI6eyJjcm9wV2lkdGgiOjQ4NiwiY3JvcEhlaWdodCI6ODY0LCJjcm9wWCI6Njc2LCJjcm9wWSI6NzZ9fQ==',
      language: 'pt',
      published_at: '2025-09-24T15:28:52.000000Z',
      source: 'noticiasaominuto.com',
      categories: ['general', 'tech'],
      relevance_score: null,
    },
    {
      uuid: 'b9aa123b-6c87-43fe-bce3-c2b697896a38',
      title: "HBO Max. Série de terror baseada em 'It' recebeu novo trailer",
      description:
        'A estreia de ‘It: Welcome to Derry’ está marcada para o dia 27 de outubro e servirá sobretudo para expandir o livro da autoria de Stephen King que, nos ú...',
      keywords: '',
      snippet:
        'Os subscritores da HBO Max já podem marcar no calendário o dia 27 de outubro, uma vez que será neste dia que estreará ‘It: Welcome to Derry’ - uma nova ...',
      url: 'https://www.noticiasaominuto.com/tech/2858846/hbo-max-serie-de-terror-baseada-em-it-recebeu-novo-trailer#utm_source=rss-ultima-hora&utm_medium=rss&utm_campaign=rssfeed',
      image_url:
        'https://media-manager.noticiasaominuto.com/960/naom_68d3ff89f12e0.webp?crop_params=eyJsYW5kc2NhcGUiOnsiY3JvcFdpZHRoIjoxMjI3LCJjcm9wSGVpZ2h0Ijo2OTAsImNyb3BYIjoxOTksImNyb3BZIjoyMTZ9LCJwb3J0cmFpdCI6eyJjcm9wV2lkdGgiOjQ4NiwiY3JvcEhlaWdodCI6ODY0LCJjcm9wWCI6Njc2LCJjcm9wWSI6NzZ9fQ==',
      language: 'pt',
      published_at: '2025-09-24T15:28:52.000000Z',
      source: 'noticiasaominuto.com',
      categories: ['sports', 'general'],
      relevance_score: null,
    },
    {
      uuid: '82a76cf1-3c99-4677-86a0-9e72092a7761',
      title:
        '강서푸드뱅크·마켓, ‘2025 한가위, 마음을 보듬다’ 추석맞이 식품 지원 행사 진행',
      description:
        '강서푸드뱅크·마켓은 9월 24일, 지역 내 취약계층 아동들을 위한 ‘2025 한가위 마음보듬 행사’를 개최했다. ‘아이들의 ...',
      keywords: '',
      snippet:
        '(왼쪽부터) 진교훈 강서구청장, 함께하는사랑밭 정유진 대표이사, 권오중 홍보대사가 추석 꾸러미를 제작하고 있다. 강?...',
      url: 'http://www.e2news.com/news/articleView.html?idxno=323529',
      image_url:
        'https://cdn.e2news.com/news/thumbnail/202509/323529_221911_286_v150.jpg',
      language: 'ko',
      published_at: '2025-09-24T15:28:24.000000Z',
      source: 'e2news.com',
      categories: [],
      relevance_score: null,
    },
    {
      uuid: '89f0a25a-74ea-4193-9b47-c73da8a70498',
      title: '창녕군, ‘부실 관리 창녕하수처리장’ 재발방지책 내놔',
      description:
        '창녕군이 창녕공공하수처리장 부실 관리 문제 해법으로 유입부 긴급차단게이트 통제 강화와 침사지 개선 방안 등을 내?...',
      keywords: '',
      snippet:
        '성낙인 창녕군수는 창녕환경운동연합 등의 창녕공공하수처리장 운영에 대한 경남도 감사 요구에 따라 도 감사위가 창녕...',
      url: 'https://www.idomin.com/news/articleView.html?idxno=947023',
      image_url:
        'https://cdn.idomin.com/news/thumbnail/202509/947023_651602_3003_v150.jpg',
      language: 'ko',
      published_at: '2025-09-24T15:28:24.000000Z',
      source: 'idomin.com',
      categories: [],
      relevance_score: null,
    },
    {
      uuid: '059170b8-f7d3-4ddf-8556-7cf1b8e29384',
      title: 'デフリンピック、レガシーに 小池百合子知事、都議会で',
      description:
        '東京都議会定例会が24日開会し、小池百合子知事は所信表明で、東京で開催された世界陸上の成功を強調し「スポーツ?...',
      keywords: '西日本新聞me, 西日本新聞, ニュース, 九州, 福岡',
      snippet: 'クリップ機能は有料会員の方のみお使いいただけます。',
      url: 'https://www.nishinippon.co.jp/item/1403099/',
      image_url:
        'https://www.nishinippon.co.jp/assets/nnp/img/base/og_image.png',
      language: 'ja',
      published_at: '2025-09-24T15:28:23.000000Z',
      source: 'nishinippon.co.jp',
      categories: [],
      relevance_score: null,
    },
    {
      uuid: '974b95d7-98d1-456d-a743-2b1a8587a839',
      title: 'Senators notebook: Who has stood out after two pre-season games?',
      description:
        'With training camp underway and two pre-season games in the books, here is a look at the most interesting players on the Ottawa Senators so far.',
      keywords: '',
      snippet:
        'OTTAWA — With training camp underway and two pre-season games in the books, here is a look at the most interesting players on the Ottawa Senators.\n\nYakemchuk ...',
      url: 'https://www.sportsnet.ca/nhl/article/senators-notebook-who-has-stood-out-after-two-pre-season-games/',
      image_url:
        'https://www.sportsnet.ca/wp-content/uploads/2025/09/Ottawa-Senators-Dylan-Cozens.jpg',
      language: 'en',
      published_at: '2025-09-24T15:28:16.000000Z',
      source: 'sportsnet.ca',
      categories: ['sports'],
      relevance_score: null,
    },
    {
      uuid: 'e42217e5-1f4e-4534-b67a-9ca119deefae',
      title: 'Что такое приветственные надбавки по накопительным счетам?',
      description: '',
      keywords: '',
      snippet:
        'Приветственные надбавки — это маркетинговая акция. Банки проводят ее для привлечения ?...',
      url: 'https://itsecforu.ru/2025/09/24/chto-takoe-privetstvennye-nadbavki-po-nakopitelnym-schetam/',
      image_url:
        'https://itsecforu.ru/wp-content/uploads/2017/01/cropped-Google-USB_Security-Key-1-32x32.jpg',
      language: 'ru',
      published_at: '2025-09-24T15:28:14.000000Z',
      source: 'itsecforu.ru',
      categories: ['tech', 'general'],
      relevance_score: null,
    },
    {
      uuid: 'b2c7e493-1f50-487d-a575-96205254fd9d',
      title:
        'Why Crochet and Scherzer trends suggest the under as the way to go',
      description: '',
      keywords: '',
      snippet:
        'Why Crochet and Scherzer trends suggest the under as the way to go\n\nVSiN By The Books’ Dave Ross and Jensen Lewis handicap the Red Sox vs. Blue Jays tilt, loo...',
      url: 'https://www.sportsnet.ca/mlb/video/why-crochet-and-scherzer-trends-suggest-the-under-as-the-way-to-go/',
      image_url: 'https://www.sportsnet.ca/sn_favicon.ico',
      language: 'en',
      published_at: '2025-09-24T15:28:12.000000Z',
      source: 'sportsnet.ca',
      categories: ['sports'],
      relevance_score: null,
    },
  ],
};

export const getNewsMock = async (): Promise<INewsResponse> => {
  return NEWS_DATA_MOCK;
};
