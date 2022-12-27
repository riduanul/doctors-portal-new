import React, { useState } from "react";
import AppointmentBanner from "./AppointmentBanner";
import AvailableAppointmets from "./AvailableAppointmets";
import { format } from "date-fns";

const Appointment = () => {
  const [date, setDate] = useState(new Date());
  return (
    <section>
      <AppointmentBanner date={date} setDate={setDate} />
      <AvailableAppointmets date={date} format={format} />
    </section>
  );
};

export default Appointment;
