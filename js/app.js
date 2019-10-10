/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
var parentEl = document.getElementById('parentElement');
parentEl.textContent = 'Cookie Stores';



CookieStores.shopHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
CookieStores.allLocations = [];
CookieStores.locationHoursTotal = [];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// this is where the constructor is
function CookieStores(location, minimumCustomers, maximumCustomers, avgCustCookies) {
  this.location = location;
  this.minimumCustomers = minimumCustomers;
  this.maximumCustomers = maximumCustomers;
  this.avgCustCookies = avgCustCookies;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalCookies = 0;
  this.locationTotal = 0;
  CookieStores.allLocations.push(this);
}

var seattle= new CookieStores('Seattle', 23, 65, 6.3);
var tokyo = new CookieStores('Tokyo', 3, 24, 1.2);
var dubai = new CookieStores('Dubai', 11, 38, 3.7);
var paris = new CookieStores('Paris', 20, 38, 2.3);
var lima = new CookieStores('Lima', 2, 16, 4.6);


CookieStores.prototype.genHourlyCustVolume = function() {
  for( var i = 0; i < CookieStores.shopHours.length; i++ ) {
    var customers = randomNumber(this.minimumCustomers, this.maximumCustomers);
    this.customersEachHour.push(customers);

  }
};

CookieStores.prototype.genHourlyCookieVolume = function() {
  for (var i = 0; i < CookieStores.shopHours.length; i++) {
    var cookiesForOneHour = Math.ceil(this.customersEachHour[i] * this.avgCustCookies);
    this.cookiesEachHour.push(cookiesForOneHour);
    this.totalCookies += cookiesForOneHour;
  }
};
var tableDataEl = document.getElementById('tableData');
var trEl = document.createElement('tr');
var tdEl = document.createElement('td');
tdEl.textContent = 'Location';
trEl.appendChild(tdEl);
tableDataEl.appendChild(trEl);

for (var i =0; i < CookieStores.shopHours.length; i++) {
  tdEl = document.createElement('td');
  tdEl.textContent = CookieStores.shopHours[i];
  trEl.appendChild(tdEl);
  tableDataEl.appendChild(trEl);
}
var tableDataEl = document.getElementById('tableData');
var tdEl = document.createElement('td');
tdEl.textContent = 'Total';
trEl.appendChild(tdEl);
tableDataEl.appendChild(trEl);

CookieStores.prototype.render = function() {

  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.location;
  trEl.appendChild(tdEl);

  for (var i =0; i < this.cookiesEachHour.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesEachHour[i];
    trEl.appendChild(tdEl);
  }
  var tdEl = document.createElement('td');
  tdEl.textContent = this.totalCookies;
  trEl.appendChild(tdEl);
  tableDataEl.appendChild(trEl);
};
var footer = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Total';
  trEl.appendChild(tdEl);

  for (var i=0; i < CookieStores.shopHours.length; i++) {
    var allStoresHourlyTotal = 0;
    var td = document.createElement('td');

    for (var j=0; j < CookieStores.allLocations.length; j++) {
      allStoresHourlyTotal += CookieStores.allLocations[j].cookiesEachHour[i];
    }
    td.textContent = allStoresHourlyTotal;
    trEl.appendChild(td);
  }
  tableDataEl.appendChild(trEl);
};

for (var i=0; i < CookieStores.allLocations.length; i++) {
  CookieStores.allLocations[i].genHourlyCustVolume();
  CookieStores.allLocations[i].genHourlyCookieVolume();
  CookieStores.allLocations[i].render();
}
var userForm = document.getElementById('NewStore');
userForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  var location = event.target.location.value;
  var minimumCustomers= event.target.minimumCustomers.value;
  var maximumCustomers = event.target.maximumCustomers.value;
  var avgCustCookies = event.target.avgCustCookies.value;

  new CookieStores(location, minimumCustomers, maximumCustomers, avgCustCookies);
  renderFooterRow();
}
footer();

