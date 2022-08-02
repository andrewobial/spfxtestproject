import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'
import { Strategy } from "../testWebPart1/model/StrategyModel";
import { reject, result } from "lodash";
import { StrategyDetail } from "../testWebPart1/model/StrategyDetailModel";

export class SPOperations {

    /**
     * GetAllList
     */
    public GetAllListData(context: WebPartContext): Promise<Strategy[]> {
        let restApiUrl: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Strategy')/Items?$select=Id,Title,Description,OrderBy&$orderby=OrderBy asc";
        var strategyList: Strategy[] = [];      
        return new Promise<Strategy[]>(async (resolve, reject) => {
            context.spHttpClient.get(restApiUrl, SPHttpClient.configurations.v1)
                .then((response: SPHttpClientResponse) => {
                    response.json().then((results: any) => {
                        // console.log(results);
                        results.value.map((result: any) => {
                            strategyList.push({ Id: result.Id, Title: result.Title, Description: result.Description, OrderBy: result.OrderBy });
                        });
                    });
                    resolve(strategyList);
                }, (error: any): void => {
                    reject("Error Occured: " + error);
                });
        });
    }

    public GetStrategyDetails(context: WebPartContext): Promise<StrategyDetail[]> {
        let restApiUrl: string = context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('StrategyDetails')/Items?$select=Id,Title,StrategyHeader/Id,OrderBy&$expand=StrategyHeader&$orderby=OrderBy asc";
        var strategyList: StrategyDetail[] = [];      
        return new Promise<StrategyDetail[]>(async (resolve, reject) => {
            context.spHttpClient.get(restApiUrl, SPHttpClient.configurations.v1)
                .then((response: SPHttpClientResponse) => {
                    response.json().then((results: any) => {
                        // console.log(results);
                        results.value.map((result: any) => {
                            strategyList.push({ Id: result.Id, Title: result.Title, StrategyHeaderId: result.StrategyHeader.Id, OrderBy: result.OrderBy });
                        });
                    });
                    resolve(strategyList);
                }, (error: any): void => {
                    reject("Error Occured: " + error);
                });
        });
    }
}