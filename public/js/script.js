document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        selectable: true,
        select: function (info) {
            // clear customer name input
            $('#customerName').val('');
            // Display the modal with available times
            showAvailableTimesModal(info);
        },
        events: [],
        eventClick: function(info) {
            console.log(info.event)
            displayAppointment(info.event);
        },
        editable: true,

    });

    calendar.render();

    // capture date and time that is selected.
    var selectedTime = '';
    var selectedDate = '';
    var selectedEventId = '';

    // create array of available times and display in modal
    const availableTimes = [
        '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
        '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
        '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];
    
     // Available time btn group
     const availableTimesContainer = $('#availableTimes');

     // Clear previous buttons
     availableTimesContainer.empty();

     // Create the container that will store all the available times.
     const listContainer = $('<div class="list-group overflow-auto" style="max-height: 200px;">', {
         id: 'availableTimes',
         class: 'list-group-item list-group-item-action',
     });

     // Create btn for each time slot
     availableTimes.forEach(time => {
         const button = $('<button>', {
             type: 'button',
             class: 'btn btn-secondary',
             style: 'width: 450px;',
             text: time,
             click: function () {
                 selectedTime = time; // Set selectedTime when a button is clicked
             }
         });
         // Append btn to container.
         listContainer.append(button);
     });

     // Append btn container to btn group.
     availableTimesContainer.append(listContainer);


    function displayAppointment(info) {
        // capture the event id and date/time.
        selectedEventId = info.extendedProps.event_id;
        selectedDate = info.startStr;

        // hide saveEvent button
        $('#saveEvent').hide();
        // show updateEvent button
        $('#updateEvent').show();

        // set the customer name
        $('#customerName').val(info.title);
    
        // set the barber name in the select list

        fetch(`/api/employees/${info.extendedProps.barber_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // set the barber name in the select list
                document.getElementById('selectBarberList').value = data.id;
                $('#eventModal').modal('show');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // If Update Appointment button is clicked, update the appointment via PUT request
    $('#updateEvent').on('click', function () {
        // Convert appointmentTime to 24 hour format
        let formattedTime = moment(selectedTime, 'hh:mm A').format('HH:mm');
        let startDateTime = moment(`${selectedDate} ${formattedTime}`, 'YYYY-MM-DD HH:mm').toISOString();

        fetch(`/api/appointments/${selectedEventId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                dateTime: startDateTime,
                barber_id: document.getElementById('selectBarberList').value
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                // close model
                $('#eventModal').modal('hide');
                document.location.reload();

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });


    function showAvailableTimesModal(info) {

        // show saveEvent button
        $('#saveEvent').show();
        // hide updateEvent button
        $('#updateEvent').hide();

        // Capture the date selected
        selectedDate = info.startStr;
        $('#eventModal').modal('show');

    }

    $('#saveEvent').on('click', function () {
        saveAppointment();
    });

    function saveAppointment() {
        // const customerName = $('#customerEmail').val();
        const appointmentTime = selectedTime;

        let barberId = document.getElementById('selectBarberList').value;

        if (appointmentTime) {
            // Convert appointmentTime to 24 hour format
            const formattedTime = moment(appointmentTime, 'hh:mm A').format('HH:mm');
            const startDateTime = moment(`${selectedDate} ${formattedTime}`, 'YYYY-MM-DD HH:mm');
            
            // store in the database.
            fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dateTime: startDateTime.toISOString(),
                    barber_id: barberId,
                    appointment_id: selectedEventId
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    // Add calendar event
                    console.log(data)
                    calendar.addEvent({
                        title: data.user.name,
                        start: startDateTime.toISOString(),
                        end: startDateTime.clone().add(1, 'hour').toISOString(),
                        allDay: false,
                        extendedProps: {
                        }
                    });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert('Ensure you are logged in.')
                });

            // Close the modal
            $('#eventModal').modal('hide');

        } else {
            alert('Please fill in all fields.');
        }
    };
   
    // fetch all appointments in database and add to calendar
    fetch('/api/appointments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            data.forEach((appointment) => {
                calendar.addEvent({
                    title: appointment.user.name,
                    start: appointment.dateTime,
                    end: moment(appointment.dateTime).add(1, 'hour').toISOString(),
                    allDay: false,
                    extendedProps: {
                        barber_id: appointment.barber_id,
                        customer_id: appointment.customer_id,
                        event_id: appointment.id
                    }
                });
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    // fetch all employees in database and add to barber list
    fetch('/api/employees', { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let barberListEl = document.getElementById('selectBarberList');

            data.forEach((employee) => {
                let option = document.createElement('option');
                option.value = employee.id;
                option.text = employee.name;
                barberListEl.add(option);
            }); 
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});