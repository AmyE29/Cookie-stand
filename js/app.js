


var shopHours = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

var ulSeattle = document.getElementById('seattle');

var cookieshopSeattle = {
  minimumCustomers: 23,
  maximumCustomers: 65,
  averageCookiesPerCustomer: 6.3,
  customersPerHour: [],
  cookiesPerHour: [],
  totalCookiesEachDay: 0,


  generateCustomersPerHour: function(){
    for (var i = 0; i < shopHours.length; i++){
    // generate a random number
      var customers = randomNumber(this. minimumCustomers, this.maximumCustomers);
      // this stores it in an array
      this.customersPerHour.push(customers);
    }
  },
  generateCookiesPerHour: function() {
    this.generateCustomersPerHour();
    for (var i = 0; i < shopHours.length; i++) {
      var cookiesOneHour = Math.ceil(this.customersPerHour[i] * this.averageCookiesPerCustomer);
      this.cookiesPerHour.push(cookiesOneHour);
      this.totalCookiesEachDay += cookiesOneHour;
    }
  },
  render: function() {
    for (var i = 0; i < shopHours.length; i++){
      // create an element
      var liEL = document.createElement('li');
      // add content
      liEL.textContent = `${shopHours[i]} Cookies: ${this.cookiesPerHour[i]}`;
      // append to the DOM; generateCookiesPerHour
      ulSeattle.appendChild(liEL);
    }
    // eslint-disable-next-line no-redeclare
    var liEL = document.createElement('li');
    liEL.textContent = `Daily Total: ${this.totalCookiesEachDay}`;
    ulSeattle.appendChild(liEL);
  }
};

cookieshopSeattle.generateCustomersPerHour();
cookieshopSeattle.generateCookiesPerHour();
cookieshopSeattle.render();

function randomNumber (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
