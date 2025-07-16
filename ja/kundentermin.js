// js/kundentermin.js

document.addEventListener('DOMContentLoaded', () => {
    // Annahme: Die ID des Termins wird über die URL übergeben, z.B. kundentermin.html?id=123
    const urlParams = new URLSearchParams(window.location.search);
    const appointmentId = urlParams.get('id') || 'demo'; // Fallback auf Demo-Daten

    fetchAppointmentData(appointmentId);

    const generateBtn = document.getElementById('generate-doc-btn');
    generateBtn.addEventListener('click', generateDocumentation);

    const saveBtn = document.getElementById('save-doc-btn');
    saveBtn.addEventListener('click', saveDocumentation);
});

// Funktion zum Abrufen der Termindaten vom Backend
async function fetchAppointmentData(id) {
    // --- Platzhalter ---
    // In der Realität würde hier ein fetch-Aufruf zum Backend stehen:
    // const response = await fetch(`/api/appointments/${id}`);
    // const data = await response.json();

    // Simuliere Daten für die Entwicklung
    const mockData = {
        client: {
            name: "Erika Mustermann",
            address: "Musterstraße 1, 12345 Musterstadt",
            phone: "0123-4567890"
        },
        appointment: {
            start: "2025-07-18T10:00:00",
            end: "2025-07-18T12:00:00"
        },
        tasks: [
            "Gemeinsamer Spaziergang im Park",
            "Hilfe bei der Zubereitung des Mittagessens",
            "Begleitung zum wöchentlichen Arzttermin",
            "Erledigung der Einkäufe für das Wochenende"
        ]
    };
    // --- Ende Platzhalter ---

    populatePage(mockData);
}

// Funktion zum Befüllen der HTML-Seite mit Daten
function populatePage(data) {
    document.getElementById('client-name').textContent = data.client.name;
    document.getElementById('client-address').textContent = data.client.address;
    document.getElementById('client-phone').textContent = data.client.phone;
    document.getElementById('appointment-start').textContent = new Date(data.appointment.start).toLocaleString('de-DE');
    document.getElementById('appointment-end').textContent = new Date(data.appointment.end).toLocaleString('de-DE');

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Leere die Beispielliste
    data.tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `<label><input type="checkbox" value="${task}"> ${task}</label>`;
        taskList.appendChild(li);
    });
}

// Funktion zum Generieren des Dokumentations-Textes
function generateDocumentation() {
    const checkedTasks = document.querySelectorAll('#task-list input[type="checkbox"]:checked');
    const docTextarea = document.getElementById('generated-documentation');
    const saveBtn = document.getElementById('save-doc-btn');

    if (checkedTasks.length === 0) {
        docTextarea.value = "Es wurden keine Aufgaben als erledigt markiert.";
        saveBtn.style.display = 'none';
        return;
    }

    let documentation = "Folgende Aufgaben wurden heute erledigt:\n";
    checkedTasks.forEach(task => {
        documentation += `- ${task.value}\n`;
    });

    docTextarea.value = documentation;
    saveBtn.style.display = 'inline-block'; // Zeige den Speicher-Button an
}

// Funktion zum Speichern der Dokumentation
async function saveDocumentation() {
    const documentation = document.getElementById('generated-documentation').value;
    // Hier würde der fetch-Aufruf zum Speichern an das Backend erfolgen
    // z.B. POST /api/documentation, wie in FR-SD-002 vorgesehen 
    
    // const response = await fetch('/api/documentation', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         appointment_id: 123, // Die echte Termin-ID
    //         content: documentation
    //     })
    // });
    
    // if (response.ok) {
    //     alert('Dokumentation erfolgreich gespeichert!');
    // } else {
    //     alert('Fehler beim Speichern.');
    // }

    alert(`(Simuliert) Dokumentation gespeichert:\n\n${documentation}`);
}