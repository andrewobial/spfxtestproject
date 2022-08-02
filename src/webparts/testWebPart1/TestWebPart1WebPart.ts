import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'TestWebPart1WebPartStrings';
import TestWebPart1 from './components/TestWebPart1';
import { ITestWebPart1Props } from './components/ITestWebPart1Props';
import { PropertyFieldFilePicker, IPropertyFieldFilePickerProps, IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";

import * as jQuery from "jquery";
import * as bootstrap from "bootstrap";
import PropertyFieldFilePickerHost from '@pnp/spfx-property-controls/lib/propertyFields/filePicker/PropertyFieldFilePickerHost';

export interface ITestWebPart1WebPartProps {
  filePickerResult: IFilePickerResult;
  title1: string;
  title2: string;
  selectedTitle: string;
}

export default class TestWebPart1WebPart extends BaseClientSideWebPart<ITestWebPart1WebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<ITestWebPart1Props> = React.createElement(
      TestWebPart1,
      {
        title1: this.properties.title1,
        title2: this.properties.title2,
        imageUrl: this.properties.filePickerResult,
        context: this.context,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title1', {
                  label: strings.Title1FieldLabel,
                }),
                PropertyPaneTextField('title2', {
                  label: strings.Title2FieldLabel
                })
                ,
                PropertyFieldFilePicker('filePicker', {
                  context: this.context as any,
                  filePickerResult: this.properties.filePickerResult,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e; },
                  onChanged: (e: IFilePickerResult) => { console.log(e); this.properties.filePickerResult = e; },
                  key: "filePickerId",
                  buttonLabel: "File Picker",
                  label: "File Picker",
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
