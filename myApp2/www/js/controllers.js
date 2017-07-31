angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

  document.addEventListener("deviceready", function () {
    console.log("设备准备好了");
    // alert("kaishi");
    $scope.db = window.sqlitePlugin.openDatabase({name:"my.db"});

    setTimeout(function () {
      console.log("进入定时器");
      $scope.db.transaction(function (tx) {
        tx.executeSql("create table test_table (name text , age integer)" , function (tx , res) {
          console.log("成功");
          // alert("chenggong");
        } , function (tx , error) {

          console.log("错误");
          console.log(error);
        });
      } , 3000);
    });

  }, false);

  $scope.insertFn = function () {
    $scope.db.transaction(function (tx) {
      tx.executeSql("INSERT INTO test_table (name, age) VALUES (?,?)", ["张三", 100], function(tx, res) {
        console.log(res);
      } , function (tx , error) {
        console.log("insert error:" + error);
      });
    });
  }


  $scope.selectFn = function () {
    $scope.db.transaction(function (tx) {
      tx.executeSql("select * from test_table;", [], function(tx, res) {
        console.log(res);
        console.log(res.rows.item(0));
      } , function (tx , error) {
        console.log("查询错误:" + error);
      });
    });
  }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
