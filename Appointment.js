
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const appointmentsRef = db.collection('appointments');


const appointmentForm = document.getElementById('appointmentForm');
const appointmentsList = document.getElementById('appointments');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const studentName = appointmentForm['studentName'].value;
    const teacher = appointmentForm['teacher'].value;
    const dateTime = appointmentForm['dateTime'].value;

    
    appointmentsRef.add({
        studentName: studentName,
        teacher: teacher,
        dateTime: dateTime
    })
    .then(() => {
        alert('Appointment added successfully');
        appointmentForm.reset();
    })
    .catch((error) => {
        alert('Error adding appointment: ', error);
    });
});


appointmentsRef.onSnapshot((snapshot) => {
    appointmentsList.innerHTML = '';
    snapshot.forEach((doc) => {
        const appointment = doc.data();
        const appointmentItem = document.createElement('div');
        appointmentItem.innerHTML = `<strong>${appointment.studentName}</strong> with ${appointment.teacher} at ${appointment.dateTime}`;
        appointmentsList.appendChild(appointmentItem);
    });
});
