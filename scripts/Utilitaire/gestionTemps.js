const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

let today = new Date();
let options = {weekday: 'long'};
let todayDay = today.toLocaleDateString('fr-FR', options);

todayDay = todayDay.charAt(0).toUpperCase() + todayDay.slice(1);

let arrayDayInOrder = weekDays.slice(weekDays.indexOf(todayDay)).concat(weekDays.slice(0, weekDays.indexOf(todayDay)));

export default arrayDayInOrder;
