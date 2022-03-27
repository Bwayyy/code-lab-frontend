import { Timestamp } from "firebase/firestore";
import moment, { Moment } from "moment";

export default function useMomentFormat() {
  const formatMoment = (date: Moment) => {
    return date.format("DD-MM-YYYY HH:mm");
  };
  const formatTimeStamp = (timestamp: Timestamp) => {
    return formatMoment(moment(timestamp.toMillis()));
  };
  return { formatMoment, formatTimeStamp };
}
