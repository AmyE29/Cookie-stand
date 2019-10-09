/* eslint-disable no-unused-vars */
var parentEl = document.getElementById('parentElement');

var child = document.createElement('h1');
child.textContent = 'Cookie Store';
parentEl.appendChild(child);

var shopHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
var allCookieStores = [];

function CookieStores(location, minimumCustomers, maximumCustomers, avgCustCookies) {
  this.location = location;
  this.minimumCustomers = minimumCustomers;
  this.maximumCustomers = maximumCustomers;
  this.avgCustCookies = avgCustCookies;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalCookies = 0;
  allCookieStores.push(this);
}

var seattle= new CookieStores('Seattle', 23, 65, 6.3);
var tokyo = new CookieStores('Tokyo', 3, 24, 1.2);
var dubai = new CookieStores('Dubai', 11, 38, 3.7);
var paris = new CookieStores('Paris', 20, 38, 2.3);
var lima = new CookieStores('Lima', 2, 16, 4.6);


CookieStores.prototype.genHourlyCustVolume = function() {
  for( var i = 0; i < shopHours.length; i++ ) {
    var customers = randomNumber(this.minimumCustomers, this.maximumCustomers);
    this.customersEachHour.push(customers);
  }
};

CookieStores.prototype.genHourlyCookieVolume = function() {
  this.genHourlyCustVolume();
  for (var i = 0; i < shopHours.length; i++) {
    var cookiesForOneHour = Math.ceil(this.customersEachHour[i] * this.avgCustCookies);
    this.cookiesEachHour.push(cookiesForOneHour);
    this.totalCookies += cookiesForOneHour;
  }
  console.log(this);
};

for (var i=0; i < allCookieStores.length; i++) {
  allCookieStores[i].genHourlyCustVolume();
  allCookieStores[i].genHourlyCookieVolume();
  allCookieStores[i].render();
}
