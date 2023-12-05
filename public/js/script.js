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
            // Display the modal with available times
            showAvailableTimesModal(info);
        },
        events: [],
        eventClick: function(info) {
            info.event.title = document.getElementById('customerName');
            //TODO:
            // Display the modal with available times if logged in
            // if (loggedIn) {
                // showAvailableTimesModal(info);
            //}
            // else {
                // alert('Please log in to schedule an appointment.');
            showAvailableTimesModal(info);
        }
    });

    calendar.render();

    // capture date and time that is selected.
    var selectedTime = '';
    var selectedDate = '';

    async function showAvailableTimesModal(info) {

        // Capture the date selected
        selectedDate = info.startStr;
        
        const availableTimes = [
            '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
            '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
            '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
            '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
        ];

        $('#eventModal').modal('show');

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
    }

    $('#saveEvent').on('click', function () {
        saveAppointment();
        $('#customerName').val('');
        selectedTime = '';
    });

    function saveAppointment() {
        const customerName = $('#customerName').val();
        const appointmentTime = selectedTime;
        
        let barberId = document.getElementById('selectBarberList').value;

        if (customerName && appointmentTime) {
            // Convert appointmentTime to 24 hour format
            const formattedTime = moment(appointmentTime, 'hh:mm A').format('HH:mm');
            const startDateTime = moment(`${selectedDate} ${formattedTime}`, 'YYYY-MM-DD HH:mm');

            // Add calendar event
            calendar.addEvent({
                title: customerName,
                start: startDateTime.toISOString(),
                end: startDateTime.clone().add(1, 'hour').toISOString(),
                allDay: false
            });

            // store in the database.
            fetch('/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dateTime: startDateTime.toISOString(),
                    barber_id: barberId,
                    customer_id: 1 // TODO: figure out how to get this from session storage when implemented.
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success in adding appointment:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
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
            console.log('Success in getting appointments:', data);
            data.forEach((appointment) => {
                calendar.addEvent({
                    title: appointment.user.name,
                    start: appointment.dateTime,
                    end: moment(appointment.dateTime).add(1, 'hour').toISOString(),
                    allDay: false
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