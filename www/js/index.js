/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    console.log('Received Event: ' + id);
    // start to initialize PayPalMobile library
    app.initPaymentUI();
  },
  
  initPaymentUI: function() {
    var clientIDs = {
      "PayPalEnvironmentProduction": "AZxefRBsoEL7Kn3M5ImPyhHCMOow5kHU6mnhyOK4Rr8ip9nXC_NO8poT2GOr",
      "PayPalEnvironmentSandbox": "YOUR_SANDBOX_ID"
    };
    PayPalMobile.init(clientIDs, app.onPayPalMobileInit);
  },
  
  onSuccesfulPayment: function(payment) {
     str ="http://sitelerwash.pineconetassel.com";
     //alert("payment success");
     //alert(JSON.stringify(payment, null, 4));
     console.log("payment success: " + JSON.stringify(payment, null, 4));
     //var newdata = JSON.parse(payment);
     //alert(newdata["response"].create_time);
     if (window.XMLHttpRequest){
       xmlhttp = new XMLHttpRequest();
      } else {
      xmlhttp=new ActiveXObject("AD0DB.Connection");
     }
    xmlhttp.onreadystatechange = function(){
      if (xmlhttp.readystate == 4 && xmlhttp.status == 200 ){
      }}
      xmlhttp.open("GET","poststatus.php?q="+str,true);
      xmlhttp.send();
      //alert("connected");
      $.ajax({
        url:'http://sitelerwash.pineconetassel.com/poststatus.php',
        method: 'POST',
        success:function(msg){
          alert(msg);
        }
      });
  },
  
  onAuthorizationCallback: function(authorization) {
    console.log("authorization: " + JSON.stringify(authorization, null, 4));
  },
  
  createPayment: function() {
    // for simplicity use predefined amount
    var price = "1.28";
    var paymentDetails = new PayPalPaymentDetails(price, "0.00", "0.00");
    var payment = new PayPalPayment(price, "USD", "Siteler Inc", "Sale",
      paymentDetails);
    return payment;
  },
  
  createPaymentPromo: function() {
    // for simplicity use predefined amount
    var price = "1.16";
    var paymentDetails = new PayPalPaymentDetails(price, "0.00", "0.00");
    var payment = new PayPalPayment(price, "USD", "Siteler Inc", "Sale",
      paymentDetails);
    return payment;
  },
  
  configuration: function() {
    // for more options see `paypal-mobile-js-helper.js`
    var config = new PayPalConfiguration({
      merchantName: "Siteler Inc",
      merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
      merchantUserAgreementURL: "https://mytestshop.com/agreement"
    });
    return config;
  },
  
  onPrepareRender: function() {
    // buttons defined in index.html
    //  <button id="buyNowBtn"> Buy Now !</button>
    //  <button id="buyInFutureBtn"> Pay in Future !</button>
    //  <button id="profileSharingBtn"> ProfileSharing !</button>
    var buyNowBtn = document.getElementById("buyNowBtn");
    var buyInFutureBtn = document.getElementById("buyInFutureBtn");
    var profileSharingBtn = document.getElementById("profileSharingBtn");

    buyNowBtn.onclick = function(e) {
      // single payment
      PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment,
        app.onUserCanceled);
    };

    buyInFutureBtn.onclick = function(e) {
      // future payment
      PayPalMobile.renderSinglePaymentUI(app.createPaymentPromo(), app.onSuccesfulPayment,
        app.onUserCanceled);
    };

    profileSharingBtn.onclick = function(e) {
      // profile sharing
      PayPalMobile.renderProfileSharingUI(["profile", "email", "phone",
        "address", "futurepayments", "paypalattributes"
      ], app.onAuthorizationCallback, app.onUserCanceled);
    };
    
  },
  
  onPayPalMobileInit: function() {
    // must be called
    // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
    PayPalMobile.prepareToRender("PayPalEnvironmentProduction", app.configuration(),
      app.onPrepareRender);
  },
  
  onUserCanceled: function(result) {
    console.log(result);
  }
}; // end var app

app.initialize();
