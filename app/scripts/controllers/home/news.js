// Generated by CoffeeScript 1.7.1
Mifan.controller("homeNews", function($scope, $timeout, $http, $time) {
  var API, news;
  API = $scope.API;
  $scope.content = "";
  $scope.newsCollect = [];
  news = {
    init: function() {
      var getFirstPage;
      getFirstPage = function() {
        return news.get(1);
      };
      $scope.$on("getHomeNews", getFirstPage);
      if ($scope.isLogin) {
        getFirstPage();
      }
      return $scope.getPage = news.get;
    },
    get: function(page) {
      var cb, url;
      if ($scope.isPageLoading) {
        return false;
      }
      url = "" + API.news + $scope.privacyParamDir + "/page/" + page;
      if (IsDebug) {
        url = API.news;
      }
      $scope.$emit("onPaginationStartChange", page);
      cb = function(data) {
        var msg, result, ret;
        ret = data.ret, result = data.result, msg = data.msg;
        if (result && result.page) {
          $scope.newsCollect = result['list'];
          $scope.$emit("onPaginationGeted", result['page']);
        } else {
          $scope.errorMsg = msg;
        }
        return $scope.dataLoaded = true;
      };
      return $http.get(url).success(cb);
    }
  };
  return news.init();
});
