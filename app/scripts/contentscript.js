'use strict';

var haveGold =false;
var haveSilver = false;
var haveBronze = false;

var page = 1;

window.addEventListener('load' , function(){




    var html = document.querySelector('html');
    var body = document.querySelector('body');
    //var test = document.querySelector('.dyother');

    //top_banner
    var googleHolders = $( "div[id*='google']");
    var randomHolder = $("div[id*='holder']");
    var adsHolder = $("div[id*='fuadfuad']");
    //var adHolder = $("div[class*='adBox']");
    var tempholders = $.merge(googleHolders , randomHolder);
    var holders = $.merge(adsHolder , tempholders);
    var maxHeight = 0;
    var maxWidth = 0;
    var headerIndex = -1;
    var sideLeftIndex = -1;
    var sideRightIndex = -1;


    for(var i = 0 ; i < holders.length ; i++){
      // $(holders[i]).html('Loading');
         console.log("Height ? ",$(holders[i]).innerHeight());
        var height = $(holders[i]).innerHeight();
        var width = $(holders[i]).innerWidth();
        if(height > maxHeight){
            sideLeftIndex = i;
            maxHeight = height;
        }

        if(width > maxWidth){
            headerIndex = i;
            maxWidth = width;
        }
    }


    console.log("HEADER DIV ",$(holders[headerIndex]));
    console.log("SIDE IMAGE DIV ",$(holders[sideLeftIndex]));
    var isInit = false;
    var wellcomeDiv = document.createElement('div');
    wellcomeDiv.className ='MoneyWellCome';
    html.setAttribute('ng-app', 'AdMoney');
    html.setAttribute('ng-csp', '');
    html.setAttribute('ng-controller', 'MainController');
    //test.setAttribute('ng-click' , 'clickMe()');
    var app = angular.module ('AdMoney' , []);
    //['$rootScope' , '$scope' , '$http' , '$routeParams' , '$upload', function($rootScope , $scope , $http , $routeParams , $upload){
    app.controller('MainController', [ '$scope' , '$compile' ,function($scope , $compile) {
        console.log("init ", isInit);
        if(!isInit){
            init();
        }

        function init(){
            isInit = true;
            var localUrl = "http://local.kampyle.com/code_tests/SystemAdmin/ClientService.php";
            var ec2Uel = "http://fuadec2.kampyle.com/AdMoneyMain/Web/ClientService.php";
            console.log('init');
            var myData = {};
            myData.action = 'getUsersData';

            $.ajax({
                type: "POST",
                url: ec2Uel,
                data: 10,
                success: function(data){

                    var selectedGoldPackage;
                    var selectedSilverPackage;
                    var selectedBronzePackage;

                    var headerImage;
                    var mediumSideImage;
                    var smallImage;


                    var userDetails = jQuery.parseJSON(data);
                    userDetails.categories.forEach(function(category){
                        category.campaigns.forEach(function(campaign){
                            if(campaign.resources == undefined){

                            }else{
                                if(campaign.resources != undefined){
                                    if(campaign.resources.GOLD != undefined){
                                        console.log("This CAMPAIGN HAVE GOLD PACKAGE LOOK UP");
                                        if(!haveGold){
                                            console.log("And He Is The WINNER FOR GOLD !!");
                                            // TODO MANAGE USERS
                                            // TODO - UPDATE SERVER ON SELECTED CAMPAIGN

                                            var dataArray = {};

                                            dataArray.user_id = 10;
                                            dataArray.campaign_id = campaign.info[0].campaign_id;
                                            dataArray.package_id = campaign.info[0].type_id;
                                            console.log(dataArray);
                                            $.ajax({
                                                type: "POST",
                                                url: 'https://local.kampyle.com/ClientService.php',
                                                data: {"data":dataArray , "action":"updateCampaignRotation"},
                                                success: function(data){
                                                }
                                            });
                                            selectedGoldPackage = campaign;
                                            haveGold = true;
                                            console.log("This is the Selected GOLD PACKAGE ! !  !");
                                            console.log(selectedGoldPackage);


                                        }
                                    }

                                    if(campaign.resources.SILVER != undefined){
                                        console.log("This CAMPAIGN HAVE SILVER PACKAGE LOOK UP");
                                        if(!haveSilver){
                                            console.log("And He Is The WINNER FOR SILVER !!");
                                            // TODO - UPDATE SERVER ON SELECTED CAMPAIGN
                                            // TODO MANAGE USERS
                                            var dataArray = {};

                                            dataArray.user_id = 10;
                                            dataArray.campaign_id = campaign.info[0].campaign_id;
                                            dataArray.package_id = campaign.info[0].type_id;
                                            console.log(dataArray);
                                            $.ajax({
                                                type: "POST",
                                                url: 'https://local.kampyle.com/ClientService.php',
                                                data: {"data":dataArray , "action":"updateCampaignRotation"},
                                                success: function(data){
                                                }
                                            });
                                            selectedSilverPackage = campaign;
                                            console.log("This is the Selected SILVER PACKAGE ! !  !");
                                            console.log(selectedSilverPackage);
                                            haveSilver = true;


                                        }
                                    }

                                    if(campaign.resources.BRONZE != undefined){
                                        console.log("This CAMPAIGN HAVE BRONZE PACKAGE LOOK UP");
                                        if(!haveBronze){
                                            console.log("And He Is The WINNER FOR BRONZE !!");
                                            // TODO - UPDATE SERVER ON SELECTED CAMPAIGN
                                            // TODO MANAGE USERS
                                            var dataArray = {};

                                            dataArray.user_id = 10;
                                            dataArray.campaign_id = campaign.info[0].campaign_id;
                                            dataArray.package_id = campaign.info[0].type_id;
                                            console.log(dataArray);
                                            $.ajax({
                                                type: "POST",
                                                url: 'https://local.kampyle.com/ClientService.php',
                                                data: {"data":dataArray , "action":"updateCampaignRotation"},
                                                success: function(data){
                                                }
                                            });
                                            selectedBronzePackage = campaign;
                                            console.log("This is the Selected BRONZE PACKAGE ! !  !");
                                            console.log(selectedBronzePackage);
                                            haveBronze = true;


                                        }
                                    }






                                }


                                /*
                                 campaign.resources.forEach(function(resource){
                                 switch(resource.package_id){
                                 case "3" :  if(!haveGold){
                                 selectedGoldPackage = campaign;
                                 haveGold = true;
                                 }
                                 break;

                                 case "2" :
                                 if(!haveSilver){
                                 selectedSilverPackage = campaign;
                                 haveSilver = true;
                                 }
                                 break;
                                 case "1" : if(!haveBronze){
                                 selectedBronzePackage = campaign;
                                 haveBronze = true;
                                 }
                                 break;


                                 }
                                 });
                                 */
                            }





                        });
                    });

                    if(selectedGoldPackage != undefined){
                        selectedGoldPackage.resources.GOLD.forEach(function(resource){
                            if(resource.type == "LARGE_IMAGE"){
                                headerImage = resource;
                                console.log("Selected Header Resource ");
                                console.log(resource);
                                replaceHeaderImage();

                            }
                            /*if(resource.type == "MEDIUM_IMAGE"){
                                mediumSideImage = resource;
                                console.log("Selected Medium Resource ");
                                console.log(resource);

                            }*/
                        });
                    }

                    if(selectedSilverPackage != undefined){
                        selectedSilverPackage.resources.SILVER.forEach(function(resource){
                           /* if(resource.type == "LARGE_IMAGE"){
                                headerImage = resource;
                                console.log("Selected Header Resource ");
                                console.log(resource);

                            } */
                            if(resource.type == "MEDIUM_IMAGE"){
                                mediumSideImage = resource;
                                replaceSideImage();
                                console.log("Selected Medium Resource ");
                                console.log(resource);

                            }
                        });
                    }

                    if(selectedBronzePackage != undefined){
                        selectedBronzePackage.resources.BRONZE.forEach(function(resource){
                            /* if(resource.type == "LARGE_IMAGE"){
                             headerImage = resource;
                             console.log("Selected Header Resource ");
                             console.log(resource);

                             } */
                            if(resource.type == "SMALL_IMAGE"){
                                smallImage = resource;
                                //replaceSmallImage();
                                console.log("Selected SMALLLLLLL Resource ");
                                console.log(resource);

                            }
                        });
                    }



                    function replaceSideImage(){
                        /* Replace Images Left Side Image */
                        var originalWidth = $(holders[sideLeftIndex]).width();
                        var originalHeight = $(holders[sideLeftIndex]).height();

                        var clickButton = document.createElement('button');
                        $(clickButton).addClass('btn btn-primary adMoneyIcon');
                        $(clickButton).text('I want It :)');
                        $(clickButton).attr('ng-show' , 'showSideIcon == true');

                        var clickIcon = document.createElement('span');
                        $(clickIcon).addClass('glyphicon glyphicon-thumbs-up');

                        $(clickButton).append(clickIcon);

                        // ??
                        //var innerIframe = $(googleHolders[sideLeftIndex]).find('iframe');
                        //$(innerIframe).attr("ng-click" ,"clickMe()");

                        var image = document.createElement('img');


                        $(image).attr("src" , "https://local.kampyle.com/code_tests/SystemAdmin/static/images/"
                            +mediumSideImage.company_id
                            +"/"+mediumSideImage.campaign_id
                            +"/"+mediumSideImage.package_id
                            +"/MEDIUM_IMAGE/"
                            +mediumSideImage.title);
                        $scope.selectedMediumSideImage = mediumSideImage;
                        //$(googleHolders[sideLeftIndex]).attr("ng-click" ,"clickMe(selectedMediumSideImage)");
                        $(holders[sideLeftIndex]).attr("ng-model" ,'selectedMediumSideImage');
                        $(clickButton).attr("ng-click" ,"clickMe(selectedMediumSideImage)");
                        $(image).width(originalWidth);
                        $(image).height(originalHeight);
                        $(holders[sideLeftIndex]).css('position' , 'relative');
                        $(holders[sideLeftIndex]).attr('ng-mouseenter' , 'showSideIcon = true');
                        $(holders[sideLeftIndex]).attr('ng-mouseleave' , 'showSideIcon = false');
                        $(holders[sideLeftIndex]).attr('ng-init' , 'showSideIcon = false');
                        $(holders[sideLeftIndex]).html(image);
                        $(holders[sideLeftIndex]).append(clickButton);
                        //$compile(html)($scope);

                        /* END OF LEFT SIDE */



                    }

                    function replaceSmallImage(){
                        /* ALL THE OTHERS START */

                        for(var i = 0 ; i < holders.length ; i++){
                            if(i != sideLeftIndex && i != headerIndex){
                                var originalWidth = $(holders[i]).width();
                                var originalHeight = $(holders[i]).height();
                                console.log("This IS HOLDER");
                                console.log(holders[i]);
                                var clickButton = document.createElement('button');
                                $(clickButton).addClass('btn btn-primary adMoneyIcon');
                                $(clickButton).text('I want It :)');
                                $(clickButton).attr('ng-show' , 'showSideIcon == true');

                                var clickIcon = document.createElement('span');
                                $(clickIcon).addClass('glyphicon glyphicon-thumbs-up');

                                $(clickButton).append(clickIcon);

                                // ??
                                //var innerIframe = $(googleHolders[sideLeftIndex]).find('iframe');
                                //$(innerIframe).attr("ng-click" ,"clickMe()");

                                var image = document.createElement('img');


                                $(image).attr("src" , "https://local.kampyle.com/code_tests/SystemAdmin/static/images/"
                                    +smallImage.company_id
                                    +"/"+smallImage.campaign_id
                                    +"/"+smallImage.package_id
                                    +"/SMALL_IMAGE/"
                                    +smallImage.title);
                                $scope.selectedSmallImage = smallImage;
                                //$(googleHolders[sideLeftIndex]).attr("ng-click" ,"clickMe(selectedMediumSideImage)");
                                $(holders[i]).attr("ng-model" ,'selectedSmallImage');
                                $(clickButton).attr("ng-click" ,"clickMe(selectedSmallImage)");
                                $(image).width(originalWidth);
                                $(image).height(originalHeight);
                                $(holders[i]).css('position' , 'relative');
                                $(holders[i]).attr('ng-mouseenter' , 'showSideIcon = true');
                                $(holders[i]).attr('ng-mouseleave' , 'showSideIcon = false');
                                $(holders[i]).attr('ng-init' , 'showSideIcon = false');
                                $(holders[i]).html(image);
                                $(holders[i]).append(clickButton);
                            }
                        }


                        /* END OF ALL THE OTHERS */
                    }

                    function replaceHeaderImage(){
                        /* REPLACE HEADER IMAGE */
                        console.log("replaceHeaderImage");
                        var originalWidth = $(holders[headerIndex]).width();
                        var originalHeight = $(holders[headerIndex]).height();

                        var image = document.createElement('img');
                        var clickButton = document.createElement('button');
                        $(clickButton).addClass('btn btn-primary adMoneyIcon');
                        $(clickButton).text('I want It :)');
                        $(clickButton).attr('ng-show' , 'showHeaderIcon == true');


                        var clickIcon = document.createElement('span');
                        $(clickIcon).addClass('glyphicon glyphicon-thumbs-up');

                        $(clickButton).append(clickIcon);

                        $(image).attr("src" , "https://local.kampyle.com/code_tests/SystemAdmin/static/images/"
                            +headerImage.company_id
                            +"/"+headerImage.campaign_id
                            +"/"+headerImage.package_id
                            +"/LARGE_IMAGE/"
                            +headerImage.title);
                        $scope.selectedHeaderImage = headerImage;
                        //$(googleHolders[headerIndex]).attr("ng-click" ,"clickMe(selectedHeaderImage)");
                        $(holders[headerIndex]).attr("ng-model" ,'selectedHeaderImage');
                        $(clickButton).attr("ng-click" ,"clickMe(selectedHeaderImage)");
                        $(image).attr("onclick" ,"clickMe()");
                        $(image).width(originalWidth);
                        $(image).height(originalHeight);
                        $(holders[headerIndex]).css('position' , 'relative');
                        $(holders[headerIndex]).attr('ng-mouseenter' , 'showHeaderIcon = true');
                        $(holders[headerIndex]).attr('ng-mouseleave' , 'showHeaderIcon = false');
                        $(holders[headerIndex]).attr('ng-init' , 'showHeaderIcon = false');
                        $(holders[headerIndex]).html(image);
                        $(holders[headerIndex]).append(clickButton);
                        $compile(html)($scope);
                        /* END OF REPLACE HEADER IMAGE */
                    }





                    var wellComeString = 'Wellcome '+userDetails.first_name+' '+userDetails.last_name;
                    $(wellcomeDiv).html(wellComeString);
                    $(html).append(wellcomeDiv);
                    $compile(html)($scope);

                },
                error:function(){
                    alert("failure");
                }
            });
        }



        console.log("I AM MAIN CONTROLLER");


        $scope.clickMe = function(selectedImage){
            selectedImage.user_id = 10; // TODO ... Manage Current User
            selectedImage.coupon_id = 30; // TODO .. Coupons ?

            console.log('fuadddd!!!');
            console.log(selectedImage);
            $.ajax({
                type: "POST",
                url: 'https://local.kampyle.com/ClientService.php',
                data: {"data":selectedImage , "action":"campaignClicked"},
                success: function(data){
                }
            });
        }
    }]);
    //var parseManager = new ParseManager();
    var imagesArray = [];
    var maxSize;











    //var myData = "5";


    /*

     var Images = Parse.Object.extend("Images");
     var query = new Parse.Query(Images);
     query.find({
     success: function(images) {
     // The object was retrieved successfully.
     imagesArray = images;
     maxSize = images.length;

     var holders = $( "div[id*='holder']");

     if(holders){
     $(holders).each(function(){
     var originalWidth = $(this).width();
     var originalHeight = $(this).height();
     var image = document.createElement('img');
     $(image).attr("src" , imagesArray[getRandomInt(0,maxSize)].attributes.imageFile._url);
     $(image).width(originalWidth);
     $(image).height(originalHeight);
     $(this).html(image);
     });
     }


     var ad_holders = $( "div[class*='ad']" );

     if(ad_holders){
     $(ad_holders).each(function(){
     var originalWidth = $(this).width();
     var originalHeight = $(this).height();
     var image = document.createElement('img');
     $(image).attr("src" , imagesArray[getRandomInt(0,maxSize)].attributes.imageFile._url);
     $(image).width(originalWidth);
     $(image).height(originalHeight);
     $(this).html(image);
     });
     }


     var ad_id_holders = $( "div[id*='ad']" );

     if(ad_id_holders){

     $(ad_id_holders).each(function(){
     var originalWidth = $(this).width();
     var originalHeight = $(this).height();
     var image = document.createElement('img');
     $(image).attr("src" , imagesArray[getRandomInt(0,maxSize)].attributes.imageFile._url);
     $(image).width(originalWidth);
     $(image).height(originalHeight);
     $(this).html(image);
     });


     }


     },
     error: function(object, error) {
     // The object was not retrieved successfully.
     // error is a Parse.Error with an error code and description.
     }
     });
     */
    function getRandomInt(min, max) {
        max = max - 1;
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /*
     var viewport = document.getElementById('viewport');
     viewport.setAttribute('ng-controller' , 'MainController');

     app.controller('MainController' , function($scope){

     });

     var myDirective = document.createElement('div');
     myDirective.setAttribute('my-directive' , '');
     document.querySelector('#viewport').appendChild(myDirective);


     app.directive('myDirective' , ['$sce' ,  function($sce){
     return {
     restrict : 'EA' ,
     replace : true ,
     template : $sce.trustAsResourceUrl(chrome.extension.getURL('templates/ad_money.html'))
     };
     }]);
     */

    angular.bootstrap(html , ['AdMoney'] , []);
});
