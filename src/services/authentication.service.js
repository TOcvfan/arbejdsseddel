import { BehaviorSubject } from 'rxjs';


import { handleResponse } from '../helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    seddel,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`https://nameless-ocean-57332.herokuapp.com/users`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function seddel(kundeNavn, kontaktPerson, email, fakturaAdresse, arbejdsAdresse, arbejde, materialeliste, dato, ordreNr, kontaktTlf, telefon, antal, pris) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ kundeNavn, kontaktPerson, email, fakturaAdresse, arbejdsAdresse, arbejde, materialeliste, dato, ordreNr, kontaktTlf, telefon, antal, pris })
    };

    return fetch(`https://nameless-ocean-57332.herokuapp.com/users`, requestOptions)
        .then(handleResponse)
        .then(arbejdsseddel => {
            return arbejdsseddel;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}