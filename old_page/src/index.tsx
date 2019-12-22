import React from 'react';
import ReactDOM from 'react-dom';
import portfolioItemsInfo from './content';
import './style.scss';

interface PortfolioItemProps{
  key: string;
  img_url: string;
  title: string;
  title_en: string;
  content: string;
  content_en: string;
  en_flag: boolean;
  year: string;
  ref_url: string;
  all_display_flag: boolean;
}

interface PortfolioItemState{
  display: boolean;
}

class PortfolioItem extends React.Component<PortfolioItemProps, PortfolioItemState>{

  showContent(){
    this.setState({display: true});
  }

  hideContent(){
    this.setState({display: false});
  }
  
  constructor(props: PortfolioItemProps){
    super(props);
    this.state={
      display: false,
    };
    // if write "onMouseEnter={this.showContent}"...
    // this.showContent = this.showContent.bind(this);
    // this.hideContent = this.hideContent.bind(this);
  }

  render(){
    return(
      <div className="portfolio-items" 
           onMouseEnter={() => this.showContent()} 
           onMouseLeave={() => this.hideContent()}>
        <div className="portfolio-img-div">
          <img src={this.props.img_url} />
        </div>

        {/* if key is set, 'transition' does not work. (why?) */}
        {/* <div className={"content-detail " + (!this.state.display ? '' : 'show')} key={this.state.display}> */}
        <div className={"content-detail " + ((this.state.display||this.props.all_display_flag) ?  'show' : '' )} >
          <div className="content-title">
            {this.props.en_flag ? this.props.title_en : this.props.title}
          </div>                  
          <div className="content-description">
              {this.props.en_flag ? this.props.content_en : this.props.content}
              <span className="item-year"> ({this.props.year}) </span>
          </div>
        </div>       
        <a href={this.props.ref_url} target="_blank"></a>
      </div>
    );
  }
}

interface PortfolioItemsDisplayProps{
}

interface PortfolioItemsDisplayState{
  en_flag: boolean;
  all_display_flag: boolean;
}

class PortfolioItemsDisplay extends React.Component<PortfolioItemsDisplayProps, PortfolioItemsDisplayState>{

  constructor(props: PortfolioItemsDisplayProps){
    super(props);
    this.state = {
      en_flag: true,
      all_display_flag: false
    }
  }

  displayAll(){
    console.log(this.state);
    // console.log('display');
    this.setState({all_display_flag: true});
  }

  endDisplayAll(){
    // console.log('end');
    this.setState({all_display_flag: false});
  }

  handleClick(en_ja: string){
    console.log(en_ja);
    if(en_ja == "en"){
      this.setState({en_flag: true});
      this.displayAll();
      setTimeout(this.endDisplayAll.bind(this), 300);
    }
    else{ // ja
      this.setState({en_flag: false});
      this.displayAll();
      setTimeout(this.endDisplayAll.bind(this), 300);
    }
  }

  render() {
    const items: JSX.Element[] = [];
    for(let pfi of portfolioItemsInfo){
      console.log(pfi);
      items.push(
        <PortfolioItem 
          key={pfi.title}
          img_url={pfi.img_url}
          title={pfi.title}
          title_en={pfi.title_en}
          content={pfi.content}
          content_en={pfi.content_en}
          en_flag={this.state.en_flag}
          year={pfi.year}
          ref_url={pfi.ref_url}
          all_display_flag={this.state.all_display_flag}
        />
      );
    }

    return (
      <div id="bottom">
        <div id="portfolio">
          <div id="portfolio-title-line" className="part-title-line">
            <span id="portfolio-title" className="part-title">Portfolio </span> 
            <span id="lang-switch-area">
              (
              <span className={"lang-switch "+(!this.state.en_flag && 'no-select-lang')}
                    onClick={()=>this.handleClick("en")}>English</span>
              <span>, </span>
              <span className={"lang-switch "+(this.state.en_flag && 'no-select-lang')}
                    onClick={()=>this.handleClick("ja")}>日本語</span>
              )
            </span>
          </div>
          <div id="portfolio-area">
              {items}
          </div>
        </div>
        <div id="skill">
          <div id="skill-title-line" className="part-title-line">
            <span id="skill-title" className="part-title">Skill</span> 
          </div>
          <div id="skill-description">
            coming soon...
          </div>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <PortfolioItemsDisplay />,
  document.getElementById('root')
);
