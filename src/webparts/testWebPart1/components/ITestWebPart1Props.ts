import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFilePickerResult } from "@pnp/spfx-property-controls";

export interface ITestWebPart1Props {
  title1: string;
  title2: string;  
  imageUrl: IFilePickerResult;
  context:WebPartContext;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
