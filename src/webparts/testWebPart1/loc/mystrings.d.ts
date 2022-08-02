declare interface ITestWebPart1WebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  Title1FieldLabel: string;
  Title2FieldLabel: string;
  Title1ImageUrl: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'TestWebPart1WebPartStrings' {
  const strings: ITestWebPart1WebPartStrings;
  export = strings;
}
