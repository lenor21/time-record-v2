import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const Calendar = () => {
  return (
    <BigCalendar
      localizer={localizer}
      startAccessor='start'
      endAccessor='end'
      style={{ height: 500 }}
    />
  );
};

export default Calendar;
