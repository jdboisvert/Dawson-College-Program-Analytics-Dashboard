# Dawson-College-Program-Analytics-Dashboard-V1

## Overview: 

The purpose of this project is to gain a better understanding of web scrapping and to work on a personal summer project. The goal of this project is to scrap all the programs from the Programs page on the Dawson College website (https://www.dawsoncollege.qc.ca/programs) and build a simple analytics dashboard based on the data found. This project will be loosely based around a Udemy course I took about web scraping and dashboarding with Python (credit here: https://www.udemy.com/simple-blogging-analytics-dashboard-in-python/). 

### The dashboard contains: 
-	Number of programs
-	Number of profiles per program
-	Number of disciplines per program
-	Number of Special Fields of studies 
- Number of programs per year modified shown in a pie chart
-	List of programs sorted by last modified

### Still missing: 
- Average Rating of School
- Number of Ratings
- Automated python script for webpage
- Make dashboard prettier + Better documentation (I need to make better comments)

### To Use: 

- Run the dawson-web-scrapper.py script
- Open index.html on a web server (or as I am writing this Firefox supports the file protcol so you are able to access the json file easily there). 
- Enjoy the very simple dashboard and if ever feel free to report any issues you may see or let me know what you think. I am planning on posting v2 soon with more of a automated process and better / modular dashboard. 

### Remarks on phase: 
Thought I could just use javascirpt and call the python script but I learned I was unable to do so. My next step is to download flask 
and write the code around that so my python script will run in the browser. Make sure to run the script dawson-web-scrapper.py in the Dashboard-Actual Directory to get most up to date data. 

##### Date Published : July 3, 2019
