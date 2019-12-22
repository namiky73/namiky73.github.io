// used in index.js


interface PortfolioItemInfo{
  title: string;
  title_en: string;
  img_url: string;
  content: string;
  content_en: string;
  en_flag: boolean;
  year: string;
  ref_url: string;
}

const portfolioItemsInfo: PortfolioItemInfo[] = [
  {
    title:"五月祭アプリ",
    title_en:"MayFesApp",
    img_url:"./images/MayFesApp_65.png",
    content:"東京大学の学園祭である第89回五月祭にて，学園祭案内アプリの「五月祭アプリ」を作成．\
    Android版のフロントエンドの大半を担当しました．開発環境はAndroid Studio（Java）．\
    数多くの来場者に使っていただくことができ，初のアプリ開発としてはなかなかの成果でした．",
    content_en:"This is a navigator app for the 89th May Festival. \
    I was in charge of Andorid front-end development (with Android Studio). \
    Many visitors used this app. Thanks!",
    en_flag:true,
    year:"2015",
    ref_url:"https://togetter.com/li/821535"
  },
  {
    title:"KnowledgeDeck",
    title_en:"KnowledgeDeck",
    img_url:"./images/KnowledgeDeck_65.png",
    content: "ビジネス資料作成を支援するための情報保存・整理システムです．\
    9人のナレッジワーカーにビジネス資料作成に関するインタビューを実施し，\
    質的分析を行って得られた知見をもとにして作成しました．開発にはRailsを使用．",
    content_en:"We first conducted an interview study to uncover practices and \
    issues of creating and managing business materials. \
    We then developed KnowledgeDeck, \
    a system that helps knowledge workers collect and manage information \
    on the Web to create draft presentation slides. ",
    en_flag:true,
    year:"2016",
    ref_url:"https://www.youtube.com/watch?v=T5eVb3KYdDc"
  },
  {
    title:"エレキギター練習システム",
    title_en:"A Guitar Practice System",
    img_url:"./images/Guitar_65.png",
    content: "既存のエレキギター練習システムは「音程とリズムの正確さ」しか演奏評価基準を持っていません．\
    しかし人間は「音色の綺麗さ」や「演奏のなめらかさ」なども含めたより多くの観点から演奏を評価します．\
    そこで私は，より人間に近い演奏評価基準を持ったエレキギター練習システムを作成しました．\
    音楽信号分析およびシステム開発にはPythonを使用．",
    content_en:"Exisiting guitar practice systems evaluate users' performances\
    only by timing and pitch accuracy.\
    In contrast, people evaluate electric guitar performances by more various factors,\
    such as tone and fluency.\
    I made a novel practice system that evaluates users' \
    performances from the viewpoint of tone and fluency. ",
    en_flag:true,
    year:"2018",
    ref_url:"https://www.youtube.com/watch?v=2jPgp__gNMc"
  }
];

export default portfolioItemsInfo;