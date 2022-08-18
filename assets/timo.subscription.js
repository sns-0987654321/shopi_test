window.TimoSubscriptionParams = window.TimoSubscriptionParams || {};
window.TimoSubscriptionParams.manage_subscription_url = '/apps/g_subscriptions/';
window.TimoSubscriptionParams.translation = {"default":{"login":{"btn":"Click here","expired":"Sorry, your session has expired. Please access Subscription Portal by logging into your account using the same email that you used to buy subscription","heading":"Need help accessing your subscriptions?","form_btn":"Get subscription login","form_heading":"ACCESSING YOUR SUBSCRIPTIONS?","form_description":"Provide your email below in order to get access to your subscriptions.","form_placeholder":"Enter your email","send_link_success":"We've sent you an email with a link to login to your subscriptions."},"widget":{"save":"Save {{value}}","then":", then {{value}}","sale_text":"Sale","add_to_cart":"Add subscription to cart","prepaid_one":"{{count}}-{{unit}} prepaid subscription","delivery_one":"Delivery every {{unit}}","subscription":"Subscription - save up to {{sale_up_to}}","from_per_each":"from {{ amount }}\/each","prepaid_other":"{{count}}-{{unit}}s prepaid subscription","delivery_other":"Delivery every {{count}} {{unit}}s","save_one_order":"Save {{value}} on first order","purchase_options":"Purchase options","save_other_order":"Save {{value}} on first {{count}} orders","one_time_purchase":"One-time purchase","normal_payment_one":"First payment {{amount1}}, then {{amount2}}","prepaid_payment_one":"First payment {{amount1}} each, then {{amount2}} every {{billing_frequency}} {{unit}}","normal_payment_other":"First {{count}} payments {{amount1}}, then {{amount2}}","save_after_one_order":"Save {{sale}} from {{count}}st order","save_after_two_order":"Save {{sale}} from {{count}}nd order","prepaid_payment_other":"First {{count}} payments {{amount1}} each, then {{amount2}} every {{billing_frequency}} {{unit}}s","normal_payment_alltime":"{{amount}} per payment","save_after_other_order":"Save {{sale}} from {{count}}th order","save_after_three_order":"Save {{sale}} from {{count}}rd order"},"checkout":{"button":"Manage your subscription","heading":"Subscription","description":"Continue to your account to view and manage your subscriptions. Please use the same email address that you used to buy the subscription."},"subscription":{"saved":"Your subscription has been saved","paused":"Your subscription has been paused","resumed":"Your subscription has been resumed","cancelled":"Your subscription has been cancelled","subscriptions":"Subscriptions","create_order_fail":"An error occurred while creating an order","update_email_sended":"We've sent you an email with a link to update your subscription.","create_order_success":"Your order has been created","create_order_email_sended":"We've sent you an email with a link to create your subscription order.","update_payment_email_sended":"We've sent you an email with a link to update your payment."}}}['default'];
if(Shopify && Shopify.Checkout && Shopify.Checkout.hasSellingPlan) {
    var url = window.TimoSubscriptionParams.manage_subscription_url
    if (Shopify.checkout && Shopify.checkout.email) {
        var api_url = 'https://subs.globosoftware.net/frontapi/get-access-token' + '?email=' + Shopify.checkout.email + '&shop=' + Shopify.shop
        fetch(api_url)
        .then(res => res.json())
        .then((response) => {
            url += "subscriptions?token=" + response.token,
            Shopify.Checkout.OrderStatus.addContentBox('<h2 class="heading-2 os-step__title">' + (window.TimoSubscriptionParams.translation.checkout.heading || "Subscription") + '</h2><div class="os-step__special-description"><p class="os-step__description">' + window.TimoSubscriptionParams.translation.checkout.description + '</p></div><a target="_blank" class="ui-button btn btn--subdued btn--size-small shown-if-js os-step__info" href="' + url + '"> ' + (window.TimoSubscriptionParams.translation.checkout.button || "Manage your subscription") + "</a>")
        }).catch(err => console.error(err));
    }else{
        url += 'get-subscription-access';
        Shopify.Checkout.OrderStatus.addContentBox('<h2 class="heading-2 os-step__title">' + (window.TimoSubscriptionParams.translation.checkout.heading || "Subscription") + '</h2><div class="os-step__special-description"><p class="os-step__description">' + window.TimoSubscriptionParams.translation.checkout.description + '</p></div><a target="_blank" class="ui-button btn btn--subdued btn--size-small shown-if-js os-step__info" href="' + url + '"> ' + (window.TimoSubscriptionParams.translation.checkout.button || "Manage your subscription") + "</a>")
    }
}

// Add input checkout_url to login form
if(window.TimoSubscriptionParams.page == "customers/login"){
    var url_string = window.location.href
    var url = new URL(url_string);
    var return_to = url.searchParams.get("return_to");
    if( return_to && document.querySelectorAll("form[action*='/account/login']") ){
        var loginForms = document.querySelectorAll("form[action*='/account/login']");
        for (var i = 0, l = loginForms.length; i < l; i++) {
            var loginForm = loginForms[i];
            loginForm.insertAdjacentHTML('afterbegin', '<input type="hidden" name="return_url" value="' + return_to + '" />');
        }
    }
}

// Add input subscriptions link
var logoutLinkElms = document.querySelectorAll("a[href*='/account/logout']");
if( logoutLinkElms.length ){
    for (var i = 0, l = logoutLinkElms.length; i < l; i++) {
        var logoutLinkElm = logoutLinkElms[i];
        var subscriptionLink = logoutLinkElm.cloneNode(true)
        subscriptionLink.setAttribute("href", window.TimoSubscriptionParams.manage_subscription_url + "subscriptions");
        subscriptionLink.classList.add("timo-subscriptions-link");
        subscriptionLink.style.verticalAlign = "top";
        subscriptionLink.innerHTML = window.TimoSubscriptionParams.translation.subscription.subscriptions || 'Subscriptions';
        logoutLinkElm.insertAdjacentHTML('afterend', ' | ' + subscriptionLink.outerHTML);
    }
}



