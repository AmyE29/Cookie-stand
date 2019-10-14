'use strict';

var shopHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
CookieStores.locationHoursTotal = [];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var allLocations = [];

function CookieStores(location, minimumCustomers, maximumCustomers, avgCustCookies) {
  this.location = location;
  this.minimumCustomers = minimumCustomers;
  this.maximumCustomers = maximumCustomers;
  this.avgCustCookies = avgCustCookies;
  this.customersEachHour = [];
  this.cookiesEachHour = [];
  this.totalCookies = 0;
  allLocations.push(this);
}


new CookieStores('Seattle', 23, 65, 6.3);
new CookieStores('Tokyo', 3, 24, 1.2);
new CookieStores('Dubai', 11, 38, 3.7);
new CookieStores('Paris', 20, 38, 2.3);
new CookieStores('Lima', 2, 16, 4.6);

CookieStores.prototype.genHourlyCustVolume = function () {
  for (var i = 0; i < shopHours.length; i++) {
    var customers = randomNumber(this.minimumCustomers, this.maximumCustomers);
    this.customersEachHour.push(customers);
  }
};

CookieStores.prototype.genHourlyCookieVolume = function () {
  for (var i = 0; i < shopHours.length; i++) {
    var cookiesForOneHour = Math.ceil(this.customersEachHour[i] * this.avgCustCookies);
    this.cookiesEachHour.push(cookiesForOneHour);
    this.totalCookies+= cookiesForOneHour;
  }
};


var tableDataEl = document.getElementById('tableData');
function headerRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);
  tableDataEl.appendChild(trEl);

  for (var i = 0; i < shopHours.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = shopHours[i];
    trEl.appendChild(thEl);
    tableDataEl.appendChild(trEl);
  }

  tableDataEl = document.getElementById('tableData');
  thEl = document.createElement('th');
  thEl.textContent = 'Total';
  trEl.appendChild(thEl);
  tableDataEl.appendChild(trEl);
}
headerRow();

CookieStores.prototype.render = function () {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.location;
  trEl.appendChild(tdEl);

  for (var i = 0; i < this.cookiesEachHour.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesEachHour[i];
    trEl.appendChild(tdEl);
  }

  var tdTot = document.createElement('td');
  tdTot.className='total';
  tdTot.textContent = this.totalCookies;
  trEl.appendChild(tdTot);
  tableDataEl.appendChild(trEl);
};

var footer = function () {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Total';
  trEl.appendChild(tdEl);

  for (var i = 0; i < (shopHours.length); i++) {
    var allLocationsHourlyTotal = 0;
    var tdTot = document.createElement('td');
    tdTot.className='total';

    for (var j = 0; j < (allLocations.length); j++) {
      allLocationsHourlyTotal += allLocations[j].cookiesEachHour[i];
    }
    tdTot.textContent = allLocationsHourlyTotal;
    trEl.appendChild(tdTot);
  }
  tableDataEl.appendChild(trEl);
};

for (var i = 0; i < allLocations.length; i++) {
  allLocations[i].genHourlyCustVolume();
  allLocations[i].genHourlyCookieVolume();
  allLocations[i].render();
}

footer();

var userForm = document.getElementById('user-form');
userForm.addEventListener('submit', handlesubmit);

function handlesubmit(event) {
  event.preventDefault();

  tableDataEl.deleteRow(-1);

  var location = event.target.InputElementLocation.value;
  var minimumCustomers = Number(event.target.InputELementMinimumCustomers.value);
  var maximumCustomers = Number(event.target.InputElementMaximumCustomers.value);
  var avgCustCookies = Number(event.target.InputElementAvgCustCookies.value);
  var newStore = new CookieStores(location, minimumCustomers, maximumCustomers, avgCustCookies);

  newStore.genHourlyCustVolume();
  newStore.genHourlyCookieVolume();
  newStore.render();
  footer();
}

