import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useUserRecordsQuery } from '../features/record/recordsApiSlice';
import { useParams } from 'react-router';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const { id } = useParams();

  const { data: userRecords } = useUserRecordsQuery(id);

  const events =
    userRecords &&
    userRecords.map((item: any) => ({
      title: (
        <>
          <p>Present: {item.duration} hours</p>
        </>
      ),
      start: new Date(item.timeIn),
      end: new Date(item.timeOut),
    }));

  return (
    <BigCalendar
      localizer={localizer}
      events={events}
      startAccessor='start'
      endAccessor='end'
      style={{ height: 500 }}
    />
  );
};

export default Calendar;
