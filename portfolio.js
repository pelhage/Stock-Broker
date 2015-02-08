(function() {

  var Portfolio = function ($http) {

    
    /** 
      * init() checks to see if user already has a portfolio 
      * if user does, then it loads data from localstorage
      * if not, then it creates portfolio with a starting amount
      */
    var init = function() {
      if (localStorage.getItem('myPortfolio')) {
        return JSON.parse(localStorage.getItem('myPortfolio'));
      } else { 
        return { cash : 1000, equities : [], history: [] };
      } 
    };

    init();




    return {

      portfolio: init(),


      /**
       * buyEquity() adds equities to portfolio
       * using portfolio's funds
       *
       * @param {String} symbol - equity's ticker symbol 
       * @param {Number} bid - cost of share 
       * @param {Number} qty - # of shares 
       */
      buyEquity: function(symbol, bid, qty) {
        var cost = bid * qty;

        if (this.portfolio.cash < cost) {
          alert('Insufficient funds for transaction');
          return false;
        } 
        if (qty == null || qty == NaN || qty == undefined) {
          alert('Please enter a valid quantity');
          return false;
        }
        var ticker = symbol;

        for (var i = 0, len = this.portfolio.equities.length; i < len; i++) {
          if (this.portfolio.equities[i].ticker == ticker) {
            this.portfolio.cash -= cost;
            this.portfolio.equities[i].qty += qty;
            this.transactionInfo('Buy', ticker, qty, cost);
            this.savePortfolio();
            return true;
          }
        }
        var obj = {};
        obj['ticker'] = symbol;
        obj['qty'] = qty;

        this.portfolio.equities.push(obj);
        this.portfolio.cash -= cost;
        this.transactionInfo('Buy', ticker, qty, cost);
        this.savePortfolio();
        return true;
      },






      /**
       * sellEquity() sells equities in portfolio
       *
       * @param {String} symbol - equity's ticker symbol 
       * @param {Number} ask - market price of share 
       * @param {Number} qty - # of shares 
       */
      sellEquity: function(symbol, ask, qty) {
        var revenue = ask * qty;
        var ticker = symbol;

        for (var i = 0, len = this.portfolio.equities.length; i < len; i++) {

          if (this.portfolio.equities[i].ticker == ticker) {
            var qtyOwned = this.portfolio.equities[i].qty;

            if (qtyOwned >= qty) {
              this.portfolio.cash += revenue;
              (qtyOwned > qty) ? this.portfolio.equities[i].qty -= qty : this.portfolio.equities.splice(i, 1); //TODO: Bad practice.
              this.transactionInfo('Sell', ticker, qty, revenue);
              return true;
            }
            else {
              alert('You don"t own enough shares to sell');
              return false;
            }
          } else if (i == len - 1){
            alert('You do not own this stock');
            return false;
          }
        }
      },






      /**
       * canSell() checks if equity exists in portfolio
       *
       * @param {String} symbol - equity's ticker symbol 
       * @returns {Boolean} 
       */
      canSell: function(symbol) {
        for (var i = 0, len = this.portfolio.equities.length; i < len; i++) {
          if (this.portfolio.equities[i].ticker == symbol) {
            return true;
          } 
        }
        return false;
      },






      /**
       * searchTicker() returns data for given ticker
       *
       * @param {String} tickerName - equity's ticker symbol 
       */
      searchTicker: function (tickerName) {
        return $http.get('http://data.benzinga.com/stock/'+ tickerName);
      },






      /**
       * transactionInfo() creates receipt for transaction
       *
       * @param {String} type - either bought or sold an equity
       * @param {String} equity - equity's ticker symbol 
       * @param {Number} qty - # of shares 
       * @param {Number} value - total revenue or cost of transaction
       */
      transactionInfo: function(type, equity, qty, value) {
        var transDate = new Date();
        var obj = {
          'date' : transDate,
          'type' : type,
          'quantity': qty,
          'ticker': equity,
          'value': value,
          'cash' : this.portfolio.cash
        };
        this.portfolio.history.push(obj);
      },





      /**
       * savePortfolio() saves the Portfolio object to local storage
       */
      savePortfolio: function() { 
        localStorage.setItem('myPortfolio', JSON.stringify(this.portfolio));
      }




    }
  };


  Portfolio.$inject = ['$http'];

  angular.module('benzingaApp')
    .factory('Portfolio', Portfolio);

}());
