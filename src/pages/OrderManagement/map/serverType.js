export const serverType = [
  {
    label: '水工',
    value: '01',
  },
  {
    label: '电工',
    value: '02',
  },
  {
    label: '木工',
    value: '04',
  },
  {
    label: '设备',
    value: '05',
  },
  {
    label: '土建',
    value: '06',
  },
  {
    label: '邻里调解',
    value: '07',
  },
  {
    label: '其他',
    value: '08',
  },
]

const serverSubType = [
  [
    {
      label: '水管漏水',
      value: '01-01',
    },
    {
      label: '水龙头坏',
      value: '01-02',
    },
    {
      label: '冲水阀坏',
      value: '01-03',
    },
    {
      label: '水泵坏',
      value: '01-04',
    },
    {
      label: '其他',
      value: '01-05',
    },
  ],
  [
    {
      label: '电源插座坏',
      value: '02-01',
    },
    {
      label: '开关跳闸',
      value: '02-02',
    },
    {
      label: '灯坏',
      value: '02-03',
    },
    {
      label: '其他',
      value: '02-04',
    },
  ],
  [
    {
      label: '门坏',
      value: '03-01',
    },
    {
      label: '柜子坏',
      value: '03-02',
    },
    {
      label: '窗坏',
      value: '03-03',
    },
    {
      label: '其他',
      value: '03-04',
    },
  ],
  [
    {
      label: '厕所堵塞',
      value: '04-01',
    },
    {
      label: '洗手盆水管漏水',
      value: '04-02',
    },
    {
      label: '排水管漏水',
      value: '04-03',
    },
    {
      label: '其他',
      value: '04-04',
    },
  ],
  [
    {
      label: '空调漏水',
      value: '05-01',
    },
    {
      label: '排气扇坏',
      value: '05-02',
    },
    {
      label: '电梯异常',
      value: '05-03',
    },
    {
      label: '空调坏',
      value: '05-04',
    },
    {
      label: '其他',
      value: '05-05',
    },
  ],
  [
    {
      label: '洗手台坏',
      value: '06-01',
    },
    {
      label: '天花板漏水',
      value: '06-2',
    },
    {
      label: '墙皮脱落',
      value: '06-03',
    },
    {
      label: '瓷砖脱落',
      value: '06-04',
    },
    {
      label: '其他',
      value: '06-05',
    },
  ],
  [
    {
      label: '噪音扰民',
      value: '07-01',
    },
    {
      label: '垃圾乱丢',
      value: '07-02',
    },
    {
      label: '小孩恶作剧',
      value: '07-03',
    },
    {
      label: '违章搭建',
      value: '07-04',
    },
    {
      label: '其他',
      value: '07-05',
    },
  ],
  [
    {
      label: '其他',
      value: '08-01',
    }
  ],
]

export const getSubType = (index) => {
  return serverSubType[--index]
}


