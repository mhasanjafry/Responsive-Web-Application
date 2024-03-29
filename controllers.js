var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination', 'ngStorage']);

myApp.controller('MyController', ['$scope', '$http', '$localStorage', function($scope, $http, $localStorage) {
    $scope.artists = null;
    $scope.newbills = null;
    $scope.activebills = null;
    $scope.billdata = null;
    $scope.committeedata == null;
    $scope.ind = 0;
    $scope.selectedBill = null;

    if ($scope.artists == null){
        $scope.artists = $localStorage.legislatures;
    }
    if ($scope.artists == null){
      $http.get('http://demo-env-jafry.us-east-1.elasticbeanstalk.com/index.php', {params:{"param1": "1", "param2": "val2"}}).success(function(data) {
        $scope.artists = data.results;
        $scope.selectSite = 'All States';

        for (var i = 0; i < $scope.artists.length; i++) {
            if ($scope.artists[i].chamber == "house"){
                $scope.artists[i].pic = "h.png";
                $scope.artists[i].chamber = "House";
            }else if ($scope.artists[i].chamber == "senate"){
                $scope.artists[i].pic = "s.svg";
                $scope.artists[i].chamber = "Senate";
            }
            if ($scope.artists[i].party == "R"){
                $scope.artists[i].partyName = "Republican";
                $scope.artists[i].partyPic = "http://cs-server.usc.edu:45678/hw/hw8/images/r.png";
            }else if ($scope.artists[i].party == "D"){
                $scope.artists[i].partyName = "Democrat";
                $scope.artists[i].partyPic = "http://cs-server.usc.edu:45678/hw/hw8/images/d.png";
            }else if ($scope.artists[i].party == "I"){
                $scope.artists[i].partyName = "Independent";
                $scope.artists[i].partyPic = "http://www.designhill.com/design-blog/wp-content/uploads/2015/05/Independent-American-Party-Logo.png";
            }
            if ($scope.artists[i].district){
                $scope.artists[i].district = "District " + $scope.artists[i].district;
            }else{
                $scope.artists[i].district = "N.A";
            }
            $scope.artists[i].favstatus = false;
        }
        $localStorage.legislatures = $scope.artists;
      });
    }
    $scope.favSelected = function (item) { 
        return item.favstatus === true; 
    };

    $scope.open = function (index) {
        $scope.ind = index;
    }
    $scope.billopen = function (item) {
        $scope.selectedBill = item;
    }
    $scope.convertDate = function (input){
        var a = String(input);
        var newDate = "";
        switch (a.substring(5,7)) {
            case "01":
                newDate = "Jan";
                break;
            case "02":
                newDate = "Feb";
                break;
            case "03":
                newDate = "Mar";
                break;
            case "04":
                newDate = "Apr";
                break;
            case "05":
                newDate = "May";
                break;
            case "06":
                newDate = "Jun";
                break;
            case "07":
                newDate = "July";
                break;
            case "08":
                newDate = "Aug";
                break;
            case "09":
                newDate = "Sept";
                break;
            case "10":
                newDate = "Oct";
                break;
            case "11":
                newDate = "Nov";
                break;
            case "12":
                newDate = "Dec";
                break;
        }
        newDate += " " + a.substring(8) + ", ";
        newDate += a.substring(0,4);
        return newDate;
    }
    $scope.mobileCheck = function(){
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        // return true;      
      return (check==false);
    }
    $scope.progress = function (start, end){
        var st = $scope.convertDate(start);
        var en = $scope.convertDate(end);
        var st_msec = Date.parse(st);
        var en_msec = Date.parse(en);
        var n = Date.now();
        return Math.round(((n - st_msec) / (en_msec - st_msec)) * 100);
    }
    $scope.caps = function (str){
        return str.substring(0,1).toUpperCase() + str.substring(1);
    }
    $scope.calldetail = function (input){
        $http.get('http://demo-env-jafry.us-east-1.elasticbeanstalk.com/index.php', {params:{"param1": "2", "param2": String(input)}}).success(function(data) {
            $scope.billstop5 = data.results;
        });
        $http.get('http://demo-env-jafry.us-east-1.elasticbeanstalk.com/index.php', {params:{"param1": "3", "param2": String(input)}}).success(function(data) {
            $scope.commtop5 = data.results;
        });
    }
    $scope.getBills = function (){
        if ($scope.newbills == null){;
            $scope.newbills = $localStorage.newbills;
            $scope.activebills = $localStorage.activebills;
            $scope.billdata = $localStorage.activebills;
        }
        if ($scope.newbills == null){
            $http.get('http://demo-env-jafry.us-east-1.elasticbeanstalk.com/index.php', {params:{"param1": "4", "param2": ""}}).success(function(data) {
                $scope.newbills = data.results;
                for (var w = 0; w < $scope.newbills.length; w++) {
                    if ($scope.newbills[w].chamber == "house"){
                        $scope.newbills[w].pic = "h.png";
                        $scope.newbills[w].chamber = "House";
                    }else if ($scope.newbills[w].chamber == "senate"){
                        $scope.newbills[w].pic = "s.svg";
                        $scope.newbills[w].chamber = "Senate";
                    }
                    $scope.newbills[w].bill_id = $scope.newbills[w].bill_id.toUpperCase();
                    $scope.newbills[w].bill_type = $scope.newbills[w].bill_type.toUpperCase();
                    $scope.newbills[w].status = "New";
                    $scope.newbills[w].favstatus = false;
                }
                $localStorage.newbills = $scope.newbills;
            });
            $http.get('http://demo-env-jafry.us-east-1.elasticbeanstalk.com/index.php', {params:{"param1": "5", "param2": ""}}).success(function(data) {
                $scope.activebills = data.results;
                for (var t = 0; t < $scope.activebills.length; t++) {
                    if ($scope.activebills[t].chamber == "house"){
                        $scope.activebills[t].pic = "h.png";
                        $scope.activebills[t].chamber = "House";
                    }else if ($scope.activebills[t].chamber == "senate"){
                        $scope.activebills[t].pic = "s.svg";
                        $scope.activebills[t].chamber = "Senate";
                    }
                    $scope.activebills[t].bill_id = $scope.activebills[t].bill_id.toUpperCase();
                    $scope.activebills[t].bill_type = $scope.activebills[t].bill_type.toUpperCase();
                    $scope.activebills[t].status = "Active";
                    $scope.activebills[t].favstatus = false;
                }
                $scope.billdata = $scope.activebills;
                $localStorage.activebills = $scope.activebills;
            });
        }
    }
    $scope.selectNewBills = function (){
        $scope.billdata = $scope.newbills;
    }
    $scope.selectActiveBills = function (){
        $scope.billdata = $scope.activebills;
    }
    $scope.getCommittees = function (){
        if ($scope.committeedata == null){
            $scope.committeedata = $localStorage.committeedata;
        }
        if ($scope.committeedata == null){
            $http.get('http://demo-env-jafry.us-east-1.elasticbeanstalk.com/index.php', {params:{"param1": "6", "param2": ""}}).success(function(data) {
                $scope.committeedata = data.results;
                for (var i = 0; i < $scope.committeedata.length; i++) {
                    if ($scope.committeedata[i].chamber == "house"){
                        $scope.committeedata[i].pic = "h.png";
                        $scope.committeedata[i].chamber = "House";
                    }else if ($scope.committeedata[i].chamber == "senate"){
                        $scope.committeedata[i].pic = "s.svg";
                        $scope.committeedata[i].chamber = "Senate";
                    }else if ($scope.committeedata[i].chamber == "joint"){
                        $scope.committeedata[i].pic = "s.svg";
                        $scope.committeedata[i].chamber = "Joint";
                    }
                    $scope.committeedata[i].favstatus = false;
                }
                $localStorage.committeedata = $scope.committeedata;
            });
        }
    }
}]);
