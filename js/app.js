'use strict';

function randomNumber(min,max,count) {
  var numArray =[0];
  for (var i = 0;i < count;i++) {
    min = Math.ceil(min);
    max = Math.floor(max);
    numArray[i] = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return numArray;
}


var parentEl = document.getElementById('parentElement');

var cookieStore = {
  shopLocation: 'Seattle',
  minCustomers: 23,
  maxCustomers: 65,
  avgCookieSales: 6.3,
  shopHours: ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'],
  hourlyCustomers: [],
  hourTotals: function () {
    return randomNumber(this.minCustomers,this.maxCustomers,this.shopHours.length);
  },

  totalDailyCookies: function(){
    this.hourlyCustomers = this.hourTotals();

    console.log('string',this.hourlyCustomers);
    var totalCookies = this.hourlyCustomers[0];
    for(var x = 1; x < this.hourlyCustomers.length; x++) {
      totalCookies += (this.hourlyCustomers[x] * this.avgCookieSales);
    }

    return totalCookies;
  },
  renderLocation: function() {
    var childElName = document.createElement('div');
    childElName.textContent = `Shop Name: ${this.shopLocation}`;
    parentEl.appendChild(childElName);
  },
  renderTotal: function() {
    var childElTotal = document.createElement('div');
    childElTotal.textContent = `Total: ${this.totalDailyCookies()} cookies`;
    parentEl.appendChild(childElTotal);
  },
  renderHours: function() {
    for(var i = 0; i < this.shopHours.length; i++) {
      var childElHours = document.createElement('li');
      childElHours.textContent = `${this.shopHours[i]}: ${this.hourlyCustomers[i] * this.avgCookieSales}  cookies`;
      parentEl.appendChild(childElHours);
    }
  }
};
cookieStore.renderLocation();
cookieStore.renderTotal();
cookieStore.renderHours();

