import * as React from 'react';
import styles from './TestWebPart1.module.scss';
import { ITestWebPart1Props } from './ITestWebPart1Props';
import { escape } from '@microsoft/sp-lodash-subset';
import { useState } from 'react';
import { event } from 'jquery';
import { ITestWebPart1State } from './ITestWebPart1State';
import { SPOperations } from '../../Services/SPServices'

import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http'
import { Strategy } from '../model/StrategyModel';
import { StrategyDetail } from '../model/StrategyDetailModel';
import StrategyDetails from './StrategyDetails';

require('../../../../node_modules/bootstrap/dist/css/bootstrap.css');

export interface ISPStrategyHeader {
  Title: string,
  Description: string,
  OrderyBy: number
}

export default class TestWebPart1 extends React.Component<ITestWebPart1Props, ITestWebPart1State> {
  public _spOps: SPOperations;
  constructor(props: ITestWebPart1Props) {
    super(props);
    this._spOps = new SPOperations();
    this.state = {
      titleDesc: props.title1,
      showObj1: true,
      showObj2: false,
      strategyList: [],
      strategyDetails: [],
    };
    console.log(props.imageUrl);
  }
  private _onTitleClick = (title: string, objName: string) => {
    return (event: React.MouseEvent) => {
      // console.log(title);
      this.setState({ titleDesc: title });

      this.hideComponent(objName);
      event.defaultPrevented;
    };

  };

  private hideComponent(name) {
    switch (name) {
      case "showObj1":
        this.setState({ showObj1: true });
        this.setState({ showObj2: false });
        break;
      case "showObj2":
        this.setState({ showObj1: false });
        this.setState({ showObj2: true });
        break;
      default:
        null;
    }
  }

  // private _getListData(): Promise<ISPStrategyHeader> {
  //   return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Strategy')/Items",SPHttpClient.configurations.v1)
  //       .then((response: SPHttpClientResponse) => {
  //         console.log(response.json);
  //       return response.json();
  //       });
  //   }

  public componentDidMount(): void {
    this._spOps.GetAllListData(this.props.context).then((results: Strategy[]) => {
      this.setState({ strategyList: results });
    });

    this._spOps.GetStrategyDetails(this.props.context).then((results: StrategyDetail[]) => {
      this.setState({ strategyDetails: results });
    })
  }


  public render(): React.ReactElement<ITestWebPart1Props> {
    const {
      title1,
      title2,
      imageUrl,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;


    return (
      // <section className={`${styles.testWebPart1} ${hasTeamsContext ? styles.teams : ''}`}>
      //   <div className={styles.welcome}>
      //     <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
      //     <h2>Well done, {escape(userDisplayName)}!</h2>
      //     <div>{environmentMessage}</div>
      //     <div>Web part property value 1: <strong>{escape(title1)}</strong></div>
      //     <div>Web part property value 2: <strong>{escape(title2)}</strong></div  >
      //   </div>
      //   <div>
      //     <h3>Welcome to SharePoint Framework!</h3>
      //     <p>
      //       The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
      //     </p>
      //     <h4>Learn more about SPFx development:</h4>
      //     <ul className={styles.links}>
      //       <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
      //       <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
      //       <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
      //     </ul>
      //   </div>
      // </section>

      <>
        <div className={`container-fluid`}>
          <div className={`row`}>
            <div className={`col-md-4 border`}>
              {
                (imageUrl !== null && imageUrl !== undefined) && (
                  <img alt="" src={(imageUrl.fileAbsoluteUrl)} className={styles.welcomeImage} />
                )
              }

            </div>
            <div className={`col-md-8 border`}>
              <div className={`d-flex flex-row`}>
                <div className={`p-2`}><a href="javascript:void(0)" onClick={this._onTitleClick(title1, "showObj1")}>{escape(title1)}</a></div>
                <div className={`p-2`}><a href="javascript:void(0)" onClick={this._onTitleClick(title2, "showObj2")}>{escape(title2)}</a></div>
              </div>
              <div className={`d-flex flex-row`}>
                <span className={`text-right`}>{this.state.titleDesc}</span>
              </div>
              {
                this.state.showObj1 && (
                  <div className={`d-flex flex-row`}>
                    <span className={`text-center`}>We are trusted learning and change management experts leading strategic, innovative solutions to drive excellence through collaboration and partnership.</span>
                  </div>
                )}
              {
                this.state.showObj2 &&
                (
                  <div className={`d-flex flex-row`}>
                    {
                      this.state.strategyList.map((item, index) => (
                        <div key={item.Id} className={`col-md-3 border`}>
                          <div>
                            <span key={item.Id}>{item.Title}</span>
                          </div>
                          <div>
                            <span key={item.Id}>{item.Description}</span>
                          </div>
                          <div>
                            <ul>
                              {this.state.strategyDetails.filter(result => result.StrategyHeaderId == item.Id)
                                .map((item, index) => (
                                  // <li>
                                  //   {item.Title}
                                  // </li>
                                  <StrategyDetails title={item.Title} />
                                ))
                              }
                            </ul>                           
                          </div>                          
                        </div>
                      ))
                    }
                  </div>
                )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
