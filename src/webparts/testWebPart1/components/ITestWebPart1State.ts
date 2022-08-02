import { StrategyDetail } from "../model/StrategyDetailModel";
import { Strategy } from "../model/StrategyModel";

export interface ITestWebPart1State {    
    titleDesc: string;  
    showObj1: boolean;
    showObj2: boolean;    
    strategyList: Strategy[]; 
    strategyDetails: StrategyDetail[];       
 }