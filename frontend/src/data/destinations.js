/* 전 세계 여행지 목록 — { city, display, flag, key } */
/* flag: ISO 2자리 소문자 국가코드 / key: 메인 나라명(한국어) */

const DEST_DATA = [
  /* ────────── 아시아 ────────── */
  // 일본
  { city: '일본',       display: '일본',            flag: 'jp', key: '일본' },
  { city: '도쿄',       display: '일본',            flag: 'jp', key: '일본' },
  { city: '오사카',     display: '일본',            flag: 'jp', key: '일본' },
  { city: '교토',       display: '일본',            flag: 'jp', key: '일본' },
  { city: '후쿠오카',   display: '일본',            flag: 'jp', key: '일본' },
  { city: '삿포로',     display: '일본',            flag: 'jp', key: '일본' },
  { city: '나고야',     display: '일본',            flag: 'jp', key: '일본' },
  { city: '요코하마',   display: '일본',            flag: 'jp', key: '일본' },
  { city: '나라',       display: '일본',            flag: 'jp', key: '일본' },
  { city: '고베',       display: '일본',            flag: 'jp', key: '일본' },
  { city: '히로시마',   display: '일본',            flag: 'jp', key: '일본' },
  { city: '오키나와',   display: '일본',            flag: 'jp', key: '일본' },
  { city: '나하',       display: '일본, 오키나와',  flag: 'jp', key: '일본' },
  { city: '센다이',     display: '일본',            flag: 'jp', key: '일본' },
  { city: '신주쿠',     display: '일본, 도쿄',      flag: 'jp', key: '일본' },
  { city: '시부야',     display: '일본, 도쿄',      flag: 'jp', key: '일본' },
  { city: '아사쿠사',   display: '일본, 도쿄',      flag: 'jp', key: '일본' },
  { city: '긴자',       display: '일본, 도쿄',      flag: 'jp', key: '일본' },
  { city: '아키하바라', display: '일본, 도쿄',      flag: 'jp', key: '일본' },
  { city: '롯폰기',     display: '일본, 도쿄',      flag: 'jp', key: '일본' },
  { city: '하라주쿠',   display: '일본, 도쿄',      flag: 'jp', key: '일본' },
  { city: '우메다',     display: '일본, 오사카',    flag: 'jp', key: '일본' },
  { city: '난바',       display: '일본, 오사카',    flag: 'jp', key: '일본' },
  { city: '도톤보리',   display: '일본, 오사카',    flag: 'jp', key: '일본' },

  // 중국
  { city: '중국',       display: '중국',            flag: 'cn', key: '중국' },
  { city: '상하이',     display: '중국',            flag: 'cn', key: '중국' },
  { city: '베이징',     display: '중국',            flag: 'cn', key: '중국' },
  { city: '광저우',     display: '중국',            flag: 'cn', key: '중국' },
  { city: '청두',       display: '중국',            flag: 'cn', key: '중국' },
  { city: '시안',       display: '중국',            flag: 'cn', key: '중국' },
  { city: '구이린',     display: '중국',            flag: 'cn', key: '중국' },
  { city: '장자제',     display: '중국',            flag: 'cn', key: '중국' },
  { city: '항저우',     display: '중국',            flag: 'cn', key: '중국' },
  { city: '쑤저우',     display: '중국',            flag: 'cn', key: '중국' },
  { city: '쿤밍',       display: '중국',            flag: 'cn', key: '중국' },
  { city: '하이난',     display: '중국',            flag: 'cn', key: '중국' },
  { city: '삼아',       display: '중국, 하이난',    flag: 'cn', key: '중국' },
  { city: '황푸',       display: '중국, 상하이',    flag: 'cn', key: '중국' },
  { city: '푸동',       display: '중국, 상하이',    flag: 'cn', key: '중국' },
  { city: '와이탄',     display: '중국, 상하이',    flag: 'cn', key: '중국' },
  { city: '천안문',     display: '중국, 베이징',    flag: 'cn', key: '중국' },

  // 홍콩
  { city: '홍콩',       display: '홍콩',            flag: 'hk', key: '홍콩' },
  { city: '구룡',       display: '홍콩',            flag: 'hk', key: '홍콩' },
  { city: '침사추이',   display: '홍콩',            flag: 'hk', key: '홍콩' },
  { city: '몽콕',       display: '홍콩',            flag: 'hk', key: '홍콩' },
  { city: '센트럴',     display: '홍콩',            flag: 'hk', key: '홍콩' },
  { city: '란타우섬',   display: '홍콩',            flag: 'hk', key: '홍콩' },

  // 대만
  { city: '대만',       display: '대만',            flag: 'tw', key: '대만' },
  { city: '타이베이',   display: '대만',            flag: 'tw', key: '대만' },
  { city: '타이중',     display: '대만',            flag: 'tw', key: '대만' },
  { city: '가오슝',     display: '대만',            flag: 'tw', key: '대만' },
  { city: '타이난',     display: '대만',            flag: 'tw', key: '대만' },
  { city: '화롄',       display: '대만',            flag: 'tw', key: '대만' },
  { city: '시먼딩',     display: '대만, 타이베이',  flag: 'tw', key: '대만' },
  { city: '단수이',     display: '대만, 타이베이',  flag: 'tw', key: '대만' },

  // 베트남
  { city: '베트남',     display: '베트남',          flag: 'vn', key: '베트남' },
  { city: '하노이',     display: '베트남',          flag: 'vn', key: '베트남' },
  { city: '호치민',     display: '베트남',          flag: 'vn', key: '베트남' },
  { city: '다낭',       display: '베트남',          flag: 'vn', key: '베트남' },
  { city: '호이안',     display: '베트남',          flag: 'vn', key: '베트남' },
  { city: '나트랑',     display: '베트남',          flag: 'vn', key: '베트남' },
  { city: '푸꾸옥',     display: '베트남',          flag: 'vn', key: '베트남' },
  { city: '달랏',       display: '베트남',          flag: 'vn', key: '베트남' },
  { city: '무이네',     display: '베트남',          flag: 'vn', key: '베트남' },
  { city: '사파',       display: '베트남',          flag: 'vn', key: '베트남' },
  { city: '하롱베이',   display: '베트남',          flag: 'vn', key: '베트남' },

  // 태국
  { city: '태국',       display: '태국',            flag: 'th', key: '태국' },
  { city: '방콕',       display: '태국',            flag: 'th', key: '태국' },
  { city: '치앙마이',   display: '태국',            flag: 'th', key: '태국' },
  { city: '푸켓',       display: '태국',            flag: 'th', key: '태국' },
  { city: '파타야',     display: '태국',            flag: 'th', key: '태국' },
  { city: '코사무이',   display: '태국',            flag: 'th', key: '태국' },
  { city: '후아힌',     display: '태국',            flag: 'th', key: '태국' },
  { city: '피피섬',     display: '태국',            flag: 'th', key: '태국' },
  { city: '크라비',     display: '태국',            flag: 'th', key: '태국' },
  { city: '수쿰빗',     display: '태국, 방콕',      flag: 'th', key: '태국' },
  { city: '실롬',       display: '태국, 방콕',      flag: 'th', key: '태국' },
  { city: '카오산로드', display: '태국, 방콕',      flag: 'th', key: '태국' },
  { city: '시암',       display: '태국, 방콕',      flag: 'th', key: '태국' },
  { city: '파통',       display: '태국, 푸켓',      flag: 'th', key: '태국' },

  // 싱가포르
  { city: '싱가포르',   display: '싱가포르',        flag: 'sg', key: '싱가포르' },
  { city: '마리나베이', display: '싱가포르',        flag: 'sg', key: '싱가포르' },
  { city: '센토사',     display: '싱가포르',        flag: 'sg', key: '싱가포르' },
  { city: '오차드',     display: '싱가포르',        flag: 'sg', key: '싱가포르' },
  { city: '부기스',     display: '싱가포르',        flag: 'sg', key: '싱가포르' },
  { city: '차이나타운', display: '싱가포르',        flag: 'sg', key: '싱가포르' },
  { city: '클락키',     display: '싱가포르',        flag: 'sg', key: '싱가포르' },
  { city: '리틀인디아', display: '싱가포르',        flag: 'sg', key: '싱가포르' },

  // 말레이시아
  { city: '말레이시아',   display: '말레이시아',      flag: 'my', key: '말레이시아' },
  { city: '쿠알라룸푸르', display: '말레이시아',      flag: 'my', key: '말레이시아' },
  { city: '페낭',         display: '말레이시아',      flag: 'my', key: '말레이시아' },
  { city: '코타키나발루', display: '말레이시아',      flag: 'my', key: '말레이시아' },
  { city: '랑카위',       display: '말레이시아',      flag: 'my', key: '말레이시아' },
  { city: '조호르바루',   display: '말레이시아',      flag: 'my', key: '말레이시아' },
  { city: '말라카',       display: '말레이시아',      flag: 'my', key: '말레이시아' },

  // 인도네시아
  { city: '인도네시아', display: '인도네시아',      flag: 'id', key: '인도네시아' },
  { city: '발리',       display: '인도네시아',      flag: 'id', key: '인도네시아' },
  { city: '자카르타',   display: '인도네시아',      flag: 'id', key: '인도네시아' },
  { city: '족자카르타', display: '인도네시아',      flag: 'id', key: '인도네시아' },
  { city: '롬복',       display: '인도네시아',      flag: 'id', key: '인도네시아' },
  { city: '코모도',     display: '인도네시아',      flag: 'id', key: '인도네시아' },
  { city: '라부안바조', display: '인도네시아',      flag: 'id', key: '인도네시아' },
  { city: '우붓',       display: '인도네시아, 발리', flag: 'id', key: '인도네시아' },
  { city: '스미냑',     display: '인도네시아, 발리', flag: 'id', key: '인도네시아' },
  { city: '짱구',       display: '인도네시아, 발리', flag: 'id', key: '인도네시아' },
  { city: '쿠타',       display: '인도네시아, 발리', flag: 'id', key: '인도네시아' },
  { city: '누사두아',   display: '인도네시아, 발리', flag: 'id', key: '인도네시아' },
  { city: '사누르',     display: '인도네시아, 발리', flag: 'id', key: '인도네시아' },
  { city: '짐바란',     display: '인도네시아, 발리', flag: 'id', key: '인도네시아' },

  // 필리핀
  { city: '필리핀',   display: '필리핀',          flag: 'ph', key: '필리핀' },
  { city: '마닐라',   display: '필리핀',          flag: 'ph', key: '필리핀' },
  { city: '세부',     display: '필리핀',          flag: 'ph', key: '필리핀' },
  { city: '보라카이', display: '필리핀',          flag: 'ph', key: '필리핀' },
  { city: '팔라완',   display: '필리핀',          flag: 'ph', key: '필리핀' },
  { city: '엘니도',   display: '필리핀, 팔라완',  flag: 'ph', key: '필리핀' },
  { city: '코론',     display: '필리핀, 팔라완',  flag: 'ph', key: '필리핀' },
  { city: '다바오',   display: '필리핀',          flag: 'ph', key: '필리핀' },
  { city: '보홀',     display: '필리핀',          flag: 'ph', key: '필리핀' },

  // 인도
  { city: '인도',   display: '인도',    flag: 'in', key: '인도' },
  { city: '뭄바이', display: '인도',    flag: 'in', key: '인도' },
  { city: '델리',   display: '인도',    flag: 'in', key: '인도' },
  { city: '자이푸르', display: '인도',  flag: 'in', key: '인도' },
  { city: '아그라', display: '인도',    flag: 'in', key: '인도' },
  { city: '고아',   display: '인도',    flag: 'in', key: '인도' },
  { city: '콜카타', display: '인도',    flag: 'in', key: '인도' },
  { city: '방갈로르', display: '인도',  flag: 'in', key: '인도' },
  { city: '타지마할', display: '인도, 아그라', flag: 'in', key: '인도' },

  // 네팔
  { city: '네팔',   display: '네팔',    flag: 'np', key: '네팔' },
  { city: '카트만두', display: '네팔',  flag: 'np', key: '네팔' },
  { city: '포카라', display: '네팔',    flag: 'np', key: '네팔' },

  // 스리랑카
  { city: '스리랑카', display: '스리랑카', flag: 'lk', key: '스리랑카' },
  { city: '콜롬보',   display: '스리랑카', flag: 'lk', key: '스리랑카' },
  { city: '캔디',     display: '스리랑카', flag: 'lk', key: '스리랑카' },
  { city: '갈레',     display: '스리랑카', flag: 'lk', key: '스리랑카' },

  // 캄보디아
  { city: '캄보디아',   display: '캄보디아', flag: 'kh', key: '캄보디아' },
  { city: '씨엠레아프', display: '캄보디아', flag: 'kh', key: '캄보디아' },
  { city: '앙코르와트', display: '캄보디아, 씨엠레아프', flag: 'kh', key: '캄보디아' },
  { city: '프놈펜',     display: '캄보디아', flag: 'kh', key: '캄보디아' },

  // 미얀마
  { city: '미얀마', display: '미얀마', flag: 'mm', key: '미얀마' },
  { city: '양곤',   display: '미얀마', flag: 'mm', key: '미얀마' },
  { city: '바간',   display: '미얀마', flag: 'mm', key: '미얀마' },
  { city: '만달레이', display: '미얀마', flag: 'mm', key: '미얀마' },

  // 라오스
  { city: '라오스',     display: '라오스', flag: 'la', key: '라오스' },
  { city: '루앙프라방', display: '라오스', flag: 'la', key: '라오스' },
  { city: '비엔티안',   display: '라오스', flag: 'la', key: '라오스' },

  // 몽골
  { city: '몽골',   display: '몽골',   flag: 'mn', key: '몽골' },
  { city: '울란바토르', display: '몽골', flag: 'mn', key: '몽골' },
  { city: '고비사막',  display: '몽골', flag: 'mn', key: '몽골' },

  /* ────────── 중동 ────────── */
  // 아랍에미리트
  { city: '아랍에미리트', display: '아랍에미리트', flag: 'ae', key: '아랍에미리트' },
  { city: '두바이',       display: '아랍에미리트', flag: 'ae', key: '아랍에미리트' },
  { city: '아부다비',     display: '아랍에미리트', flag: 'ae', key: '아랍에미리트' },
  { city: '두바이마리나', display: '아랍에미리트, 두바이', flag: 'ae', key: '아랍에미리트' },
  { city: '다운타운두바이', display: '아랍에미리트, 두바이', flag: 'ae', key: '아랍에미리트' },
  { city: '주메이라',     display: '아랍에미리트, 두바이', flag: 'ae', key: '아랍에미리트' },
  { city: '부르즈할리파', display: '아랍에미리트, 두바이', flag: 'ae', key: '아랍에미리트' },

  // 카타르
  { city: '카타르', display: '카타르', flag: 'qa', key: '카타르' },
  { city: '도하',   display: '카타르', flag: 'qa', key: '카타르' },

  // 터키
  { city: '터키',     display: '터키', flag: 'tr', key: '터키' },
  { city: '이스탄불', display: '터키', flag: 'tr', key: '터키' },
  { city: '카파도키아', display: '터키', flag: 'tr', key: '터키' },
  { city: '안탈리아', display: '터키', flag: 'tr', key: '터키' },
  { city: '페티예',   display: '터키', flag: 'tr', key: '터키' },
  { city: '이즈미르', display: '터키', flag: 'tr', key: '터키' },
  { city: '파묵칼레', display: '터키', flag: 'tr', key: '터키' },
  { city: '술탄아흐메트', display: '터키, 이스탄불', flag: 'tr', key: '터키' },

  // 이스라엘
  { city: '이스라엘', display: '이스라엘', flag: 'il', key: '이스라엘' },
  { city: '텔아비브', display: '이스라엘', flag: 'il', key: '이스라엘' },
  { city: '예루살렘', display: '이스라엘', flag: 'il', key: '이스라엘' },

  // 요르단
  { city: '요르단', display: '요르단', flag: 'jo', key: '요르단' },
  { city: '암만',   display: '요르단', flag: 'jo', key: '요르단' },
  { city: '페트라', display: '요르단', flag: 'jo', key: '요르단' },
  { city: '와디럼', display: '요르단', flag: 'jo', key: '요르단' },

  /* ────────── 유럽 ────────── */
  // 프랑스
  { city: '프랑스',     display: '프랑스',          flag: 'fr', key: '프랑스' },
  { city: '파리',       display: '프랑스',          flag: 'fr', key: '프랑스' },
  { city: '니스',       display: '프랑스',          flag: 'fr', key: '프랑스' },
  { city: '마르세유',   display: '프랑스',          flag: 'fr', key: '프랑스' },
  { city: '리옹',       display: '프랑스',          flag: 'fr', key: '프랑스' },
  { city: '보르도',     display: '프랑스',          flag: 'fr', key: '프랑스' },
  { city: '스트라스부르', display: '프랑스',        flag: 'fr', key: '프랑스' },
  { city: '몽펠리에',   display: '프랑스',          flag: 'fr', key: '프랑스' },
  { city: '칸',         display: '프랑스',          flag: 'fr', key: '프랑스' },
  { city: '몽마르트',   display: '프랑스, 파리',    flag: 'fr', key: '프랑스' },
  { city: '샹젤리제',   display: '프랑스, 파리',    flag: 'fr', key: '프랑스' },
  { city: '마레',       display: '프랑스, 파리',    flag: 'fr', key: '프랑스' },
  { city: '생제르맹',   display: '프랑스, 파리',    flag: 'fr', key: '프랑스' },
  { city: '에펠탑',     display: '프랑스, 파리',    flag: 'fr', key: '프랑스' },
  { city: '루브르',     display: '프랑스, 파리',    flag: 'fr', key: '프랑스' },

  // 영국
  { city: '영국',         display: '영국',            flag: 'gb', key: '영국' },
  { city: '런던',         display: '영국',            flag: 'gb', key: '영국' },
  { city: '에든버러',     display: '영국',            flag: 'gb', key: '영국' },
  { city: '맨체스터',     display: '영국',            flag: 'gb', key: '영국' },
  { city: '리버풀',       display: '영국',            flag: 'gb', key: '영국' },
  { city: '옥스퍼드',     display: '영국',            flag: 'gb', key: '영국' },
  { city: '캠브리지',     display: '영국',            flag: 'gb', key: '영국' },
  { city: '바스',         display: '영국',            flag: 'gb', key: '영국' },
  { city: '코츠월드',     display: '영국',            flag: 'gb', key: '영국' },
  { city: '소호',         display: '영국, 런던',      flag: 'gb', key: '영국' },
  { city: '웨스트민스터', display: '영국, 런던',      flag: 'gb', key: '영국' },
  { city: '메이페어',     display: '영국, 런던',      flag: 'gb', key: '영국' },
  { city: '쇼디치',       display: '영국, 런던',      flag: 'gb', key: '영국' },
  { city: '노팅힐',       display: '영국, 런던',      flag: 'gb', key: '영국' },
  { city: '코벤트가든',   display: '영국, 런던',      flag: 'gb', key: '영국' },

  // 이탈리아
  { city: '이탈리아',  display: '이탈리아',            flag: 'it', key: '이탈리아' },
  { city: '로마',      display: '이탈리아',            flag: 'it', key: '이탈리아' },
  { city: '밀라노',    display: '이탈리아',            flag: 'it', key: '이탈리아' },
  { city: '베네치아',  display: '이탈리아',            flag: 'it', key: '이탈리아' },
  { city: '피렌체',    display: '이탈리아',            flag: 'it', key: '이탈리아' },
  { city: '나폴리',    display: '이탈리아',            flag: 'it', key: '이탈리아' },
  { city: '아말피',    display: '이탈리아',            flag: 'it', key: '이탈리아' },
  { city: '시칠리아',  display: '이탈리아',            flag: 'it', key: '이탈리아' },
  { city: '볼로냐',    display: '이탈리아',            flag: 'it', key: '이탈리아' },
  { city: '친퀘테레',  display: '이탈리아',            flag: 'it', key: '이탈리아' },
  { city: '시에나',    display: '이탈리아',            flag: 'it', key: '이탈리아' },
  { city: '바티칸',    display: '이탈리아, 로마',      flag: 'it', key: '이탈리아' },
  { city: '콜로세움',  display: '이탈리아, 로마',      flag: 'it', key: '이탈리아' },

  // 스페인
  { city: '스페인',    display: '스페인',              flag: 'es', key: '스페인' },
  { city: '바르셀로나', display: '스페인',             flag: 'es', key: '스페인' },
  { city: '마드리드',  display: '스페인',              flag: 'es', key: '스페인' },
  { city: '세비야',    display: '스페인',              flag: 'es', key: '스페인' },
  { city: '그라나다',  display: '스페인',              flag: 'es', key: '스페인' },
  { city: '발렌시아',  display: '스페인',              flag: 'es', key: '스페인' },
  { city: '말라가',    display: '스페인',              flag: 'es', key: '스페인' },
  { city: '이비자',    display: '스페인',              flag: 'es', key: '스페인' },
  { city: '마요르카',  display: '스페인',              flag: 'es', key: '스페인' },
  { city: '사그라다파밀리아', display: '스페인, 바르셀로나', flag: 'es', key: '스페인' },

  // 독일
  { city: '독일',       display: '독일',    flag: 'de', key: '독일' },
  { city: '베를린',     display: '독일',    flag: 'de', key: '독일' },
  { city: '뮌헨',       display: '독일',    flag: 'de', key: '독일' },
  { city: '함부르크',   display: '독일',    flag: 'de', key: '독일' },
  { city: '쾰른',       display: '독일',    flag: 'de', key: '독일' },
  { city: '프랑크푸르트', display: '독일',  flag: 'de', key: '독일' },
  { city: '드레스덴',   display: '독일',    flag: 'de', key: '독일' },
  { city: '로텐부르크', display: '독일',    flag: 'de', key: '독일' },
  { city: '뉘른베르크', display: '독일',    flag: 'de', key: '독일' },

  // 네덜란드
  { city: '네덜란드',   display: '네덜란드', flag: 'nl', key: '네덜란드' },
  { city: '암스테르담', display: '네덜란드', flag: 'nl', key: '네덜란드' },
  { city: '로테르담',   display: '네덜란드', flag: 'nl', key: '네덜란드' },
  { city: '헤이그',     display: '네덜란드', flag: 'nl', key: '네덜란드' },
  { city: '잔담',       display: '네덜란드', flag: 'nl', key: '네덜란드' },
  { city: '잔세스칸스', display: '네덜란드', flag: 'nl', key: '네덜란드' },

  // 스위스
  { city: '스위스',     display: '스위스',  flag: 'ch', key: '스위스' },
  { city: '취리히',     display: '스위스',  flag: 'ch', key: '스위스' },
  { city: '제네바',     display: '스위스',  flag: 'ch', key: '스위스' },
  { city: '베른',       display: '스위스',  flag: 'ch', key: '스위스' },
  { city: '루체른',     display: '스위스',  flag: 'ch', key: '스위스' },
  { city: '인터라켄',   display: '스위스',  flag: 'ch', key: '스위스' },
  { city: '체르마트',   display: '스위스',  flag: 'ch', key: '스위스' },

  // 오스트리아
  { city: '오스트리아', display: '오스트리아', flag: 'at', key: '오스트리아' },
  { city: '빈',         display: '오스트리아', flag: 'at', key: '오스트리아' },
  { city: '잘츠부르크', display: '오스트리아', flag: 'at', key: '오스트리아' },
  { city: '할슈타트',   display: '오스트리아', flag: 'at', key: '오스트리아' },
  { city: '인스브루크', display: '오스트리아', flag: 'at', key: '오스트리아' },

  // 포르투갈
  { city: '포르투갈', display: '포르투갈', flag: 'pt', key: '포르투갈' },
  { city: '리스본',   display: '포르투갈', flag: 'pt', key: '포르투갈' },
  { city: '포르투',   display: '포르투갈', flag: 'pt', key: '포르투갈' },
  { city: '알가르브', display: '포르투갈', flag: 'pt', key: '포르투갈' },
  { city: '신트라',   display: '포르투갈', flag: 'pt', key: '포르투갈' },

  // 그리스
  { city: '그리스',   display: '그리스',  flag: 'gr', key: '그리스' },
  { city: '아테네',   display: '그리스',  flag: 'gr', key: '그리스' },
  { city: '산토리니', display: '그리스',  flag: 'gr', key: '그리스' },
  { city: '미코노스', display: '그리스',  flag: 'gr', key: '그리스' },
  { city: '크레타',   display: '그리스',  flag: 'gr', key: '그리스' },
  { city: '로도스',   display: '그리스',  flag: 'gr', key: '그리스' },

  // 체코
  { city: '체코',       display: '체코',  flag: 'cz', key: '체코' },
  { city: '프라하',     display: '체코',  flag: 'cz', key: '체코' },
  { city: '체스키크룸로프', display: '체코', flag: 'cz', key: '체코' },

  // 헝가리
  { city: '헝가리',     display: '헝가리',  flag: 'hu', key: '헝가리' },
  { city: '부다페스트', display: '헝가리',  flag: 'hu', key: '헝가리' },

  // 폴란드
  { city: '폴란드',   display: '폴란드',  flag: 'pl', key: '폴란드' },
  { city: '바르샤바', display: '폴란드',  flag: 'pl', key: '폴란드' },
  { city: '크라쿠프', display: '폴란드',  flag: 'pl', key: '폴란드' },

  // 크로아티아
  { city: '크로아티아',   display: '크로아티아', flag: 'hr', key: '크로아티아' },
  { city: '두브로브니크', display: '크로아티아', flag: 'hr', key: '크로아티아' },
  { city: '스플리트',     display: '크로아티아', flag: 'hr', key: '크로아티아' },
  { city: '플리트비체',   display: '크로아티아', flag: 'hr', key: '크로아티아' },
  { city: '자그레브',     display: '크로아티아', flag: 'hr', key: '크로아티아' },

  // 노르웨이
  { city: '노르웨이', display: '노르웨이', flag: 'no', key: '노르웨이' },
  { city: '오슬로',   display: '노르웨이', flag: 'no', key: '노르웨이' },
  { city: '베르겐',   display: '노르웨이', flag: 'no', key: '노르웨이' },
  { city: '트롬쇠',   display: '노르웨이', flag: 'no', key: '노르웨이' },
  { city: '플롬',     display: '노르웨이', flag: 'no', key: '노르웨이' },
  { city: '오로라',   display: '노르웨이, 트롬쇠', flag: 'no', key: '노르웨이' },

  // 스웨덴
  { city: '스웨덴',   display: '스웨덴',  flag: 'se', key: '스웨덴' },
  { city: '스톡홀름', display: '스웨덴',  flag: 'se', key: '스웨덴' },
  { city: '예테보리', display: '스웨덴',  flag: 'se', key: '스웨덴' },

  // 덴마크
  { city: '덴마크',     display: '덴마크', flag: 'dk', key: '덴마크' },
  { city: '코펜하겐',   display: '덴마크', flag: 'dk', key: '덴마크' },

  // 핀란드
  { city: '핀란드',   display: '핀란드',  flag: 'fi', key: '핀란드' },
  { city: '헬싱키',   display: '핀란드',  flag: 'fi', key: '핀란드' },
  { city: '로바니에미', display: '핀란드', flag: 'fi', key: '핀란드' },

  // 아이슬란드
  { city: '아이슬란드', display: '아이슬란드', flag: 'is', key: '아이슬란드' },
  { city: '레이캬비크', display: '아이슬란드', flag: 'is', key: '아이슬란드' },
  { city: '골든서클',   display: '아이슬란드', flag: 'is', key: '아이슬란드' },

  // 아일랜드
  { city: '아일랜드', display: '아일랜드', flag: 'ie', key: '아일랜드' },
  { city: '더블린',   display: '아일랜드', flag: 'ie', key: '아일랜드' },

  // 벨기에
  { city: '벨기에', display: '벨기에', flag: 'be', key: '벨기에' },
  { city: '브뤼셀', display: '벨기에', flag: 'be', key: '벨기에' },
  { city: '브뤼헤', display: '벨기에', flag: 'be', key: '벨기에' },
  { city: '겐트',   display: '벨기에', flag: 'be', key: '벨기에' },

  // 러시아
  { city: '러시아',       display: '러시아', flag: 'ru', key: '러시아' },
  { city: '모스크바',     display: '러시아', flag: 'ru', key: '러시아' },
  { city: '상트페테르부르크', display: '러시아', flag: 'ru', key: '러시아' },

  /* ────────── 아메리카 ────────── */
  // 미국
  { city: '미국',         display: '미국',              flag: 'us', key: '미국' },
  { city: '뉴욕',         display: '미국',              flag: 'us', key: '미국' },
  { city: '로스앤젤레스', display: '미국',              flag: 'us', key: '미국' },
  { city: '라스베이거스', display: '미국',              flag: 'us', key: '미국' },
  { city: '샌프란시스코', display: '미국',              flag: 'us', key: '미국' },
  { city: '하와이',       display: '미국',              flag: 'us', key: '미국' },
  { city: '시카고',       display: '미국',              flag: 'us', key: '미국' },
  { city: '마이애미',     display: '미국',              flag: 'us', key: '미국' },
  { city: '보스턴',       display: '미국',              flag: 'us', key: '미국' },
  { city: '워싱턴D.C.',   display: '미국',              flag: 'us', key: '미국' },
  { city: '시애틀',       display: '미국',              flag: 'us', key: '미국' },
  { city: '샌디에이고',   display: '미국',              flag: 'us', key: '미국' },
  { city: '올랜도',       display: '미국',              flag: 'us', key: '미국' },
  { city: '뉴올리언스',   display: '미국',              flag: 'us', key: '미국' },
  { city: '포틀랜드',     display: '미국',              flag: 'us', key: '미국' },
  { city: '맨해튼',       display: '미국, 뉴욕',        flag: 'us', key: '미국' },
  { city: '브루클린',     display: '미국, 뉴욕',        flag: 'us', key: '미국' },
  { city: '할리우드',     display: '미국, 로스앤젤레스', flag: 'us', key: '미국' },
  { city: '산타모니카',   display: '미국, 로스앤젤레스', flag: 'us', key: '미국' },
  { city: '와이키키',     display: '미국, 하와이',      flag: 'us', key: '미국' },
  { city: '호놀룰루',     display: '미국, 하와이',      flag: 'us', key: '미국' },

  // 캐나다
  { city: '캐나다',       display: '캐나다', flag: 'ca', key: '캐나다' },
  { city: '밴쿠버',       display: '캐나다', flag: 'ca', key: '캐나다' },
  { city: '토론토',       display: '캐나다', flag: 'ca', key: '캐나다' },
  { city: '퀘벡',         display: '캐나다', flag: 'ca', key: '캐나다' },
  { city: '몬트리올',     display: '캐나다', flag: 'ca', key: '캐나다' },
  { city: '캘거리',       display: '캐나다', flag: 'ca', key: '캐나다' },
  { city: '밴프',         display: '캐나다', flag: 'ca', key: '캐나다' },
  { city: '나이아가라폭포', display: '캐나다', flag: 'ca', key: '캐나다' },

  // 멕시코
  { city: '멕시코',       display: '멕시코', flag: 'mx', key: '멕시코' },
  { city: '멕시코시티',   display: '멕시코', flag: 'mx', key: '멕시코' },
  { city: '칸쿤',         display: '멕시코', flag: 'mx', key: '멕시코' },
  { city: '플라야델카르멘', display: '멕시코', flag: 'mx', key: '멕시코' },
  { city: '툴룸',         display: '멕시코', flag: 'mx', key: '멕시코' },
  { city: '오악사카',     display: '멕시코', flag: 'mx', key: '멕시코' },

  // 쿠바
  { city: '쿠바', display: '쿠바', flag: 'cu', key: '쿠바' },
  { city: '아바나', display: '쿠바', flag: 'cu', key: '쿠바' },

  // 페루
  { city: '페루',    display: '페루', flag: 'pe', key: '페루' },
  { city: '리마',    display: '페루', flag: 'pe', key: '페루' },
  { city: '쿠스코',  display: '페루', flag: 'pe', key: '페루' },
  { city: '마추픽추', display: '페루', flag: 'pe', key: '페루' },

  // 브라질
  { city: '브라질',       display: '브라질', flag: 'br', key: '브라질' },
  { city: '상파울루',     display: '브라질', flag: 'br', key: '브라질' },
  { city: '리우데자네이루', display: '브라질', flag: 'br', key: '브라질' },
  { city: '이구아수폭포', display: '브라질', flag: 'br', key: '브라질' },

  // 아르헨티나
  { city: '아르헨티나',   display: '아르헨티나', flag: 'ar', key: '아르헨티나' },
  { city: '부에노스아이레스', display: '아르헨티나', flag: 'ar', key: '아르헨티나' },
  { city: '파타고니아',   display: '아르헨티나', flag: 'ar', key: '아르헨티나' },

  /* ────────── 오세아니아 ────────── */
  // 호주
  { city: '호주',       display: '호주',              flag: 'au', key: '호주' },
  { city: '시드니',     display: '호주',              flag: 'au', key: '호주' },
  { city: '멜버른',     display: '호주',              flag: 'au', key: '호주' },
  { city: '브리즈번',   display: '호주',              flag: 'au', key: '호주' },
  { city: '골드코스트', display: '호주',              flag: 'au', key: '호주' },
  { city: '케언즈',     display: '호주',              flag: 'au', key: '호주' },
  { city: '퍼스',       display: '호주',              flag: 'au', key: '호주' },
  { city: '애들레이드', display: '호주',              flag: 'au', key: '호주' },
  { city: '울루루',     display: '호주',              flag: 'au', key: '호주' },
  { city: '서큘러키',   display: '호주, 시드니',      flag: 'au', key: '호주' },
  { city: '본다이비치', display: '호주, 시드니',      flag: 'au', key: '호주' },

  // 뉴질랜드
  { city: '뉴질랜드',   display: '뉴질랜드', flag: 'nz', key: '뉴질랜드' },
  { city: '오클랜드',   display: '뉴질랜드', flag: 'nz', key: '뉴질랜드' },
  { city: '퀸즈타운',   display: '뉴질랜드', flag: 'nz', key: '뉴질랜드' },
  { city: '크라이스트처치', display: '뉴질랜드', flag: 'nz', key: '뉴질랜드' },
  { city: '웰링턴',     display: '뉴질랜드', flag: 'nz', key: '뉴질랜드' },
  { city: '로토루아',   display: '뉴질랜드', flag: 'nz', key: '뉴질랜드' },

  /* ────────── 아프리카 ────────── */
  // 이집트
  { city: '이집트',   display: '이집트',  flag: 'eg', key: '이집트' },
  { city: '카이로',   display: '이집트',  flag: 'eg', key: '이집트' },
  { city: '룩소르',   display: '이집트',  flag: 'eg', key: '이집트' },
  { city: '아스완',   display: '이집트',  flag: 'eg', key: '이집트' },
  { city: '후르가다', display: '이집트',  flag: 'eg', key: '이집트' },
  { city: '샴엘셰이크', display: '이집트', flag: 'eg', key: '이집트' },
  { city: '피라미드', display: '이집트, 카이로', flag: 'eg', key: '이집트' },

  // 모로코
  { city: '모로코',   display: '모로코',  flag: 'ma', key: '모로코' },
  { city: '마라케시', display: '모로코',  flag: 'ma', key: '모로코' },
  { city: '카사블랑카', display: '모로코', flag: 'ma', key: '모로코' },
  { city: '페스',     display: '모로코',  flag: 'ma', key: '모로코' },
  { city: '사하라사막', display: '모로코', flag: 'ma', key: '모로코' },

  // 남아프리카공화국
  { city: '남아프리카공화국', display: '남아프리카공화국', flag: 'za', key: '남아프리카공화국' },
  { city: '케이프타운',       display: '남아프리카공화국', flag: 'za', key: '남아프리카공화국' },
  { city: '요하네스버그',     display: '남아프리카공화국', flag: 'za', key: '남아프리카공화국' },
  { city: '테이블마운틴',     display: '남아프리카공화국, 케이프타운', flag: 'za', key: '남아프리카공화국' },

  // 케냐
  { city: '케냐',     display: '케냐', flag: 'ke', key: '케냐' },
  { city: '나이로비', display: '케냐', flag: 'ke', key: '케냐' },
  { city: '마사이마라', display: '케냐', flag: 'ke', key: '케냐' },

  // 탄자니아
  { city: '탄자니아', display: '탄자니아', flag: 'tz', key: '탄자니아' },
  { city: '잔지바르', display: '탄자니아', flag: 'tz', key: '탄자니아' },
  { city: '세렝게티', display: '탄자니아', flag: 'tz', key: '탄자니아' },
]

const POPULAR_REGIONS = [
  { city: '파리',         flag: 'fr', key: '프랑스' },
  { city: '도쿄',         flag: 'jp', key: '일본' },
  { city: '오사카',       flag: 'jp', key: '일본' },
  { city: '런던',         flag: 'gb', key: '영국' },
  { city: '뉴욕',         flag: 'us', key: '미국' },
  { city: '방콕',         flag: 'th', key: '태국' },
  { city: '발리',         flag: 'id', key: '인도네시아' },
  { city: '싱가포르',     flag: 'sg', key: '싱가포르' },
  { city: '후쿠오카',     flag: 'jp', key: '일본' },
  { city: '로스앤젤레스', flag: 'us', key: '미국' },
]

export { DEST_DATA, POPULAR_REGIONS }
