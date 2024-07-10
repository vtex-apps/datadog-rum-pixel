📢 Use this project, [contribute](https://github.com/vtex-apps/datadog-rum-pixel) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Datadog RUM

The VTEX Datadog RUM app is a first party integration to the [Datadog Real User Monitoring (RUM)](https://www.datadoghq.com/product/real-user-monitoring/).

## Installation and configuration

### Step 1 - Installing Datadog RUM app

Install `vtex.datadog-rum-pixel` in your account.

    vtex install vtex.datadog-rum-pixel

> ℹ️ **Info**
>
> Access the [Datadog RUM](https://www.datadoghq.com/product/real-user-monitoring/)</a> and login to your account in order to find out what is your account **Datadog RUM ID**. You will need your application ID and client token to set up the app.

Follow the instructions provided by the Datadog RUM App in the `Admin` > `Account Settings` > `Apps` > `My Apps` > `Datadog RUM Pixel App`

### Step 2 - Setup Datadog RUM

To set up Datadog RUM in your store, you must create and set up all necessary configurations.

#### Configuring Datadog RUM

1. Log in to your [Datadog account](https://www.datadoghq.com/) and navigate to the RUM section.

2. Obtain your application ID, client token, site and service from the Datadog RUM settings.

3. In your VTEX store, go to the Datadog RUM app settings and enter the application ID, client token, site and service.

4. Configure additional settings as required, such as session sample rate, session replay sample rate, track user interactions, track resources, track long tasks, and default privacy level.

#### Checking received data

Now, let's check the received data from your website.

1. Enter in the Datadog RUM dashboard and navigate to the `Real User Monitoring` section.

2. You will see the data from your website, such as page views, user sessions, and more.

> ℹ️ **Info**
>
> If you are not able to see any data, go to your browser's Developer Tools, check the console for any errors, and ensure that the Datadog RUM script is correctly set up.
