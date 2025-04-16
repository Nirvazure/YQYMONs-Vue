//源类型
interface META {
  name: string;
  description?: string;
  category?: string;
  type?: string;
  value?: any;
}

//视觉增量
interface VISUAL {
  color?: string;
  img?: string;
  icon?: string;
  rgb?: string;
}

type VISUAL_ITEM = VISUAL & META;

//Player
interface PLAYER extends VISUAL_ITEM {
  avatar: string;
  tags: Array<string>;
}

interface HERO {
  ename: number;
  cname: string;
  title: string;
  new_type: number;
  hero_type: number;
  hero_type2?: number;
  pay_type?: number;
  skin_name?: string;
  moss_id: number;
}

interface TEAM {
  player: PLAYER;
  pos: string;
  hero: HERO;
}

export type { HERO, PLAYER, VISUAL_ITEM, TEAM };
