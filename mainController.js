(function() {

  var MainController = function ($scope, Portfolio, $location) {

    $scope.equities = Portfolio.portfolio.equities;
    $scope.history  = Portfolio.portfolio.history;
    $scope.balance  = Portfolio.portfolio.cash;



    /**
     * buyEquity() adds equities to portfolio
     * using portfolio's funds
     *
     * @param {String} symbol - equity's ticker symbol 
     * @param {Number} bid - cost of share 
     * @param {Number} qty - # of shares 
     */
    $scope.buyEquity = function(symbol, bid, qty) {
      $scope.completed = Portfolio.buyEquity(symbol, bid, qty);
      if($scope.completed) {
        $location.path('/history/');
      }
    };



    /**
     * sellEquity() sells equities in portfolio
     *
     * @param {String} symbol - equity's ticker symbol 
     * @param {Number} ask - market price of share 
     * @param {Number} qty - # of shares 
     */
    $scope.sellEquity = function(symbol, ask, qty) {
      $scope.completed2 = Portfolio.sellEquity(symbol, ask, qty);
      if($scope.completed2) {
        $location.path('/history/');
      }
    };



    /**
     * searchTicker() returns data for given ticker 
     * 
     * @param {String} symbol - equity's ticker symbol
     * @todo - Consider placing logic into factory so data persists between views
     * @todo - Consider placing $scope.canSell into a directive
     */
    $scope.searchSymbol = function(symbol) {
      Portfolio.searchTicker(symbol)
        .success(function(data){
          if(data.status == "error") {
            alert(data.msg);
            return;
          } else {
            $scope.currentEquity = data;
            $scope.canSell = Portfolio.canSell(data.symbol); //This would be useful if it were in a directive
            $scope.showPurchase = false;
          }
        });
      $scope.ticker2 = '';
      $location.path('/');
    };



  }

MainController.$inject = ['$scope', 'Portfolio', '$location' ];

angular.module('benzingaApp')
  .controller('MainController', MainController);

}());
