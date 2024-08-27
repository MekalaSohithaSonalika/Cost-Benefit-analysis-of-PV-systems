function showFirstForm() {
    document.getElementById('regForm').classList.remove('secActive', 'secActive2');
}

function showSecondForm() {
    document.getElementById('regForm').classList.add('secActive');
    document.getElementById('regForm').classList.remove('secActive2');
}

function showThirdForm() {
    document.getElementById('regForm').classList.add('secActive2');
}

function isFormValid() {
    const form = document.getElementById('regForm');
    const inputs = form.querySelectorAll('input[required]');
    for (const input of inputs) {
        if (!input.value) {
            return false;
        }
    }
    return true;
}

function Sub() {
    // Get the input values from the form
    const x = parseFloat(document.getElementById('x').value);
    const y = parseFloat(document.getElementById('y').value);
    const z = parseFloat(document.getElementById('z').value);
    const i = parseFloat(document.getElementById('i').value);
    const v1 = parseFloat(document.getElementById('v1').value);
    const h = parseFloat(document.getElementById('h').value);
    const n = parseFloat(document.getElementById('n').value);
    const Wp = parseFloat(document.getElementById('Wp').value);
    const ηi = parseFloat(document.getElementById('ηi').value) || 0.9; // Use 0.9 if not filled
    const ηc = parseFloat(document.getElementById('ηc').value) || 0.75; // Use 0.9 if not filled
    const ηd = parseFloat(document.getElementById('ηd').value) || 0.75; // Use 0.9 if not filled
    const ηdc = parseFloat(document.getElementById('ηdc').value) || 0.95; // Use 0.95 if not filled
    const w = parseFloat(document.getElementById('w').value);
    const u = parseFloat(document.getElementById('u').value);
    const v2 = parseFloat(document.getElementById('v2').value);
    const DOD = parseFloat(document.getElementById('DOD').value);
    const Br = parseFloat(document.getElementById('Br').value);
    const Ld = parseFloat(document.getElementById('Ld').value);
    const Ln = parseFloat(document.getElementById('Ln').value);
    const nn = parseFloat(document.getElementById('nn').value);

    if (h <= 0) {
        alert("Error: Value of 'h' (daylight hours) cannot be zero or negative.");
        return false;
    }

    // Calculate T = Wp * (h - n) * ηi * 365
    const T = Wp * (h - n) * ηi * 365;
    const Tn = Wp * h * ηi * 365;
    const ACd = (((x + y + z + w + u) * (i / 100)) + v1 + v2);
    const T1 = Wp * h * ηi * ηdc * 365;
    const X = (DOD * Br) / (ηc * ηdc * Wp);
    const nL = (DOD * Br * ηd * ηi) / Ln;

    // Calculate COE
    const COE = ((x + y + z) * (i / 100) + v1) / T;
    const COEN = ((x + y + z) * (i / 100) + v1) / Tn;
    const DCOE = ACd / T1;
    const DCOEWOL = ACd / (365 * Wp * (((h - n) * ηdc * ηi ) + (n * ηdc * ηc * ηd * ηi)));
    const DCOEWOLC = ACd / (365 * Wp * (((h - n) * ηdc * ηi ) + (X * ηdc * ηc * ηd * ηi)));
    const DCOEWL = (ACd - (Ld * n * 17 * 365)) / (365 * ((h * Ld) + ((Wp - (Ld / (ηdc * ηi))) * ηdc * ηi * (h - n))));
    const DCOEWLN = (ACd-(Ln * nn * 365 * 17) + ((6 * 365 * Ln * nn)/(ηc * ηd * ηi * ηi)))/(365 * ((Ln*(h+nn))+(ηdc*ηi*((h * Wp) - ((h * Ln)/(ηdc * ηi))))));
    const DCOEWLCN = (ACd - (Ln * nL * 365 * 17) + ((6 * 365 * Ln * nL) / (ηc * ηd * ηi * ηi))) / (365 * (Ln * (h + nL)));

    // Store the values in localStorage
    localStorage.setItem('COE', COE.toFixed(2));
    localStorage.setItem('COEN', COEN.toFixed(2));
    localStorage.setItem('DCOE', DCOE.toFixed(2));
    localStorage.setItem('DCOEWOL', DCOEWOL.toFixed(2));
    localStorage.setItem('DCOEWOLC', DCOEWOLC.toFixed(2));
    localStorage.setItem('DCOEWL', DCOEWL.toFixed(2));
    localStorage.setItem('DCOEWLN', DCOEWLN.toFixed(2));
    localStorage.setItem('DCOEWLCN', DCOEWLCN.toFixed(2));
    localStorage.setItem('Ld', Ld); // Store the value of Ld
    localStorage.setItem('Ln', Ln); // Store the value of Ln
    localStorage.setItem('X', X);   // Store the value of X
    localStorage.setItem('nL', nL); // Store the value of nL
    localStorage.setItem('nn', nn);
    localStorage.setItem('T1', T1);
    localStorage.setItem('Tn', Tn);
    localStorage.setItem('T', T);
    localStorage.setItem('n', n);

    // Submit the form (to go to results.html)
    return true;
}


function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    if (!isFormValid()) {
        alert('Please fill out all required fields.');
        return;
    }

    // Call Sub() to perform calculations and store values
    if (Sub()) {
        // Navigate to the results page
        window.location.href = 'results.html';
    }
}

// Add event listener to the submit button
document.querySelector('.submit').addEventListener('click', handleSubmit);
