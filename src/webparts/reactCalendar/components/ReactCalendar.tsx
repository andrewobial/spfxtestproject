import * as React from 'react';
import styles from './ReactCalendar.module.scss';
import { IReactCalendarProps } from './IReactCalendarProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { addDays, differenceInCalendarDays } from 'date-fns';

export default class ReactCalendar extends React.Component<IReactCalendarProps, {}> {
  public render(): React.ReactElement<IReactCalendarProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    const now = new Date();
    const tomorrow = addDays(now, 1);
    const in3Days = addDays(now, 3);
    const in5Days = addDays(now, 5);

    const highlightedDates = [tomorrow, in3Days, in5Days];

    function isSameDay(a, b) {   
      return differenceInCalendarDays(a, b) === 0;
    }
    
    function tileClassName({ date, view }) {
     
      if (
        view === 'month' &&
        highlightedDates.find((dDate) => isSameDay(dDate, date))
      ) {
        return styles.highlight;
      }
    }

    return (
      <div>
      <Calendar className={styles['react-calendar']}
      tileClassName={tileClassName}/>
    </div>
    );
  }
}
