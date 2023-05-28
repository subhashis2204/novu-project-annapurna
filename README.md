
<div align="center">
    <a href="https://connect.novu.co" target="_blank"><img src="https://user-images.githubusercontent.com/100117126/235352632-e3e22d9e-2c8b-43d3-a297-dd8fbd90fc56.png" /></a>
</div>

<h1 align="center">The open-source notification infrastructure for developers</h1>

<div align="center">
The ultimate service for managing multi-channel notifications with a single API.
</div>

<h3>A push notification system that integrates with social impact organizations and sends alerts for volunteer opportunities or donation campaigns.</h3>

<h4><i>Novu-Project-Annapurna</i></h4>
<p>
"Novu Project Annapurna" is an innovative initiative that effectively addresses the critical challenges of food wastage and food scarcity. Its primary objective is to facilitate the donation of surplus food from restaurants to individuals in need by collaborating with partnering NGOs.

In this project, notifications play a pivotal role due to the nature of surplus food involved. Timely delivery of the donated food is crucial to maintain its quality. Whenever a restaurant intends to make a food donation, the application promptly sends a notification to nearby NGOs located within a certain distance from the restaurant, informing them about the availability of the donation. To accomplish this, the notification system leverages both FCM (Firebase Cloud Messaging) and Novu, ensuring efficient communication. Additionally, Novu is also utilized to send OTP (One-Time Password) email notifications to the NGOs, serving as a verification process before they can claim the donated food.</p>

<h3>Technologies being used</h3>
node.js, express, EJS, mongodb, javascript, html, css, tailwindCSS

<h3>App Link</h3>
<a href="https://novu-project-annapurna.azurewebsites.net/">Website Link</a>

<h3>Screenshoot</h3>

![Screenshot (2)](https://github.com/subhashis2204/novu-project-annapurna/assets/76895635/c223c522-d750-4e6a-86e5-4de3d9dc343f)

![Screenshot (3)](https://github.com/subhashis2204/novu-project-annapurna/assets/76895635/ea5770d0-bc26-48a7-9023-f59db1f204fb)

<h3>Description</h3>
<p>Via this project I have tried to provide a technology platform to the restaurant and NGOs so that they can benefit from each other. There are many advanced features of the application like authentication, OTP verification and very recently push message notification.

When a restaurant clicks on "donate" button. The application performs a GeoNear query in mongodb and find the NGOs that are within some radius (here, 10 km) and send out a push notification to them that a restaurant is donating.

![image](https://github.com/subhashis2204/novu-project-annapurna/assets/76895635/9f84ccf9-5b9f-4a9e-8a6d-18a8c4725ae6)

Every NGO has an option to subscribe or unsubscribe to the push notifications.

![Screenshot (5)](https://github.com/subhashis2204/novu-project-annapurna/assets/76895635/2da2b43e-eca7-4f2a-9d98-c4cd02bcccff)

When an NGO claims a donation he receives an email containing the OTP for verification. This OTP is required by the restaurants at the time of donation for validation purpose.

![Screenshot (6)](https://github.com/subhashis2204/novu-project-annapurna/assets/76895635/955afba9-831c-4ee5-af4e-648aac2a62a6)

If an NGO claims a donation the restaurant screen changes like this

![image](https://github.com/subhashis2204/novu-project-annapurna/assets/76895635/f3a4e34c-8dd3-4dcf-bada-a5e3497d190f)

This project is just an attempt to make our world a better place.
</p>


<h3>Who are you? </h3>
<p>Hello, I am Subhashis Paul. I am a computer science undergraduate. It might seem very funny that the main motivation of building this project came from a TV serial. I was just sitting on my couch and browsing through my TV channels. I suddenly found a show where the protagonist runs a sweet shop, and he donates the surplus food to the needy people. This sparked the idea that why not create a technology platform for the same purpose. Moreover, I always wanted to serve the community, and this was something where I could put all my skill together to serve people. And hence this project was born.</p>

<h3>Additional Resources/Info</h3>
<p>Login Details : </p>

**Restaurant**
email : subhashispaul2205@gmail.com
pass : subhashispaul2205@gmail.com

**NGO**
email : subhashispaul2204@gmail.com
pass : subhashispaul2205@gmail.com

You can sign in using these credentials and test the notification system.
