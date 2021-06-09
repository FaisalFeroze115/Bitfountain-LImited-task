# Bitfountain-LImited-Assign-Task

# Functionality

# Login

User must login to access the web app. Without Login user can't go different route.
User Credentials -

Email: Mozell.Jacobi@yahoo.com
Password: password

# Available Medical devices

After login user will be redirected to available medical devices route. All the data are coming from the given api.
I am showing all the devices in a box view. For every row 4 devices data is showing. If the device's description and comment is not there then these data will not display. Also hovering to every box there is a smooth transition effect. In this route, I also included a preloader.

# Selecting/Clicking a Medical devices

After clicking a device box, I am holding that box's brandId and Name data and then calling the modeldata api with these brandId and Name. After calling the api I am getting that device's model data and showing them in a ovarlay dialog. If any device's model data is not found then I am showing 'no data found' message.

# Adding a new medical device

I also created a Header section where I included two buttons. Log out and Add a new device button.
Clicking on add a new device button, the web page will take me to the device addition page. From the a new device can be added. Also fetching data from /devicetype route and showing the data in a select option. select option is showing the device type name and storing the corresponding value. After filling up all the fields, the form can be submited. After Submission I am showing a modal which will say that the new device is added. In the Modal there is two button. 'add anohter' and 'view all'. If user click 'add another' then user will be in the same route so that user can add another device. If user clicks 'view all', then user will be redirected to the medical device listing page.

# Logout

In the header there is a logout button. If a user clicks the button user session will be destroy and user will be redirected to login page. user must login again to access all the functionality.

# 4040 Page

I also added a 404 page. If a user write invalid route in the URL user will the send to the 404 page.

### Run the Assignment

To run the project download the files from github and run `npm start` in the root directory.

It will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
